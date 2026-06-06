import type {Route} from './+types/pricing';
import {
  CtaSection,
  FeedbackFeature,
  MerchantWinsTicker,
  PageIntro,
  PricingCards,
  TimeframeTable,
} from '~/components/LeanSections';

export const meta: Route.MetaFunction = () => [
  {title: 'Pricing | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'Shopify development pricing for bank-of-hours work and monthly retainers, including 5-hour, scoped, 40-hour, and monthly support options.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageIntro title="Pricing" eyebrow="Clear hours, clean scope">
        <p className="subtitle light">
          Choose a small bank for focused fixes, a larger bank for launch work,
          or a monthly retainer when the store needs steady technical care.
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
