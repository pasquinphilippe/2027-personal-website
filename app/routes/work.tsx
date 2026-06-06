import type {Route} from './+types/work';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
  WorkGrid,
} from '~/components/LeanSections';
import {workItems} from '~/lib/pasquin';

export const meta: Route.MetaFunction = () => [
  {title: 'Work | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'Selected Shopify development work areas: storefront systems, theme cleanup, integrations, operations automation, conversion, and monthly support.',
  },
];

export default function WorkPage() {
  const tags = ['All', 'theme', 'conversion', 'apps', 'automation', 'support'];

  return (
    <>
      <PageIntro title="Work" eyebrow="Selected Shopify work">
        <div className="filter-row" aria-label="Work filters">
          {tags.map((tag) => (
            <span className="pill" key={tag}>
              {tag} {tag === 'All' ? workItems.length : ''}
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
