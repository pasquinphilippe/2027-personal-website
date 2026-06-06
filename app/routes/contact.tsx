import {useLoaderData} from 'react-router';
import type {Route} from './+types/contact';
import {
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {PasquinBookingSelector} from '~/components/PasquinBookingSelector';
import {getPublicConfig, getSiteText} from '~/lib/pasquin';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Contact | Philippe Pasquin Developpeur Shopify'
          : 'Contact | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? "Contactez Philippe Pasquin pour developpement Shopify, banques d'heures, retainers, nettoyage de theme, integrations et performance."
          : 'Contact Philippe Pasquin for Shopify development, bank-of-hours work, retainers, theme cleanup, integrations, and performance support.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  return {
    publicConfig: getPublicConfig(context.env),
  };
}

export default function ContactPage() {
  const {publicConfig} = useLoaderData<typeof loader>();
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <>
      <PageIntro title={text.pages.contactTitle} eyebrow={text.pages.contactEyebrow}>
        <p className="subtitle light">
          {text.pages.contactIntro}
        </p>
      </PageIntro>
      <FeedbackGrid />
      <div className="gap-xxl" />
      <PasquinBookingSelector publicConfig={publicConfig} />
      <div className="gap-xxl" />
      <section className="container medium email-line">
        <p>{text.pages.emailLead}</p>
        <a href={`mailto:${publicConfig.contactEmail}`}>{publicConfig.contactEmail}</a>
      </section>
      <div className="gap-xxl" />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
