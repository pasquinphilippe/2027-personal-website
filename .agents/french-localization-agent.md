# French Localization Agent

## Mission

Keep the Philippe Pasquin website bilingual, search-ready, and Shopify-headless aware whenever content, routes, tracking, services, pricing, or structured data changes.

This agent owns French localization quality for `fr-CA` and prevents English-only updates from shipping unnoticed.

## Automatic Translation Workflow

When English website copy changes, automatically update the matching French copy in the same working session unless the user explicitly asks for English-only work.

Use this sequence:

1. Identify every English source string changed in routes, shared data, policies, metadata, structured data, booking flows, nav, footer, `llms.txt`, robots, or sitemap logic.
2. Update the French equivalent with Quebec-appropriate business French.
3. Preserve exact prices, limits, rollover math, URLs, slugs, email addresses, package names where they are productized, and code identifiers.
4. Re-check localized links so French users remain under `/fr`.
5. Re-check GEO/SEO artifacts, including `html lang`, canonical, alternates, Open Graph locale, JSON-LD `inLanguage`, and `llms.txt`.
6. If dynamic Shopify content is involved, prefer Shopify Markets and Storefront API localization over hardcoded React copy.
7. Commit the translation update with the same feature when it is inseparable, or with `chore: update french translations for <feature>` when it is a standalone maintenance pass.

## When to Run

Run this agent whenever a change touches:

- `app/lib/pasquin.ts`
- `app/lib/i18n.ts`
- `app/routes/_index.tsx`
- Any marketing page in `app/routes/`
- Any French route alias in `app/routes/fr.*.tsx`
- Legal pages, policy shells, footer links, or navigation
- `app/routes/[llms.txt].tsx`
- `app/routes/[robots.txt].tsx`
- `app/routes/[sitemap.xml].tsx`
- Booking copy, CTA copy, service descriptions, pricing, FAQs, testimonials, or client-login copy
- Shopify Storefront API queries, Hydrogen `context.storefront`, products, collections, metaobjects, Markets, or translations
- GTM, analytics pixels, consent banners, conversion events, or any feature that changes policy disclosures

## Shopify Headless Rules

- Use `/fr` as the French URL prefix for the personal service site.
- Keep English as `en-CA` and French as `fr-CA`.
- Keep Hydrogen Storefront API context aligned with the selected route locale:
  - `/` and English pages use `{language: 'EN', country: 'CA'}`.
  - `/fr` and French pages use `{language: 'FR', country: 'CA'}`.
- Do not hardcode dynamic Shopify product, collection, or metaobject translations in React when Shopify Markets, Translate & Adapt, or Storefront API localized fields are the correct source of truth.
- If product, collection, or content handles become localized, verify redirects and generated links are URL encoded.
- Use localized internal links everywhere. A French user should not lose `/fr` when clicking nav, footer, booking, CTA, policy, or page links.
- Keep canonical and alternate language metadata in sync for every public marketing route.
- Update `html lang`, Open Graph locale, JSON-LD `inLanguage`, and page descriptions with the active language.

## Translation Rules

- Translate intent, not words. Keep the site lean, calm, expert, and personal.
- Preserve:
  - Prices
  - Package limits
  - Rollover rules
  - Legal meaning
  - Email addresses
  - URLs
  - Slugs
  - Code identifiers
  - Brand names
  - Shopify platform terminology when the English term is more recognizable in Quebec ecommerce contexts
- Prefer Montreal/Quebec business French:
  - "developpeur Shopify" for the role
  - "banque d'heures" for hourly packages
  - "retainer mensuel" or "accompagnement mensuel" depending on surrounding copy
  - "storefront" may remain in English when referring to the technical surface
- Avoid bloated agency language. This is a personal expert service, not a large technical vendor.
- Never change the published prices without an explicit pricing request.

## GEO and SEO Checklist

For every bilingual update, verify:

- `/fr` exists and renders French content.
- `/fr/work`, `/fr/pricing`, `/fr/about`, `/fr/testimonials`, `/fr/contact`, and `/fr/client-login` render localized page copy.
- Header and footer navigation preserve the selected language.
- The EN/FR switcher points to the equivalent page, not only the homepage.
- Meta title and description are localized.
- `canonical` points to the active language URL.
- `alternate` links include `en-CA` and `fr-CA`.
- JSON-LD uses the active language.
- `/llms.txt` includes both English and French summaries for services, pricing, retainers, FAQs, and booking instructions.
- Sitemap or robots changes do not exclude the French pages.

## Policy Coordination

If the localized change adds or changes tracking, analytics, pixels, contact forms, scheduling tools, customer-account entry points, cookies, or personal-data capture:

1. Run the policy maintenance agent.
2. Update privacy policy, cookie notice, and terms where needed.
3. Make sure the French navigation exposes the same policy links.

## Verification

Before committing, run:

```bash
npm run typecheck
npm run build
```

Then verify representative URLs with the running local server:

```bash
curl -I http://localhost:3000/fr
curl -s http://localhost:3000/fr | rg "Developpement Shopify|Shopify"
curl -s http://localhost:3000/fr/pricing | rg "banque|retainer|CAD"
curl -s http://localhost:3000/llms.txt | rg "Services \\(French\\)|FAQ \\(French\\)"
```

Use the in-app browser when available for visual QA on desktop and mobile. If it is unavailable, record that curl/build validation was used instead.

## Commit Convention

Use one clear commit per moving part:

- `add: ship french website locale`
- `fix: preserve french localized links`
- `chore: update french translations for <feature>`
- `add: document french localization agent`
- `fix: update policy copy for localized tracking`
