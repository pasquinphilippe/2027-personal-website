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
  const getStartedLabel =
    pricing.language === 'fr' ? 'Demarrer' : 'Get started';
  const bookLabel =
    pricing.language === 'fr' ? 'Reserver un appel' : 'Book a call';

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
        {visibleProducts.map((product) => (
          <article
            className={[
              'pricing-product',
              product.highlight ? 'highlight' : '',
              product.popular ? 'popular' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            data-product-handle={product.handle}
            key={product.id}
          >
            <div className="pricing-product-head">
              <div>
                <div className="mini-heading">{product.label}</div>
                <h2>{product.name}</h2>
              </div>
              {product.popular ? (
                <span className="pricing-badge">
                  {pricing.language === 'fr' ? 'Valeur' : 'Best value'}
                </span>
              ) : null}
            </div>

            <div className="pricing-price-row">
              <strong>{product.formattedPrice}</strong>
              <span>{product.cadence}</span>
            </div>

            <p className="pricing-summary">{product.summary}</p>

            <div className="pricing-economy">
              <div>
                <span>{pricing.copy.effectiveRateLabel}</span>
                <strong>{product.formattedEffectiveRate ?? '-'}</strong>
              </div>
              <div>
                <span>{pricing.copy.economyLabel}</span>
                <strong>
                  {product.formattedSavings
                    ? `${product.formattedSavings} / ${product.savingsPercent}%`
                    : pricing.language === 'fr'
                      ? 'Reference'
                      : 'Baseline'}
                </strong>
              </div>
            </div>

            <div className="pricing-best-for">
              <span>{pricing.copy.bestForLabel}</span>
              <p>{product.bestFor}</p>
            </div>

            <ul className="pricing-bullets">
              {product.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>

            <div className="pricing-product-footer">
              <Link className="btn primary" to={getStartedHref(product.id)}>
                {getStartedLabel}
              </Link>
              <Link className="btn secondary" to={contactHref(product.id)}>
                {bookLabel}
              </Link>
              <span>
                {product.source === 'shopify'
                  ? pricing.copy.sourceShopify
                  : pricing.copy.sourceFallback}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="pricing-rollover-note">
        <p>{pricing.copy.rollover}</p>
      </div>
    </section>
  );
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
