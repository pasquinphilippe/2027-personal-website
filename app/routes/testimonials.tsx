import type {Route} from './+types/testimonials';
import {
  CtaSection,
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {getSiteText} from '~/lib/pasquin';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Temoignages | Philippe Pasquin Developpeur Shopify'
          : 'Testimonials | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? 'Besoins marchands recurrents et signaux terrain pour developpement Shopify, nettoyage de theme, integrations, automatisation et support mensuel.'
          : 'Common merchant needs and working signals for Shopify development, theme cleanup, app integrations, automation, and monthly support.',
    },
  ];
};

export default function TestimonialsPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <>
      <PageIntro
        title={text.pages.testimonialsTitle}
        eyebrow={text.pages.testimonialsEyebrow}
      >
        <p className="subtitle light">
          {text.pages.testimonialsIntro}
        </p>
      </PageIntro>
      <FeedbackGrid />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
