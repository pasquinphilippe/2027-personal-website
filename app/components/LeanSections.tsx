import {Link} from 'react-router';
import type {ReactNode} from 'react';
import {
  bankPackages,
  feedbackNotes,
  logoGridItems,
  merchantWins,
  processSteps,
  retainerPackages,
  services,
  timeframeRows,
  workItems,
} from '~/lib/pasquin';

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
              <Link className="btn big" to={ctaHref}>
                {ctaLabel}
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
  return (
    <section className="hero-container">
      <div className="gap-xl" />
      <div className="container">
        <div className="hero-proof-callout" role="status">
          <span className="hero-proof-dot" aria-hidden="true" />
          <span>Bank of hours from $1,000 / Montreal Shopify developer</span>
        </div>
        <div className="gap-l" />
        <div className="hero-text-wrap">
          <h1>Shopify development that keeps your store moving.</h1>
          <div className="btn-grp">
            <Link to="/contact" className="btn big">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}

export function FeaturedWork() {
  return (
    <section aria-label="Featured Shopify work" className="work-slider">
      <div className="work-slider-viewport">
        <div className="work-slider-track">
          {workItems.slice(0, 6).map((item) => (
            <div className="work-slider-slide" key={item.slug}>
              <ProjectCover item={item} />
            </div>
          ))}
        </div>
      </div>
      <div className="gap-m" />
      <div className="work-slider-progress" aria-hidden="true">
        {workItems.slice(0, 6).map((item, index) => (
          <span className={index === 0 ? 'active' : ''} key={item.slug} />
        ))}
      </div>
    </section>
  );
}

export function ServiceCards() {
  return (
    <section className="container" id="services">
      <h3 className="h4">Shopify support across the work that slows merchants down</h3>
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
  return (
    <section className="container">
      <h3 className="h4">I work where Shopify stores usually get messy</h3>
      <div className="gap-l" />
      <div className="logo-grid">
        {logoGridItems.map((item) => (
          <a href="/work" key={item}>
            <span>{item}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function WorkGrid({limit}: {limit?: number}) {
  const items = typeof limit === 'number' ? workItems.slice(0, limit) : workItems;

  return (
    <section className="container wide">
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

export function ProjectCover({item}: {item: (typeof workItems)[number]}) {
  return (
    <Link className="project-card" to="/contact" aria-label={item.title}>
      <div
        className="project-grid-cover"
        style={{backgroundImage: `url(${item.image})`}}
      >
        <img src={item.image} alt="" loading="lazy" />
        <div className="project-card-overlay">
          <div className="project-card-overlay-shade" />
          <div className="project-card-overlay-blur-1" />
          <div className="project-card-overlay-blur-2" />
          <div className="project-card-overlay-inner">
            <div className="project-card-logo" aria-hidden="true">
              {item.eyebrow.slice(0, 1)}
            </div>
            <div className="project-card-text">
              <div className="project-card-company">{item.title}</div>
              <div className="project-card-title">{item.text}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PricingCards() {
  const pricingCards = [
    {
      label: 'Bank',
      name: bankPackages[0].name,
      price: bankPackages[0].price,
      cadence: 'one-time, scoped start',
      features: [
        bankPackages[0].hours,
        bankPackages[0].bestFor,
        bankPackages[0].detail,
      ],
    },
    {
      label: 'Retainer',
      name: retainerPackages[0].name,
      price: retainerPackages[0].price,
      cadence: 'per month',
      features: [
        retainerPackages[0].detail,
        retainerPackages[0].bestFor,
        retainerPackages[0].rollover,
      ],
    },
    {
      label: 'Retainer',
      name: retainerPackages[1].name,
      price: retainerPackages[1].price,
      cadence: 'per month',
      badge: 'Most Popular',
      features: [
        retainerPackages[1].detail,
        retainerPackages[1].bestFor,
        retainerPackages[1].rollover,
      ],
    },
    {
      label: 'Bank',
      name: bankPackages[2].name,
      price: bankPackages[2].price,
      cadence: 'one-time sprint',
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
            <div className="mini-heading">By The Hour</div>
            <h2>$200/h</h2>
            <p>per hour</p>
          </div>
          <div className="price-card-note">
            This option is typically reserved for ad-hoc consulting and quick
            diagnostics.
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
        <p>Retainers include a 10% maximum rollover.</p>
      </div>
    </section>
  );
}

export function TimeframeTable() {
  return (
    <section className="container medium">
      <div className="mini-heading">Typical scope</div>
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
  const note = feedbackNotes[0];

  return (
    <section className="container testimonial-container">
      <div className="card testimonial-card">
        <div className="testimonial-inner">
          <div className="testim-left">
            <div className="mini-heading">Working signal</div>
            <div className="gap-m" />
            <h2 className="h3">&quot;{note.quote}&quot;</h2>
            <div className="gap-l" />
            <div className="testim-author">{note.author}</div>
            <div className="small-text light">{note.role}</div>
          </div>
          <div className="testim-right" aria-hidden="true">
            <img src={workItems[0].image} alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeedbackGrid() {
  return (
    <section className="container">
      <div className="card-grid two-up">
        {feedbackNotes.map((note) => (
          <article className="card quote-card" key={note.quote}>
            <p>&quot;{note.quote}&quot;</p>
            <div className="gap-m" />
            <div className="testim-author">{note.author}</div>
            <div className="small-text light">{note.role}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className="container cta-section">
      <hr />
      <div className="gap-xl" />
      <h2>Let&apos;s make the store easier to run.</h2>
      <div className="gap-l" />
      <div className="btn-grp center">
        <Link to="/contact" className="btn big">
          Get In Touch
        </Link>
      </div>
      <div className="gap-xl" />
      <hr />
    </section>
  );
}

export function MerchantWinsTicker() {
  const tickerItems = [
    ...merchantWins.map((item) => ({item, set: 'first'})),
    ...merchantWins.map((item) => ({item, set: 'second'})),
  ];

  return (
    <section className="ticker-wrap" aria-label="Merchant wins">
      <div className="container">
        <div className="mini-heading">Merchant Wins</div>
      </div>
      <div className="ticker">
        {tickerItems.map(({item, set}) => (
          <span key={`${set}-${item}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}
