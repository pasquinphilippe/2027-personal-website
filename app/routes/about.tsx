import type {Route} from './+types/about';
import {
  CtaSection,
  MerchantWinsTicker,
  PageIntro,
  ProjectImage,
} from '~/components/LeanSections';
import {
  getProcessSteps,
  getPublicConfig,
  getServices,
  getSiteText,
  getWorkItems,
  siteConfig,
} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLanguageFromRequest,
  getLocalizedUrl,
  useSelectedLanguage,
} from '~/lib/i18n';

const ABOUT_REFERENCE_IMAGE_SIZES =
  '(max-width: 800px) calc(100vw - 56px), (max-width: 1220px) calc((100vw - 124px) / 3), 325px';

export const meta: Route.MetaFunction = ({data, location}) => {
  const language =
    data?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
  const siteUrl = data?.publicConfig?.siteUrl || siteConfig.defaultSiteUrl;
  const title =
    language === 'fr'
      ? 'A propos | Philippe Pasquin Developpeur Shopify'
      : 'About | Philippe Pasquin Shopify Developer';
  const description =
    language === 'fr'
      ? 'A propos de Philippe Pasquin, developpeur Shopify base a Montreal pour storefronts, apps, automatisation, performance et support.'
      : 'About Philippe Pasquin, a Montreal-based Shopify developer helping merchants improve storefronts, apps, automation, performance, and support workflows.';
  const canonical = getLocalizedUrl(siteUrl, '/about', language);
  const alternateEn = getLocalizedUrl(siteUrl, '/about', 'en');
  const alternateFr = getLocalizedUrl(siteUrl, '/about', 'fr');
  const ogImage = `${siteUrl.replace(/\/$/, '')}${siteConfig.ogImagePath}`;

  return [
    {title},
    {name: 'description', content: description},
    {tagName: 'link', rel: 'canonical', href: canonical},
    {tagName: 'link', rel: 'alternate', hrefLang: 'en-CA', href: alternateEn},
    {tagName: 'link', rel: 'alternate', hrefLang: 'fr-CA', href: alternateFr},
    {property: 'og:title', content: title},
    {property: 'og:description', content: description},
    {property: 'og:type', content: 'profile'},
    {property: 'og:url', content: canonical},
    {property: 'og:image', content: ogImage},
    {property: 'og:locale', content: language === 'fr' ? 'fr_CA' : 'en_CA'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'twitter:title', content: title},
    {name: 'twitter:description', content: description},
    {name: 'twitter:image', content: ogImage},
  ];
};

export async function loader({context, request}: Route.LoaderArgs) {
  return {
    language: getLanguageFromRequest(request),
    publicConfig: getPublicConfig(context.env),
  };
}

export default function AboutPage() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const services = getServices(language);
  const processSteps = getProcessSteps(language);
  const workItems = getWorkItems(language).slice(0, 3);
  const profileLabel =
    language === 'fr'
      ? 'Developpeur Shopify / Montreal'
      : 'Shopify developer / Montreal';
  const storyLabel =
    language === 'fr' ? 'Pourquoi ce service existe' : 'Why this exists';
  const referenceLabel =
    language === 'fr' ? 'References Shopify' : 'Shopify references';
  const operatingLabel =
    language === 'fr' ? 'Mode de travail' : 'Operating style';
  const principles =
    language === 'fr'
      ? [
          'Proche du marchand',
          'Scope clair',
          'Execution legere',
          'Notes de transfert',
        ]
      : [
          'Close to the merchant',
          'Clear scope',
          'Lean execution',
          'Handoff notes',
        ];

  return (
    <>
      <PageIntro title={text.pages.aboutTitle} eyebrow={text.pages.aboutEyebrow}>
        <p className="subtitle light">
          {text.pages.aboutIntro}
        </p>
      </PageIntro>

      <section className="container about-profile-strip">
        <div className="about-profile-primary">
          <span className="mini-heading">{profileLabel}</span>
          <h2>{siteConfig.name}</h2>
        </div>
        <div className="about-profile-services">
          {services.map((service) => (
            <span key={service.title}>{service.title}</span>
          ))}
          <span>{text.about.supportRhythm}</span>
        </div>
      </section>

      <div className="gap-xxl" />

      <section className="container about-story">
        <div className="about-story-aside">
          <div className="mini-heading">{text.about.date}</div>
          <h2>{storyLabel}</h2>
        </div>
        <div className="about-story-copy">
          {text.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <div className="gap-xxl" />

      <section className="container about-reference-section">
        <div className="about-reference-head">
          <div>
            <div className="mini-heading">{referenceLabel}</div>
            <h2>{text.about.profileTitle}</h2>
          </div>
          <p className="light">
            {text.about.profileText}
          </p>
        </div>
        <div className="about-reference-grid">
          {workItems.map((item) => (
            <a
              className="about-reference-card"
              href={item.href}
              key={item.slug}
              rel="noreferrer"
              target="_blank"
            >
              <ProjectImage
                item={item}
                alt={`${item.title} Shopify project screenshot`}
                sizes={ABOUT_REFERENCE_IMAGE_SIZES}
                loading="lazy"
              />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </section>

      <div className="gap-xxl" />

      <section className="container about-operating">
        <div>
          <div className="mini-heading">{operatingLabel}</div>
          <div className="process-inline">
            {processSteps.map((step) => (
              <span key={step.title}>
                {step.number} {step.title}
              </span>
            ))}
          </div>
        </div>
        <div className="about-principle-list">
          {principles.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>

      <div className="gap-xxl" />
      <CtaSection />
      <MerchantWinsTicker />
      <div className="gap-xxl" />
    </>
  );
}
