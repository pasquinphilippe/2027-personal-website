import type {LanguageCode} from '~/lib/i18n';

export const siteConfig = {
  name: 'Philippe Pasquin',
  logo: '/ pasquin',
  shortName: 'Pasquin',
  descriptor: 'Montreal-based Shopify developer',
  defaultSiteUrl: 'https://philippepasquin.com',
  defaultContactEmail: 'hello@pasquin.ca',
  defaultSupportEmail: 'support@pasquin.ca',
  defaultCalOrigin: 'https://cal.com',
  defaultCalLink: 'philippepasquin/shopify-strategy-call',
  location: {
    city: 'Montreal',
    region: 'Quebec',
    country: 'Canada',
    geo: {
      latitude: 45.5019,
      longitude: -73.5674,
    },
  },
  socialProfiles: [
    'https://www.linkedin.com/in/philippepasquin/',
    'https://github.com/philippepasquin',
  ],
  logoImagePath: '/og-image.svg',
  ogImagePath: '/og-image.svg',
  openingHours: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  priceRange: '$$',
};

export function getPublicConfig(env?: Env) {
  return {
    siteUrl: env?.PUBLIC_SITE_URL || siteConfig.defaultSiteUrl,
    contactEmail: env?.PUBLIC_CONTACT_EMAIL || siteConfig.defaultContactEmail,
    supportEmail: env?.PUBLIC_SUPPORT_EMAIL || siteConfig.defaultSupportEmail,
    calOrigin: env?.PUBLIC_CAL_ORIGIN || siteConfig.defaultCalOrigin,
    calLink: env?.PUBLIC_CAL_LINK || siteConfig.defaultCalLink,
  };
}

export const primaryNavItems = [
  {label: 'What We Do', href: '/services'},
  {label: 'Our Work', href: '/work'},
  {label: 'Pricing', href: '/pricing'},
  {label: 'About', href: '/about'},
];

export const moreNavItems = [{label: 'Testimonials', href: '/testimonials'}];

export const contactNavItem = {label: 'Contact', href: '/contact'};

export const navItems = [...primaryNavItems, ...moreNavItems, contactNavItem];

const primaryNavItemsFr = [
  {label: 'Services', href: '/services'},
  {label: 'Projets', href: '/work'},
  {label: 'Tarifs', href: '/pricing'},
  {label: 'A propos', href: '/about'},
];

const moreNavItemsFr = [{label: 'Temoignages', href: '/testimonials'}];

const contactNavItemFr = {label: 'Contact', href: '/contact'};

const navItemsFr = [...primaryNavItemsFr, ...moreNavItemsFr, contactNavItemFr];

