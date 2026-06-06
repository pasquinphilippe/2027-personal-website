import type {LanguageCode} from '~/lib/i18n';
import type {PricingCurrencyCode} from '~/lib/pricingProducts';

/**
 * Onboarding ("Get started") domain logic.
 *
 * Pure, isomorphic helpers (validation, payload shaping, copy). No secrets and
 * no network calls live here so this module is safe to import from anywhere.
 * The actual writes (Shopify Admin, Supabase, Anvil) live in the
 * `*.server.ts` modules and are only ever imported from the route action.
 */

export type OnboardingStep = 'details' | 'sign' | 'pay' | 'done';

export type AccessMethod = 'collaborator' | 'staff' | 'later';

export type OnboardingInput = {
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredLanguage: LanguageCode;
  // Company
  companyName: string;
  storeUrl: string;
  shopifyPlan: string;
  // Access
  accessMethod: AccessMethod;
  collaboratorCode: string;
  staffEmail: string;
  projectNotes: string;
  consent: boolean;
  // Plan
  planId: string;
  currency: PricingCurrencyCode;
};

export type OnboardingErrors = Partial<Record<keyof OnboardingInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseOnboardingForm(form: FormData): OnboardingInput {
  const get = (key: string) => String(form.get(key) ?? '').trim();
  const language = get('preferredLanguage') === 'fr' ? 'fr' : 'en';
  const accessRaw = get('accessMethod');
  const accessMethod: AccessMethod =
    accessRaw === 'collaborator' || accessRaw === 'staff' ? accessRaw : 'later';
  const currencyRaw = get('currency').toUpperCase();
  const currency = (
    ['CAD', 'USD', 'EUR', 'GBP'].includes(currencyRaw) ? currencyRaw : 'CAD'
  ) as PricingCurrencyCode;

  return {
    firstName: get('firstName'),
    lastName: get('lastName'),
    email: get('email').toLowerCase(),
    phone: get('phone'),
    preferredLanguage: language,
    companyName: get('companyName'),
    storeUrl: normalizeStoreUrl(get('storeUrl')),
    shopifyPlan: get('shopifyPlan'),
    accessMethod,
    collaboratorCode: get('collaboratorCode'),
    staffEmail: get('staffEmail').toLowerCase(),
    projectNotes: get('projectNotes'),
    consent: form.get('consent') === 'on' || form.get('consent') === 'true',
    planId: get('planId'),
    currency,
  };
}

export function validateOnboarding(input: OnboardingInput): OnboardingErrors {
  const errors: OnboardingErrors = {};
  if (!input.firstName) errors.firstName = 'Required';
  if (!input.lastName) errors.lastName = 'Required';
  if (!EMAIL_RE.test(input.email)) errors.email = 'Enter a valid email';
  if (!input.companyName) errors.companyName = 'Required';
  if (!input.storeUrl) errors.storeUrl = 'Required';
  if (input.accessMethod === 'staff' && !EMAIL_RE.test(input.staffEmail)) {
    errors.staffEmail = 'Enter the email to invite';
  }
  if (input.accessMethod === 'collaborator' && !input.consent) {
    errors.consent = 'Please authorize the collaborator request';
  }
  if (!input.planId) errors.planId = 'Missing plan';
  return errors;
}

export function normalizeStoreUrl(value: string): string {
  if (!value) return '';
  let v = value.trim().toLowerCase();
  v = v.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return v;
}

/** JSON payloads written to the matching Shopify customer metafields. */
export function buildCustomerMetafields(input: OnboardingInput, opts: {
  planName: string;
  planHandle: string;
}) {
  const now = new Date().toISOString();
  return {
    company_account: {
      company_name: input.companyName,
      store_url: input.storeUrl,
      shopify_plan: input.shopifyPlan || null,
      locale: input.preferredLanguage,
      updated_at: now,
    },
    contact_roles: {
      primary: {
        first_name: input.firstName,
        last_name: input.lastName,
        email: input.email,
        phone: input.phone || null,
        roles: ['owner', 'billing', 'project', 'technical'],
      },
    },
    access_invites: {
      method: input.accessMethod,
      collaborator_code: input.collaboratorCode || null,
      staff_invite_email:
        input.accessMethod === 'staff' ? input.staffEmail : null,
      project_notes: input.projectNotes || null,
      consent: input.consent,
      requested_at: now,
      status: 'pending',
    },
    client_portal: {
      stage: 'onboarding',
      selected_plan: {handle: opts.planHandle, name: opts.planName},
      selected_currency: input.currency,
      contract: {provider: 'anvil', status: 'unsigned'},
      created_at: now,
    },
  };
}

/** Tags applied to the Shopify customer on lead capture. */
export function buildCustomerTags(input: OnboardingInput, planHandle: string) {
  const tags = [
    'pasquin:client',
    'pasquin:portal-onboarding',
    'pasquin:lead',
    `plan:${planHandle}`,
    `currency:${input.currency}`,
  ];
  if (input.accessMethod === 'collaborator') tags.push('pasquin:access-invited');
  if (input.accessMethod === 'staff') tags.push('pasquin:access-invited');
  return tags;
}

/** Flat row for the Supabase mirror (`onboarding_leads`). */
export function buildSupabaseLeadRow(
  input: OnboardingInput,
  opts: {planName: string; planHandle: string; shopifyCustomerId: string | null},
) {
  return {
    email: input.email,
    first_name: input.firstName,
    last_name: input.lastName,
    phone: input.phone || null,
    company_name: input.companyName,
    store_url: input.storeUrl,
    shopify_plan: input.shopifyPlan || null,
    locale: input.preferredLanguage,
    plan_handle: opts.planHandle,
    plan_name: opts.planName,
    currency: input.currency,
    access_method: input.accessMethod,
    collaborator_code: input.collaboratorCode || null,
    staff_invite_email:
      input.accessMethod === 'staff' ? input.staffEmail : null,
    project_notes: input.projectNotes || null,
    shopify_customer_id: opts.shopifyCustomerId,
    contract_status: 'unsigned',
    stage: 'onboarding',
  };
}

export function variantGidToNumericId(gid: string | null | undefined): string | null {
  if (!gid) return null;
  const match = gid.match(/ProductVariant\/(\d+)/);
  return match ? match[1] : null;
}
