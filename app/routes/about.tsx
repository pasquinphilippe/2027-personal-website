import type {Route} from './+types/about';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
} from '~/components/LeanSections';
import {
  getProcessSteps,
  getServices,
  getSiteText,
  siteConfig,
} from '~/lib/pasquin';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'A propos | Philippe Pasquin Developpeur Shopify'
          : 'About | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? 'A propos de Philippe Pasquin, developpeur Shopify base a Montreal pour storefronts, apps, automatisation, performance et support.'
          : 'About Philippe Pasquin, a Montreal-based Shopify developer helping merchants improve storefronts, apps, automation, performance, and support workflows.',
    },
  ];
};

export default function AboutPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const services = getServices(language);
  const processSteps = getProcessSteps(language);

  return (
    <>
      <PageIntro title={text.pages.aboutTitle} eyebrow={text.pages.aboutEyebrow}>
        <p className="subtitle light">
          {text.pages.aboutIntro}
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
              <strong>{text.about.supportRhythm}</strong>
              <span>{text.about.retainers}</span>
            </div>
          </article>
        </div>
      </section>

      <div className="gap-xxl" />

      <section className="container medium story-copy">
        <div className="mini-heading">{text.about.date}</div>
        {text.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <div className="gap-xxl" />

      <section className="container">
        <div className="card profile-card">
          <div>
            <div className="mini-heading">{siteConfig.location.city}</div>
            <h2>{text.about.profileTitle}</h2>
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
            {text.about.profileText}
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
