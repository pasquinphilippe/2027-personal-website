import type {Route} from './+types/testimonials';
import {
  CtaSection,
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';

export const meta: Route.MetaFunction = () => [
  {title: 'Testimonials | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'Common merchant needs and working signals for Shopify development, theme cleanup, app integrations, automation, and monthly support.',
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <PageIntro title="Testimonials" eyebrow="Working signals">
        <p className="subtitle light">
          Real client quotes can be added here when ready. For now, this page
          keeps the old-site testimonial layout while documenting the recurring
          merchant situations this service is built for.
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
