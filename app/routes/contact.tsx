import {useLoaderData} from 'react-router';
import type {Route} from './+types/contact';
import {
  FeedbackGrid,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {PasquinBookingSelector} from '~/components/PasquinBookingSelector';
import {getPublicConfig} from '~/lib/pasquin';

export const meta: Route.MetaFunction = () => [
  {title: 'Contact | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'Contact Philippe Pasquin for Shopify development, bank-of-hours work, retainers, theme cleanup, integrations, and performance support.',
  },
];

export async function loader({context}: Route.LoaderArgs) {
  return {
    publicConfig: getPublicConfig(context.env),
  };
}

export default function ContactPage() {
  const {publicConfig} = useLoaderData<typeof loader>();

  return (
    <>
      <PageIntro title="Let's make the store easier to run." eyebrow="Contact">
        <p className="subtitle light">
          Pick the closest path, send a little context, and book a focused
          conversation about the Shopify work.
        </p>
      </PageIntro>
      <FeedbackGrid />
      <div className="gap-xxl" />
      <PasquinBookingSelector publicConfig={publicConfig} />
      <div className="gap-xxl" />
      <section className="container medium email-line">
        <p>or email directly at</p>
        <a href={`mailto:${publicConfig.contactEmail}`}>{publicConfig.contactEmail}</a>
      </section>
      <div className="gap-xxl" />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
