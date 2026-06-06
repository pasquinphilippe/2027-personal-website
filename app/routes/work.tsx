import type {Route} from './+types/work';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
  WorkGrid,
} from '~/components/LeanSections';
import {getSiteText, getWorkItems} from '~/lib/pasquin';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Projets clients | Philippe Pasquin Developpeur Shopify'
          : 'Client Work | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? 'Projets clients selectionnes en developpement Shopify, B2B, POS, ERP, SEO, automatisation et support technique continu.'
          : 'Selected client projects across Shopify theme development, B2B features, POS apps, ERP integrations, SEO, automation, and ongoing technical support.',
    },
  ];
};

export default function WorkPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const workItems = getWorkItems(language);
  const tags =
    language === 'fr'
      ? ['Tous', 'theme', 'b2b', 'apps', 'pos', 'seo', 'support']
      : ['All', 'theme', 'b2b', 'apps', 'pos', 'seo', 'support'];
  const allTag = language === 'fr' ? 'Tous' : 'All';

  return (
    <>
      <PageIntro title={text.pages.workTitle} eyebrow={text.pages.workEyebrow}>
        <div className="filter-row" aria-label="Work filters">
          {tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag} {tag === allTag ? workItems.length : ''}
            </span>
          ))}
        </div>
      </PageIntro>
      <WorkGrid />
      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
