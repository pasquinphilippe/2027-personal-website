import {useState} from 'react';
import {Link} from 'react-router';
import type {ReactNode} from 'react';
import {
  getBankPackages,
  getLogoGridItems,
  getMerchantWins,
  getPartnerReviews,
  getPartnerReviewSummary,
  getProcessSteps,
  getRetainerPackages,
  getServices,
  getSiteText,
  getTimeframeRows,
  getWorkItems,
} from '~/lib/pasquin';
import {getLocalizedHref, useSelectedLanguage} from '~/lib/i18n';

type WorkItem = ReturnType<typeof getWorkItems>[number];

const PROJECT_IMAGE_WIDTHS = [640, 960, 1440] as const;
const GRID_PROJECT_IMAGE_SIZES =
  '(max-width: 800px) calc(100vw - 56px), (max-width: 1280px) calc((100vw - 112px) / 2), 594px';
const SLIDER_PROJECT_IMAGE_SIZES =
  '(max-width: 700px) calc(100vw - 56px), min(940px, calc(100vw - 80px))';
const INDEX_PROJECT_IMAGE_SIZES =
  '(max-width: 700px) calc(100vw - 56px), min(860px, 62vw)';
const TESTIMONIAL_PROJECT_IMAGE_SIZES =
  '(max-width: 760px) calc(100vw - 56px), min(560px, 46vw)';

