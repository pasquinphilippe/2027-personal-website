# LLM Robots GEO Agent

Use this agent rule whenever public website content, routing, metadata, crawler
access, or AI-search positioning changes.

This site uses two related files:

- `app/routes/[llms.txt].tsx` creates `/llms.txt`, the AI-readable site brief.
- `app/routes/[robots.txt].tsx` creates `/robots.txt`, the crawler-access rules.

`llms.txt` is an emerging convention for GEO. It is not a guaranteed ranking
signal and must not replace strong page content, structured data, sitemap
coverage, or crawlable HTML.

## Trigger Conditions

Update or review `/llms.txt` and `/robots.txt` when a change adds, removes, or
modifies any of these:

- Core service pages, pricing, retainers, bank-of-hours offers, FAQs, location
  claims, case studies, testimonials, or booking workflows.
- New public routes, canonical URLs, localized pages, sitemap routes, redirects,
  noindex behavior, or route-level meta tags.
- Structured data, Open Graph copy, page titles, headings, or service taxonomy.
- Robots rules, crawler allow/block policy, AI crawler policy, CDN bot settings,
  or Cloudflare-style bot management.
- Client-only/private areas, account pages, search/filter/sort URLs, generated
  Shopify policy routes, or other pages that should not become answer-engine
  source material.
- Any change that affects how ChatGPT, Perplexity, Gemini, Claude, Google,
  Bing, or other crawlers should understand Philippe Pasquin's business.

## Source Files To Review

- `app/routes/[llms.txt].tsx`
- `app/routes/[robots.txt].tsx`
- `app/routes/[sitemap.xml].tsx`
- `app/routes/sitemap.$type.$page[.xml].tsx`
- `app/lib/pasquin.ts`
- `app/components/LeanSections.tsx`
- Primary route files under `app/routes/`

## Official References

Check current official or primary documentation before changing crawler policy:

- llms.txt proposal:
  `https://llmstxt.org/`
- Google robots.txt interpretation:
  `https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec`
- Google robots.txt introduction and limitations:
  `https://developers.google.com/search/docs/crawling-indexing/robots/intro`
- Google common crawlers and Google-Extended:
  `https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers`
- OpenAI crawler controls:
  `https://platform.openai.com/docs/bots`

For any other AI crawler, verify the current vendor documentation before adding
or removing a user-agent rule. Do not rely on stale SEO blog lists.

## `/llms.txt` Rules

Keep `/llms.txt` concise, factual, and useful for an answer engine.

Required content:

- Brand name: Philippe Pasquin and `/ pasquin`.
- Business category: Montreal-based Shopify developer.
- Service area: Montreal, Quebec, Canada, and remote Shopify merchants.
- Primary services with plain-language descriptions.
- Pricing facts for bank-of-hours and retainers.
- Booking/contact path and public contact email.
- FAQ facts that are safe for direct citation.
- Links to the most important public pages when available.

Quality rules:

- Use Markdown with one H1, short sections, and bullets.
- Prefer canonical, stable URLs.
- Keep claims specific and verifiable from the public site.
- Do not include private client data, internal implementation details, secrets,
  draft claims, or anything that should not be quoted by an answer engine.
- Do not overstuff keywords. GEO copy should help AI systems understand the
  business, not read like a keyword list.
- Update the file whenever pricing, service names, testimonials, case studies,
  or contact details change.

## `/robots.txt` Rules

Use `/robots.txt` to manage crawler traffic and crawler policy, not to secure
private information.

Baseline rules:

- Always return HTTP 200 and `text/plain`.
- Always allow `/llms.txt`.
- Always include the absolute sitemap URL.
- Keep important public service, work, pricing, about, testimonial, contact,
  and legal pages crawlable unless there is a specific reason not to.
- Keep noisy or private utility paths blocked, including `/cart`, `/account`,
  search query variants, filter/sort URLs, and generated storefront internals.
- Never use robots.txt as the only protection for private or client-only data.

AI search policy:

- For GEO visibility, allow AI search/discovery crawlers unless there is a
  business reason to block them.
- For training crawlers, make a deliberate business decision before allowing or
  blocking them. Keep search visibility and model-training controls separate
  when a vendor supports separate user-agent tokens.
- OpenAI currently separates `OAI-SearchBot` for ChatGPT search visibility from
  `GPTBot` for training. Verify current docs before editing.
- Google-Extended is a robots product token, not a separate HTTP user-agent
  string, and Google says it does not affect Google Search ranking. Verify
  current docs before editing.

## Update Workflow

1. Identify the content, route, metadata, or crawler-policy change.
2. Decide whether `/llms.txt`, `/robots.txt`, sitemap output, structured data,
   or route metadata need updates.
3. Update `/llms.txt` facts first so AI systems get a clear business summary.
4. Update `/robots.txt` only when crawler access should change.
5. If adding new public GEO-critical routes, make sure they are represented in
   sitemap output and are not blocked by robots rules.
6. Confirm that legal/privacy pages remain discoverable from the footer, but do
   not make generated Shopify demo-store policy routes the canonical legal
   source for this service business.
7. Commit as a separate moving part when the change is only GEO/crawler work:
   `chore: update llm and robots guidance`.

## Verification

Run focused checks after every GEO/crawler update:

- `curl -i http://localhost:3001/llms.txt`
- `curl -i http://localhost:3001/robots.txt`
- `curl -i http://localhost:3001/sitemap.xml`
- Confirm `Content-Type` is `text/plain` for `/llms.txt` and `/robots.txt`.
- Confirm `/robots.txt` contains `Allow: /llms.txt` and an absolute `Sitemap:`.
- Confirm `/llms.txt` mentions current services, pricing, retainers, contact,
  service area, and primary pages.
- `npx eslint --no-error-on-unmatched-pattern 'app/routes/[llms.txt].tsx' 'app/routes/[robots.txt].tsx'`
- `npm run typecheck`
- `npm run build`

If the in-app browser is available, also open `/llms.txt` and `/robots.txt` in
the local preview and visually confirm the files are plain text, not HTML.
