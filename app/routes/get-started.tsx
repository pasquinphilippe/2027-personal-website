import type {Route} from './+types/get-started';
import {
  data,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  Form,
  Link,
} from 'react-router';
import {
  getLanguageFromRequest,
  getLocalizedHref,
  type LanguageCode,
} from '~/lib/i18n';
import {
  getPricingProductSummaries,
  normalizePricingCurrency,
  type PricingCurrencyCode,
} from '~/lib/pricingProducts';
import {
  parseOnboardingForm,
  validateOnboarding,
  buildCustomerMetafields,
  buildCustomerTags,
  buildSupabaseLeadRow,
  variantGidToNumericId,
  type OnboardingErrors,
  type OnboardingInput,
  type OnboardingStep,
} from '~/lib/onboarding';
import {
  isAdminConfigured,
  upsertOnboardingCustomer,
  markContractSigned,
} from '~/lib/shopifyAdmin.server';
import {
  isSupabaseConfigured,
  mirrorLeadToSupabase,
  updateLeadInSupabase,
} from '~/lib/supabaseMirror.server';
import {
  isAnvilConfigured,
  createContractPacket,
  isPacketSigned,
} from '~/lib/anvil.server';

type OnboardingSession = {
  customerId: string | null;
  email: string;
  planId: string;
  currency: PricingCurrencyCode;
  packetEid: string | null;
  signerEid: string | null;
  signUrl: string | null;
  signed: boolean;
};

const VARIANT_QUERY = `#graphql
  query GetStartedVariant($handle: String!, $country: CountryCode)
  @inContext(country: $country) {
    product(handle: $handle) {
      id
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        price { amount currencyCode }
      }
    }
  }
`;

function currencyCountry(currency: PricingCurrencyCode) {
  switch (currency) {
    case 'USD':
      return 'US';
    case 'EUR':
      return 'FR';
    case 'GBP':
      return 'GB';
    default:
      return 'CA';
  }
}

export const meta: Route.MetaFunction = () => [
  {title: 'Get started | Pasquin Shopify Developer'},
  {name: 'robots', content: 'noindex'},
];

export async function loader({context, request}: Route.LoaderArgs) {
  const url = new URL(request.url);
  const language = getLanguageFromRequest(request);
  const currency = normalizePricingCurrency(url.searchParams.get('currency'));
  const planId = url.searchParams.get('plan') ?? '';
  const summaries = getPricingProductSummaries(language);
  const plan = summaries.find((p) => p.id === planId) ?? summaries[0];
  if (!plan) throw new Response('Not found', {status: 404});

  let variantNumericId: string | null = null;
  try {
    const res = await context.storefront.query<{
      product?: {
        selectedOrFirstAvailableVariant?: {id?: string | null} | null;
      } | null;
    }>(VARIANT_QUERY, {
      variables: {handle: plan.handle, country: currencyCountry(currency)},
    });
    variantNumericId = variantGidToNumericId(
      res?.product?.selectedOrFirstAvailableVariant?.id,
    );
  } catch (error) {
    console.error('[get-started] variant lookup failed', error);
  }

  const env = context.env;
  const checkoutDomain = env.PUBLIC_CHECKOUT_DOMAIN || env.PUBLIC_STORE_DOMAIN;
  const checkoutUrl =
    variantNumericId && checkoutDomain
      ? `https://${checkoutDomain}/cart/${variantNumericId}:1`
      : null;

  const ob = context.session.get('onboarding') as OnboardingSession | undefined;
  let step: OnboardingStep = 'details';
  if (ob?.signed) step = 'pay';
  else if (ob) step = 'sign';
  if (url.searchParams.get('step') === 'details') step = 'details';

  return {
    language,
    currency,
    plan,
    step,
    checkoutUrl,
    signUrl: ob?.signUrl ?? null,
    signed: Boolean(ob?.signed),
    contactHref: getLocalizedHref(
      `/contact?plan=${plan.id}&currency=${currency}`,
      language,
    ),
    config: {
      admin: isAdminConfigured(env),
      anvil: isAnvilConfigured(env),
      supabase: isSupabaseConfigured(env),
      allowUnsigned: env.ALLOW_UNSIGNED_CHECKOUT === 'true',
    },
  };
}

