import type {LanguageCode} from '~/lib/i18n';
import {getWorkItems, siteConfig} from '~/lib/pasquin';

export type ServicePageGroup = 'services' | 'shopifyWork';

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePage = {
  slug: string;
  group: ServicePageGroup;
  navLabel: string;
  title: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  keywords: string[];
  heroPoints: string[];
  fitHeading: string;
  fit: string[];
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutions: string[];
  deliverablesTitle: string;
  deliverables: string[];
  outcomesTitle: string;
  outcomes: string[];
  processTitle: string;
  process: Array<{title: string; text: string}>;
  referencesTitle: string;
  proofSlugs: string[];
  faq: ServiceFaq[];
  relatedSlugs: string[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const englishServicePages: ServicePage[] = [
  {
    slug: 'storefront-systems',
    group: 'services',
    navLabel: 'Storefront systems',
    title: 'Shopify storefront systems for stores that need cleaner buying paths.',
    eyebrow: 'Storefront systems',
    metaTitle: 'Shopify Storefront Systems | Montreal Shopify Developer',
    metaDescription:
      'Shopify storefront systems for product pages, collections, cart flows, merchandising logic, metafields, and conversion-focused storefront operations.',
    summary:
      'A structured pass across PDPs, collections, cart behavior, metafields, and merchandising logic so the store feels easier to browse, buy from, and maintain.',
    keywords: [
      'Shopify storefront developer',
      'Shopify product page developer',
      'Shopify collection merchandising',
      'Shopify cart UX',
    ],
    heroPoints: ['PDPs', 'Collections', 'Cart UX', 'Metafields'],
    fitHeading: 'Best fit',
    fit: [
      'The storefront works, but product discovery and purchase paths feel patched together.',
      'Merchandising rules live in theme workarounds, app settings, and manual admin habits.',
      'The team needs a cleaner system before campaigns, launches, or scaling catalog work.',
    ],
    problemTitle: 'Where storefront systems usually break down',
    problems: [
      'Product pages hide key buying information or make variant selection harder than it needs to be.',
      'Collections rely on manual ordering, unclear filters, or campaign-specific workarounds.',
      'Cart behavior, discounts, shipping messages, and upsells do not tell one consistent story.',
      'Metafields exist, but the theme does not use them in a repeatable way.',
    ],
    solutionTitle: 'What gets fixed',
    solutions: [
      'A clearer product-page structure for variants, trust points, availability, bundles, and buying confidence.',
      'Collection logic that supports campaigns, merchandising priorities, filters, and operational maintenance.',
      'Cart and checkout-readiness details that reduce confusion before payment.',
      'Reusable Shopify data patterns so future products and sections do not require custom fixes every time.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'PDP and collection audit with prioritized friction points.',
      'Theme updates for product, collection, cart, and reusable section logic.',
      'Metafield and content-model recommendations for repeatable merchandising.',
      'QA notes, launch checklist, and handoff documentation for the merchant team.',
    ],
    outcomesTitle: 'Commercial outcomes',
    outcomes: [
      'Cleaner product understanding before add to cart.',
      'Less manual merchandising work before campaigns.',
      'More confidence that cart, discount, and shipping details match the offer.',
      'A storefront that can keep changing without becoming brittle.',
    ],
    processTitle: 'How the work moves',
    process: [
      {
        title: 'Map the buying path',
        text: 'Review product, collection, search, cart, discount, and admin workflows to find the real friction.',
      },
      {
        title: 'Rebuild the repeatable pieces',
        text: 'Improve the sections, templates, metafields, and theme logic that should support many products instead of one-off changes.',
      },
      {
        title: 'Ship with operating notes',
        text: 'Test the path, document what changed, and leave clear rules for future merchandising updates.',
      },
    ],
    referencesTitle: 'Relevant storefront work',
    proofSlugs: ['kaos-lifestyle', 'mystea', 'maison-margan'],
    faq: [
      {
        question: 'Is this a full redesign?',
        answer:
          'Not by default. This is usually a focused Shopify development engagement that improves the buying system inside the current brand and theme.',
      },
      {
        question: 'Can this include metafields and Shopify admin cleanup?',
        answer:
          'Yes. Storefront systems often need both theme code and admin data structure so future product work stays manageable.',
      },
      {
        question: 'How many hours should I expect?',
        answer:
          'A narrow audit can start inside a 5-hour bank. PDP, collection, and cart work usually fits better in a scoped bank between 10 and 40 hours.',
      },
    ],
    relatedSlugs: [
      'product-page-systems',
      'collection-merchandising',
      'cart-checkout-readiness',
    ],
    ctaTitle: 'Make the storefront easier to buy from.',
    ctaText:
      'Start with a focused review and turn the most expensive storefront friction into a clear implementation plan.',
    ctaPrimary: 'Book a storefront fit call',
    ctaSecondary: 'Compare pricing',
  },
  {
    slug: 'theme-cleanup',
    group: 'services',
    navLabel: 'Theme cleanup',
    title: 'Shopify theme cleanup for slow, fragile, hard-to-change storefronts.',
    eyebrow: 'Theme cleanup',
    metaTitle: 'Shopify Theme Cleanup | Performance, Sections, QA',
    metaDescription:
      'Shopify theme cleanup for slow templates, brittle sections, duplicated code, broken launch workflows, and maintainable storefront development.',
    summary:
      'Careful Shopify theme work for stores where every campaign, section, or app change has become too risky or too slow.',
    keywords: [
      'Shopify theme cleanup',
      'Shopify theme developer',
      'Shopify section developer',
      'Shopify theme maintenance',
    ],
    heroPoints: ['Sections', 'Templates', 'Speed', 'QA'],
    fitHeading: 'Best fit',
    fit: [
      'The theme technically works, but every change feels risky.',
      'Previous launches left duplicate sections, unused snippets, or app residue.',
      'The team needs a calmer base before campaigns, SEO work, or conversion improvements.',
    ],
    problemTitle: 'Common theme cleanup problems',
    problems: [
      'Sections are duplicated instead of reusable, which makes future edits slower.',
      'Apps injected markup, scripts, or settings that no longer match how the store operates.',
      'Performance issues come from a mix of theme code, media, scripts, and layout choices.',
      'Launches require too much manual QA because the theme has hidden dependencies.',
    ],
    solutionTitle: 'What gets cleaned up',
    solutions: [
      'Theme sections, snippets, and templates are simplified around current merchant workflows.',
      'Unused code paths and app leftovers are identified and removed when safe.',
      'High-impact speed and UX issues are fixed without chasing vanity performance scores.',
      'Testing notes make future launches less dependent on memory.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Theme audit with risk map and prioritized cleanup backlog.',
      'Section, template, snippet, and CSS improvements.',
      'App residue review and safe removal recommendations.',
      'QA checklist for product pages, collections, cart, and key conversion flows.',
    ],
    outcomesTitle: 'Operational outcomes',
    outcomes: [
      'Fewer fragile sections and duplicated fixes.',
      'Lower risk when launching campaigns or editing templates.',
      'Cleaner storefront performance and easier theme maintenance.',
      'A clearer path for future development banks or retainers.',
    ],
    processTitle: 'How the cleanup works',
    process: [
      {
        title: 'Audit the theme surface',
        text: 'Review theme architecture, sections, templates, assets, apps, and current launch pain points.',
      },
      {
        title: 'Fix the highest-leverage friction',
        text: 'Prioritize changes that reduce risk, improve maintainability, or unlock near-term business work.',
      },
      {
        title: 'Document the new rules',
        text: 'Leave practical notes so the merchant team knows which sections to use and which patterns to avoid.',
      },
    ],
    referencesTitle: 'Relevant cleanup work',
    proofSlugs: ['sportive-plus', 'pianos-bolduc', 'consulis'],
    faq: [
      {
        question: 'Do you rebuild the entire theme?',
        answer:
          'Only when it is justified. Most theme cleanup work is scoped around the parts that create business risk or slow the team down.',
      },
      {
        question: 'Can you work inside an existing Shopify theme?',
        answer:
          'Yes. The service is designed for existing Shopify themes that need practical cleanup, not a heavy agency redesign.',
      },
      {
        question: 'Will this improve performance?',
        answer:
          'Often, yes. Performance cleanup is handled as part of the theme review when scripts, sections, media, or layout decisions are causing visible friction.',
      },
    ],
    relatedSlugs: [
      'shopify-theme-development',
      'performance-cleanup',
      'storefront-systems',
    ],
    ctaTitle: 'Clean up the theme before the next launch.',
    ctaText:
      'Use a small bank for an audit or a larger bank to remove the highest-risk theme friction.',
    ctaPrimary: 'Book a cleanup call',
    ctaSecondary: 'See bank pricing',
  },
  {
    slug: 'app-stack-operations',
    group: 'services',
    navLabel: 'App stack and operations',
    title: 'Shopify app stack and operations work for stores with too many moving parts.',
    eyebrow: 'App stack and operations',
    metaTitle: 'Shopify App Stack and Operations | Integrations and Automation',
    metaDescription:
      'Shopify app stack review, app integrations, analytics cleanup, fulfillment workflows, automation, and operational support for ecommerce teams.',
    summary:
      'Practical connections across apps, analytics, fulfillment, automations, and admin workflows so the store is easier to operate.',
    keywords: [
      'Shopify app integrations',
      'Shopify automation',
      'Shopify operations',
      'Shopify app stack cleanup',
    ],
    heroPoints: ['Apps', 'Automation', 'Analytics', 'Docs'],
    fitHeading: 'Best fit',
    fit: [
      'The store depends on too many apps, scripts, and undocumented workflows.',
      'Analytics, fulfillment, discounts, customer accounts, or email tools do not agree.',
      'The team needs someone who can trace the whole Shopify operating flow.',
    ],
    problemTitle: 'Where operations get messy',
    problems: [
      'Apps overlap, duplicate features, or create hidden dependencies inside the theme.',
      'Operational workflows live in staff memory instead of clear systems.',
      'Analytics and event tracking are incomplete, duplicated, or too noisy to trust.',
      'Custom scripts and integrations are not documented well enough to maintain.',
    ],
    solutionTitle: 'What gets stabilized',
    solutions: [
      'App overlap is mapped and reduced when a simpler Shopify-native or custom path exists.',
      'Operational workflows are clarified across Shopify admin, apps, analytics, fulfillment, and support tools.',
      'Custom integrations are scoped around real business workflows instead of speculative automation.',
      'Documentation gives the team a clearer source of truth after the work ships.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'App-stack audit with keep, replace, remove, or custom-build recommendations.',
      'Integration fixes across storefront, checkout-adjacent flows, analytics, or back-office workflows.',
      'Automation scripts or structured handoff docs for recurring admin work.',
      'Tracking and QA notes for the flows most likely to affect revenue or operations.',
    ],
    outcomesTitle: 'Operating outcomes',
    outcomes: [
      'Less app overlap and fewer unclear dependencies.',
      'Cleaner data and more reliable workflows.',
      'Lower technical drag when the store changes.',
      'Better handoff between merchant, developer, and operations teams.',
    ],
    processTitle: 'How operations work gets scoped',
    process: [
      {
        title: 'Trace the workflow',
        text: 'Follow the real customer, staff, data, and fulfillment paths instead of looking at apps in isolation.',
      },
      {
        title: 'Decide what should stay',
        text: 'Separate useful apps from overlap, theme residue, unnecessary scripts, and workflows that should be custom.',
      },
      {
        title: 'Ship the smallest stable system',
        text: 'Implement the fixes, document the operating rules, and leave clear next steps for future automation.',
      },
    ],
    referencesTitle: 'Relevant operations work',
    proofSlugs: ['sportive-plus', 'luc-vincent', 'spinelli'],
    faq: [
      {
        question: 'Do you remove apps?',
        answer:
          'Only after the dependency is understood. The goal is a safer operating stack, not removing tools blindly.',
      },
      {
        question: 'Can this include analytics and event tracking?',
        answer:
          'Yes. Tracking cleanup can be part of the engagement when analytics quality affects decisions, ads, or conversion work.',
      },
      {
        question: 'Can this become ongoing support?',
        answer:
          'Yes. App-stack and operations work often becomes a monthly retainer when the store needs steady technical attention.',
      },
    ],
    relatedSlugs: ['app-integrations', 'ecommerce-automation', 'performance-cleanup'],
    ctaTitle: 'Make the operating stack easier to trust.',
    ctaText:
      'Start by mapping the workflows that slow the team down, then fix the pieces that carry the most operational risk.',
    ctaPrimary: 'Book an operations call',
    ctaSecondary: 'See retainers',
  },
  {
    slug: 'shopify-theme-development',
    group: 'shopifyWork',
    navLabel: 'Shopify theme development',
    title: 'Shopify theme development for custom storefront sections and maintainable launches.',
    eyebrow: 'Shopify theme development',
    metaTitle: 'Shopify Theme Development | Custom Sections and Storefronts',
    metaDescription:
      'Custom Shopify theme development for sections, templates, storefront launches, migrations, B2B storefronts, and maintainable ecommerce experiences.',
    summary:
      'Custom Shopify theme development for stores that need specific sections, templates, and launch-ready storefront behavior without a bulky agency process.',
    keywords: [
      'Shopify theme development',
      'Shopify theme developer Montreal',
      'custom Shopify sections',
      'Shopify storefront launch',
    ],
    heroPoints: ['Custom sections', 'Theme templates', 'Launch QA', 'B2B storefronts'],
    fitHeading: 'Best fit',
    fit: [
      'You need custom Shopify theme work that respects the existing brand and operations.',
      'The store has outgrown default sections or app-based layout patches.',
      'A launch, migration, or campaign needs a developer who can ship and QA.',
    ],
    problemTitle: 'What makes theme development expensive later',
    problems: [
      'Custom sections are built for one campaign instead of reusable merchant control.',
      'Theme edits solve the visual request but ignore content, data, and QA needs.',
      'Launch work ships without clear rollback, testing, or handoff notes.',
      'B2B, wholesale, or complex catalog rules are forced into visual templates.',
    ],
    solutionTitle: 'What the development focuses on',
    solutions: [
      'Theme sections that are merchant-editable, constrained, and reusable.',
      'Templates that support the real catalog, content, and account requirements.',
      'Launch-ready QA across desktop, mobile, product, collection, and cart paths.',
      'Technical notes that make the next developer or merchant edit easier.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Custom Shopify sections, templates, snippets, and theme settings.',
      'Migration or launch implementation support.',
      'B2B or account-aware storefront logic when needed.',
      'QA checklist and handoff notes for future edits.',
    ],
    outcomesTitle: 'What changes for the store',
    outcomes: [
      'The storefront can support more campaigns with fewer custom hacks.',
      'Merchants have clearer controls in the Shopify theme editor.',
      'Launches have fewer surprises across critical buying paths.',
      'The theme becomes easier to maintain after the first delivery.',
    ],
    processTitle: 'Theme development process',
    process: [
      {
        title: 'Define the reusable pattern',
        text: 'Turn the request into sections, settings, and templates that support more than one page.',
      },
      {
        title: 'Build inside Shopify constraints',
        text: 'Use Shopify theme conventions, Liquid, metafields, and clean assets instead of unnecessary complexity.',
      },
      {
        title: 'QA the real storefront',
        text: 'Test the paths merchants and customers actually use before handing off the work.',
      },
    ],
    referencesTitle: 'Relevant theme work',
    proofSlugs: ['kaos-lifestyle', 'mystea', 'md-tissage'],
    faq: [
      {
        question: 'Can you build custom Shopify sections?',
        answer:
          'Yes. Custom sections are often the right way to give merchants control without relying on rigid one-off templates.',
      },
      {
        question: 'Do you work on Shopify 2.0 themes?',
        answer:
          'Yes. The work follows modern Shopify theme patterns including sections, JSON templates, metafields, and reusable snippets.',
      },
      {
        question: 'Can you support a migration?',
        answer:
          'Yes. Migration support can include theme development, redirects, content structure, B2B storefront logic, and launch QA.',
      },
    ],
    relatedSlugs: ['theme-cleanup', 'storefront-systems', 'performance-cleanup'],
    ctaTitle: 'Build the theme work the store actually needs.',
    ctaText:
      'Scope a bank of hours for custom sections, launch work, or maintainable Shopify theme development.',
    ctaPrimary: 'Scope theme work',
    ctaSecondary: 'View work',
  },
  {
    slug: 'product-page-systems',
    group: 'shopifyWork',
    navLabel: 'Product page systems',
    title: 'Shopify product page systems that make product decisions easier.',
    eyebrow: 'Product page systems',
    metaTitle: 'Shopify Product Page Development | PDP Systems',
    metaDescription:
      'Shopify product page development for PDP structure, variant logic, bundles, trust content, metafields, subscriptions, and conversion improvements.',
    summary:
      'Product page systems for variant-heavy, content-heavy, or operationally complex products that need clearer buying confidence.',
    keywords: [
      'Shopify product page development',
      'Shopify PDP developer',
      'Shopify variant logic',
      'Shopify product metafields',
    ],
    heroPoints: ['Variant logic', 'Trust content', 'Bundles', 'Metafields'],
    fitHeading: 'Best fit',
    fit: [
      'Customers ask questions the PDP should already answer.',
      'Variants, bundles, subscriptions, or product conditions make buying confusing.',
      'The product page changes often and needs a repeatable system.',
    ],
    problemTitle: 'Where PDPs lose confidence',
    problems: [
      'Variant logic hides availability, price changes, inventory state, or buying rules.',
      'Important content sits in long descriptions instead of structured sections.',
      'Trust, shipping, sizing, usage, or compatibility details appear inconsistently.',
      'Bundles, subscriptions, and custom selling plans feel bolted on.',
    ],
    solutionTitle: 'What a product page system adds',
    solutions: [
      'A clearer hierarchy for product decisions, objections, and add-to-cart confidence.',
      'Reusable sections powered by metafields, metaobjects, tags, or theme settings.',
      'Variant and bundle logic that is easier to test and maintain.',
      'PDP QA notes for edge cases such as sold out, sale, B2B, bundles, and subscriptions.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'PDP audit and conversion friction map.',
      'Theme work for product templates, sections, and variant behavior.',
      'Metafield model for product-specific content.',
      'QA matrix for product states and buying conditions.',
    ],
    outcomesTitle: 'Conversion outcomes',
    outcomes: [
      'Faster product understanding.',
      'More consistent objection handling.',
      'Cleaner add-to-cart behavior across product types.',
      'Less manual theme editing for future product launches.',
    ],
    processTitle: 'How PDP work is handled',
    process: [
      {
        title: 'Inventory product states',
        text: 'Review the products, variants, selling plans, bundles, content, and edge cases that matter.',
      },
      {
        title: 'Design the content model',
        text: 'Decide what belongs in theme settings, product data, metafields, metaobjects, or app configuration.',
      },
      {
        title: 'Implement and test',
        text: 'Ship the PDP system with QA against real product scenarios.',
      },
    ],
    referencesTitle: 'Relevant product-page work',
    proofSlugs: ['mystea', 'maison-margan', 'kaos-lifestyle'],
    faq: [
      {
        question: 'Can this include product metafields?',
        answer:
          'Yes. Metafields are often the cleanest way to keep PDP content structured and merchant-editable.',
      },
      {
        question: 'Can you fix variant bugs?',
        answer:
          'Yes. Variant logic is a common PDP issue, especially when price, availability, bundles, or product media change with selections.',
      },
      {
        question: 'Can this support B2B products?',
        answer:
          'Yes. Product page systems can include account-aware content, hidden prices, registration prompts, and customer-specific buying rules.',
      },
    ],
    relatedSlugs: ['storefront-systems', 'collection-merchandising', 'cart-checkout-readiness'],
    ctaTitle: 'Make product decisions easier.',
    ctaText:
      'Start with a PDP review and turn confusing product logic into a clearer buying system.',
    ctaPrimary: 'Book a PDP call',
    ctaSecondary: 'Compare pricing',
  },
  {
    slug: 'collection-merchandising',
    group: 'shopifyWork',
    navLabel: 'Collection merchandising',
    title: 'Shopify collection merchandising for clearer product discovery.',
    eyebrow: 'Collection merchandising',
    metaTitle: 'Shopify Collection Merchandising | Filters, Sorting, Campaigns',
    metaDescription:
      'Shopify collection merchandising for filters, sorting, campaign landing pages, product grids, collection content, and conversion-focused discovery.',
    summary:
      'Collection systems for stores that need better product discovery, cleaner campaign merchandising, and less manual sorting.',
    keywords: [
      'Shopify collection merchandising',
      'Shopify collection page developer',
      'Shopify filters',
      'Shopify product discovery',
    ],
    heroPoints: ['Filters', 'Sorting', 'Campaigns', 'Product grids'],
    fitHeading: 'Best fit',
    fit: [
      'Customers land on collections but do not quickly find the right product.',
      'Campaign pages are rebuilt manually each time.',
      'Filters, sort order, tags, and merchandising logic are inconsistent.',
    ],
    problemTitle: 'Where collections underperform',
    problems: [
      'Collection pages behave like product dumps instead of guided buying paths.',
      'Filter values, tags, and product data are inconsistent across the catalog.',
      'Manual sorting makes campaigns hard to launch and hard to repeat.',
      'Collection content does not support SEO or buying intent.',
    ],
    solutionTitle: 'What gets improved',
    solutions: [
      'A clearer collection template with useful hierarchy, filters, and product-card information.',
      'Merchandising logic for featured products, campaign groups, and seasonal priorities.',
      'Product data cleanup recommendations for filters and collection rules.',
      'SEO-aware collection content that supports search intent without cluttering the page.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Collection audit with discovery friction points.',
      'Theme updates for product grids, cards, filters, and merchandising blocks.',
      'Rules for tags, metafields, filters, and campaign collection setup.',
      'QA and launch checklist for collection states.',
    ],
    outcomesTitle: 'Discovery outcomes',
    outcomes: [
      'Customers understand product ranges faster.',
      'Campaign merchandising takes less manual effort.',
      'Filters and collection content become more trustworthy.',
      'SEO content supports intent without burying the product grid.',
    ],
    processTitle: 'Collection work process',
    process: [
      {
        title: 'Review discovery paths',
        text: 'Look at navigation, search, collections, filters, tags, and product-card decisions together.',
      },
      {
        title: 'Fix the template and data rules',
        text: 'Improve the storefront surface while clarifying the product data required to keep it working.',
      },
      {
        title: 'Test campaigns and edge cases',
        text: 'QA collection states such as empty filters, sale items, sold-out products, and campaign landing pages.',
      },
    ],
    referencesTitle: 'Relevant merchandising work',
    proofSlugs: ['kaos-lifestyle', 'carpette-multi-design', 'message-factory'],
    faq: [
      {
        question: 'Can collection work include SEO?',
        answer:
          'Yes. Collection pages often need both product discovery improvements and search-intent content.',
      },
      {
        question: 'Can you fix filters?',
        answer:
          'Yes. Filter work can include storefront UI, Shopify Search and Discovery settings, tags, metafields, and product-data cleanup rules.',
      },
      {
        question: 'Can this help campaigns?',
        answer:
          'Yes. A better merchandising system makes campaign pages easier to build, QA, and reuse.',
      },
    ],
    relatedSlugs: ['storefront-systems', 'product-page-systems', 'ecommerce-automation'],
    ctaTitle: 'Make product discovery easier.',
    ctaText:
      'Turn collection pages into useful buying paths instead of manual product grids.',
    ctaPrimary: 'Book a merchandising call',
    ctaSecondary: 'See work',
  },
  {
    slug: 'cart-checkout-readiness',
    group: 'shopifyWork',
    navLabel: 'Cart and checkout readiness',
    title: 'Shopify cart and checkout-readiness work before revenue leaks become normal.',
    eyebrow: 'Cart and checkout readiness',
    metaTitle: 'Shopify Cart UX and Checkout Readiness | Developer Support',
    metaDescription:
      'Shopify cart UX and checkout-readiness work for cart drawers, discount clarity, shipping messages, upsells, B2B rules, and launch QA.',
    summary:
      'Cart and checkout-adjacent work for stores where discounts, shipping, upsells, or buying rules create last-mile confusion.',
    keywords: [
      'Shopify cart developer',
      'Shopify cart drawer',
      'Shopify checkout readiness',
      'Shopify discount logic',
    ],
    heroPoints: ['Cart drawer', 'Discounts', 'Shipping clarity', 'Launch QA'],
    fitHeading: 'Best fit',
    fit: [
      'Customers reach the cart but still need reassurance or clarity.',
      'Discounts, shipping thresholds, bundles, or upsells create confusion.',
      'A launch or campaign needs checkout-adjacent QA before traffic arrives.',
    ],
    problemTitle: 'Where cart flows create friction',
    problems: [
      'Cart drawers show products but do not explain totals, discounts, shipping, or next steps clearly.',
      'Promotions and custom discount rules create inconsistent customer expectations.',
      'Upsells or bundle logic feel noisy instead of helpful.',
      'Checkout-adjacent flows are not tested against real campaign scenarios.',
    ],
    solutionTitle: 'What gets prepared',
    solutions: [
      'Cart messaging that makes discounts, shipping, checkout readiness, and next steps easier to understand.',
      'Theme and script fixes for cart drawers, line properties, bundles, and promotional states.',
      'QA scenarios for campaign traffic, B2B rules, discount codes, and edge cases.',
      'Handoff notes for what can be changed in Shopify admin versus code.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Cart and checkout-readiness audit.',
      'Cart drawer, cart page, line-item, and discount-message fixes.',
      'Promotion and launch QA checklist.',
      'Technical notes for checkout-adjacent constraints.',
    ],
    outcomesTitle: 'Last-mile outcomes',
    outcomes: [
      'Cleaner cart confidence before checkout.',
      'Fewer support questions about discounts and shipping.',
      'Safer launch flows for campaigns and promotions.',
      'A clearer split between Shopify checkout limits and theme-level improvements.',
    ],
    processTitle: 'How cart work is scoped',
    process: [
      {
        title: 'Trace the revenue path',
        text: 'Review add-to-cart, cart drawer, cart page, discount, shipping, and checkout handoff states.',
      },
      {
        title: 'Fix the visible confusion',
        text: 'Improve messages, line-item behavior, promotional states, and cart logic where the theme can control them.',
      },
      {
        title: 'QA launch scenarios',
        text: 'Test the combinations most likely to break during campaigns, sales, and operational changes.',
      },
    ],
    referencesTitle: 'Relevant cart and checkout-adjacent work',
    proofSlugs: ['rd-cosmetic', 'barry', 'maison-margan'],
    faq: [
      {
        question: 'Can you customize Shopify checkout?',
        answer:
          'Checkout customization depends on Shopify plan, platform limits, and the specific request. This service focuses on checkout readiness and checkout-adjacent theme work.',
      },
      {
        question: 'Can you fix discount display issues?',
        answer:
          'Yes. Discount clarity often involves cart messaging, line item states, theme logic, and QA against real promotions.',
      },
      {
        question: 'Can this include B2B checkout flows?',
        answer:
          'Yes. B2B quote payments, hidden pricing, customer accounts, and custom payment flows can be scoped when they affect the checkout path.',
      },
    ],
    relatedSlugs: ['product-page-systems', 'app-integrations', 'ecommerce-automation'],
    ctaTitle: 'Clean up the last mile before checkout.',
    ctaText:
      'Use a focused bank to clarify cart behavior, discount states, and launch-readiness risks.',
    ctaPrimary: 'Book a cart-readiness call',
    ctaSecondary: 'Compare pricing',
  },
  {
    slug: 'app-integrations',
    group: 'shopifyWork',
    navLabel: 'App integrations',
    title: 'Shopify app integrations that connect the store without adding more clutter.',
    eyebrow: 'App integrations',
    metaTitle: 'Shopify App Integrations | Custom Apps, APIs, POS, B2B',
    metaDescription:
      'Shopify app integrations for custom apps, API workflows, POS workflows, B2B pricing, Stripe processing, analytics, and ecommerce operations.',
    summary:
      'Integration work for stores that need Shopify, apps, APIs, customer accounts, POS, payments, or operations to work together cleanly.',
    keywords: [
      'Shopify app integrations',
      'Shopify custom app developer',
      'Shopify API developer',
      'Shopify POS app developer',
    ],
    heroPoints: ['APIs', 'POS', 'B2B', 'Payments'],
    fitHeading: 'Best fit',
    fit: [
      'The store needs a custom workflow that apps only partly solve.',
      'Shopify must connect with POS, ERP, Stripe, analytics, customer accounts, or back-office tools.',
      'You need the integration scoped around the actual business process, not generic automation.',
    ],
    problemTitle: 'Why integrations become fragile',
    problems: [
      'Apps solve one part of the workflow but leave staff handling the gaps manually.',
      'API events, customer data, payments, or inventory changes are not documented clearly.',
      'Custom app work is treated as a black box instead of an operational system.',
      'The theme, admin, and external tools disagree about the same customer or order state.',
    ],
    solutionTitle: 'What integration work should do',
    solutions: [
      'Clarify the source of truth across Shopify, apps, APIs, and operational tools.',
      'Build or connect only the workflow pieces that create meaningful operational leverage.',
      'Make edge cases visible before the integration is trusted in production.',
      'Document how the workflow should be monitored and maintained.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Integration map with systems, events, data, and ownership.',
      'Custom app, API, webhook, POS, or payment workflow implementation when scoped.',
      'Testing plan for data states, failure states, and staff workflows.',
      'Technical handoff notes for future maintenance.',
    ],
    outcomesTitle: 'Integration outcomes',
    outcomes: [
      'Less manual copying between Shopify and external systems.',
      'Clearer ownership of customer, order, product, and payment data.',
      'Custom workflows that staff can actually operate.',
      'Fewer app-stack workarounds inside the theme.',
    ],
    processTitle: 'Integration process',
    process: [
      {
        title: 'Define the source of truth',
        text: 'Identify which system owns each part of the workflow before writing code.',
      },
      {
        title: 'Build the smallest reliable connection',
        text: 'Keep the first integration scoped to the workflow that creates the most value.',
      },
      {
        title: 'Test operational edge cases',
        text: 'Review failures, retries, permissions, staff handoffs, and maintenance notes.',
      },
    ],
    referencesTitle: 'Relevant integration work',
    proofSlugs: ['rd-cosmetic', 'liberty-sleep', 'spinelli'],
    faq: [
      {
        question: 'Do you build custom Shopify apps?',
        answer:
          'Yes, when a custom app is the right solution. Some workflows are better handled through theme work, admin configuration, or lighter API scripts.',
      },
      {
        question: 'Can you connect Shopify to ERP or POS workflows?',
        answer:
          'Yes. Past work includes ERP quote payments, POS workflows, and custom processing flows around Shopify.',
      },
      {
        question: 'Can you audit an existing integration?',
        answer:
          'Yes. A focused bank can be used to map the workflow, identify risk, and decide whether to fix, replace, or simplify it.',
      },
    ],
    relatedSlugs: ['app-stack-operations', 'ecommerce-automation', 'cart-checkout-readiness'],
    ctaTitle: 'Connect the workflow without cluttering the store.',
    ctaText:
      'Scope the systems, edge cases, and business rules before the integration becomes another hidden dependency.',
    ctaPrimary: 'Book an integration call',
    ctaSecondary: 'See work',
  },
  {
    slug: 'performance-cleanup',
    group: 'shopifyWork',
    navLabel: 'Performance cleanup',
    title: 'Shopify performance cleanup focused on real storefront speed and stability.',
    eyebrow: 'Performance cleanup',
    metaTitle: 'Shopify Performance Cleanup | Speed, Scripts, Theme QA',
    metaDescription:
      'Shopify performance cleanup for theme code, scripts, apps, media, storefront stability, Core Web Vitals, and practical speed improvements.',
    summary:
      'Performance cleanup that looks at theme code, apps, scripts, media, layout, and storefront behavior together.',
    keywords: [
      'Shopify performance optimization',
      'Shopify speed optimization',
      'Shopify Core Web Vitals',
      'Shopify script cleanup',
    ],
    heroPoints: ['Scripts', 'Media', 'Theme code', 'Core flows'],
    fitHeading: 'Best fit',
    fit: [
      'The store feels slow, heavy, or unstable on important pages.',
      'Apps and scripts have accumulated over time.',
      'You need practical performance fixes, not just a score report.',
    ],
    problemTitle: 'Where performance issues hide',
    problems: [
      'Third-party apps and scripts load everywhere even when they only matter on one path.',
      'Theme sections, media, and layout choices create slow or unstable above-the-fold experiences.',
      'Performance reports identify symptoms without telling the merchant what to change.',
      'Speed work breaks storefront behavior because it is not tested against real buying flows.',
    ],
    solutionTitle: 'What gets optimized',
    solutions: [
      'Theme, media, script, and app-loading issues are reviewed together.',
      'High-impact fixes are prioritized around the pages that matter commercially.',
      'Performance work is tested against product, collection, cart, and campaign paths.',
      'Recommendations separate quick wins from larger architecture decisions.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Performance audit with prioritized fixes.',
      'Theme, script, asset, and app-loading cleanup.',
      'Before/after notes for key storefront paths.',
      'Ongoing recommendations for app and media hygiene.',
    ],
    outcomesTitle: 'Performance outcomes',
    outcomes: [
      'A lighter storefront on the pages that matter most.',
      'Less hidden app and script drag.',
      'Better stability for mobile browsing and campaign traffic.',
      'A clearer maintenance plan for future performance decisions.',
    ],
    processTitle: 'Performance cleanup process',
    process: [
      {
        title: 'Measure the real pages',
        text: 'Focus on home, PDP, collection, cart, and campaign paths instead of abstract performance work.',
      },
      {
        title: 'Remove or defer the right weight',
        text: 'Clean up theme assets, scripts, app loading, media, and layout issues where the payoff is clear.',
      },
      {
        title: 'Verify the buying flow',
        text: 'Check that speed improvements do not break storefront behavior, tracking, or conversion-critical UI.',
      },
    ],
    referencesTitle: 'Relevant performance work',
    proofSlugs: ['carpette-multi-design', 'consulis', 'sportive-plus'],
    faq: [
      {
        question: 'Will you guarantee a PageSpeed score?',
        answer:
          'No. The goal is practical storefront performance and stability. Scores are useful signals, but they should not replace commercial judgment.',
      },
      {
        question: 'Can app cleanup improve speed?',
        answer:
          'Often, yes. App overlap and sitewide script loading are common causes of avoidable storefront weight.',
      },
      {
        question: 'Can this be a small engagement?',
        answer:
          'Yes. A 5-hour bank can identify the highest-impact fixes. Implementation may need a larger scoped bank depending on the theme.',
      },
    ],
    relatedSlugs: ['theme-cleanup', 'app-stack-operations', 'shopify-theme-development'],
    ctaTitle: 'Make the store lighter where it matters.',
    ctaText:
      'Start with a practical audit and fix the performance issues that affect real browsing and buying paths.',
    ctaPrimary: 'Book a performance call',
    ctaSecondary: 'See pricing',
  },
  {
    slug: 'ecommerce-automation',
    group: 'shopifyWork',
    navLabel: 'Ecommerce automation',
    title: 'Ecommerce automation for Shopify workflows that keep coming back.',
    eyebrow: 'Ecommerce automation',
    metaTitle: 'Shopify Ecommerce Automation | Workflows, Scripts, Operations',
    metaDescription:
      'Shopify ecommerce automation for recurring admin workflows, product operations, customer workflows, notifications, scripts, and operational systems.',
    summary:
      'Automation work for recurring Shopify operations that should be more reliable than staff memory and less heavy than a full platform rebuild.',
    keywords: [
      'Shopify automation',
      'ecommerce automation',
      'Shopify workflow automation',
      'Shopify scripts developer',
    ],
    heroPoints: ['Admin workflows', 'Scripts', 'Notifications', 'Operations'],
    fitHeading: 'Best fit',
    fit: [
      'The team repeats the same Shopify admin or back-office work every week.',
      'Manual handoffs create mistakes in products, customers, orders, invoices, or notifications.',
      'You need a practical automation path before investing in a bigger system.',
    ],
    problemTitle: 'Where automation usually goes wrong',
    problems: [
      'Automation is added before the workflow is clearly understood.',
      'The store accumulates scripts that nobody owns or monitors.',
      'Staff still need manual checks because edge cases were ignored.',
      'The automation saves time in one place but creates confusion elsewhere.',
    ],
    solutionTitle: 'What good automation should do',
    solutions: [
      'Clarify the workflow, source of truth, triggers, failure states, and ownership before implementation.',
      'Automate only the recurring steps that are stable enough to trust.',
      'Use Shopify-native tools, lightweight scripts, custom apps, or external workflows based on fit.',
      'Document how the automation should be checked and changed later.',
    ],
    deliverablesTitle: 'Typical deliverables',
    deliverables: [
      'Workflow map with triggers, data, responsibilities, and edge cases.',
      'Automation implementation through Shopify, APIs, scripts, apps, or external tools.',
      'Testing plan for normal and failure states.',
      'Maintenance notes and next-step backlog.',
    ],
    outcomesTitle: 'Automation outcomes',
    outcomes: [
      'Less recurring admin work.',
      'Fewer manual mistakes across customer, order, product, or billing flows.',
      'Clearer ownership for scripts and automated workflows.',
      'A better base for ongoing technical support.',
    ],
    processTitle: 'Automation process',
    process: [
      {
        title: 'Stabilize the workflow first',
        text: 'Confirm the process is worth automating and clear enough to encode.',
      },
      {
        title: 'Choose the right tool',
        text: 'Use Shopify-native features, scripts, APIs, custom apps, or external automation only where they fit.',
      },
      {
        title: 'Leave monitoring notes',
        text: 'Document the trigger, expected result, failure checks, and future maintenance owner.',
      },
    ],
    referencesTitle: 'Relevant automation work',
    proofSlugs: ['spinelli', 'luc-vincent', 'barry'],
    faq: [
      {
        question: 'Can you automate Shopify admin work?',
        answer:
          'Yes, when the workflow is stable and the source of truth is clear. Some admin work should be simplified before it is automated.',
      },
      {
        question: 'Do automations require a custom app?',
        answer:
          'Not always. Some fit Shopify configuration or lightweight scripts. Others need a custom app or API workflow.',
      },
      {
        question: 'Can automation be part of a retainer?',
        answer:
          'Yes. Recurring automation maintenance is often a good fit for a monthly support retainer.',
      },
    ],
    relatedSlugs: ['app-integrations', 'app-stack-operations', 'cart-checkout-readiness'],
    ctaTitle: 'Automate the work that should not stay manual.',
    ctaText:
      'Map the workflow first, then ship the smallest reliable automation that reduces real operational drag.',
    ctaPrimary: 'Book an automation call',
    ctaSecondary: 'See retainers',
  },
];

const frenchServicePages: ServicePage[] = [
  {
    slug: 'storefront-systems',
    group: 'services',
    navLabel: 'Systemes storefront',
    title: 'Systemes storefront Shopify pour des parcours d achat plus clairs.',
    eyebrow: 'Systemes storefront',
    metaTitle: 'Systemes storefront Shopify | Developpeur Shopify Montreal',
    metaDescription:
      'Systemes storefront Shopify pour pages produits, collections, panier, merchandising, metafields et operations ecommerce plus maintenables.',
    summary:
      'Un travail structure sur PDP, collections, panier, metafields et logique de merchandising pour rendre la boutique plus facile a acheter et maintenir.',
    keywords: [
      'developpeur storefront Shopify',
      'developpeur pages produits Shopify',
      'merchandising Shopify',
      'UX panier Shopify',
    ],
    heroPoints: ['PDP', 'Collections', 'Panier UX', 'Metafields'],
    fitHeading: 'Bon contexte',
    fit: [
      'La boutique fonctionne, mais le parcours produit et achat semble assemble par patchs.',
      'Les regles de merchandising vivent entre theme, apps et habitudes admin.',
      'L equipe a besoin d un systeme plus propre avant campagnes, lancements ou croissance du catalogue.',
    ],
    problemTitle: 'La ou les systemes storefront se fragilisent',
    problems: [
      'Les pages produits cachent des informations cles ou compliquent le choix de variantes.',
      'Les collections dependent trop du tri manuel, de filtres confus ou de contournements de campagne.',
      'Le panier, les rabais, la livraison et les upsells ne racontent pas une histoire coherente.',
      'Les metafields existent, mais le theme ne les utilise pas de facon repetable.',
    ],
    solutionTitle: 'Ce qui est corrige',
    solutions: [
      'Structure PDP plus claire pour variantes, confiance, disponibilite, bundles et achat.',
      'Logique de collections qui supporte campagnes, priorites de merchandising, filtres et maintenance.',
      'Details panier et preparation checkout qui reduisent la confusion.',
      'Patterns de donnees Shopify reutilisables pour eviter les correctifs a chaque lancement.',
    ],
    deliverablesTitle: 'Livrables typiques',
    deliverables: [
      'Audit PDP et collections avec priorites de friction.',
      'Mises a jour theme pour produits, collections, panier et sections reutilisables.',
      'Recommandations de metafields et modele de contenu.',
      'Notes QA, checklist lancement et documentation de transfert.',
    ],
    outcomesTitle: 'Resultats commerciaux',
    outcomes: [
      'Meilleure comprehension produit avant ajout au panier.',
      'Moins de travail manuel avant campagnes.',
      'Plus de confiance dans les messages panier, rabais et livraison.',
      'Storefront plus facile a faire evoluer sans devenir fragile.',
    ],
    processTitle: 'Comment le travail avance',
    process: [
      {
        title: 'Cartographier le parcours d achat',
        text: 'Revoir produits, collections, recherche, panier, rabais et workflows admin.',
      },
      {
        title: 'Reconstruire les pieces repetables',
        text: 'Ameliorer sections, templates, metafields et logique theme pour supporter plusieurs cas.',
      },
      {
        title: 'Livrer avec notes operationnelles',
        text: 'Tester le parcours, documenter les changements et laisser des regles claires.',
      },
    ],
    referencesTitle: 'Travaux storefront pertinents',
    proofSlugs: ['kaos-lifestyle', 'mystea', 'maison-margan'],
    faq: [
      {
        question: 'Est-ce une refonte complete?',
        answer:
          'Pas par defaut. C est souvent un engagement cible qui ameliore le systeme d achat dans le theme actuel.',
      },
      {
        question: 'Est-ce que les metafields sont inclus?',
        answer:
          'Oui. Les systemes storefront demandent souvent code theme et structure de donnees admin.',
      },
      {
        question: 'Combien d heures prevoir?',
        answer:
          'Un audit peut commencer avec 5 heures. PDP, collections et panier demandent souvent une banque cadree de 10 a 40 heures.',
      },
    ],
    relatedSlugs: [
      'product-page-systems',
      'collection-merchandising',
      'cart-checkout-readiness',
    ],
    ctaTitle: 'Rendre la boutique plus facile a acheter.',
    ctaText:
      'Commencez par une revue ciblee et transformez la friction storefront en plan d implementation clair.',
    ctaPrimary: 'Reserver un appel storefront',
    ctaSecondary: 'Comparer les tarifs',
  },
  {
    slug: 'theme-cleanup',
    group: 'services',
    navLabel: 'Nettoyage de theme',
    title: 'Nettoyage de theme Shopify pour storefronts lents, fragiles et difficiles a changer.',
    eyebrow: 'Nettoyage de theme',
    metaTitle: 'Nettoyage de theme Shopify | Performance, sections, QA',
    metaDescription:
      'Nettoyage de theme Shopify pour templates lents, sections fragiles, code duplique, workflows de lancement brises et maintenance storefront.',
    summary:
      'Travail Shopify soigneux pour boutiques ou chaque campagne, section ou changement d app est devenu risquee ou trop lent.',
    keywords: [
      'nettoyage theme Shopify',
      'developpeur theme Shopify',
      'sections Shopify',
      'maintenance theme Shopify',
    ],
    heroPoints: ['Sections', 'Templates', 'Vitesse', 'QA'],
    fitHeading: 'Bon contexte',
    fit: [
      'Le theme fonctionne, mais chaque changement semble risque.',
      'Les lancements precedents ont laisse sections dupliquees, snippets inutilises ou residue d apps.',
      'L equipe veut une base plus calme avant campagnes, SEO ou conversion.',
    ],
    problemTitle: 'Problemes frequents de theme',
    problems: [
      'Les sections sont dupliquees au lieu d etre reutilisables.',
      'Les apps ont injecte markup, scripts ou settings qui ne refletent plus les operations.',
      'La performance vient d un melange de theme, medias, scripts et layouts.',
      'Les lancements demandent trop de QA manuel a cause de dependances cachees.',
    ],
    solutionTitle: 'Ce qui est nettoye',
    solutions: [
      'Sections, snippets et templates simplifies autour des workflows actuels.',
      'Code inutilise et residue d apps identifies et retires lorsque securitaire.',
      'Correctifs vitesse et UX priorises selon impact reel.',
      'Notes de test pour rendre les prochains lancements moins dependants de la memoire.',
    ],
    deliverablesTitle: 'Livrables typiques',
    deliverables: [
      'Audit theme avec carte de risques et backlog priorise.',
      'Ameliorations sections, templates, snippets et CSS.',
      'Revue de residue d apps et recommandations de retrait.',
      'Checklist QA pour produits, collections, panier et parcours cles.',
    ],
    outcomesTitle: 'Resultats operationnels',
    outcomes: [
      'Moins de sections fragiles et correctifs dupliques.',
      'Moins de risque lors des campagnes ou editions de templates.',
      'Storefront plus propre et maintenance plus simple.',
      'Meilleure base pour banques d heures ou retainers futurs.',
    ],
    processTitle: 'Processus de nettoyage',
    process: [
      {
        title: 'Auditer la surface theme',
        text: 'Revoir architecture, sections, templates, assets, apps et douleurs de lancement.',
      },
      {
        title: 'Corriger la friction a haut levier',
        text: 'Prioriser ce qui reduit le risque, ameliore la maintenance ou debloque le business.',
      },
      {
        title: 'Documenter les nouvelles regles',
        text: 'Laisser des notes pratiques sur les sections a utiliser et les patterns a eviter.',
      },
    ],
    referencesTitle: 'Travaux de nettoyage pertinents',
    proofSlugs: ['sportive-plus', 'pianos-bolduc', 'consulis'],
    faq: [
      {
        question: 'Faut-il refaire tout le theme?',
        answer:
          'Seulement si c est justifie. La plupart des nettoyages ciblent les pieces qui creent du risque ou ralentissent l equipe.',
      },
      {
        question: 'Pouvez-vous travailler dans un theme existant?',
        answer:
          'Oui. Le service est concu pour ameliorer des themes existants sans gros processus d agence.',
      },
      {
        question: 'La performance peut-elle s ameliorer?',
        answer:
          'Souvent, oui. Les scripts, sections, medias et layouts sont revus lorsque leur impact est visible.',
      },
    ],
    relatedSlugs: [
      'shopify-theme-development',
      'performance-cleanup',
      'storefront-systems',
    ],
    ctaTitle: 'Nettoyer le theme avant le prochain lancement.',
    ctaText:
      'Utilisez une petite banque pour l audit ou une banque plus large pour retirer la friction la plus risquee.',
    ctaPrimary: 'Reserver un appel nettoyage',
    ctaSecondary: 'Voir les tarifs',
  },
  {
    slug: 'app-stack-operations',
    group: 'services',
    navLabel: "Stack d'apps et operations",
    title: "Stack d apps Shopify et operations pour boutiques avec trop de pieces mobiles.",
    eyebrow: "Stack d'apps et operations",
    metaTitle: 'Stack d apps Shopify et operations | Integrations et automatisation',
    metaDescription:
      'Revue de stack d apps Shopify, integrations, analytics, fulfillment, automatisation et support operationnel pour equipes ecommerce.',
    summary:
      'Connexions pratiques entre apps, analytics, fulfillment, automatisations et admin pour rendre la boutique plus facile a operer.',
    keywords: [
      'integrations apps Shopify',
      'automatisation Shopify',
      'operations Shopify',
      'nettoyage stack apps Shopify',
    ],
    heroPoints: ['Apps', 'Automation', 'Analytics', 'Docs'],
    fitHeading: 'Bon contexte',
    fit: [
      'La boutique depend de trop d apps, scripts et workflows non documentes.',
      'Analytics, fulfillment, rabais, comptes ou courriel ne s alignent pas.',
      'L equipe a besoin de suivre tout le flux operationnel Shopify.',
    ],
    problemTitle: 'La ou les operations deviennent confuses',
    problems: [
      'Les apps se chevauchent ou creent des dependances cachees dans le theme.',
      'Les workflows vivent dans la memoire de l equipe au lieu de systemes clairs.',
      'Les analytics et evenements sont incomplets, dupliques ou difficiles a croire.',
      'Les scripts et integrations custom ne sont pas assez documentes.',
    ],
    solutionTitle: 'Ce qui est stabilise',
    solutions: [
      'Le chevauchement d apps est cartographie et reduit lorsque possible.',
      'Les workflows sont clarifies entre Shopify, apps, analytics, fulfillment et support.',
      'Les integrations custom sont cadrees autour de workflows reels.',
      'La documentation donne une source de verite apres livraison.',
    ],
    deliverablesTitle: 'Livrables typiques',
    deliverables: [
      'Audit stack d apps avec recommandations garder, remplacer, retirer ou custom.',
      'Correctifs d integration entre storefront, checkout-adjacent, analytics ou back-office.',
      'Scripts d automatisation ou docs pour travail admin recurrent.',
      'Notes de tracking et QA pour les flux qui touchent revenus ou operations.',
    ],
    outcomesTitle: 'Resultats operationnels',
    outcomes: [
      'Moins de chevauchement entre apps.',
      'Donnees et workflows plus fiables.',
      'Moins de friction technique lors des changements.',
      'Meilleur transfert entre marchand, developpeur et operations.',
    ],
    processTitle: 'Comment le travail est cadre',
    process: [
      {
        title: 'Tracer le workflow',
        text: 'Suivre les vrais chemins client, equipe, donnees et fulfillment.',
      },
      {
        title: 'Decider ce qui reste',
        text: 'Separer apps utiles, chevauchements, residue theme et workflows a customiser.',
      },
      {
        title: 'Livrer le systeme stable le plus simple',
        text: 'Implementer, documenter les regles et laisser les prochaines etapes.',
      },
    ],
    referencesTitle: 'Travaux operations pertinents',
    proofSlugs: ['sportive-plus', 'luc-vincent', 'spinelli'],
    faq: [
      {
        question: 'Retirez-vous des apps?',
        answer:
          'Seulement apres comprendre les dependances. L objectif est une stack plus securitaire, pas retirer a l aveugle.',
      },
      {
        question: 'Les analytics peuvent-ils etre inclus?',
        answer:
          'Oui. Le tracking peut faire partie du travail lorsque sa qualite affecte ads, conversion ou decisions.',
      },
      {
        question: 'Est-ce un bon fit pour support mensuel?',
        answer:
          'Oui. Ce type de travail devient souvent un retainer lorsque la boutique demande un suivi stable.',
      },
    ],
    relatedSlugs: ['app-integrations', 'ecommerce-automation', 'performance-cleanup'],
    ctaTitle: 'Rendre la stack operationnelle plus fiable.',
    ctaText:
      'Cartographiez les workflows qui ralentissent l equipe, puis corrigez les pieces les plus risquees.',
    ctaPrimary: 'Reserver un appel operations',
    ctaSecondary: 'Voir les retainers',
  },
];

const capabilityTranslations: Record<string, Partial<ServicePage>> = {
  'shopify-theme-development': {
    navLabel: 'Developpement de themes Shopify',
    title: 'Developpement de theme Shopify pour sections custom et lancements maintenables.',
    eyebrow: 'Developpement de theme Shopify',
    metaTitle: 'Developpement de theme Shopify | Sections et storefronts',
    metaDescription:
      'Developpement de theme Shopify pour sections, templates, lancements, migrations, B2B et experiences ecommerce maintenables.',
    summary:
      'Developpement de theme Shopify pour boutiques qui ont besoin de sections, templates et comportements storefront precis sans processus d agence lourd.',
    heroPoints: ['Sections custom', 'Templates theme', 'QA lancement', 'Storefronts B2B'],
    fit: [
      'Vous avez besoin de travail theme Shopify custom qui respecte la marque et les operations.',
      'La boutique a depasse les sections par defaut ou les patchs d apps.',
      'Un lancement, une migration ou une campagne demande un developpeur capable de livrer et tester.',
    ],
    problems: [
      'Les sections custom sont construites pour une campagne au lieu d etre reutilisables.',
      'Les edits theme reglent le visuel mais ignorent contenu, donnees et QA.',
      'Le lancement part sans rollback, tests ou notes de transfert claires.',
      'Les regles B2B, wholesale ou catalogue complexe sont forcees dans des templates visuels.',
    ],
    solutions: [
      'Sections theme modifiables par le marchand, contraintes et reutilisables.',
      'Templates qui supportent le vrai catalogue, le contenu et les exigences de comptes.',
      'QA de lancement sur desktop, mobile, produit, collection et panier.',
      'Notes techniques qui rendent la prochaine modification plus simple.',
    ],
    deliverables: [
      'Sections, templates, snippets et settings Shopify custom.',
      'Support implementation migration ou lancement.',
      'Logique storefront B2B ou account-aware lorsque necessaire.',
      'Checklist QA et notes de transfert.',
    ],
    outcomes: [
      'Plus de campagnes supportees avec moins de hacks.',
      'Controls plus clairs dans l editeur de theme Shopify.',
      'Moins de surprises sur les parcours d achat critiques.',
      'Theme plus facile a maintenir apres livraison.',
    ],
    process: [
      {
        title: 'Definir le pattern reutilisable',
        text: 'Transformer la demande en sections, settings et templates utiles pour plus qu une page.',
      },
      {
        title: 'Construire dans les contraintes Shopify',
        text: 'Utiliser Liquid, metafields, assets propres et conventions theme sans complexite inutile.',
      },
      {
        title: 'QA du vrai storefront',
        text: 'Tester les chemins que les marchands et clients utilisent vraiment avant transfert.',
      },
    ],
    faq: [
      {
        question: 'Pouvez-vous construire des sections Shopify custom?',
        answer:
          'Oui. Les sections custom donnent du controle au marchand sans multiplier les templates rigides.',
      },
      {
        question: 'Travaillez-vous sur les themes Shopify 2.0?',
        answer:
          'Oui. Le travail suit les patterns modernes: sections, templates JSON, metafields et snippets reutilisables.',
      },
      {
        question: 'Pouvez-vous supporter une migration?',
        answer:
          'Oui. Le support peut inclure theme, redirections, structure de contenu, logique B2B et QA lancement.',
      },
    ],
    ctaTitle: 'Construire le travail theme vraiment necessaire.',
    ctaText:
      'Cadrez une banque d heures pour sections custom, lancement ou developpement theme Shopify maintenable.',
    ctaPrimary: 'Cadrer le travail theme',
    ctaSecondary: 'Voir les projets',
  },
  'product-page-systems': {
    navLabel: 'Systemes de pages produits',
    title: 'Systemes de pages produits Shopify qui rendent la decision plus simple.',
    eyebrow: 'Systemes de pages produits',
    metaTitle: 'Developpement pages produits Shopify | Systemes PDP',
    metaDescription:
      'Developpement de pages produits Shopify pour structure PDP, variantes, bundles, confiance, metafields et conversion.',
    summary:
      'Systemes PDP pour produits avec variantes, contenu ou operations complexes qui demandent plus de confiance avant achat.',
    heroPoints: ['Variantes', 'Confiance', 'Bundles', 'Metafields'],
    fit: [
      'Les clients posent des questions que la PDP devrait deja repondre.',
      'Variantes, bundles, abonnements ou conditions produit rendent l achat confus.',
      'La page produit change souvent et doit devenir repetable.',
    ],
    problems: [
      'La logique de variantes cache disponibilite, prix, inventaire ou regles d achat.',
      'Le contenu important reste dans de longues descriptions non structurees.',
      'Confiance, livraison, tailles ou compatibilite apparaissent de facon inegale.',
      'Bundles, abonnements ou plans de vente semblent ajoutes par-dessus.',
    ],
    solutions: [
      'Hierarchie plus claire pour decisions, objections et confiance add-to-cart.',
      'Sections reutilisables alimentees par metafields, metaobjects, tags ou settings theme.',
      'Logique variantes et bundles plus facile a tester et maintenir.',
      'Matrice QA pour sold out, solde, B2B, bundles et abonnements.',
    ],
    deliverables: [
      'Audit PDP et carte de friction conversion.',
      'Travail theme sur templates produits, sections et comportement variantes.',
      'Modele metafields pour contenu produit.',
      'Matrice QA pour etats produits et conditions d achat.',
    ],
    outcomes: [
      'Comprehension produit plus rapide.',
      'Objections traitees plus uniformement.',
      'Add-to-cart plus clair entre types de produits.',
      'Moins d editions theme manuelles pour futurs lancements produits.',
    ],
    process: [
      {
        title: 'Inventorier les etats produits',
        text: 'Revoir produits, variantes, selling plans, bundles, contenu et edge cases.',
      },
      {
        title: 'Designer le modele de contenu',
        text: 'Decider ce qui vit dans settings theme, donnees produit, metafields, metaobjects ou apps.',
      },
      {
        title: 'Implementer et tester',
        text: 'Livrer le systeme PDP avec QA sur de vrais scenarios produits.',
      },
    ],
    faq: [
      {
        question: 'Les metafields produits sont-ils inclus?',
        answer:
          'Oui. Les metafields gardent le contenu PDP structure et modifiable par le marchand.',
      },
      {
        question: 'Pouvez-vous corriger des bugs de variantes?',
        answer:
          'Oui. La logique de variantes est frequente lorsque prix, disponibilite, bundles ou medias changent selon la selection.',
      },
      {
        question: 'Est-ce compatible avec le B2B?',
        answer:
          'Oui. Le systeme peut inclure contenu account-aware, prix caches et regles client.',
      },
    ],
    ctaTitle: 'Rendre les decisions produits plus simples.',
    ctaText:
      'Commencez par une revue PDP et transformez la logique confuse en systeme d achat clair.',
    ctaPrimary: 'Reserver un appel PDP',
    ctaSecondary: 'Comparer les tarifs',
  },
  'collection-merchandising': {
    navLabel: 'Merchandising de collections',
    title: 'Merchandising de collections Shopify pour une decouverte produit plus claire.',
    eyebrow: 'Merchandising de collections',
    metaTitle: 'Merchandising collections Shopify | Filtres et campagnes',
    metaDescription:
      'Merchandising de collections Shopify pour filtres, tri, landing pages, grilles produits, contenu SEO et decouverte.',
    summary:
      'Systemes de collections pour boutiques qui ont besoin de meilleure decouverte produit, campagnes plus propres et moins de tri manuel.',
    heroPoints: ['Filtres', 'Tri', 'Campagnes', 'Grilles produits'],
    fit: [
      'Les clients arrivent sur les collections sans trouver vite le bon produit.',
      'Les pages campagnes sont reconstruites manuellement chaque fois.',
      'Filtres, ordre, tags et merchandising manquent de coherence.',
    ],
    problems: [
      'Les collections ressemblent a des listes produits au lieu de guider l achat.',
      'Les valeurs de filtres, tags et donnees produits sont incoherentes.',
      'Le tri manuel rend les campagnes longues a lancer et repeter.',
      'Le contenu collection ne supporte pas assez SEO et intention d achat.',
    ],
    solutions: [
      'Template collection plus clair avec hierarchie, filtres et cartes produits utiles.',
      'Logique de merchandising pour produits en vedette, campagnes et priorites saisonnieres.',
      'Regles de donnees produits pour filtres et collections automatiques.',
      'Contenu SEO qui supporte l intention sans alourdir la grille.',
    ],
    deliverables: [
      'Audit collections et friction de decouverte.',
      'Mises a jour theme pour grilles, cartes, filtres et blocs merchandising.',
      'Regles tags, metafields, filtres et setup campagnes.',
      'Checklist QA pour etats de collection.',
    ],
    outcomes: [
      'Gammes produits comprises plus vite.',
      'Moins d effort manuel pour les campagnes.',
      'Filtres et contenu collection plus fiables.',
      'SEO supporte sans cacher la grille produits.',
    ],
    process: [
      {
        title: 'Revoir les parcours de decouverte',
        text: 'Analyser navigation, recherche, collections, filtres, tags et cartes produits ensemble.',
      },
      {
        title: 'Corriger template et regles data',
        text: 'Ameliorer l interface tout en clarifiant les donnees requises.',
      },
      {
        title: 'Tester campagnes et edge cases',
        text: 'QA filtres vides, sold out, soldes et landing pages campagne.',
      },
    ],
    faq: [
      {
        question: 'Le SEO collection peut-il etre inclus?',
        answer:
          'Oui. Les collections demandent souvent amelioration de decouverte et contenu d intention recherche.',
      },
      {
        question: 'Pouvez-vous corriger les filtres?',
        answer:
          'Oui. Le travail peut inclure UI, Search and Discovery, tags, metafields et regles de donnees.',
      },
      {
        question: 'Est-ce utile pour les campagnes?',
        answer:
          'Oui. Un meilleur systeme rend les pages campagnes plus faciles a creer, tester et reutiliser.',
      },
    ],
    ctaTitle: 'Rendre la decouverte produit plus simple.',
    ctaText:
      'Transformez les collections en vrais parcours d achat au lieu de grilles manuelles.',
    ctaPrimary: 'Reserver un appel merchandising',
    ctaSecondary: 'Voir les projets',
  },
  'cart-checkout-readiness': {
    navLabel: 'Panier et preparation checkout',
    title: 'Panier Shopify et preparation checkout avant que la friction devienne normale.',
    eyebrow: 'Panier et preparation checkout',
    metaTitle: 'UX panier Shopify et preparation checkout',
    metaDescription:
      'Travail Shopify sur panier, cart drawer, rabais, livraison, upsells, regles B2B et QA de lancement.',
    summary:
      'Travail panier et checkout-adjacent pour boutiques ou rabais, livraison, upsells ou regles d achat creent de la confusion.',
    heroPoints: ['Cart drawer', 'Rabais', 'Livraison', 'QA lancement'],
    fit: [
      'Les clients atteignent le panier mais ont encore besoin de reassurance.',
      'Rabais, seuils livraison, bundles ou upsells rendent le total confus.',
      'Un lancement ou une campagne demande une QA checkout-adjacent avant le trafic.',
    ],
    problems: [
      'Le cart drawer n explique pas clairement totaux, rabais, livraison ou prochaine etape.',
      'Les promotions et rabais custom creent des attentes incoherentes.',
      'Les upsells ou bundles deviennent bruyants au lieu d aider.',
      'Les flux checkout-adjacent ne sont pas testes sur de vrais scenarios campagne.',
    ],
    solutions: [
      'Messages panier plus clairs sur rabais, livraison, checkout et prochaines etapes.',
      'Correctifs theme et scripts pour cart drawer, line items, bundles et etats promo.',
      'Scenarios QA pour campagnes, B2B, codes rabais et edge cases.',
      'Notes sur ce qui se change dans Shopify admin versus code.',
    ],
    deliverables: [
      'Audit panier et readiness checkout.',
      'Correctifs cart drawer, cart page, line item et messages rabais.',
      'Checklist QA promotions et lancement.',
      'Notes techniques sur limites checkout-adjacent.',
    ],
    outcomes: [
      'Plus de confiance avant checkout.',
      'Moins de questions support sur rabais et livraison.',
      'Flux campagne plus securitaires.',
      'Meilleure distinction entre limites checkout Shopify et ameliorations theme.',
    ],
    process: [
      {
        title: 'Tracer le chemin revenu',
        text: 'Revoir add-to-cart, drawer, cart page, rabais, livraison et handoff checkout.',
      },
      {
        title: 'Corriger la confusion visible',
        text: 'Ameliorer messages, line items, etats promo et logique panier controlee par le theme.',
      },
      {
        title: 'QA des scenarios lancement',
        text: 'Tester les combinaisons qui risquent de casser pendant campagnes et ventes.',
      },
    ],
    faq: [
      {
        question: 'Pouvez-vous customiser Shopify checkout?',
        answer:
          'Ca depend du plan Shopify et des limites de la plateforme. Ce service vise surtout la readiness et le checkout-adjacent.',
      },
      {
        question: 'Pouvez-vous corriger l affichage des rabais?',
        answer:
          'Oui. La clarte rabais touche souvent messages panier, line items, theme logic et QA promotions.',
      },
      {
        question: 'Le B2B peut-il etre inclus?',
        answer:
          'Oui. Paiements de soumissions, prix caches, comptes clients et flux custom peuvent etre cadres.',
      },
    ],
    ctaTitle: 'Nettoyer le dernier mile avant checkout.',
    ctaText:
      'Utilisez une banque ciblee pour clarifier panier, rabais et risques de lancement.',
    ctaPrimary: 'Reserver un appel panier',
    ctaSecondary: 'Comparer les tarifs',
  },
  'app-integrations': {
    navLabel: "Integrations d'apps",
    title: 'Integrations Shopify qui connectent la boutique sans ajouter de clutter.',
    eyebrow: "Integrations d'apps",
    metaTitle: 'Integrations apps Shopify | APIs, POS, B2B',
    metaDescription:
      'Integrations Shopify pour apps custom, APIs, POS, B2B, paiements, analytics et operations ecommerce.',
    summary:
      'Travail d integration pour connecter Shopify, apps, APIs, comptes clients, POS, paiements ou operations proprement.',
    heroPoints: ['APIs', 'POS', 'B2B', 'Paiements'],
    fit: [
      'La boutique a besoin d un workflow custom que les apps reglent seulement en partie.',
      'Shopify doit se connecter a POS, ERP, Stripe, analytics, comptes ou back-office.',
      'L integration doit suivre le vrai processus business.',
    ],
    problems: [
      'Les apps reglent une partie et laissent l equipe combler les trous manuellement.',
      'Evenements API, donnees clients, paiements ou inventaire ne sont pas documentes.',
      'Le custom app devient une boite noire au lieu d un systeme operationnel.',
      'Theme, admin et outils externes ne s entendent pas sur le meme etat.',
    ],
    solutions: [
      'Clarifier la source de verite entre Shopify, apps, APIs et outils operations.',
      'Construire seulement les pieces qui creent un vrai levier operationnel.',
      'Rendre les edge cases visibles avant la production.',
      'Documenter monitoring et maintenance du workflow.',
    ],
    deliverables: [
      'Carte integration avec systemes, evenements, donnees et ownership.',
      'Implementation custom app, API, webhook, POS ou paiement lorsque cadre.',
      'Plan de tests pour etats normaux, erreurs et workflows equipe.',
      'Notes techniques pour maintenance future.',
    ],
    outcomes: [
      'Moins de copie manuelle entre Shopify et autres systemes.',
      'Ownership plus clair des donnees client, commande, produit et paiement.',
      'Workflows custom utilisables par l equipe.',
      'Moins de contournements dans le theme.',
    ],
    process: [
      {
        title: 'Definir la source de verite',
        text: 'Identifier quel systeme possede chaque partie du workflow avant de coder.',
      },
      {
        title: 'Construire la connexion fiable la plus petite',
        text: 'Limiter la premiere integration au workflow qui cree le plus de valeur.',
      },
      {
        title: 'Tester les edge cases operationnels',
        text: 'Revoir erreurs, retries, permissions, handoffs equipe et notes maintenance.',
      },
    ],
    faq: [
      {
        question: 'Construisez-vous des apps Shopify custom?',
        answer:
          'Oui lorsque c est le bon choix. Certains workflows sont mieux servis par theme, admin ou scripts legers.',
      },
      {
        question: 'Pouvez-vous connecter Shopify a ERP ou POS?',
        answer:
          'Oui. Des travaux passes incluent paiements ERP, POS et flux de traitement custom.',
      },
      {
        question: 'Pouvez-vous auditer une integration existante?',
        answer:
          'Oui. Une banque ciblee peut cartographier le workflow et decider quoi corriger, remplacer ou simplifier.',
      },
    ],
    ctaTitle: 'Connecter le workflow sans clutter.',
    ctaText:
      'Cadrez les systemes, edge cases et regles business avant que l integration devienne une dependance cachee.',
    ctaPrimary: 'Reserver un appel integration',
    ctaSecondary: 'Voir les projets',
  },
  'performance-cleanup': {
    navLabel: 'Nettoyage performance',
    title: 'Nettoyage performance Shopify axe sur vitesse reelle et stabilite storefront.',
    eyebrow: 'Nettoyage performance',
    metaTitle: 'Nettoyage performance Shopify | Vitesse et scripts',
    metaDescription:
      'Nettoyage performance Shopify pour theme, scripts, apps, medias, stabilite storefront et Core Web Vitals.',
    summary:
      'Nettoyage performance qui regarde theme, apps, scripts, medias, layout et comportement storefront ensemble.',
    heroPoints: ['Scripts', 'Medias', 'Code theme', 'Parcours cles'],
    fit: [
      'La boutique semble lente, lourde ou instable sur les pages importantes.',
      'Apps et scripts se sont accumules avec le temps.',
      'Vous voulez des correctifs pratiques, pas seulement un rapport de score.',
    ],
    problems: [
      'Les scripts tiers chargent partout meme s ils servent un seul parcours.',
      'Sections, medias et layouts ralentissent ou destabilisent le haut de page.',
      'Les rapports montrent des symptomes sans priorites marchandes.',
      'Le travail vitesse casse le comportement storefront faute de QA reelle.',
    ],
    solutions: [
      'Theme, medias, scripts et apps sont revus ensemble.',
      'Les correctifs a fort impact sont priorises sur les pages commerciales.',
      'La performance est testee sur produits, collections, panier et campagnes.',
      'Les recommandations separent quick wins et decisions architecture.',
    ],
    deliverables: [
      'Audit performance avec correctifs priorises.',
      'Nettoyage theme, scripts, assets et loading apps.',
      'Notes avant/apres pour parcours storefront cles.',
      'Recommandations d hygiene apps et medias.',
    ],
    outcomes: [
      'Storefront plus leger sur les pages importantes.',
      'Moins de poids cache d apps et scripts.',
      'Meilleure stabilite mobile et campagne.',
      'Plan de maintenance plus clair pour la performance.',
    ],
    process: [
      {
        title: 'Mesurer les vraies pages',
        text: 'Prioriser home, PDP, collections, panier et campagnes.',
      },
      {
        title: 'Retirer ou deferer le bon poids',
        text: 'Nettoyer assets, scripts, app loading, medias et layouts lorsque le gain est clair.',
      },
      {
        title: 'Verifier le parcours d achat',
        text: 'S assurer que les gains vitesse ne brisent pas UI, tracking ou conversion.',
      },
    ],
    faq: [
      {
        question: 'Garantissez-vous un score PageSpeed?',
        answer:
          'Non. L objectif est la performance et stabilite reelles. Les scores sont utiles, mais ne remplacent pas le jugement commercial.',
      },
      {
        question: 'Le nettoyage d apps peut-il aider?',
        answer:
          'Souvent, oui. Le chevauchement d apps et le chargement global de scripts ajoutent du poids inutile.',
      },
      {
        question: 'Est-ce possible en petite banque?',
        answer:
          'Oui. Une banque 5 h peut identifier les correctifs cles. L implementation peut demander plus selon le theme.',
      },
    ],
    ctaTitle: 'Alleger la boutique la ou ca compte.',
    ctaText:
      'Commencez par un audit pratique et corrigez ce qui affecte les vrais parcours d achat.',
    ctaPrimary: 'Reserver un appel performance',
    ctaSecondary: 'Voir les tarifs',
  },
  'ecommerce-automation': {
    navLabel: 'Automatisation ecommerce',
    title: 'Automatisation ecommerce pour workflows Shopify qui reviennent sans cesse.',
    eyebrow: 'Automatisation ecommerce',
    metaTitle: 'Automatisation Shopify ecommerce | Workflows et operations',
    metaDescription:
      'Automatisation Shopify pour workflows admin recurrents, operations produits, clients, notifications, scripts et systemes.',
    summary:
      'Travail d automatisation pour operations Shopify recurrentes qui doivent etre plus fiables que la memoire equipe.',
    heroPoints: ['Workflows admin', 'Scripts', 'Notifications', 'Operations'],
    fit: [
      'L equipe repete le meme travail Shopify ou back-office chaque semaine.',
      'Les handoffs manuels creent des erreurs produits, clients, commandes ou factures.',
      'Vous voulez une automatisation pratique avant un gros systeme.',
    ],
    problems: [
      'L automatisation est ajoutee avant de comprendre le workflow.',
      'La boutique accumule des scripts que personne ne possede.',
      'L equipe doit encore verifier manuellement car les edge cases sont ignores.',
      'L automatisation sauve du temps quelque part mais cree de la confusion ailleurs.',
    ],
    solutions: [
      'Clarifier workflow, source de verite, triggers, erreurs et ownership avant implementation.',
      'Automatiser seulement les etapes recurrentes assez stables pour etre fiables.',
      'Choisir Shopify natif, scripts, apps custom ou outils externes selon le fit.',
      'Documenter comment verifier et changer l automatisation.',
    ],
    deliverables: [
      'Carte workflow avec triggers, donnees, responsabilites et edge cases.',
      'Implementation via Shopify, APIs, scripts, apps ou outils externes.',
      'Plan de tests pour etats normaux et erreurs.',
      'Notes maintenance et backlog prochaines etapes.',
    ],
    outcomes: [
      'Moins de travail admin recurrent.',
      'Moins d erreurs manuelles entre clients, commandes, produits ou facturation.',
      'Ownership plus clair des scripts et workflows automatises.',
      'Meilleure base pour support technique continu.',
    ],
    process: [
      {
        title: 'Stabiliser le workflow',
        text: 'Confirmer que le processus vaut la peine d etre automatise et qu il est clair.',
      },
      {
        title: 'Choisir le bon outil',
        text: 'Utiliser Shopify, scripts, APIs, apps custom ou automation externe seulement lorsque pertinent.',
      },
      {
        title: 'Laisser des notes de monitoring',
        text: 'Documenter trigger, resultat attendu, checks d erreur et ownership.',
      },
    ],
    faq: [
      {
        question: 'Pouvez-vous automatiser du travail admin Shopify?',
        answer:
          'Oui lorsque le workflow est stable et la source de verite claire. Certains processus doivent etre simplifies avant automation.',
      },
      {
        question: 'Faut-il une app custom?',
        answer:
          'Pas toujours. Certains cas se reglent par configuration Shopify ou scripts legers, d autres par app ou API.',
      },
      {
        question: 'Est-ce compatible avec un retainer?',
        answer:
          'Oui. La maintenance d automatisations est souvent un bon fit pour un retainer mensuel.',
      },
    ],
    ctaTitle: 'Automatiser ce qui ne devrait pas rester manuel.',
    ctaText:
      'Cartographiez le workflow puis livrez la plus petite automatisation fiable qui retire une vraie friction.',
    ctaPrimary: 'Reserver un appel automation',
    ctaSecondary: 'Voir les retainers',
  },
};

const frenchCapabilityPages: ServicePage[] = englishServicePages
  .filter((page) => page.group === 'shopifyWork')
  .map((page) => {
    const translation = capabilityTranslations[page.slug] ?? {};

    return {
      ...page,
      ...translation,
      summary:
        translation.summary ??
        page.summary
          .replace('Custom Shopify theme development', 'Developpement Shopify custom')
          .replace('Integration work', 'Travail d integration')
          .replace('Performance cleanup', 'Nettoyage performance')
          .replace('Automation work', 'Travail d automatisation'),
      keywords: page.keywords.map((keyword) =>
        keyword.replace('Shopify', 'Shopify').replace('developer', 'developpeur'),
      ),
      fitHeading: 'Bon contexte',
      problemTitle: 'Problemes frequents',
      solutionTitle: 'Ce qui est corrige',
      deliverablesTitle: 'Livrables typiques',
      outcomesTitle: 'Resultats attendus',
      processTitle: 'Processus',
      referencesTitle: 'Travaux pertinents',
      ctaTitle: translation.ctaTitle ?? page.ctaTitle,
      ctaText: translation.ctaText ?? page.ctaText,
      faq: page.faq.map((faq) => ({
        question: faq.question,
        answer: faq.answer,
      })),
    };
  });

const localizedServicePages: Record<LanguageCode, ServicePage[]> = {
  en: englishServicePages,
  fr: [...frenchServicePages, ...frenchCapabilityPages],
};

export function getServicePages(language: LanguageCode = 'en') {
  return localizedServicePages[language];
}

export function getServicePageByHandle(
  handle: string | undefined,
  language: LanguageCode = 'en',
) {
  if (!handle) return undefined;
  return getServicePages(language).find((service) => service.slug === handle);
}

export function getServicePageSummaries(
  language: LanguageCode = 'en',
  group?: ServicePageGroup,
) {
  return getServicePages(language)
    .filter((service) => (group ? service.group === group : true))
    .map(({slug, navLabel, title, summary, group: serviceGroup}) => ({
      slug,
      navLabel,
      title,
      summary,
      group: serviceGroup,
      href: `/services/${slug}`,
    }));
}

export function getRelatedServicePages(
  service: ServicePage,
  language: LanguageCode = 'en',
) {
  return service.relatedSlugs
    .map((slug) => getServicePageByHandle(slug, language))
    .filter((item): item is ServicePage => Boolean(item));
}

export function getServiceReferences(
  service: ServicePage,
  language: LanguageCode = 'en',
) {
  const workItems = getWorkItems(language);
  return service.proofSlugs
    .map((slug) => workItems.find((item) => item.slug === slug))
    .filter((item): item is (typeof workItems)[number] => Boolean(item));
}

export function buildServiceStructuredData({
  service,
  siteUrl,
  language = 'en',
}: {
  service: ServicePage;
  siteUrl: string;
  language?: LanguageCode;
}) {
  const baseUrl = siteUrl.replace(/\/$/, '');
  const url = `${baseUrl}${language === 'fr' ? '/fr' : ''}/services/${service.slug}`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: service.title,
        serviceType: service.navLabel,
        description: service.metaDescription,
        url,
        inLanguage: language === 'fr' ? 'fr-CA' : 'en-CA',
        provider: {
          '@type': 'Person',
          '@id': `${baseUrl}/#person`,
          name: siteConfig.name,
          email: siteConfig.defaultContactEmail,
          jobTitle: language === 'fr' ? 'Developpeur Shopify' : 'Shopify Developer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: siteConfig.location.city,
            addressRegion: siteConfig.location.region,
            addressCountry: siteConfig.location.country,
          },
        },
        areaServed: [
          {'@type': 'City', name: 'Montreal'},
          {'@type': 'Country', name: 'Canada'},
          {'@type': 'Place', name: 'Remote Shopify merchants'},
        ],
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'CAD',
          lowPrice: '1000',
          highPrice: '5000',
          offerCount: '3',
          availability: 'https://schema.org/InStock',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name:
            language === 'fr'
              ? 'Banques d heures et retainers Shopify'
              : 'Shopify bank-of-hours and retainers',
          itemListElement: [
            {
              '@type': 'Offer',
              name: language === 'fr' ? "Banque d heures 5 h" : '5-hour bank',
              price: '1000',
              priceCurrency: 'CAD',
            },
            {
              '@type': 'Offer',
              name: language === 'fr' ? "Banque d heures 40 h" : '40-hour bank',
              price: '5000',
              priceCurrency: 'CAD',
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'fr' ? 'Accueil' : 'Home',
            item: `${baseUrl}${language === 'fr' ? '/fr' : ''}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Services',
            item: `${baseUrl}${language === 'fr' ? '/fr' : ''}/services`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.navLabel || service.title,
            item: url,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        mainEntity: service.faq.map((faq) => ({
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