export const siteText = {
  en: {
    nav: {
      more: 'More',
      contact: 'Contact',
      login: 'Login',
      client: 'Client',
      menu: 'Menu',
      services: 'Services',
      whatWeDo: 'What We Do',
      loginAria: 'Client login',
      clientAria: 'Client account',
    },
    home: {
      proof: 'Bank of hours from $1,000 / Montreal Shopify developer',
      title: 'Shopify development that keeps your store moving.',
      cta: 'Get In Touch',
      featuredWorkAria: 'Featured Shopify work',
      serviceHeading:
        'Shopify support across the work that slows merchants down',
      logoHeading: 'I work where Shopify stores usually get messy',
    },
    pricing: {
      byHour: 'By The Hour',
      perHour: 'per hour',
      hourlyNote:
        'This option is typically reserved for ad-hoc consulting and quick diagnostics.',
      bankLabel: 'Bank',
      retainerLabel: 'Retainer',
      oneTimeScoped: 'one-time, scoped start',
      oneTimeSprint: 'one-time sprint',
      perMonth: 'per month',
      popular: 'Most Popular',
      currencyNote: 'Retainers include a 10% maximum rollover.',
      typicalScope: 'Typical scope',
    },
    feedback: {
      workingSignal: 'Working signal',
      merchantWins: 'Merchant Wins',
    },
    cta: {
      title: "Let's make the store easier to run.",
      button: 'Get In Touch',
    },
    footer: {
      services: 'Services',
      shopifyWork: 'Shopify work',
      note: 'Personal Shopify development from Montreal for merchants who need lean execution, cleaner storefronts, and steady technical support.',
      cta: 'Get in touch',
      line1: 'Montreal, Quebec / Shopify development',
      line2: 'Bank of hours + monthly retainers',
    },
    pages: {
      homeTitle: 'Philippe Pasquin | Montreal Shopify Developer',
      homeDescription:
        'Personal Shopify development for storefront systems, theme cleanup, app integrations, automation, performance, bank-of-hours work, and retainers.',
      homeKeywords:
        'Shopify developer Montreal, Shopify consultant Montreal, Shopify theme developer, Shopify storefront developer, Shopify app integrations, Shopify performance optimization, Shopify bank of hours, Shopify retainer',
      workTitle: 'Client Work',
      workEyebrow: 'Selected Shopify projects',
      pricingTitle: 'Pricing',
      pricingEyebrow: 'Clear hours, clean scope',
      pricingIntro:
        'Choose a small bank for focused fixes, a larger bank for launch work, or a monthly retainer when the store needs steady technical care.',
      aboutTitle: "Hey there. I'm Philippe.",
      aboutEyebrow: 'About',
      aboutIntro:
        'A Montreal-based Shopify developer helping merchants move faster without turning every storefront change into a heavy agency project.',
      testimonialsTitle: 'Testimonials',
      testimonialsEyebrow: 'Shopify Partner reviews',
      testimonialsIntro:
        'Public reviews from the Shopify Partner Directory, paired with the kind of Shopify work each merchant needed.',
      contactTitle: "Let's make the store easier to run.",
      contactEyebrow: 'Contact',
      contactIntro:
        'Pick the closest path, send a little context, and book a focused conversation about the Shopify work.',
      emailLead: 'or email directly at',
    },
    about: {
      supportRhythm: 'Support rhythm',
      retainers: 'Retainers',
      date: 'June 6, 2026',
      paragraphs: [
        'I work close to the practical side of ecommerce: product pages, cart behavior, theme code, app stacks, launch pressure, analytics, and the small operational details that make a store feel hard to change.',
        'The goal is simple. Make the store clearer, easier to maintain, and easier for the merchant to operate after the work ships.',
        'In short, I help Shopify teams keep moving when the technical work is specific, overdue, or too important to leave vague.',
      ],
      profileTitle: 'One Shopify developer, directly accountable to the work.',
      profileText:
        'Bank-of-hours and retainer work are designed for merchants who want clear scope, fast feedback loops, and code that does not create a new maintenance problem.',
    },
    booking: {
      heading: 'Booking',
      title: 'Choose the right first conversation.',
      intro:
        'Pick the engagement model and the type of Shopify work. The selected context is passed into the booking or email handoff.',
      tabs: {
        bank: 'Project bank',
        retainer: 'Monthly support',
        audit: 'Fit call',
      },
      auditName: 'First fit call',
      auditPrice: 'Free',
      auditDetail: 'Clarify the right scope before choosing hours',
      auditHours: '30 minutes',
      auditBestFor: 'First conversation, constraints, priorities, fit',
      focusHeading: 'Project focus',
      selectedPath: 'Selected path',
      investment: 'Investment',
      bestFor: 'Best for',
      scheduler: 'Open scheduler',
      emailBrief: 'Email project brief',
      compare: 'Compare pricing',
      calNote:
        'Add PUBLIC_CAL_LINK to connect this flow to your Cal.com booking page.',
    },
    clientLogin: {
      proof: 'Client portal / Shopify support workspace',
      title: 'Client access for active Shopify work.',
      intro:
        'Portal access is issued after the scope is confirmed, so priorities, files, notes, and decisions stay organized around the work.',
      requestAccess: 'Request Access',
      bookMeeting: 'Book a Meeting',
      statusHeading: 'Access Status',
      statusTitle: 'Invitation required.',
      statusText:
        'If you already have an active workspace, use the access link sent with your onboarding details.',
      subject: 'Client portal access',
      pills: ['Private by default', 'Scope-first', 'Merchant-focused'],
    },
  },
  fr: {
    nav: {
      more: 'Plus',
      contact: 'Contact',
      login: 'Connexion',
      client: 'Client',
      menu: 'Menu',
      services: 'Services',
      whatWeDo: 'Services',
      loginAria: 'Connexion client',
      clientAria: 'Compte client',
    },
    home: {
      proof:
        "Banques d'heures a partir de 1 000 $ / Developpeur Shopify a Montreal",
      title: 'Developpement Shopify pour garder votre boutique en mouvement.',
      cta: 'Prendre rendez-vous',
      featuredWorkAria: 'Projets Shopify selectionnes',
      serviceHeading:
        'Du support Shopify pour le travail qui ralentit les marchands',
      logoHeading:
        'J’interviens la ou les boutiques Shopify deviennent complexes',
    },
    pricing: {
      byHour: "A l'heure",
      perHour: 'par heure',
      hourlyNote:
        'Cette option sert surtout aux diagnostics rapides et au conseil ponctuel.',
      bankLabel: "Banque d'heures",
      retainerLabel: 'Retainer',
      oneTimeScoped: 'depart ponctuel et cadre',
      oneTimeSprint: 'sprint ponctuel',
      perMonth: 'par mois',
      popular: 'Le plus populaire',
      currencyNote: 'Les retainers incluent un report maximal de 10 %.',
      typicalScope: 'Portee typique',
    },
    feedback: {
      workingSignal: 'Signal terrain',
      merchantWins: 'Gains marchands',
    },
    cta: {
      title: 'Rendons la boutique plus facile a operer.',
      button: 'Prendre contact',
    },
    footer: {
      services: 'Services',
      shopifyWork: 'Travail Shopify',
      note: 'Developpement Shopify personnel depuis Montreal pour les marchands qui ont besoin d’execution lean, de boutiques plus claires et de support technique stable.',
      cta: 'Prendre contact',
      line1: 'Montreal, Quebec / Developpement Shopify',
      line2: "Banques d'heures + retainers mensuels",
    },
    pages: {
      homeTitle: 'Philippe Pasquin | Developpeur Shopify a Montreal',
      homeDescription:
        "Developpement Shopify personnel pour systemes storefront, nettoyage de theme, integrations d'apps, automatisation, performance, banques d'heures et retainers.",
      homeKeywords:
        'developpeur Shopify Montreal, consultant Shopify Montreal, developpeur theme Shopify, developpement storefront Shopify, integrations Shopify, optimisation performance Shopify, banque d heures Shopify, retainer Shopify',
      workTitle: 'Projets clients',
      workEyebrow: 'Projets Shopify selectionnes',
      pricingTitle: 'Tarifs',
      pricingEyebrow: 'Heures claires, portee nette',
      pricingIntro:
        "Choisissez une petite banque pour des correctifs cibles, une banque plus grande pour un lancement, ou un retainer mensuel quand la boutique a besoin d'un suivi technique constant.",
      aboutTitle: 'Bonjour. Je suis Philippe.',
      aboutEyebrow: 'A propos',
      aboutIntro:
        'Developpeur Shopify base a Montreal, j’aide les marchands a avancer plus vite sans transformer chaque changement storefront en gros projet d’agence.',
      testimonialsTitle: 'Temoignages',
      testimonialsEyebrow: 'Avis Shopify Partner',
      testimonialsIntro:
        'Avis publics du Shopify Partner Directory, relies au type de travail Shopify dont chaque marchand avait besoin.',
      contactTitle: 'Rendons la boutique plus facile a operer.',
      contactEyebrow: 'Contact',
      contactIntro:
        'Choisissez le chemin le plus proche, envoyez un peu de contexte et reservez une conversation ciblee sur le travail Shopify.',
      emailLead: 'ou ecrivez directement a',
    },
    about: {
      supportRhythm: 'Rythme de support',
      retainers: 'Retainers',
      date: '6 juin 2026',
      paragraphs: [
        "Je travaille pres du cote pratique du ecommerce : pages produits, comportement du panier, code de theme, stack d'apps, pression de lancement, analytics et petits details operationnels qui rendent une boutique difficile a changer.",
        'Le but est simple. Rendre la boutique plus claire, plus facile a maintenir et plus facile a operer apres la livraison.',
        'En bref, j’aide les equipes Shopify a continuer d’avancer quand le travail technique est specifique, en retard ou trop important pour rester vague.',
      ],
      profileTitle:
        'Un developpeur Shopify, directement responsable du travail.',
      profileText:
        "Les banques d'heures et les retainers sont concus pour les marchands qui veulent une portee claire, des boucles de feedback rapides et du code qui ne cree pas un nouveau probleme de maintenance.",
    },
    booking: {
      heading: 'Rendez-vous',
      title: 'Choisissez la bonne premiere conversation.',
      intro:
        "Choisissez le modele d'engagement et le type de travail Shopify. Le contexte selectionne est transmis au rendez-vous ou au courriel.",
      tabs: {
        bank: "Banque d'heures",
        retainer: 'Support mensuel',
        audit: 'Appel de fit',
      },
      auditName: 'Premier appel de fit',
      auditPrice: 'Gratuit',
      auditDetail: 'Clarifier la bonne portee avant de choisir des heures',
      auditHours: '30 minutes',
      auditBestFor: 'Premiere conversation, contraintes, priorites, fit',
      focusHeading: 'Focus du projet',
      selectedPath: 'Chemin choisi',
      investment: 'Investissement',
      bestFor: 'Ideal pour',
      scheduler: 'Ouvrir le calendrier',
      emailBrief: 'Envoyer le brief',
      compare: 'Comparer les tarifs',
      calNote:
        'Ajoutez PUBLIC_CAL_LINK pour connecter ce flux a votre page Cal.com.',
    },
    clientLogin: {
      proof: 'Portail client / Espace de support Shopify',
      title: 'Acces client pour le travail Shopify actif.',
      intro:
        "L'acces au portail est emis apres confirmation de la portee, afin que priorites, fichiers, notes et decisions restent organises autour du travail.",
      requestAccess: "Demander l'acces",
      bookMeeting: 'Prendre rendez-vous',
      statusHeading: "Statut d'acces",
      statusTitle: 'Invitation requise.',
      statusText:
        "Si vous avez deja un espace actif, utilisez le lien d'acces envoye avec vos details d'onboarding.",
      subject: 'Acces au portail client',
      pills: ['Prive par defaut', 'Portee d’abord', 'Centre marchand'],
    },
  },
} as const;

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
    slug: 'kaos-lifestyle',
    title: 'Kaos Lifestyle',
    eyebrow: 'Theme, product management, API events',
    text: 'Full theme implementation, product management, and custom event integration through API workflows.',
    image: '/pasquin-work/projects/kaos-lifestyle.jpg',
    href: 'https://kaoslifestyle.com/',
    tags: ['theme', 'products', 'api'],
  },
  {
    slug: 'carpette-multi-design',
    title: 'Carpette Multi Design',
    eyebrow: 'SEO and technical fixes',
    text: 'SEO optimization and technical website fixes for a Quebec flooring and wall-covering storefront.',
    image: '/pasquin-work/projects/carpette-multi-design.jpg',
    href: 'https://carpettemultidesign.com/',
    tags: ['seo', 'maintenance', 'optimization'],
  },
  {
    slug: 'mystea',
    title: 'Mystea',
    eyebrow: 'B2B accounts and pricing',
    text: 'Full theme development with B2B account flows and customer-specific B2B pricing.',
    image: '/pasquin-work/projects/mystea.jpg',
    href: 'https://mystea.ca/',
    tags: ['theme', 'b2b', 'pricing'],
  },
  {
    slug: 'sportive-plus',
    title: 'Sportive Plus',
    eyebrow: 'Theme, discounts, labels, maintenance',
    text: 'Full theme development, custom discounts and labels, weekly technical maintenance, and app-stack reduction from 45 apps to 5.',
    image: '/pasquin-work/projects/sportive-plus.jpg',
    href: 'https://sportiveplus.com/',
    tags: ['theme', 'discounts', 'support'],
  },
  {
    slug: 'rd-cosmetic',
    title: 'RD Cosmetic',
    eyebrow: 'B2B payments and Stripe app',
    text: 'B2B features plus a custom Stripe processing application for clients with credit cards on file.',
    image: '/pasquin-work/projects/rd-cosmetic.jpg',
    href: 'https://rdcosmetic.com/',
    tags: ['b2b', 'apps', 'payments'],
  },
  {
    slug: 'pianos-bolduc',
    title: 'Pianos Bolduc',
    eyebrow: 'Maintenance and sections',
    text: 'Site maintenance and custom Shopify sections for product, service, and editorial storefront needs.',
    image: '/pasquin-work/projects/pianos-bolduc.jpg',
    href: 'https://pianosbolduc.com/',
    tags: ['maintenance', 'sections', 'theme'],
  },
  {
    slug: 'artfil',
    title: 'Artfil',
    eyebrow: 'WordPress to Shopify migration',
    text: 'Full website migration from WordPress to Shopify with B2B and B2C storefront structures.',
    image: '/pasquin-work/projects/artfil.jpg',
    href: 'https://wholesale.artfil.ca/',
    tags: ['migration', 'b2b', 'theme'],
  },
  {
    slug: 'liberty-sleep',
    title: 'Liberty Sleep',
    eyebrow: 'POS application',
    text: 'Full POS app development for prescription and client information processing workflows.',
    image: '/pasquin-work/projects/liberty-sleep.jpg',
    href: 'https://libertysleep.ca/',
    tags: ['pos', 'apps', 'workflows'],
  },
  {
    slug: 'maeva-body-jewelry',
    title: 'Maëva Body Jewelry',
    eyebrow: 'B2B storefront and registration',
    text: 'Full website development with B2B features, hidden prices, and a custom B2B registration form.',
    image: '/pasquin-work/projects/maeva-body-jewelry.jpg',
    href: 'https://www.maebodyjewelry.com/',
    tags: ['theme', 'b2b', 'registration'],
  },
  {
    slug: 'botanix',
    title: 'Botanix',
    eyebrow: 'B2B hidden pricing',
    text: 'B2B features with hidden product pricing and a custom account registration experience.',
    image: '/pasquin-work/projects/botanix.jpg',
    href: 'https://botanix.com/',
    tags: ['b2b', 'pricing', 'registration'],
  },
  {
    slug: 'rcgt',
    title: 'RCGT',
    eyebrow: 'Annual Planiguide implementation',
    text: 'Yearly Planiguide implementation for Raymond Chabot Grant Thornton’s tax planning guide.',
    image: '/pasquin-work/projects/rcgt.jpg',
    href: 'https://www.rcgt.com/en/tax-planning-guide/',
    tags: ['implementation', 'content', 'support'],
  },
  {
    slug: 'message-factory',
    title: 'Message Factory',
    eyebrow: 'B2B and personalization',
    text: 'B2B work and storefront personalization for men’s and women’s shopping experiences.',
    image: '/pasquin-work/projects/message-factory.jpg',
    href: 'https://messagefactory.ca/',
    tags: ['b2b', 'personalization', 'theme'],
  },
  {
    slug: 'maison-margan',
    title: 'Maison Margan',
    eyebrow: 'Bundles and optimization',
    text: 'Bundle implementation and store optimization for a beauty-focused Shopify storefront.',
    image: '/pasquin-work/projects/maison-margan.jpg',
    href: 'https://maisonmargan.com/',
    tags: ['bundles', 'optimization', 'theme'],
  },
  {
    slug: 'md-tissage',
    title: 'MD Tissage',
    eyebrow: 'Theme development',
    text: 'Full theme development for a sewing, yarn, and textile storefront.',
    image: '/pasquin-work/projects/md-tissage.jpg',
    href: 'https://mdtissage.com/',
    tags: ['theme', 'storefront'],
  },
  {
    slug: 'andreea-gavrila',
    title: 'Andreea Gavrila',
    eyebrow: 'Theme development',
    text: 'Full theme development for a professional service website with clear service navigation.',
    image: '/pasquin-work/projects/andreea-gavrila.jpg',
    href: 'https://andreeagavrila.ca/',
    tags: ['theme', 'website'],
  },
  {
    slug: 'spinelli',
    title: 'Spinelli',
    eyebrow: 'Next.js vehicle sync',
    text: 'Next.js vehicle sync plus a custom reserve-your-car flow with a $500 reservation script.',
    image: '/pasquin-work/projects/spinelli.jpg',
    href: 'https://spinellidirect.com/',
    tags: ['nextjs', 'automation', 'payments'],
  },
  {
    slug: 'consulis',
    title: 'Consulis',
    eyebrow: 'SEO and theme optimization',
    text: 'SEO improvements and theme optimization for a commercial workspace and furniture site.',
    image: '/pasquin-work/projects/consulis.jpg',
    href: 'https://consulis.com/',
    tags: ['seo', 'theme', 'optimization'],
  },
  {
    slug: 'barry',
    title: 'Barry',
    eyebrow: 'ERP to Shopify quote payments',
    text: 'B2B quote payment flow connecting ERP quoting workflows into Shopify checkout.',
    image: '/pasquin-work/projects/barry.jpg',
    href: 'https://www.barry.ca/',
    tags: ['b2b', 'erp', 'payments'],
  },
  {
    slug: 'luc-vincent',
    title: 'Luc Vincent',
    eyebrow: 'Scripts, applications, ongoing support',
    text: 'Custom scripts, applications, storefront work, and yearly ongoing Shopify support.',
    image: '/pasquin-work/projects/luc-vincent.jpg',
    href: 'https://lucvincent.com/',
    tags: ['apps', 'scripts', 'support'],
  },
  {
    slug: 'wachiya',
    title: 'Wachiya',
    eyebrow: 'POS implementation',
    text: 'POS implementation and setup for a storefront serving Eeyou Istchee artists and customers.',
    image: '/pasquin-work/projects/wachiya.jpg',
    href: 'https://wachiya.com/',
    tags: ['pos', 'setup', 'support'],
  },
];

