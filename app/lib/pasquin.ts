export const siteConfig = {
  name: 'Philippe Pasquin',
  logo: '/ pasquin',
  shortName: 'Pasquin',
  descriptor: 'Montreal-based Shopify developer',
  defaultSiteUrl: 'https://philippepasquin.com',
  defaultContactEmail: 'philippe@philippepasquin.com',
  defaultCalOrigin: 'https://cal.com',
  location: {
    city: 'Montreal',
    region: 'Quebec',
    country: 'Canada',
  },
};

export function getPublicConfig(env?: Env) {
  return {
    siteUrl: env?.PUBLIC_SITE_URL || siteConfig.defaultSiteUrl,
    contactEmail: env?.PUBLIC_CONTACT_EMAIL || siteConfig.defaultContactEmail,
    calOrigin: env?.PUBLIC_CAL_ORIGIN || siteConfig.defaultCalOrigin,
    calLink: env?.PUBLIC_CAL_LINK || '',
  };
}

export const primaryNavItems = [
  {label: 'What We Do', href: '/'},
  {label: 'Our Work', href: '/work'},
  {label: 'Pricing', href: '/pricing'},
  {label: 'About', href: '/about'},
];

export const moreNavItems = [
  {label: 'Testimonials', href: '/testimonials'},
];

export const contactNavItem = {label: 'Contact', href: '/contact'};

export const navItems = [...primaryNavItems, ...moreNavItems, contactNavItem];

export const services = [
  {
    label: 'Products',
    title: 'Storefront systems',
    text: 'Product pages, collection flows, cart details, and merchandising logic for stores that need to feel easier to buy from.',
    bullets: ['PDP systems', 'Collections', 'Cart UX', 'Metafields'],
  },
  {
    label: 'Websites',
    title: 'Theme cleanup',
    text: 'Careful Shopify theme work for slow templates, brittle sections, broken launch workflows, and code that has become hard to trust.',
    bullets: ['Sections', 'Templates', 'Speed', 'QA'],
  },
  {
    label: 'Brands',
    title: 'App stack and operations',
    text: 'Practical connections across apps, analytics, fulfillment, automations, and the admin work that keeps coming back.',
    bullets: ['Apps', 'Automation', 'Analytics', 'Docs'],
  },
];

export const capabilities = [
  'Shopify theme development',
  'Product page systems',
  'Collection merchandising',
  'Cart and checkout readiness',
  'App integrations',
  'Performance cleanup',
  'Ecommerce automation',
  'Monthly support',
];

export const workItems = [
  {
    slug: 'storefront-systems',
    title: 'Storefront systems',
    eyebrow: 'Theme development',
    text: 'Build cleaner product, collection, and cart experiences around how the merchant actually sells.',
    image: '/pasquin-work/storefront-systems.jpg',
    tags: ['theme', 'conversion'],
  },
  {
    slug: 'theme-cleanup',
    title: 'Theme cleanup',
    eyebrow: 'Maintenance',
    text: 'Untangle brittle sections, remove hidden friction, and make everyday storefront changes safer.',
    image: '/pasquin-work/theme-cleanup.png',
    tags: ['theme', 'support'],
  },
  {
    slug: 'app-stack',
    title: 'App stack fixes',
    eyebrow: 'Integrations',
    text: 'Connect or clean up Shopify apps, analytics, fulfillment, email, subscriptions, and operational tooling.',
    image: '/pasquin-work/app-stack.jpg',
    tags: ['apps', 'automation'],
  },
  {
    slug: 'operations',
    title: 'Operations automation',
    eyebrow: 'Admin workflows',
    text: 'Reduce repeat admin work around products, orders, reporting, and launch preparation.',
    image: '/pasquin-work/operations.jpg',
    tags: ['automation', 'support'],
  },
  {
    slug: 'conversion',
    title: 'Conversion cleanup',
    eyebrow: 'Performance',
    text: 'Improve speed, message hierarchy, cart confidence, discount clarity, and launch readiness.',
    image: '/pasquin-work/conversion.jpg',
    tags: ['conversion', 'performance'],
  },
  {
    slug: 'support',
    title: 'Monthly support',
    eyebrow: 'Retainers',
    text: 'Keep technical momentum without hiring in-house or restarting discovery every time something changes.',
    image: '/pasquin-work/support.jpeg',
    tags: ['support', 'retainer'],
  },
];

export const logoGridItems = [
  'PDPs',
  'Collections',
  'Cart',
  'Klaviyo',
  'Recharge',
  'Gorgias',
  'Analytics',
  'Automation',
];

export const bankPackages = [
  {
    id: 'bank-5',
    name: '5-hour bank',
    price: '$1,000',
    detail: '$200/hr effective rate',
    hours: '5 hours',
    bestFor: 'Audits, urgent fixes, scoped improvements',
    cta: 'Book a 5-hour fit call',
  },
  {
    id: 'bank-scope',
    name: 'Scoped bank',
    price: 'By scope',
    detail: 'Between 5 and 40 hours',
    hours: '10-30 hours',
    bestFor: 'Storefront work, theme cleanup, integrations',
    cta: 'Scope a bank of hours',
  },
  {
    id: 'bank-40',
    name: '40-hour bank',
    price: '$5,000',
    detail: '$125/hr effective rate',
    hours: '40 hours',
    bestFor: 'Rebuilds, launch work, systems cleanup',
    cta: 'Book a 40-hour planning call',
  },
];

