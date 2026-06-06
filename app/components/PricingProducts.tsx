import {Link, useLocation} from 'react-router';
import {getLocalizedHref} from '~/lib/i18n';
import type {
  PricingMode,
  PricingProductsPayload,
  PricingCurrencyCode,
} from '~/lib/pricingProducts';

type PricingProductsProps = {
  pricing: PricingProductsPayload;
};

export function PricingProducts({pricing}: PricingProductsProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const activeMode = getActiveMode(params.get('mode'));
  const visibleProducts = pricing.products.filter(
    (product) => product.mode === activeMode,
  );
  const contactHref = (productId: string) =>
    getLocalizedHref(
      `/contact?plan=${productId}&currency=${pricing.currency}`,
      pricing.language,
    );
  const getStartedHref = (productId: string) =>
    getLocalizedHref(
      `/get-started?plan=${productId}&currency=${pricing.currency}`,
      pricing.language,
    );
  const bookLabel =
    pricing.language === 'fr' ? 'Poser une question' : 'Ask a question';

  return (
    <section className="pricing-shell" id="pricing">
      <div className="pricing-toolbar" aria-label="Pricing controls">
        <div className="pricing-control">
          <span>{pricing.copy.modeLabel}</span>
          <div
            className={`pricing-toggle mode-${activeMode}`}
            role="tablist"
            aria-label={pricing.copy.modeLabel}
          >
            {pricing.modeTabs.map((tab) => (
              <Link
                aria-selected={activeMode === tab.mode}
                className={activeMode === tab.mode ? 'active' : ''}
                key={tab.mode}
                role="tab"
                to={getPricingHref(location.pathname, params, {mode: tab.mode})}
              >
                <strong>{tab.label}</strong>
                <small>{tab.note}</small>
              </Link>
            ))}
          </div>
        </div>
        <div className="pricing-control compact">
          <span>{pricing.copy.currencyLabel}</span>
          <div
            className="currency-toggle"
            aria-label={pricing.copy.currencyLabel}
          >
            {pricing.currencyOptions.map((option) => (
              <Link
                aria-current={
                  pricing.currency === option.code ? 'true' : undefined
                }
                className={pricing.currency === option.code ? 'active' : ''}
                key={option.code}
                to={getPricingHref(location.pathname, params, {
                  currency: option.code,
                })}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="pricing-market-note">
        <p>{pricing.copy.marketNote}</p>
        <span>
          {pricing.marketSource === 'shopify'
            ? pricing.copy.sourceShopify
            : pricing.copy.sourceFallback}
        </span>
      </div>

      <div className="pricing-product-grid">
        {visibleProducts.map((product) => {
          const decision = getPricingDecision(product.id, pricing.language);
          const includedLabel =
            pricing.language === 'fr' ? 'Inclus' : 'Included';
          const chooseLabel =
            pricing.language === 'fr' ? 'A choisir si' : 'Choose this if';
          const rateLabel =
            pricing.language === 'fr'
              ? 'Taux'
              : pricing.copy.effectiveRateLabel;
          const valueLabel =
            pricing.language === 'fr' ? 'Valeur' : pricing.copy.economyLabel;

          return (
            <article
              className={[
                'pricing-product',
                product.highlight ? 'highlight' : '',
                product.popular ? 'popular' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              data-product-handle={product.handle}
              data-pricing-source={product.source}
              key={product.id}
            >
              <div className="pricing-product-head">
                <div>
                  <div className="pricing-card-label">{product.label}</div>
                  <h2>{product.name}</h2>
                </div>
                {product.popular || decision.badge ? (
                  <span className="pricing-badge">
                    {product.popular
                      ? pricing.language === 'fr'
                        ? 'Meilleure valeur'
                        : 'Best value'
                      : decision.badge}
                  </span>
                ) : null}
              </div>

              <div className="pricing-price-row">
                <strong>{product.formattedPrice}</strong>
                <span>{product.cadence}</span>
              </div>

              <p className="pricing-decision">{decision.summary}</p>

              <div className="pricing-choice">
                <span>{chooseLabel}</span>
                <p>{product.bestFor}</p>
              </div>

              <div className="pricing-value-row">
                <div>
                  <span>{rateLabel}</span>
                  <strong>{product.formattedEffectiveRate ?? '-'}</strong>
                </div>
                <div>
                  <span>{valueLabel}</span>
                  <strong>
                    {product.formattedSavings
                      ? `${product.formattedSavings} / ${product.savingsPercent}%`
                      : decision.value}
                  </strong>
                </div>
              </div>

              <div className="pricing-included">
                <span>{includedLabel}</span>
                <ul className="pricing-bullets">
                  {product.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <p className="pricing-summary">{product.summary}</p>

              <div className="pricing-product-footer">
                <div className="pricing-actions">
                  <Link className="btn primary" to={getStartedHref(product.id)}>
                    {product.cta}
                  </Link>
                  <Link className="btn secondary" to={contactHref(product.id)}>
                    {bookLabel}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="pricing-rollover-note">
        <p>{pricing.copy.rollover}</p>
      </div>
    </section>
  );
}

function getPricingDecision(productId: string, language: 'en' | 'fr') {
  const decisions = {
    en: {
      hourly: {
        summary: 'Use this for a quick read, not for implementation work.',
        badge: 'Fastest',
        value: 'Baseline',
      },
      'bank-5': {
        summary: 'The cleanest first step when the fix is small or urgent.',
        badge: 'Best start',
        value: 'Starter',
      },
      'bank-scoped': {
        summary: 'Use this when the store needs a scoped plan before pricing.',
        badge: 'Custom',
        value: 'Scoped',
      },
      'bank-40': {
        summary:
          'Use this when the work needs focused execution, not drip feed.',
        badge: 'Sprint',
        value: 'Sprint',
      },
      'retainer-operator': {
        summary:
          'Use this when the store needs a dependable monthly technical lane.',
        badge: 'Steady',
        value: 'Monthly',
      },
      'retainer-growth': {
        summary: 'Use this when Shopify work is ongoing and tied to growth.',
        badge: 'Growth',
        value: 'Monthly',
      },
    },
    fr: {
      hourly: {
        summary:
          'A utiliser pour une lecture rapide, pas pour du travail d execution.',
        badge: 'Rapide',
        value: 'Reference',
      },
      'bank-5': {
        summary:
          'Le meilleur premier pas quand le correctif est petit ou urgent.',
        badge: 'Bon depart',
        value: 'Depart',
      },
      'bank-scoped': {
        summary:
          'A choisir quand la boutique doit etre cadree avant le prix final.',
        badge: 'Sur mesure',
        value: 'Cadre',
      },
      'bank-40': {
        summary:
          "A choisir quand le travail demande un sprint d'execution concentre.",
        badge: 'Sprint',
        value: 'Sprint',
      },
      'retainer-operator': {
        summary:
          'A choisir quand la boutique a besoin d un canal technique mensuel.',
        badge: 'Stable',
        value: 'Mensuel',
      },
      'retainer-growth': {
        summary:
          'A choisir quand le travail Shopify est continu et lie a la croissance.',
        badge: 'Growth',
        value: 'Mensuel',
      },
    },
  } as const;

  const localized = decisions[language];
  return localized[productId as keyof typeof localized] ?? localized.hourly;
}

function getActiveMode(value: string | null): PricingMode {
  return value === 'recurring' ? 'recurring' : 'one-time';
}

function getPricingHref(
  pathname: string,
  currentParams: URLSearchParams,
  next: Partial<{mode: PricingMode; currency: PricingCurrencyCode}>,
) {
  const params = new URLSearchParams(currentParams);

  if (next.mode) {
    if (next.mode === 'one-time') {
      params.delete('mode');
    } else {
      params.set('mode', next.mode);
    }
  }

  if (next.currency) {
    if (next.currency === 'CAD') {
      params.delete('currency');
    } else {
      params.set('currency', next.currency);
    }
  }

  const search = params.toString();
  return `${pathname}${search ? `?${search}` : ''}`;
}
