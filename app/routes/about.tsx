import type {Route} from './+types/about';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {processSteps, services, siteConfig} from '~/lib/pasquin';

export const meta: Route.MetaFunction = () => [
  {title: 'About | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'About Philippe Pasquin, a Montreal-based Shopify developer helping merchants improve storefronts, apps, automation, performance, and support workflows.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title="Hey there. I'm Philippe." eyebrow="About">
        <p className="subtitle light">
          A Montreal-based Shopify developer helping merchants move faster
          without turning every storefront change into a heavy agency project.
        </p>
      </PageIntro>

      <section className="container about-team-map">
        <div className="about-team-row">
          {services.map((service) => (
            <article className="about-person-card" key={service.title}>
              <div className="about-avatar">{service.title.slice(0, 1)}</div>
              <div>
                <strong>{service.title}</strong>
                <span>{service.label}</span>
              </div>
            </article>
          ))}
          <article className="about-person-card">
            <div className="about-avatar">S</div>
            <div>
              <strong>Support rhythm</strong>
              <span>Retainers</span>
            </div>
          </article>
        </div>
      </section>

      <div className="gap-xxl" />

      <section className="container medium story-copy">
        <div className="mini-heading">June 6, 2026</div>
        <p>
          I work close to the practical side of ecommerce: product pages, cart
          behavior, theme code, app stacks, launch pressure, analytics, and the
          small operational details that make a store feel hard to change.
        </p>
        <p>
          The goal is simple. Make the store clearer, easier to maintain, and
          easier for the merchant to operate after the work ships.
        </p>
        <p>
          In short, I help Shopify teams keep moving when the technical work is
          specific, overdue, or too important to leave vague.
        </p>
      </section>

      <div className="gap-xxl" />

      <section className="container">
        <div className="card profile-card">
          <div>
            <div className="mini-heading">{siteConfig.location.city}</div>
            <h2>One Shopify developer, directly accountable to the work.</h2>
            <div className="gap-m" />
            <div className="process-inline">
              {processSteps.map((step) => (
                <span key={step.title}>
                  {step.number} {step.title}
                </span>
              ))}
            </div>
          </div>
          <p className="light">
            Bank-of-hours and retainer work are designed for merchants who want
            clear scope, fast feedback loops, and code that does not create a
            new maintenance problem.
          </p>
        </div>
      </section>

      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