export function PageIntro({
  eyebrow,
  title,
  children,
  ctaLabel = 'Get In Touch',
  ctaHref = '/contact',
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const localizedCtaHref = getLocalizedHref(ctaHref, language);

  return (
    <section className="page-intro">
      <div className="gap-xl" />
      <div className="container">
        {eyebrow ? <div className="hero-proof-callout">{eyebrow}</div> : null}
        <div className="gap-l" />
        <div className="hero-text-wrap">
          <h1>{title}</h1>
          <div className="intro-side">
            {children}
            <div className="btn-grp">
              <Link className="btn big" to={localizedCtaHref}>
                {ctaLabel === 'Get In Touch' ? text.cta.button : ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}

export function HomeHero() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const reviewSummary = getPartnerReviewSummary();
  const trustSignals =
    language === 'fr'
      ? [
          'Shopify Partner Directory',
          `${reviewSummary.rating} / 5,0`,
          `${reviewSummary.reviewCount} avis`,
          'Partenaire depuis decembre 2021',
          'Montreal / EN + FR',
        ]
      : [
          'Shopify Partner Directory',
          `${reviewSummary.rating} / 5.0`,
          `${reviewSummary.reviewCount} reviews`,
          `Partner since ${reviewSummary.partnerSince}`,
          'Montreal / EN + FR',
        ];

  return (
    <section className="hero-container">
      <div className="gap-xl" />
      <div className="container">
        <div className="hero-proof-callout" role="status">
          <span className="hero-proof-dot" aria-hidden="true" />
          <span>{text.home.proof}</span>
        </div>
        <div className="gap-l" />
        <div className="hero-text-wrap">
          <h1>{text.home.title}</h1>
          <div className="btn-grp">
            <Link to={getLocalizedHref('/contact', language)} className="btn big">
              {text.home.cta}
            </Link>
          </div>
        </div>
        <div className="hero-trust-row" aria-label="Shopify Partner trust signals">
          {trustSignals.map((signal, index) => (
            <span
              className={index === 0 ? 'hero-trust-badge shopify' : 'hero-trust-badge'}
              key={signal}
            >
              {index === 0 ? <span aria-hidden="true">S</span> : null}
              {signal}
            </span>
          ))}
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}

export function FeaturedWork() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const workItems = getWorkItems(language);

  return (
    <section aria-label={text.home.featuredWorkAria} className="work-slider">
      <div className="work-slider-viewport">
        <div className="work-slider-track">
          {workItems.slice(0, 6).map((item, index) => (
            <div className="work-slider-slide" key={item.slug}>
              <ProjectCover
                item={item}
                imageSizes={SLIDER_PROJECT_IMAGE_SIZES}
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCards() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const services = getServices(language);

  return (
    <section className="container" id="services">
      <h3 className="h4">{text.home.serviceHeading}</h3>
      <div className="gap-l" />
      <div className="card-grid three-up">
        {services.map((service) => (
          <article className="card service-card-light" key={service.title}>
            <div className="mini-heading">{service.label}</div>
            <h2 className="h4">{service.title}</h2>
            <p className="light">{service.text}</p>
            <div className="pill-row">
              {service.bullets.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function LogoGrid() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const logoGridItems = getLogoGridItems(language);

  return (
    <section className="container">
      <h3 className="h4">{text.home.logoHeading}</h3>
      <div className="gap-l" />
      <div className="logo-grid">
        {logoGridItems.map((item) => (
          <a href={getLocalizedHref('/work', language)} key={item}>
            <span>{item}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function WorkGrid({
  limit,
  variant = 'grid',
}: {
  limit?: number;
  variant?: 'grid' | 'index';
}) {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const workItems = getWorkItems(language);
  const items = typeof limit === 'number' ? workItems.slice(0, limit) : workItems;

  if (variant === 'index') {
    return (
      <ProjectIndex
        ariaLabel={text.home.featuredWorkAria}
        items={items}
        language={language}
      />
    );
  }

  return (
    <section className="container wide work-grid-section">
      <div className="project-grid">
        <div className="cols two-up med-gap">
          {items.map((item) => (
            <ProjectCover item={item} key={item.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectIndex({
  ariaLabel,
  items,
  language,
}: {
  ariaLabel: string;
  items: WorkItem[];
  language: ReturnType<typeof useSelectedLanguage>;
}) {
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? '');
  const activeItem = items.find((item) => item.slug === activeSlug) ?? items[0];

  if (!activeItem) return null;

  return (
    <section className="container wide project-index-section">
      <div className="project-index" aria-label={ariaLabel}>
        <div className="project-index-list">
          {items.map((item, index) => {
            const isActive = item.slug === activeItem.slug;

            return (
              <div className="project-index-row" key={item.slug}>
                <button
                  aria-controls="project-index-preview"
                  aria-pressed={isActive}
                  className={`project-index-button${isActive ? ' active' : ''}`}
                  onClick={() => setActiveSlug(item.slug)}
                  onFocus={() => setActiveSlug(item.slug)}
                  onMouseEnter={() => setActiveSlug(item.slug)}
                  type="button"
                >
                  <span className="project-list-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="project-list-title">{item.title}</span>
                </button>
              </div>
            );
          })}
        </div>
        <ProjectIndexPreview item={activeItem} language={language} />
      </div>
    </section>
  );
}

function ProjectIndexPreview({
  item,
  language,
}: {
  item: WorkItem;
  language: ReturnType<typeof useSelectedLanguage>;
}) {
  const initials = getProjectInitials(item.title);
  const preview = (
    <>
      <ProjectImage
        item={item}
        alt={`${item.title} website screenshot`}
        sizes={INDEX_PROJECT_IMAGE_SIZES}
        loading="lazy"
      />
      <span className="project-index-preview-mark" aria-hidden="true">
        {initials}
      </span>
    </>
  );

  if ('href' in item && item.href) {
    return (
      <a
        aria-label={`${item.title} website`}
        className="project-index-preview"
        href={item.href}
        id="project-index-preview"
        rel="noreferrer"
        target="_blank"
      >
        {preview}
      </a>
    );
  }

  return (
    <Link
      aria-label={item.title}
      className="project-index-preview"
      id="project-index-preview"
      to={getLocalizedHref('/contact', language)}
    >
      {preview}
    </Link>
  );
}

function ProjectCover({
  item,
  imageSizes = GRID_PROJECT_IMAGE_SIZES,
  priority = false,
}: {
  item: WorkItem;
  imageSizes?: string;
  priority?: boolean;
}) {
  const language = useSelectedLanguage();
  const initials = getProjectInitials(item.title);

  const cover = (
    <>
      <div className="project-grid-cover">
        <ProjectImage
          item={item}
          alt={`${item.title} website screenshot`}
          sizes={imageSizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
        />
        <div className="project-card-overlay">
          <div className="project-card-overlay-shade" />
          <div className="project-card-overlay-blur-1" />
          <div className="project-card-overlay-blur-2" />
          <div className="project-card-overlay-inner">
            <div className="project-card-logo" aria-hidden="true">
              {initials}
            </div>
            <div className="project-card-text">
              <div className="project-card-meta">{item.eyebrow}</div>
              <div className="project-card-company">{item.title}</div>
              <div className="project-card-title">{item.text}</div>
              <div className="project-card-tags" aria-hidden="true">
                {item.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if ('href' in item && item.href) {
    return (
      <a
        aria-label={`${item.title} website`}
        className="project-card"
        href={item.href}
        rel="noreferrer"
        target="_blank"
      >
        {cover}
      </a>
    );
  }

  return (
    <Link
      aria-label={item.title}
      className="project-card"
      to={getLocalizedHref('/contact', language)}
    >
      {cover}
    </Link>
  );
}

export function ProjectImage({
  item,
  alt,
  sizes,
  loading,
  fetchPriority,
}: {
  item: WorkItem;
  alt: string;
  sizes: string;
  loading: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
}) {
  const webpSrcSet = PROJECT_IMAGE_WIDTHS.map(
    (width) => `${getProjectWebpImage(item.image, width)} ${width}w`,
  ).join(', ');

  const fetchPriorityProps = fetchPriority
    ? ({fetchpriority: fetchPriority} as Record<string, string>)
    : {};

  return (
    <picture>
      <source sizes={sizes} srcSet={webpSrcSet} type="image/webp" />
      <img
        src={item.image}
        alt={alt}
        width={1440}
        height={935}
        loading={loading}
        decoding="async"
        {...fetchPriorityProps}
      />
    </picture>
  );
}

function getProjectWebpImage(image: string, width: number) {
  return image.replace(/\.jpg$/, `-${width}.webp`);
}

function getProjectInitials(title: string) {
  return title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function PricingCards() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const bankPackages = getBankPackages(language);
  const retainerPackages = getRetainerPackages(language);
  const pricingCards = [
    {
      label: text.pricing.bankLabel,
      name: bankPackages[0].name,
      price: bankPackages[0].price,
      cadence: text.pricing.oneTimeScoped,
      features: [
        bankPackages[0].hours,
        bankPackages[0].bestFor,
        bankPackages[0].detail,
      ],
    },
    {
      label: text.pricing.retainerLabel,
      name: retainerPackages[0].name,
      price: retainerPackages[0].price,
      cadence: text.pricing.perMonth,
      features: [
        retainerPackages[0].detail,
        retainerPackages[0].bestFor,
        retainerPackages[0].rollover,
      ],
    },
    {
      label: text.pricing.retainerLabel,
      name: retainerPackages[1].name,
      price: retainerPackages[1].price,
      cadence: text.pricing.perMonth,
      badge: text.pricing.popular,
      features: [
        retainerPackages[1].detail,
        retainerPackages[1].bestFor,
        retainerPackages[1].rollover,
      ],
    },
    {
      label: text.pricing.bankLabel,
      name: bankPackages[2].name,
      price: bankPackages[2].price,
      cadence: text.pricing.oneTimeSprint,
      features: [
        bankPackages[2].hours,
        bankPackages[2].bestFor,
        bankPackages[2].detail,
      ],
    },
  ];

  return (
    <section className="container" id="pricing">
      <div className="pricing-grid">
        <article className="price-card by-hour">
          <div>
            <div className="mini-heading">{text.pricing.byHour}</div>
            <h2>$200/h</h2>
            <p>{text.pricing.perHour}</p>
          </div>
          <div className="price-card-note">
            {text.pricing.hourlyNote}
          </div>
        </article>
        {pricingCards.map((item) => (
          <article className="price-card" key={item.name}>
            <div className="price-card-head">
              <div>
                <div className="mini-heading">
                  {item.label}
                  {item.badge ? <span>{item.badge}</span> : null}
                </div>
                <h2>{item.name}</h2>
              </div>
            </div>
            <strong>{item.price}</strong>
            <p>{item.cadence}</p>
            <div className="price-features">
              {item.features.map((feature) => (
                <div className="price-feature" key={feature}>
                  <span aria-hidden="true" />
                  {feature}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="gap-l" />
      <div className="currency-note">
        <span>CAD</span>
        <p>{text.pricing.currencyNote}</p>
      </div>
    </section>
  );
}

export function TimeframeTable() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const timeframeRows = getTimeframeRows(language);

  return (
    <section className="container medium">
      <div className="mini-heading">{text.pricing.typicalScope}</div>
      <div className="gap-m" />
      <div className="simple-table">
        {timeframeRows.map(([project, timeframe]) => (
          <div className="table-row" key={project}>
            <span>{project}</span>
            <strong>{timeframe}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessList() {
  const language = useSelectedLanguage();
  const processSteps = getProcessSteps(language);

  return (
    <section className="container">
      <div className="cols three-up med-gap">
        {processSteps.map((step) => (
          <article className="card process-card" key={step.title}>
            <div className="mini-heading">{step.number}</div>
            <h2 className="h4">{step.title}</h2>
            <p className="light">{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FeedbackFeature() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const reviews = getPartnerReviews();
  const workItems = getWorkItems(language);
  const review = reviews[2] ?? reviews[0];

  return (
    <section className="container testimonial-container">
      <div className="card testimonial-card">
        <div className="testimonial-inner">
          <div className="testim-left">
            <div className="mini-heading">{text.feedback.workingSignal}</div>
            <div className="gap-m" />
            <h2 className="h3">&quot;{review.quote}&quot;</h2>
            <div className="gap-l" />
            <div className="testim-author">{review.author}</div>
            <div className="small-text light">{review.service}</div>
          </div>
          <div className="testim-right" aria-hidden="true">
            <div className="testim-browser-frame">
              <div className="testim-browser-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="testim-browser-screen">
                <ProjectImage
                  item={workItems[0]}
                  alt=""
                  sizes={TESTIMONIAL_PROJECT_IMAGE_SIZES}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeedbackGrid() {
  const language = useSelectedLanguage();
  const reviews = getPartnerReviews();
  const summary = getPartnerReviewSummary();
  const labels =
    language === 'fr'
      ? {
          rating: 'note Shopify Partner Directory',
          reviews: 'avis publics',
          since: 'partenaire depuis decembre',
          quality: 'Qualite',
          communication: 'Communication',
          aria: 'Avis 5 etoiles',
        }
      : {
          rating: 'Shopify Partner Directory rating',
          reviews: 'public reviews',
          since: 'partner since December',
          quality: 'Quality',
          communication: 'Communication',
          aria: '5 star review',
        };

  return (
    <section className="container">
      <div className="testimonial-proof-strip">
        <div>
          <span>{summary.rating}</span>
          <p>{labels.rating}</p>
        </div>
        <div>
          <span>{summary.reviewCount}</span>
          <p>{labels.reviews}</p>
        </div>
        <div>
          <span>2021</span>
          <p>{labels.since}</p>
        </div>
      </div>
      <div className="card-grid two-up testimonial-review-grid">
        {reviews.map((review) => (
          <article className="card quote-card" key={review.author}>
            <div className="review-score-row" aria-label={labels.aria}>
              <span>5.0</span>
              <span>
                {labels.quality} {review.quality}
              </span>
              <span>
                {labels.communication} {review.communication}
              </span>
            </div>
            <p>&quot;{review.quote}&quot;</p>
            <div className="gap-m" />
            <div className="testim-author">{review.author}</div>
            <div className="small-text light">
              {review.date} / {review.service}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);

  return (
    <section className="container cta-section">
      <hr />
      <div className="gap-xl" />
      <h2>{text.cta.title}</h2>
      <div className="gap-l" />
      <div className="btn-grp center">
        <Link to={getLocalizedHref('/contact', language)} className="btn big">
          {text.cta.button}
        </Link>
      </div>
      <div className="gap-xl" />
      <hr />
    </section>
  );
}

export function MerchantWinsTicker() {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const merchantWins = getMerchantWins(language);
  const tickerItems = [
    ...merchantWins.map((item) => ({item, set: 'first'})),
    ...merchantWins.map((item) => ({item, set: 'second'})),
  ];

  return (
    <section className="ticker-wrap" aria-label={text.feedback.merchantWins}>
      <div className="container">
        <div className="mini-heading">{text.feedback.merchantWins}</div>
      </div>
      <div className="ticker">
        {tickerItems.map(({item, set}) => (
          <span key={`${set}-${item}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