export async function action({context, request}: Route.ActionArgs) {
  const env = context.env;
  const form = await request.formData();
  const intent = String(form.get('intent') ?? '');
  const language = getLanguageFromRequest(request);

  if (intent === 'submit-details') {
    const input = parseOnboardingForm(form);
    const errors = validateOnboarding(input);
    if (Object.keys(errors).length) {
      return data(
        {ok: false as const, errors, values: input},
        {status: 400},
      );
    }

    const summaries = getPricingProductSummaries(language);
    const plan = summaries.find((p) => p.id === input.planId) ?? summaries[0];
    if (!plan) {
      return data({ok: false as const, errors: {planId: 'Missing plan'}}, {status: 400});
    }
    const metafields = buildCustomerMetafields(input, {
      planName: plan.name,
      planHandle: plan.handle,
    });
    const tags = buildCustomerTags(input, plan.handle);

    let customerId: string | null = null;
    if (isAdminConfigured(env)) {
      try {
        const result = await upsertOnboardingCustomer(env, {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          metafields,
          tags,
        });
        customerId = result.customerId;
      } catch (error) {
        console.error('[get-started] Shopify customer upsert failed', error);
      }
    }

    try {
      await mirrorLeadToSupabase(
        env,
        buildSupabaseLeadRow(input, {
          planName: plan.name,
          planHandle: plan.handle,
          shopifyCustomerId: customerId,
        }),
      );
    } catch (error) {
      console.error('[get-started] Supabase mirror failed', error);
    }

    let packetEid: string | null = null;
    let signerEid: string | null = null;
    let signUrl: string | null = null;
    if (isAnvilConfigured(env)) {
      try {
        const origin = new URL(request.url).origin;
        const packet = await createContractPacket(env, {
          signerName: `${input.firstName} ${input.lastName}`,
          signerEmail: input.email,
          clientUserId: input.email,
          redirectURL: `${origin}${getLocalizedHref(
            `/get-started?plan=${plan.id}&currency=${input.currency}&step=sign`,
            language,
          )}`,
          data: {
            company: input.companyName,
            store_url: input.storeUrl,
            plan: plan.name,
            currency: input.currency,
          },
          isTest: true,
        });
        packetEid = packet.packetEid;
        signerEid = packet.signerEid;
        signUrl = packet.signUrl;
      } catch (error) {
        console.error('[get-started] Anvil packet creation failed', error);
      }
    }

    context.session.set('onboarding', {
      customerId,
      email: input.email,
      planId: plan.id,
      currency: input.currency,
      packetEid,
      signerEid,
      signUrl,
      signed: false,
    } satisfies OnboardingSession);

    return redirect(
      getLocalizedHref(
        `/get-started?plan=${plan.id}&currency=${input.currency}&step=sign`,
        language,
      ),
      {headers: {'Set-Cookie': await context.session.commit()}},
    );
  }

  if (intent === 'check-signature') {
    const ob = context.session.get('onboarding') as
      | OnboardingSession
      | undefined;
    if (!ob) {
      return redirect(getLocalizedHref('/get-started', language));
    }

    let signed = false;
    if (isAnvilConfigured(env) && ob.packetEid) {
      try {
        signed = await isPacketSigned(env, ob.packetEid);
      } catch (error) {
        console.error('[get-started] Anvil status check failed', error);
      }
    } else if (env.ALLOW_UNSIGNED_CHECKOUT === 'true') {
      // Local/dev affordance only — never enable in production.
      signed = true;
    }

    if (!signed) {
      return data({ok: false as const, signError: true}, {status: 200});
    }

    if (ob.customerId && isAdminConfigured(env)) {
      try {
        await markContractSigned(env, ob.customerId, {
          provider: 'anvil',
          packet_eid: ob.packetEid,
          signed_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error('[get-started] markContractSigned failed', error);
      }
    }
    try {
      await updateLeadInSupabase(env, ob.email, {
        contract_status: 'signed',
        stage: 'contract-signed',
      });
    } catch (error) {
      console.error('[get-started] Supabase update failed', error);
    }

    context.session.set('onboarding', {...ob, signed: true});
    return redirect(
      getLocalizedHref(
        `/get-started?plan=${ob.planId}&currency=${ob.currency}&step=pay`,
        language,
      ),
      {headers: {'Set-Cookie': await context.session.commit()}},
    );
  }

  return data({ok: false as const}, {status: 400});
}

const COPY = {
  en: {
    eyebrow: 'Get started',
    steps: ['Your details', 'Sign agreement', 'Pay'],
    intro: 'A few details, a quick e-signature, then you can pay or book a call.',
    detailsHeading: 'Tell us about you and your store',
    you: 'About you',
    company: 'Your store',
    access: 'Access we will need',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Work email',
    phone: 'Phone (optional)',
    companyName: 'Company name',
    storeUrl: 'Shopify store URL',
    shopifyPlan: 'Shopify plan (optional)',
    accessMethod: 'How will you grant store access?',
    collaborator: 'Send a collaborator request',
    staff: 'Invite a staff account',
    later: "I'll decide later",
    collaboratorCode: 'Collaborator request code (optional)',
    staffEmail: 'Email to invite',
    projectNotes: 'Project notes (optional)',
    consent:
      'I authorize Pasquin to request collaborator access to my Shopify store.',
    language: 'Preferred language',
    submit: 'Continue to agreement',
    bookInstead: 'Prefer to talk first? Book a call',
    signHeading: 'Sign your services agreement',
    signIntro:
      'Review and sign the agreement below. Payment unlocks once it is signed.',
    signCheck: 'I have signed — continue',
    signPending:
      'We could not confirm a completed signature yet. Please finish signing, then try again.',
    signUnconfigured:
      'Contract signing is not configured yet. Add ANVIL_API_KEY and ANVIL_ETCH_TEMPLATE_EID to enable e-signature.',
    payHeading: 'You are all set',
    paySub: 'Your agreement is signed. Choose how to proceed.',
    payNow: 'Pay now',
    payUnavailable: 'Checkout link unavailable — please book a call.',
    bookCall: 'Book a call instead',
    plan: 'Selected plan',
  },
  fr: {
    eyebrow: 'Demarrer',
    steps: ['Vos informations', "Signer l'entente", 'Payer'],
    intro:
      'Quelques informations, une signature rapide, puis payez ou reservez un appel.',
    detailsHeading: 'Parlez-nous de vous et de votre boutique',
    you: 'A propos de vous',
    company: 'Votre boutique',
    access: 'Acces dont nous aurons besoin',
    firstName: 'Prenom',
    lastName: 'Nom',
    email: 'Courriel professionnel',
    phone: 'Telephone (optionnel)',
    companyName: 'Nom de entreprise',
    storeUrl: 'URL de la boutique Shopify',
    shopifyPlan: 'Forfait Shopify (optionnel)',
    accessMethod: 'Comment donnerez-vous acces a la boutique ?',
    collaborator: 'Envoyer une demande de collaborateur',
    staff: 'Inviter un compte employe',
    later: 'Je deciderai plus tard',
    collaboratorCode: 'Code de demande collaborateur (optionnel)',
    staffEmail: 'Courriel a inviter',
    projectNotes: 'Notes de projet (optionnel)',
    consent:
      "J'autorise Pasquin a demander un acces collaborateur a ma boutique Shopify.",
    language: 'Langue preferee',
    submit: "Continuer vers l'entente",
    bookInstead: "Vous preferez parler d'abord ? Reservez un appel",
    signHeading: 'Signez votre entente de services',
    signIntro:
      "Lisez et signez l'entente ci-dessous. Le paiement se debloque apres la signature.",
    signCheck: "J'ai signe — continuer",
    signPending:
      "Nous n'avons pas encore confirme la signature. Terminez la signature puis reessayez.",
    signUnconfigured:
      "La signature de contrat n'est pas encore configuree. Ajoutez ANVIL_API_KEY et ANVIL_ETCH_TEMPLATE_EID.",
    payHeading: 'Tout est pret',
    paySub: 'Votre entente est signee. Choisissez comment proceder.',
    payNow: 'Payer maintenant',
    payUnavailable: 'Lien de paiement indisponible — reservez un appel.',
    bookCall: 'Reserver un appel',
    plan: 'Forfait choisi',
  },
} as const;

export default function GetStartedPage() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const {language, plan, step, currency, checkoutUrl, signUrl, contactHref, config} =
    loaderData;
  const t = COPY[language as LanguageCode] ?? COPY.en;
  const errors: OnboardingErrors =
    actionData && 'errors' in actionData ? actionData.errors ?? {} : {};
  const values =
    actionData && 'values' in actionData
      ? (actionData.values as OnboardingInput)
      : undefined;
  const signError =
    actionData && 'signError' in actionData ? actionData.signError : false;
  const submitting = navigation.state !== 'idle';
  const activeIndex = step === 'pay' ? 2 : step === 'sign' ? 1 : 0;

  return (
    <section className="container medium get-started" id="get-started">
      <div className="gs-head">
        <div className="mini-heading">{t.eyebrow}</div>
        <ol className="gs-steps" aria-label="Progress">
          {t.steps.map((label, i) => (
            <li
              key={label}
              className={
                i === activeIndex ? 'active' : i < activeIndex ? 'done' : ''
              }
            >
              <span>{i + 1}</span>
              {label}
            </li>
          ))}
        </ol>
        <p className="gs-plan">
          {t.plan}: <strong>{plan.name}</strong> — {plan.price} {plan.cadence}{' '}
          ({currency})
        </p>
      </div>

      {step === 'details' && (
        <Form method="post" className="gs-form" replace>
          <input type="hidden" name="intent" value="submit-details" />
          <input type="hidden" name="planId" value={plan.id} />
          <input type="hidden" name="currency" value={currency} />
          <p className="gs-intro">{t.intro}</p>

          <fieldset>
            <legend>{t.you}</legend>
            <div className="gs-grid">
              <Field name="firstName" label={t.firstName} error={errors.firstName} defaultValue={values?.firstName} required />
              <Field name="lastName" label={t.lastName} error={errors.lastName} defaultValue={values?.lastName} required />
              <Field name="email" label={t.email} type="email" error={errors.email} defaultValue={values?.email} required />
              <Field name="phone" label={t.phone} error={errors.phone} defaultValue={values?.phone} />
              <label className="gs-label">
                <span>{t.language}</span>
                <select name="preferredLanguage" defaultValue={values?.preferredLanguage ?? language}>
                  <option value="en">English</option>
                  <option value="fr">Francais</option>
                </select>
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>{t.company}</legend>
            <div className="gs-grid">
              <Field name="companyName" label={t.companyName} error={errors.companyName} defaultValue={values?.companyName} required />
              <Field name="storeUrl" label={t.storeUrl} placeholder="your-store.myshopify.com" error={errors.storeUrl} defaultValue={values?.storeUrl} required />
              <Field name="shopifyPlan" label={t.shopifyPlan} placeholder="Basic / Shopify / Plus" defaultValue={values?.shopifyPlan} />
            </div>
          </fieldset>

          <fieldset>
            <legend>{t.access}</legend>
            <label className="gs-label">
              <span>{t.accessMethod}</span>
              <select name="accessMethod" defaultValue={values?.accessMethod ?? 'collaborator'}>
                <option value="collaborator">{t.collaborator}</option>
                <option value="staff">{t.staff}</option>
                <option value="later">{t.later}</option>
              </select>
            </label>
            <div className="gs-grid">
              <Field name="collaboratorCode" label={t.collaboratorCode} defaultValue={values?.collaboratorCode} />
              <Field name="staffEmail" label={t.staffEmail} type="email" error={errors.staffEmail} defaultValue={values?.staffEmail} />
            </div>
            <label className="gs-label">
              <span>{t.projectNotes}</span>
              <textarea name="projectNotes" rows={3} defaultValue={values?.projectNotes} />
            </label>
            <label className="gs-check">
              <input type="checkbox" name="consent" defaultChecked={values?.consent} />
              <span>{t.consent}</span>
            </label>
            {errors.consent ? <p className="gs-error">{errors.consent}</p> : null}
          </fieldset>

          <div className="gs-actions">
            <button className="btn primary" type="submit" disabled={submitting}>
              {t.submit}
            </button>
            <Link className="gs-link" to={contactHref}>
              {t.bookInstead}
            </Link>
          </div>
        </Form>
      )}

      {step === 'sign' && (
        <div className="gs-sign">
          <h2>{t.signHeading}</h2>
          <p className="gs-intro">{t.signIntro}</p>
          {signUrl ? (
            <div className="gs-sign-frame">
              <iframe title="Contract signing" src={signUrl} />
            </div>
          ) : (
            <p className="gs-notice">{t.signUnconfigured}</p>
          )}
          {signError ? <p className="gs-error">{t.signPending}</p> : null}
          <div className="gs-actions">
            <Form method="post" replace>
              <input type="hidden" name="intent" value="check-signature" />
              <button
                className="btn primary"
                type="submit"
                disabled={submitting || (!signUrl && !config.allowUnsigned)}
              >
                {t.signCheck}
              </button>
            </Form>
            <Link className="gs-link" to={contactHref}>
              {t.bookCall}
            </Link>
          </div>
        </div>
      )}

      {step === 'pay' && (
        <div className="gs-pay">
          <h2>{t.payHeading}</h2>
          <p className="gs-intro">{t.paySub}</p>
          <div className="gs-actions">
            {checkoutUrl ? (
              <a className="btn primary" href={checkoutUrl}>
                {t.payNow} — {plan.price}
              </a>
            ) : (
              <p className="gs-notice">{t.payUnavailable}</p>
            )}
            <Link className="gs-link" to={contactHref}>
              {t.bookCall}
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function Field({
  name,
  label,
  error,
  defaultValue,
  type = 'text',
  placeholder,
  required,
}: {
  name: string;
  label: string;
  error?: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="gs-label">
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
      />
      {error ? <small className="gs-error">{error}</small> : null}
    </label>
  );
}