export const logoGridItems = [
  'B2B pricing',
  'POS apps',
  'ERP payments',
  'Theme builds',
  'Store migrations',
  'Custom discounts',
  'SEO cleanup',
  'Support',
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

export const partnerReviewSummary = {
  rating: '5.0',
  reviewCount: 4,
  partnerSince: 'December 2021',
  sourceName: 'Shopify Partner Directory',
  sourceUrl:
    'https://www.shopify.com/partners/directory/partner/philippe-pasquin',
  priceRange: 'Starting from $150',
  location: 'Montreal, Canada',
  languages: 'English, French',
  lastVerified: 'June 6, 2026',
};

export const partnerReviews = [
  {
    author: 'Redcallas',
    date: 'Dec 19, 2024',
    datePublished: '2024-12-19',
    quote:
      'Philippe did a great work for us considering the last minute request.',
    service: 'Theme customization',
    quality: 5,
    communication: 5,
  },
  {
    author: 'MysTea',
    date: 'Oct 15, 2024',
    datePublished: '2024-10-15',
    quote: 'Super et proactif!',
    service: 'Store settings configuration',
    quality: 5,
    communication: 5,
  },
  {
    author: 'Sportive Plus',
    date: 'Oct 9, 2024',
    datePublished: '2024-10-09',
    quote:
      "Changes the theme and reorganizes our presentation and product's pages. Very knowledgeable and very cooperative.",
    service: 'Product and collection setup',
    quality: 5,
    communication: 5,
  },
  {
    author: 'GoodMood Creations',
    date: 'Jun 10, 2024',
    datePublished: '2024-06-10',
    quote:
      'Philippe exceeded all expectations by creating my dream e-commerce website with exceptional professionalism and within a tight time frame. His skillful execution and attention to detail have resulted in a stunning, functional site that perfectly aligns with my vision.',
    service: 'Store build or redesign',
    quality: 5,
    communication: 5,
  },
];

export const merchantWins = [
  '45 apps reduced to 5',
  'B2B pricing hidden until login',
  'POS prescription workflows shipped',
  'ERP quote payments connected',
  'WordPress to Shopify migration completed',
  'Custom discounts and labels shipped',
  'Annual Planiguide implementation maintained',
  'Yearly Shopify support kept moving',
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

const servicesFr = [
  {
    label: 'Produits',
    title: 'Systemes storefront',
    text: 'Pages produits, parcours de collections, details panier et logique de merchandising pour des boutiques plus faciles a acheter.',
    bullets: ['PDP', 'Collections', 'Panier UX', 'Metafields'],
  },
  {
    label: 'Sites',
    title: 'Nettoyage de theme',
    text: 'Travail Shopify soigneux pour templates lents, sections fragiles, lancements brises et code devenu difficile a faire evoluer.',
    bullets: ['Sections', 'Templates', 'Vitesse', 'QA'],
  },
  {
    label: 'Operations',
    title: "Stack d'apps et operations",
    text: "Connexions pratiques entre apps, analytics, fulfillment, automatisations et l'admin Shopify qui revient toujours.",
    bullets: ['Apps', 'Automation', 'Analytics', 'Docs'],
  },
];

const capabilitiesFr = [
  'Developpement de themes Shopify',
  'Systemes de pages produits',
  'Merchandising de collections',
  'Panier et preparation checkout',
  "Integrations d'apps",
  'Nettoyage performance',
  'Automatisation ecommerce',
  'Support mensuel',
];

const workItemFrOverrides = {
  'kaos-lifestyle': {
    eyebrow: 'Theme, gestion produits, evenements API',
    text: "Implementation complete du theme, gestion produits et integration d'evenements personnalises via des workflows API.",
    tags: ['theme', 'produits', 'api'],
  },
  'carpette-multi-design': {
    eyebrow: 'SEO et correctifs techniques',
    text: 'Optimisation SEO et correctifs techniques pour une boutique quebecoise de couvre-planchers et murs.',
    tags: ['seo', 'maintenance', 'optimisation'],
  },
  mystea: {
    eyebrow: 'Comptes B2B et prix clients',
    text: 'Developpement complet du theme avec parcours de comptes B2B et prix propres aux clients.',
    tags: ['theme', 'b2b', 'prix'],
  },
  'sportive-plus': {
    eyebrow: 'Theme, rabais, etiquettes, maintenance',
    text: 'Developpement complet du theme, rabais et etiquettes personnalises, maintenance technique hebdomadaire et reduction de 45 apps a 5.',
    tags: ['theme', 'rabais', 'support'],
  },
  'rd-cosmetic': {
    eyebrow: 'Paiements B2B et app Stripe',
    text: 'Fonctionnalites B2B et application Stripe personnalisee pour traiter des clients avec cartes au dossier.',
    tags: ['b2b', 'apps', 'paiements'],
  },
  'pianos-bolduc': {
    eyebrow: 'Maintenance et sections',
    text: 'Maintenance du site et sections Shopify personnalisees pour besoins produits, services et contenu.',
    tags: ['maintenance', 'sections', 'theme'],
  },
  artfil: {
    eyebrow: 'Migration WordPress vers Shopify',
    text: 'Migration complete de WordPress vers Shopify avec structures storefront B2B et B2C.',
    tags: ['migration', 'b2b', 'theme'],
  },
  'liberty-sleep': {
    eyebrow: 'Application POS',
    text: "Developpement complet d'une app POS pour traiter prescriptions et informations clients.",
    tags: ['pos', 'apps', 'workflows'],
  },
  'maeva-body-jewelry': {
    eyebrow: 'Storefront B2B et inscription',
    text: "Developpement complet du site avec fonctionnalites B2B, prix caches et formulaire d'inscription B2B personnalise.",
    tags: ['theme', 'b2b', 'inscription'],
  },
  botanix: {
    eyebrow: 'Prix B2B caches',
    text: 'Fonctionnalites B2B avec prix produits caches et experience de creation de compte personnalisee.',
    tags: ['b2b', 'prix', 'inscription'],
  },
  rcgt: {
    eyebrow: 'Implementation annuelle du Planiguide',
    text: 'Implementation annuelle du Planiguide pour le guide fiscal de Raymond Chabot Grant Thornton.',
    tags: ['implementation', 'contenu', 'support'],
  },
  'message-factory': {
    eyebrow: 'B2B et personnalisation',
    text: 'Travail B2B et personnalisation storefront pour experiences magasinage hommes et femmes.',
    tags: ['b2b', 'personnalisation', 'theme'],
  },
  'maison-margan': {
    eyebrow: 'Bundles et optimisation',
    text: 'Implementation de bundles et optimisation de boutique pour un storefront beaute.',
    tags: ['bundles', 'optimisation', 'theme'],
  },
  'md-tissage': {
    eyebrow: 'Developpement de theme',
    text: 'Developpement complet du theme pour une boutique couture, laine et textile.',
    tags: ['theme', 'storefront'],
  },
  'andreea-gavrila': {
    eyebrow: 'Developpement de theme',
    text: 'Developpement complet du theme pour un site de services professionnels avec navigation claire.',
    tags: ['theme', 'site'],
  },
  spinelli: {
    eyebrow: 'Synchronisation vehicules Next.js',
    text: 'Synchronisation vehicules en Next.js et parcours reserve-your-car avec script de reservation de 500 $.',
    tags: ['nextjs', 'automation', 'paiements'],
  },
  consulis: {
    eyebrow: 'SEO et optimisation theme',
    text: 'Ameliorations SEO et optimisation de theme pour un site de mobilier et espaces commerciaux.',
    tags: ['seo', 'theme', 'optimisation'],
  },
  barry: {
    eyebrow: 'Paiement de soumissions ERP vers Shopify',
    text: 'Parcours de paiement B2B reliant les soumissions ERP au checkout Shopify.',
    tags: ['b2b', 'erp', 'paiements'],
  },
  'luc-vincent': {
    eyebrow: 'Scripts, applications, support continu',
    text: 'Scripts personnalises, applications, travail storefront et support Shopify annuel continu.',
    tags: ['apps', 'scripts', 'support'],
  },
  wachiya: {
    eyebrow: 'Implementation POS',
    text: 'Implementation et configuration POS pour un storefront servant artistes et clients d’Eeyou Istchee.',
    tags: ['pos', 'setup', 'support'],
  },
} as const;

const logoGridItemsFr = [
  'Prix B2B',
  'Apps POS',
  'Paiements ERP',
  'Themes Shopify',
  'Migrations',
  'Rabais sur mesure',
  'Nettoyage SEO',
  'Support',
];

const bankPackagesFr = [
  {
    id: 'bank-5',
    name: "Banque d'heures 5 h",
    price: '1 000 $',
    detail: 'Taux effectif de 200 $/h',
    hours: '5 heures',
    bestFor: 'Audits, correctifs urgents, ameliorations ciblees',
    cta: 'Reserver un appel pour 5 h',
  },
  {
    id: 'bank-scope',
    name: 'Banque cadree',
    price: 'Selon la portee',
    detail: 'Entre 5 et 40 heures',
    hours: '10-30 heures',
    bestFor: 'Storefront, nettoyage de theme, integrations',
    cta: "Cadrer une banque d'heures",
  },
  {
    id: 'bank-40',
    name: "Banque d'heures 40 h",
    price: '5 000 $',
    detail: 'Taux effectif de 125 $/h',
    hours: '40 heures',
    bestFor: 'Refontes, lancements, nettoyage de systemes',
    cta: 'Reserver un appel de planification',
  },
];

const retainerPackagesFr = [
  {
    id: 'retainer-5',
    name: 'Operator',
    price: '875 $/mois',
    detail: '5 h/mois a 175 $/h',
    hours: '5 heures/mois',
    rollover: 'Report maximal de 0,5 h',
    bestFor: 'Maintenance, petites ameliorations, support prioritaire',
  },
  {
    id: 'retainer-15',
    name: 'Growth',
    price: '2 250 $/mois',
    detail: '15 h/mois a 150 $/h',
    hours: '15 heures/mois',
    rollover: 'Report maximal de 1,5 h',
    bestFor: 'Campagnes, features, integrations, iteration stable',
  },
];

const timeframeRowsFr = [
  ['Audit de theme', '2-5 heures'],
  ['Systeme PDP ou collection', '10-20 heures'],
  ["Nettoyage panier ou stack d'apps", '10-30 heures'],
  ['Sprint support lancement', '20-40 heures'],
  ['Support mensuel', '5 ou 15 heures/mois'],
];

const processStepsFr = [
  {
    number: '01',
    title: 'Clarifier',
    text: 'Reviser la boutique, le theme, la stack d’apps, les objectifs, les contraintes et la vraie source de friction.',
  },
  {
    number: '02',
    title: 'Cadrer',
    text: 'Choisir la bonne banque ou le bon retainer, definir ce qui compte et eviter de transformer chaque correctif en gros projet.',
  },
  {
    number: '03',
    title: 'Livrer',
    text: 'Implementer du travail Shopify propre avec tests, communication et notes de transfert utiles pour les prochains changements.',
  },
];

const feedbackNotesFr = [
  {
    quote:
      'Il nous faut quelqu’un qui comprend rapidement la boutique et commence a corriger les bonnes choses.',
    author: 'Besoin marchand recurrent',
    role: "Avant une banque d'heures",
  },
  {
    quote:
      'Le theme fonctionne, mais chaque campagne ajoute un nouveau contournement. Il faut le simplifier.',
    author: 'Besoin marchand recurrent',
    role: 'Avant un nettoyage de theme',
  },
  {
    quote:
      "On n'a pas besoin d'un gros processus d'agence. On a besoin d'un developpeur Shopify senior qui peut avancer.",
    author: 'Besoin marchand recurrent',
    role: 'Avant un support mensuel',
  },
  {
    quote:
      'Les apps, les analytics et le panier se touchent tous. Il faut quelqu’un qui peut suivre tout le flux.',
    author: 'Besoin marchand recurrent',
    role: "Avant un travail d'integration",
  },
];

const merchantWinsFr = [
  '45 apps reduites a 5',
  'Prix B2B caches avant connexion',
  'Workflows POS de prescriptions livres',
  'Paiements de soumissions ERP connectes',
  'Migration WordPress vers Shopify terminee',
  'Rabais et etiquettes sur mesure livres',
  'Planiguide annuel maintenu',
  'Support Shopify annuel garde en mouvement',
];

const faqsFr = [
  {
    question: 'Que fait Philippe Pasquin?',
    answer:
      'Philippe Pasquin est un developpeur Shopify base a Montreal, axe sur les ameliorations storefront, le nettoyage de themes, les integrations d’apps, l’automatisation, la performance et le support technique continu pour marchands.',
  },
  {
    question: 'Pour quel type de marchand est-ce concu?',
    answer:
      "Le service s'adresse aux marchands Shopify qui ont besoin d'un developpeur senior pratique pour des ameliorations cadrees, du support recurrent, du travail de lancement ou du nettoyage sans processus d’agence lourd.",
  },
  {
    question: "Comment fonctionnent les banques d'heures?",
    answer:
      "Les engagements en banques d'heures commencent a 5 heures pour 1 000 $ et peuvent aller jusqu'a 40 heures pour 5 000 $. Ils sont utiles pour le developpement Shopify cadre, les correctifs urgents, le nettoyage de theme, les integrations et les lancements.",
  },
  {
    question: 'Comment fonctionnent les retainers mensuels?',
    answer:
      'Les retainers sont offerts a 5 heures par mois a 175 $/h ou 15 heures par mois a 150 $/h. Le temps inutilise peut etre reporte jusqu’a un maximum de 10 %, soit 0,5 h sur le plan 5 h ou 1,5 h sur le plan 15 h.',
  },
  {
    question: 'Le selecteur de rendez-vous est-il open source?',
    answer:
      'Le site utilise un selecteur de rendez-vous personnalise qui peut se connecter a Cal.com, une plateforme de planification open source pouvant etre hebergee par Cal.com ou auto-hebergee pour plus de controle.',
  },
];

export const focusAreas = [
  {id: 'theme-cleanup', en: 'Theme cleanup', fr: 'Nettoyage de theme'},
  {id: 'product-pages', en: 'Product pages', fr: 'Pages produits'},
  {id: 'collections', en: 'Collections', fr: 'Collections'},
  {id: 'cart-flow', en: 'Cart flow', fr: 'Parcours panier'},
  {id: 'apps', en: 'Apps', fr: 'Apps'},
  {id: 'automation', en: 'Automation', fr: 'Automatisation'},
  {id: 'performance', en: 'Performance', fr: 'Performance'},
  {id: 'launch-support', en: 'Launch support', fr: 'Support lancement'},
];

export const clientPortalItems = [
  {
    number: '01',
    title: {en: 'Retainers', fr: 'Retainers'},
    text: {
      en: 'Monthly priorities, support notes, and next actions.',
      fr: 'Priorites mensuelles, notes de support et prochaines actions.',
    },
  },
  {
    number: '02',
    title: {en: 'Bank of hours', fr: "Banques d'heures"},
    text: {
      en: 'Scope, remaining time, and implementation status.',
      fr: 'Portee, temps restant et statut d’implementation.',
    },
  },
  {
    number: '03',
    title: {en: 'Launch support', fr: 'Support lancement'},
    text: {
      en: 'Checklist items, blockers, and handoff references.',
      fr: 'Items de checklist, blocages et references de transfert.',
    },
  },
];

export function getSiteText(language: LanguageCode = 'en') {
  return siteText[language];
}

export function getPrimaryNavItems(language: LanguageCode = 'en') {
  return language === 'fr' ? primaryNavItemsFr : primaryNavItems;
}

export function getMoreNavItems(language: LanguageCode = 'en') {
  return language === 'fr' ? moreNavItemsFr : moreNavItems;
}

export function getNavItems(language: LanguageCode = 'en') {
  return language === 'fr' ? navItemsFr : navItems;
}

export function getServices(language: LanguageCode = 'en') {
  return language === 'fr' ? servicesFr : services;
}

export function getCapabilities(language: LanguageCode = 'en') {
  return language === 'fr' ? capabilitiesFr : capabilities;
}

export function getWorkItems(language: LanguageCode = 'en') {
  if (language !== 'fr') return workItems;

  return workItems.map((item) => ({
    ...item,
    ...(workItemFrOverrides[item.slug as keyof typeof workItemFrOverrides] ??
      {}),
  }));
}

export function getLogoGridItems(language: LanguageCode = 'en') {
  return language === 'fr' ? logoGridItemsFr : logoGridItems;
}

export function getBankPackages(language: LanguageCode = 'en') {
  return language === 'fr' ? bankPackagesFr : bankPackages;
}

export function getRetainerPackages(language: LanguageCode = 'en') {
  return language === 'fr' ? retainerPackagesFr : retainerPackages;
}

export function getTimeframeRows(language: LanguageCode = 'en') {
  return language === 'fr' ? timeframeRowsFr : timeframeRows;
}

export function getProcessSteps(language: LanguageCode = 'en') {
  return language === 'fr' ? processStepsFr : processSteps;
}

export function getFeedbackNotes(language: LanguageCode = 'en') {
  return language === 'fr' ? feedbackNotesFr : feedbackNotes;
}

export function getPartnerReviewSummary() {
  return partnerReviewSummary;
}

export function getPartnerReviews() {
  return partnerReviews;
}

export function getMerchantWins(language: LanguageCode = 'en') {
  return language === 'fr' ? merchantWinsFr : merchantWins;
}

export function getFaqs(language: LanguageCode = 'en') {
  return language === 'fr' ? faqsFr : faqs;
}

export function getFocusAreaLabel(id: string, language: LanguageCode = 'en') {
  const area = focusAreas.find((item) => item.id === id);
  return area ? area[language] : id;
}

export function buildStructuredData({
  siteUrl,
  contactEmail,
  language = 'en',
}: {
  siteUrl: string;
  contactEmail: string;
  language?: LanguageCode;
}) {
  const text = getSiteText(language);
  const localizedBankPackages = getBankPackages(language);
  const localizedRetainerPackages = getRetainerPackages(language);
  const localizedFaqs = getFaqs(language);

  const businessName =
    language === 'fr'
      ? `${siteConfig.name} — Developpement Shopify`
      : `${siteConfig.name} Shopify Development`;
  const businessDescription =
    language === 'fr'
      ? 'Philippe Pasquin est un developpeur Shopify base a Montreal qui aide les marchands a ameliorer storefronts, themes, integrations, operations et maintenabilite.'
      : 'Philippe Pasquin is a Montreal-based Shopify developer helping merchants improve storefronts, themes, integrations, operations, and maintainability.';
  const logoUrl = `${siteUrl}${siteConfig.logoImagePath}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: businessName,
        description: text.pages.homeDescription,
        publisher: {'@id': `${siteUrl}/#person`},
        inLanguage: language === 'fr' ? 'fr-CA' : 'en-CA',
        image: logoUrl,
      },
      {
        '@type': ['Person', 'ProfessionalService', 'LocalBusiness'],
        '@id': `${siteUrl}/#person`,
        name: siteConfig.name,
        alternateName: siteConfig.logo,
        url: siteUrl,
        email: contactEmail,
        image: logoUrl,
        logo: logoUrl,
        priceRange: siteConfig.priceRange,
        jobTitle:
          language === 'fr' ? 'Developpeur Shopify' : 'Shopify Developer',
        description: businessDescription,
        sameAs: siteConfig.socialProfiles,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.location.city,
          addressRegion: siteConfig.location.region,
          addressCountry: siteConfig.location.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.location.geo.latitude,
          longitude: siteConfig.location.geo.longitude,
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: siteConfig.openingHours.days,
          opens: siteConfig.openingHours.opens,
          closes: siteConfig.openingHours.closes,
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
        name:
          language === 'fr'
            ? 'Forfaits de developpement Shopify'
            : 'Shopify development packages',
        itemListElement: [
          ...localizedBankPackages.map((offer) => ({
            '@type': 'Offer',
            name: offer.name,
            description: `${offer.hours}. ${offer.bestFor}. ${offer.detail}.`,
            priceCurrency: 'CAD',
            price: offer.price.replace(/[^0-9]/g, '') || undefined,
            category: language === 'fr' ? "Banque d'heures" : 'Bank of hours',
          })),
          ...localizedRetainerPackages.map((offer) => ({
            '@type': 'Offer',
            name: offer.name,
            description: `${offer.hours}. ${offer.bestFor}. ${offer.detail}. ${offer.rollover}.`,
            priceCurrency: 'CAD',
            price: offer.price.replace(/[^0-9]/g, '') || undefined,
            category:
              language === 'fr' ? 'Retainer mensuel' : 'Monthly retainer',
          })),
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: localizedFaqs.map((faq) => ({
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
