import type {Route} from './+types/pricing';
import {
  CtaSection,
  FeedbackFeature,
  MerchantWinsTicker,
  PageIntro,
  PricingCards,
  TimeframeTable,
} from '~/components/LeanSections';
import {getSiteText} from '~/lib/pasquin';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Tarifs | Philippe Pasquin Developpeur Shopify'
          : 'Pricing | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? "Tarifs de developpement Shopify pour banques d'heures et retainers mensuels, incluant options 5 h, 40 h et support mensuel."
          : 'Shopify development pricing for bank-of-hours work and monthly retainers, including 5-hour, scoped, 40-hour, and monthly support options.',
    },
  ];
};

export default function PricingPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <>
      <PageIntro title={text.pages.pricingTitle} eyebrow={text.pages.pricingEyebrow}>
        <p className="subtitle light">
          {text.pages.pricingIntro}
        </p>
      </PageIntro>
      <PricingCards />
      <div className="gap-xxl" />
      <TimeframeTable />
      <div className="gap-xxl" />
      <FeedbackFeature />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
