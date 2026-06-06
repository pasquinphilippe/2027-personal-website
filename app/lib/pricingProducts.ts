import type {Storefront} from '@shopify/hydrogen';
import type {LanguageCode} from '~/lib/i18n';

export type PricingCurrencyCode = 'CAD' | 'USD' | 'EUR' | 'GBP';
export type PricingMode = 'one-time' | 'recurring';
export type PricingSource = 'shopify' | 'fallback';

type PricingCountryCode = 'CA' | 'US' | 'FR' | 'GB';

type Money = {
  amount: number;
  currencyCode: PricingCurrencyCode;
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

type ShopifyPricingProduct = {
  product?: {
    id: string;
    handle: string;
    title: string;
    onlineStoreUrl?: string | null;
    selectedOrFirstAvailableVariant?: {
      id: string;
      availableForSale: boolean;
      price: ShopifyMoney;
      compareAtPrice?: ShopifyMoney | null;
    } | null;
  } | null;
};

type PricingDefinition = {
  id: string;
  handle: string;
  mode: PricingMode;
  basePriceCad: number | null;
  hours: number | null;
  monthlyHours?: number;
  popular?: boolean;
  highlight?: boolean;
  order: number;
  copy: Record<
    LanguageCode,
    {
      label: string;
      name: string;
      cadence: string;
      summary: string;
      bestFor: string;
      bullets: string[];
      cta: string;
    }
  >;
};

export type PricingProductCard = {
  id: string;
  handle: string;
  mode: PricingMode;
  label: string;
  name: string;
  cadence: string;
  summary: string;
  bestFor: string;
  bullets: string[];
  cta: string;
  popular: boolean;
  highlight: boolean;
  price: Money | null;
  formattedPrice: string;
  formattedEffectiveRate: string | null;
  formattedSavings: string | null;
  savingsPercent: number | null;
  source: PricingSource;
  productUrl: string | null;
};

export type PricingProductsPayload = {
  currency: PricingCurrencyCode;
  language: LanguageCode;
  modeTabs: Array<{mode: PricingMode; label: string; note: string}>;
  currencyOptions: Array<{
    code: PricingCurrencyCode;
    label: string;
    country: PricingCountryCode;
  }>;
  products: PricingProductCard[];
  marketSource: PricingSource;
  copy: {
    title: string;
    intro: string;
    currencyLabel: string;
    modeLabel: string;
    economyLabel: string;
    effectiveRateLabel: string;
    bestForLabel: string;
    sourceShopify: string;
    sourceFallback: string;
    rollover: string;
    marketNote: string;
    noPrice: string;
  };
};

export const pricingCurrencyOptions = [
  {code: 'CAD', label: 'CAD', country: 'CA', rateFromCad: 1, locale: 'en-CA'},
  {
    code: 'USD',
    label: 'USD',
    country: 'US',
    rateFromCad: 0.73,
    locale: 'en-US',
  },
  {
    code: 'EUR',
    label: 'EUR',
    country: 'FR',
    rateFromCad: 0.67,
    locale: 'fr-FR',
  },
  {
    code: 'GBP',
    label: 'GBP',
    country: 'GB',
    rateFromCad: 0.57,
    locale: 'en-GB',
  },
] as const;

const pricingDefinitions: PricingDefinition[] = [
  {
    id: 'hourly',
    handle: 'shopify-hourly-consulting',
    mode: 'one-time',
    basePriceCad: 200,
    hours: 1,
    order: 10,
    copy: {
      en: {
        label: 'Diagnostic',
        name: 'By the hour',
        cadence: 'per hour',
        summary:
          'Ad-hoc consulting, technical diagnosis, or focused direction before a larger scope.',
        bestFor: 'Quick calls, second opinions, urgent investigation',
        bullets: [
          'Baseline rate',
          'No minimum scope',
          'Best before a larger bank',
        ],
        cta: 'Book an hourly consult',
      },
      fr: {
        label: 'Diagnostic',
        name: "A l'heure",
        cadence: 'par heure',
        summary:
          'Conseil ponctuel, diagnostic technique ou direction ciblee avant une portee plus large.',
        bestFor: 'Appels rapides, deuxieme avis, investigation urgente',
        bullets: [
          'Taux de reference',
          'Aucune portee minimale',
          'Ideal avant une banque plus large',
        ],
        cta: 'Reserver une consultation',
      },
    },
  },
  {
    id: 'bank-5',
    handle: 'shopify-5-hour-bank',
    mode: 'one-time',
    basePriceCad: 875,
    hours: 5,
    highlight: true,
    order: 20,
    copy: {
      en: {
        label: 'Bank',
        name: '5-hour bank',
        cadence: 'one-time start',
        summary:
          'A clean entry point for audits, urgent fixes, and tightly scoped Shopify improvements.',
        bestFor: 'Audits, theme fixes, small PDP or cart improvements',
        bullets: [
          '5 senior development hours',
          'Clear scope before work starts',
          'Good for fast cleanup',
        ],
        cta: 'Book a 5-hour fit call',
      },
      fr: {
        label: "Banque d'heures",
        name: 'Banque 5 h',
        cadence: 'depart ponctuel',
        summary:
          'Un point de depart clair pour audits, correctifs urgents et ameliorations Shopify ciblees.',
        bestFor:
          'Audits, correctifs theme, petites ameliorations PDP ou panier',
        bullets: [
          '5 heures de developpement senior',
          'Portee claire avant le travail',
          'Bon pour un nettoyage rapide',
        ],
        cta: 'Reserver un appel 5 h',
      },
    },
  },
  {
    id: 'bank-scoped',
    handle: 'shopify-scoped-bank',
    mode: 'one-time',
    basePriceCad: null,
    hours: null,
    order: 30,
    copy: {
      en: {
        label: 'Scoped',
        name: 'Scoped bank',
        cadence: 'priced by scope',
        summary:
          'For work that needs more than a starter bank but should stay lean and bounded.',
        bestFor: 'Theme cleanup, app stack work, product systems',
        bullets: [
          'Usually 10-30 hours',
          'Defined after store review',
          'Keeps scope smaller than a full rebuild',
        ],
        cta: 'Scope a bank',
      },
      fr: {
        label: 'Cadre',
        name: 'Banque cadree',
        cadence: 'tarif selon portee',
        summary:
          "Pour le travail qui depasse une banque de depart sans devenir un gros projet d'agence.",
        bestFor: "Nettoyage theme, stack d'apps, systemes produits",
        bullets: [
          'Souvent 10-30 heures',
          'Definie apres revue boutique',
          'Portee plus legere qu’une refonte complete',
        ],
        cta: 'Cadrer une banque',
      },
    },
  },
  {
    id: 'bank-40',
    handle: 'shopify-40-hour-bank',
    mode: 'one-time',
    basePriceCad: 5000,
    hours: 40,
    popular: true,
    order: 40,
    copy: {
      en: {
        label: 'Bank',
        name: '40-hour bank',
        cadence: 'one-time sprint',
        summary:
          'A deeper block for launch work, theme rebuilds, systems cleanup, and larger Shopify moves.',
        bestFor: 'Rebuilds, launches, integrations, performance cleanup',
        bullets: [
          '40 senior development hours',
          '37.5% lower effective rate',
          'Best value for concentrated work',
        ],
        cta: 'Plan a 40-hour sprint',
      },
      fr: {
        label: "Banque d'heures",
        name: 'Banque 40 h',
        cadence: 'sprint ponctuel',
        summary:
          'Un bloc plus profond pour lancement, refonte theme, nettoyage systeme et projets Shopify plus larges.',
        bestFor: 'Refontes, lancements, integrations, performance',
        bullets: [
          '40 heures de developpement senior',
          'Taux effectif 37,5 % plus bas',
          'Meilleure valeur pour travail concentre',
        ],
        cta: 'Planifier un sprint 40 h',
      },
    },
  },
  {
    id: 'retainer-operator',
    handle: 'shopify-operator-retainer',
    mode: 'recurring',
    basePriceCad: 875,
    hours: 5,
    monthlyHours: 5,
    order: 50,
    copy: {
      en: {
        label: 'Retainer',
        name: 'Operator',
        cadence: 'per month',
        summary:
          'Monthly technical care for stores that need steady support without restarting discovery.',
        bestFor: 'Maintenance, small improvements, priority support',
        bullets: [
          '5 hours each month',
          '$175/hr effective rate',
          'Up to 0.5h rollover',
        ],
        cta: 'Start monthly support',
      },
      fr: {
        label: 'Retainer',
        name: 'Operator',
        cadence: 'par mois',
        summary:
          'Support technique mensuel pour boutiques qui ont besoin de suivi sans relancer la decouverte.',
        bestFor: 'Maintenance, petites ameliorations, support prioritaire',
        bullets: [
          '5 heures chaque mois',
          'Taux effectif de 175 $/h',
          'Report maximal de 0,5 h',
        ],
        cta: 'Demarrer le support mensuel',
      },
    },
  },
  {
    id: 'retainer-growth',
    handle: 'shopify-growth-retainer',
    mode: 'recurring',
    basePriceCad: 2250,
    hours: 15,
    monthlyHours: 15,
    popular: true,
    highlight: true,
    order: 60,
    copy: {
      en: {
        label: 'Retainer',
        name: 'Growth',
        cadence: 'per month',
        summary:
          'A stronger support rhythm for campaigns, app integrations, feature work, and steady iteration.',
        bestFor: 'Campaigns, features, integrations, steady iteration',
        bullets: [
          '15 hours each month',
          '$150/hr effective rate',
          'Up to 1.5h rollover',
        ],
        cta: 'Book a retainer fit call',
      },
      fr: {
        label: 'Retainer',
        name: 'Growth',
        cadence: 'par mois',
        summary:
          "Un rythme plus fort pour campagnes, integrations d'apps, features et iteration stable.",
        bestFor: 'Campagnes, features, integrations, iteration continue',
        bullets: [
          '15 heures chaque mois',
          'Taux effectif de 150 $/h',
          'Report maximal de 1,5 h',
        ],
        cta: 'Reserver un appel retainer',
      },
    },
  },
];

const pricingCopy = {
  en: {
    title: 'Shopify products, market-aware pricing.',
    intro:
      'Prices are read from Shopify products when the service products are published. CAD fallback prices keep the page stable in development.',
    currencyLabel: 'Currency',
    modeLabel: 'Plan type',
    economyLabel: 'Economy',
    effectiveRateLabel: 'Effective rate',
    bestForLabel: 'Best for',
    sourceShopify: 'Shopify market price',
    sourceFallback: 'CAD fallback converted',
    rollover: 'Monthly retainers include a 10% maximum rollover.',
    marketNote:
      'Use Shopify Markets for final CAD, USD, EUR, and GBP pricing. Fallback conversions are only used when a product price is not available.',
    noPrice: 'Priced after review',
  },
  fr: {
    title: 'Produits Shopify, tarifs par marche.',
    intro:
      'Les prix proviennent des produits Shopify quand les services sont publies. Les prix CAD de secours gardent la page stable en developpement.',
    currencyLabel: 'Devise',
    modeLabel: 'Type',
    economyLabel: 'Economie',
    effectiveRateLabel: 'Taux effectif',
    bestForLabel: 'Ideal pour',
    sourceShopify: 'Prix Shopify Markets',
    sourceFallback: 'Conversion secours CAD',
    rollover: 'Les retainers mensuels incluent un report maximal de 10 %.',
    marketNote:
      'Utilisez Shopify Markets pour les prix finaux CAD, USD, EUR et GBP. Les conversions de secours servent seulement quand un prix produit manque.',
    noPrice: 'Tarif apres revue',
  },
} as const;

const modeTabs = {
  en: [
    {
      mode: 'one-time' as const,
      label: 'One-time',
      note: 'Banks and scoped starts',
    },
    {mode: 'recurring' as const, label: 'Recurring', note: 'Monthly retainers'},
  ],
  fr: [
    {mode: 'one-time' as const, label: 'Ponctuel', note: "Banques d'heures"},
    {mode: 'recurring' as const, label: 'Mensuel', note: 'Retainers'},
  ],
};

const PRICING_PRODUCT_QUERY = `#graphql
  query PricingProduct($handle: String!, $country: CountryCode)
  @inContext(country: $country) {
    product(handle: $handle) {
      id
      handle
      title
      onlineStoreUrl
      selectedOrFirstAvailableVariant {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

export function normalizePricingCurrency(
  value: string | null | undefined,
): PricingCurrencyCode {
  const normalized = value?.toUpperCase();
  if (normalized === 'USD' || normalized === 'EUR' || normalized === 'GBP') {
    return normalized;
  }
  return 'CAD';
}

export async function getPricingProducts({
  storefront,
  currency,
  language,
}: {
  storefront?: Storefront;
  currency: PricingCurrencyCode;
  language: LanguageCode;
}): Promise<PricingProductsPayload> {
  const market = getCurrencyMarket(currency);
  const shopifyPrices = await getShopifyMarketPrices({
    storefront,
    country: market.country,
  });
  const hourlyProduct = getResolvedMoney(
    pricingDefinitions[0],
    shopifyPrices,
    currency,
  );
  const fallbackHourly = convertCad(200, currency);
  const baselineHourly = hourlyProduct?.amount ?? fallbackHourly.amount;
  const products = pricingDefinitions
    .sort((a, b) => a.order - b.order)
    .map((definition) =>
      buildPricingProductCard({
        definition,
        currency,
        language,
        shopifyPrices,
        baselineHourly,
      }),
    );

  return {
    currency,
    language,
    modeTabs: modeTabs[language],
    currencyOptions: pricingCurrencyOptions.map(({code, label, country}) => ({
      code,
      label,
      country,
    })),
    products,
    marketSource: products.some((product) => product.source === 'shopify')
      ? 'shopify'
      : 'fallback',
    copy: pricingCopy[language],
  };
}

export function getPricingProductSummaries(language: LanguageCode) {
  return pricingDefinitions.map((definition) => {
    const copy = definition.copy[language];
    const defaultCurrency = 'CAD';
    const money =
      definition.basePriceCad == null
        ? null
        : convertCad(definition.basePriceCad, defaultCurrency);

    return {
      id: definition.id,
      handle: definition.handle,
      mode: definition.mode,
      name: copy.name,
      price: money
        ? formatCurrency(money, language)
        : pricingCopy[language].noPrice,
      cadence: copy.cadence,
      hours: definition.hours,
      bestFor: copy.bestFor,
    };
  });
}

function buildPricingProductCard({
  definition,
  currency,
  language,
  shopifyPrices,
  baselineHourly,
}: {
  definition: PricingDefinition;
  currency: PricingCurrencyCode;
  language: LanguageCode;
  shopifyPrices: Map<string, ShopifyPricingProduct['product']>;
  baselineHourly: number;
}): PricingProductCard {
  const copy = definition.copy[language];
  const shopifyProduct = shopifyPrices.get(definition.handle);
  const price = getResolvedMoney(definition, shopifyPrices, currency);
  const source = shopifyProduct?.selectedOrFirstAvailableVariant?.price
    ? 'shopify'
    : 'fallback';
  const effectiveRate =
    price && definition.hours
      ? {amount: price.amount / definition.hours, currencyCode: currency}
      : null;
  const savings =
    price && definition.hours
      ? getSavings({
          price,
          hours: definition.hours,
          baselineHourly,
        })
      : null;

  return {
    id: definition.id,
    handle: definition.handle,
    mode: definition.mode,
    label: copy.label,
    name: copy.name,
    cadence: copy.cadence,
    summary: copy.summary,
    bestFor: copy.bestFor,
    bullets: copy.bullets,
    cta: copy.cta,
    popular: Boolean(definition.popular),
    highlight: Boolean(definition.highlight),
    price,
    formattedPrice: price
      ? formatCurrency(price, language)
      : pricingCopy[language].noPrice,
    formattedEffectiveRate: effectiveRate
      ? `${formatCurrency(effectiveRate, language)}/h`
      : null,
    formattedSavings: savings?.amount
      ? formatCurrency(savings, language)
      : null,
    savingsPercent: savings?.percent ?? null,
    source,
    productUrl: shopifyProduct?.onlineStoreUrl ?? null,
  };
}

function getSavings({
  price,
  hours,
  baselineHourly,
}: {
  price: Money;
  hours: number;
  baselineHourly: number;
}) {
  const baseline = baselineHourly * hours;
  const amount = Math.max(0, baseline - price.amount);

  if (amount <= 0) {
    return null;
  }

  return {
    amount,
    currencyCode: price.currencyCode,
    percent: Math.round((amount / baseline) * 100),
  };
}

function getResolvedMoney(
  definition: PricingDefinition,
  shopifyPrices: Map<string, ShopifyPricingProduct['product']>,
  currency: PricingCurrencyCode,
): Money | null {
  const shopifyMoney = shopifyPrices.get(definition.handle)
    ?.selectedOrFirstAvailableVariant?.price;

  if (isPricingCurrencyCode(shopifyMoney?.currencyCode)) {
    return {
      amount: Number(shopifyMoney.amount),
      currencyCode: shopifyMoney.currencyCode,
    };
  }

  if (definition.basePriceCad == null) {
    return null;
  }

  return convertCad(definition.basePriceCad, currency);
}

async function getShopifyMarketPrices({
  storefront,
  country,
}: {
  storefront?: Storefront;
  country: PricingCountryCode;
}) {
  const prices = new Map<string, ShopifyPricingProduct['product']>();

  if (!storefront) return prices;

  await Promise.all(
    pricingDefinitions.map(async (definition) => {
      try {
        const data = await storefront.query<ShopifyPricingProduct>(
          PRICING_PRODUCT_QUERY,
          {
            cache: storefront.CacheShort(),
            variables: {
              country,
              handle: definition.handle,
            },
          },
        );

        if (data.product?.selectedOrFirstAvailableVariant?.price) {
          prices.set(definition.handle, data.product);
        }
      } catch (error) {
        console.error(
          `Unable to load Shopify market price for ${definition.handle}`,
          error,
        );
      }
    }),
  );

  return prices;
}

function convertCad(amount: number, currencyCode: PricingCurrencyCode): Money {
  const market = getCurrencyMarket(currencyCode);
  return {
    amount: roundCurrency(amount * market.rateFromCad),
    currencyCode,
  };
}

function formatCurrency(money: Money, language: LanguageCode) {
  const market = getCurrencyMarket(money.currencyCode);
  return new Intl.NumberFormat(language === 'fr' ? 'fr-CA' : market.locale, {
    style: 'currency',
    currency: money.currencyCode,
    maximumFractionDigits: money.amount % 1 === 0 ? 0 : 2,
  }).format(money.amount);
}

function getCurrencyMarket(currencyCode: PricingCurrencyCode) {
  return pricingCurrencyOptions.find((option) => option.code === currencyCode)!;
}

function isPricingCurrencyCode(
  value: string | null | undefined,
): value is PricingCurrencyCode {
  return (
    value === 'CAD' || value === 'USD' || value === 'EUR' || value === 'GBP'
  );
}

function roundCurrency(amount: number) {
  return Math.round(amount);
}