export const retainerPackages = [
  {
    id: 'retainer-5',
    name: 'Operator',
    price: '$875/mo',
    detail: '5 hours/month at $175/hr',
    hours: '5 hours/month',
    rollover: 'Up to 0.5h rollover',
    bestFor: 'Maintenance, small improvements, priority support',
  },
  {
    id: 'retainer-15',
    name: 'Growth',
    price: '$2,250/mo',
    detail: '15 hours/month at $150/hr',
    hours: '15 hours/month',
    rollover: 'Up to 1.5h rollover',
    bestFor: 'Campaigns, feature work, integrations, steady iteration',
  },
];

export const timeframeRows = [
  ['Theme audit', '2-5 hours'],
  ['PDP or collection system', '10-20 hours'],
  ['Cart or app-stack cleanup', '10-30 hours'],
  ['Launch support sprint', '20-40 hours'],
  ['Monthly support', '5 or 15 hours/month'],
];

export const processSteps = [
  {
    number: '01',
    title: 'Clarify',
    text: 'Review the store, theme, app stack, business goals, constraints, and the real source of friction.',
  },
  {
    number: '02',
    title: 'Scope',
    text: 'Choose the right bank or retainer, define what matters, and avoid turning every fix into a large project.',
  },
  {
    number: '03',
    title: 'Ship',
    text: 'Implement clean Shopify work with testing, communication, and handoff notes that make future changes easier.',
  },
];

export const feedbackNotes = [
  {
    quote:
      'We need someone who can understand the store quickly and start fixing the right things.',
    author: 'Common merchant need',
    role: 'Before a bank of hours',
  },
  {
    quote:
      'The theme works, but every campaign adds another workaround. We need it simpler.',
    author: 'Common merchant need',
    role: 'Before theme cleanup',
  },
  {
    quote:
      'We do not need a full agency process. We need a senior Shopify developer who can move.',
    author: 'Common merchant need',
    role: 'Before monthly support',
  },
  {
    quote:
      'The apps, analytics, and cart all touch each other. We need someone who can trace the whole flow.',
    author: 'Common merchant need',
    role: 'Before integration work',
  },
];

export const merchantWins = [
  'PDP variant logic made clearer',
  'Cart drawer friction removed',
  'Launch checklist documented',
  'App overlap reduced',
  'Theme sections cleaned up',
  'Collection campaign modules shipped',
  'Analytics events traced',
  'Monthly support backlog stabilized',
];

export const faqs = [
  {
    question: 'What does Philippe Pasquin do?',
    answer:
      'Philippe Pasquin is a Montreal-based Shopify developer focused on storefront improvements, theme cleanup, app integrations, automation, performance, and ongoing technical support for merchants.',
  },
  {
    question: 'What kind of merchant is this for?',
    answer:
      'The service is for Shopify merchants who need a practical senior developer for scoped improvements, recurring technical support, launch work, or cleanup that should not require a full agency process.',
  },
  {
    question: 'How do bank-of-hours packages work?',
    answer:
      'Bank-of-hours engagements start at 5 hours for $1,000 and can scale up to 40 hours for $5,000. They are best for scoped Shopify development, urgent fixes, theme cleanup, integrations, and launch work.',
  },
  {
    question: 'How do monthly retainers work?',
    answer:
      'Retainers are available at 5 hours per month at $175 per hour or 15 hours per month at $150 per hour. Unused time can roll over up to a 10% maximum, which equals 0.5 hours on the 5-hour plan or 1.5 hours on the 15-hour plan.',
  },
  {
    question: 'Is the meeting selector open source?',
    answer:
      'The site uses a custom meeting selector that can connect to Cal.com, an open-source scheduling platform that can be hosted by Cal.com or self-hosted for more control over data, workflow, and appearance.',
  },
];

export function buildStructuredData({
  siteUrl,
  contactEmail,
}: {
  siteUrl: string;
  contactEmail: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: `${siteConfig.name} Shopify Development`,
        description:
          'Montreal-based Shopify development for storefront improvements, theme work, integrations, automation, performance, and ongoing support.',
        publisher: {'@id': `${siteUrl}/#person`},
        inLanguage: 'en-CA',
      },
      {
        '@type': ['Person', 'ProfessionalService'],
        '@id': `${siteUrl}/#person`,
        name: siteConfig.name,
        alternateName: siteConfig.logo,
        url: siteUrl,
        email: contactEmail,
        jobTitle: 'Shopify Developer',
        description:
          'Philippe Pasquin is a Montreal-based Shopify developer helping merchants improve storefronts, themes, integrations, operations, and maintainability.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        areaServed: [
          {'@type': 'City', name: 'Montreal'},
          {'@type': 'Country', name: 'Canada'},
          {'@type': 'Place', name: 'Remote Shopify merchants'},
        ],
        knowsAbout: [
          'Shopify development',
          'Shopify theme development',
          'Shopify storefront development',
          'Shopify app integrations',
          'Ecommerce automation',
          'Storefront performance',
          'Shopify operations',
        ],
        makesOffer: {'@id': `${siteUrl}/#offers`},
      },
      {
        '@type': 'OfferCatalog',
        '@id': `${siteUrl}/#offers`,
        name: 'Shopify development packages',
        itemListElement: [
          ...bankPackages.map((offer) => ({
            '@type': 'Offer',
            name: offer.name,
            description: `${offer.hours}. ${offer.bestFor}. ${offer.detail}.`,
            priceCurrency: 'CAD',
            price: offer.price.replace(/[^0-9]/g, '') || undefined,
            category: 'Bank of hours',
          })),
          ...retainerPackages.map((offer) => ({
            '@type': 'Offer',
            name: offer.name,
            description: `${offer.hours}. ${offer.bestFor}. ${offer.detail}. ${offer.rollover}.`,
            priceCurrency: 'CAD',
            price: offer.price.replace(/[^0-9]/g, '') || undefined,
            category: 'Monthly retainer',
          })),
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
