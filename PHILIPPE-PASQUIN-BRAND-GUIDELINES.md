# Philippe Pasquin Brand Guidelines for Agents

Source reference: https://subduxion.com/  
Created: 2026-06-06  
Use case: Brand, content, UI, and implementation guidance for agents working on a personal company site for Philippe Pasquin, a Montreal-based Shopify developer.

## Agent Quick Prompt

You are creating work for Philippe Pasquin, a Montreal-based Shopify developer who builds reliable ecommerce systems for merchants. The brand should feel precise, technical, independent, and outcome-focused. Use the Subduxion reference only as a directional influence: trust-first technology positioning, dark editorial moments, white operational sections, mono labels, staged process thinking, high-contrast borders, and sharp accent colors. Do not reuse Subduxion logos, imagery, proprietary claims, or AI-company language.

## Brand Essence

Philippe Pasquin is a hands-on Shopify developer for merchants who need their storefront, theme, integrations, and operations to work cleanly. The brand is personal, senior, and practical. It should not pretend to be a large agency. It should position Philippe as the person who can diagnose messy commerce systems, design the right technical path, and implement improvements without drama.

Core promise:

> Reliable Shopify systems for merchants who need their store to convert, scale, and stay maintainable.

Short positioning lines:

- Shopify you can trust.
- Ecommerce systems you can rely on.
- Montreal-based Shopify development for serious merchants.
- Theme, app, and workflow development for Shopify teams that need clean execution.
- From storefront friction to measurable ecommerce improvements.

## Strategic Adaptation from Subduxion

Subduxion's site signals trust through serious technology language, tight layouts, mono-label structure, dark/light contrast, and a process-led service model. For Philippe Pasquin, translate those cues into Shopify-specific credibility:

- Replace enterprise AI with ecommerce infrastructure.
- Replace data sovereignty with store reliability, maintainability, and merchant control.
- Replace "managed AI solutions" with theme development, Shopify architecture, app integrations, automation, and ongoing support.
- Replace "vendor independent" with platform-aware and app-stack independent recommendations.
- Keep the numbered process, capability grid, use-case grid, restrained palette, and direct business outcomes.

## Brand Personality

The brand should feel:

- Technical but human.
- Independent, not agency-bloated.
- Calm, not flashy.
- Direct, not salesy.
- Montreal-rooted, but not locally provincial.
- Operational, not decorative.
- Senior and accountable.

Avoid:

- Startup hype.
- Generic "we build beautiful websites" language.
- Pretending Philippe is a large team.
- Overpromising revenue outcomes without evidence.
- Decorative ecommerce cliches like floating carts, coins, abstract 3D shapes, or generic shopping-bag graphics.

## Voice and Copy Rules

Use plain English by default. French variants can be created when needed, but the baseline site should be clear English for North American Shopify merchants.

Preferred voice:

- Short sentences.
- Concrete nouns.
- Outcome-led technical language.
- Specific Shopify terms when useful.
- Confident but not inflated.

Use:

- "Shopify theme development"
- "custom storefronts"
- "app integrations"
- "workflow automation"
- "performance tuning"
- "conversion-focused implementation"
- "maintainable code"
- "merchant operations"
- "product, collection, cart, and checkout flows"

Avoid:

- "Digital transformation"
- "Pixel-perfect magic"
- "Next-gen ecommerce"
- "10x growth"
- "World-class solutions"
- "Full-service agency" unless that scope is actually true

Preferred grammar:

- Use "Philippe Pasquin" in formal headings, metadata, and footer.
- Use "Philippe" in warmer sections like About or Contact.
- Use first person singular only when the page is explicitly personal: "I help merchants..."
- Use neutral professional phrasing for service pages: "Builds", "Designs", "Improves", "Maintains".
- Do not add "Inc.", "Studio", "Agency", or "Collective" unless confirmed.

## Sample Copy

Hero headline options:

- Philippe Pasquin builds reliable Shopify systems for merchants who need their store to work harder.
- Shopify development for storefronts, integrations, and operations that need clean execution.
- Montreal-based Shopify development for merchants ready to improve how their store works.

Hero supporting copy:

Philippe designs and builds Shopify themes, custom integrations, storefront improvements, and ecommerce workflows that make stores easier to operate, easier to maintain, and better aligned with business goals.

CTA labels:

- Start the conversation
- Discuss a Shopify project
- See capabilities
- Review the process

Section labels:

- SERVICES
- USE CASES
- PROCESS
- SELECTED WORK
- SHOPIFY STACK
- ABOUT PHILIPPE
- CONTACT

Footer line:

Shopify development, storefront systems, and ecommerce workflows from Montreal.

## Visual Direction

The visual system should be minimal, high-contrast, and structured. Treat the site as a technical consulting portfolio, not a generic freelancer landing page.

Core visual cues:

- Dark intro or footer sections using near-black.
- White or light-grey work sections for readability.
- Thin borders, subtle dividers, and structured grids.
- Mono labels and numeric process markers.
- Electric green used sparingly for emphasis.
- Orange used only for alerts, live states, or priority callouts.
- Pale blue used for calm technical support, notes, and secondary highlights.
- Real Shopify/admin/code/storefront visuals instead of abstract illustrations.

## Color Tokens

Use these tokens as the default palette. The values are adapted from the Subduxion reference site's visible CSS tokens and supporting accents.

```css
:root {
  --pp-ink: #131313;
  --pp-charcoal: #1f2228;
  --pp-black: #090909;
  --pp-white: #ffffff;
  --pp-surface: #f3f3f3;
  --pp-surface-soft: #f9f9f9;
  --pp-line: #d3d3d3;
  --pp-line-soft: #e5e5e5;
  --pp-muted: #797979;
  --pp-muted-cool: #7d8082;
  --pp-green: #98fe00;
  --pp-green-deep: #233802;
  --pp-orange: #ff9500;
  --pp-blue-soft: #d2e9fe;
  --pp-blue: #8fc5f2;
}
```

Usage:

- `--pp-ink`: primary dark backgrounds, main text on light sections.
- `--pp-white`: text on dark backgrounds, clean content backgrounds.
- `--pp-surface`: section backgrounds, cards, admin-style panels.
- `--pp-line`: borders and dividers.
- `--pp-muted`: metadata, captions, secondary copy.
- `--pp-green`: primary accent, highlight, active state, key CTA detail.
- `--pp-orange`: warning, urgency, commerce friction, migration risk.
- `--pp-blue-soft`: calm technical note, info panel, secondary background.

Do not let the interface become a neon-green theme. The green is an accent, not the brand's base color.

## Typography

Primary heading font:

- `Satoshi`, fallback `Inter`, fallback system sans-serif.
- Use strong weights: 700 for most headings, 900 only for large editorial moments.

Body font:

- `Inter`, fallback `Satoshi`, fallback system sans-serif.
- Use 400 or 500.

Label and metadata font:

- `Roboto Mono` or `Fragment Mono`, fallback monospace.
- Use uppercase labels, short technical tags, process numbers, dates, and footer metadata.

Implementation note:

- Keep letter spacing at `0` in production UI unless a real design file requires otherwise.
- Create a tight technical feel with font choice, size, line-height, spacing, and grid density instead of negative tracking.

Suggested type scale:

```css
:root {
  --pp-font-heading: "Satoshi", "Inter", system-ui, sans-serif;
  --pp-font-body: "Inter", "Satoshi", system-ui, sans-serif;
  --pp-font-mono: "Roboto Mono", "Fragment Mono", ui-monospace, monospace;

  --pp-text-xs: 0.75rem;
  --pp-text-sm: 0.875rem;
  --pp-text-base: 1rem;
  --pp-text-lg: 1.125rem;
  --pp-text-xl: 1.375rem;
  --pp-text-2xl: 1.75rem;
  --pp-text-3xl: 2.25rem;
  --pp-text-hero: clamp(3rem, 8vw, 5rem);
}
```

## Layout System

Use editorial structure with strong sections:

- Full-width bands, not floating page cards.
- Constrained inner content around `min(1240px, calc(100vw - 40px))`.
- Large hero with brand name and offer visible in the first viewport.
- A hint of the next section should be visible below the hero on desktop and mobile.
- Grids should feel practical and scannable.
- Use 1px borders instead of heavy shadows.
- Use cards only for repeated service, use-case, article, or project items.
- Card radius should be 8px or less.
- Avoid nested cards.

Spacing rhythm:

```css
:root {
  --pp-space-1: 0.25rem;
  --pp-space-2: 0.5rem;
  --pp-space-3: 0.75rem;
  --pp-space-4: 1rem;
  --pp-space-6: 1.5rem;
  --pp-space-8: 2rem;
  --pp-space-12: 3rem;
  --pp-space-16: 4rem;
  --pp-space-24: 6rem;
}
```

## Recommended Site Structure

Homepage:

1. Hero: Philippe Pasquin, Montreal-based Shopify developer, direct CTA.
2. Proof strip: selected clients, platforms, or project categories if real proof exists.
3. Friction section: common merchant problems.
4. Capabilities: what Philippe can build or improve.
5. Use cases: concrete Shopify problems solved.
6. Process: diagnose, blueprint, build, support.
7. Selected work: case studies or project notes.
8. About: personal credibility, Montreal base, Shopify focus.
9. Contact: direct project conversation.

Do not create a generic marketing landing page that delays the actual service offer.

## Capability Model

Use this grid when agents need to generate services or homepage cards.

### Theme Development

Custom Shopify theme sections, templates, product pages, collection systems, and storefront UX built for maintainability.

### Shopify Architecture

Technical planning for store structure, theme architecture, app stack, data flows, and launch sequencing.

### App Integrations

Connection work across Shopify apps, custom APIs, fulfillment systems, marketing tools, analytics, and internal workflows.

### Performance and Conversion

Storefront speed, UX bottlenecks, cart friction, merchandising logic, and conversion-focused implementation.

### Automation and Operations

Merchant workflows for product data, order routing, reporting, customer service, and repetitive admin tasks.

### Ongoing Support

Iterative development, debugging, theme maintenance, and technical support for merchants that need reliable execution.

## Use-Case Model

Use cases should read like operational Shopify problems, not vague benefits.

- Product detail page systems: variants, bundles, upsells, metafields, media, sizing, and inventory messaging.
- Collection and merchandising logic: filters, featured products, editorial modules, campaign landing pages.
- Cart and checkout readiness: cart drawers, discount logic, checkout constraints, customer messaging.
- App-stack cleanup: reduce overlap, improve data flow, remove brittle dependencies.
- Data sync and integrations: ERP, fulfillment, CRM, inventory, analytics, email, and reporting tools.
- Storefront performance: image loading, theme weight, section rendering, Core Web Vitals.
- Migration and rebuilds: move from brittle themes or legacy setups into cleaner Shopify architecture.
- Operational dashboards: internal views for merchandising, support, fulfillment, and management.

## Process Model

Use a four-step model inspired by Subduxion's numbered approach, adapted to Shopify delivery.

### /01 Diagnose

Understand the store, business goals, theme structure, app stack, operational constraints, and the actual source of friction.

### /02 Blueprint

Define the technical path: scope, architecture, dependencies, sequencing, risks, and measurable success criteria.

### /03 Build

Implement clean Shopify theme work, integrations, automations, or storefront improvements with attention to maintainability.

### /04 Support

Measure, refine, document, and keep improving the store as merchant needs evolve.

## UI Component Guidance

Buttons:

- Primary on light: black background, white text, optional green arrow/icon.
- Primary on dark: green background, black text.
- Secondary: transparent background, 1px border, text in current section color.
- Use icon buttons when the action is obvious, with tooltips for unfamiliar icons.

Cards:

- Use flat backgrounds and 1px borders.
- Radius max: 8px.
- No heavy drop shadows.
- Service cards can use a mono label, title, short paragraph, and small icon.

Process blocks:

- Use `/01`, `/02`, `/03`, `/04` in mono type.
- Keep each process step concise.
- Use lines or border reveals instead of decorative shapes.

Navigation:

- Keep it sparse: Services, Work, Process, About, Contact.
- Use one primary CTA: "Start the conversation" or "Discuss a Shopify project".

Images and media:

- Prefer real Shopify Admin screenshots, storefront screenshots, code snippets, whiteboard architecture sketches, or project artifacts.
- Use image crops that reveal the actual system or storefront.
- Avoid dark, blurred, atmospheric stock imagery.
- Avoid generic laptop mockups unless the screen contains real work.

## Content Patterns

Problem framing:

- "Slow theme changes block campaigns."
- "App sprawl makes the store harder to operate."
- "Product pages are flexible in theory but brittle in practice."
- "Manual merchandising work keeps coming back."
- "Performance issues are costing attention before customers reach checkout."

Outcome framing:

- "Cleaner storefront components."
- "A more maintainable theme."
- "Fewer manual admin steps."
- "A clearer app and integration stack."
- "Faster launch cycles for campaigns."
- "Better handoff between merchant, developer, and operations."

Avoid unsupported claims like:

- "Guaranteed revenue lift."
- "Instant performance transformation."
- "Enterprise-grade everything."
- "Fully automated business."

## Bilingual Montreal Guidance

The brand can support English and French, but do not mix languages randomly inside the same section.

English descriptor:

- Montreal-based Shopify developer.

French descriptor:

- Developpeur Shopify a Montreal.

French voice should be practical and professional, not overly formal. Use Quebec-friendly phrasing when the audience is local.

## Agent Rules

When creating a page, component, copy block, or design:

1. Start with the merchant problem, not the technology.
2. Make Philippe visible as a real senior practitioner, not an anonymous agency.
3. Use Shopify-specific language where it clarifies the offer.
4. Keep claims tied to implementation, maintainability, speed, clarity, or operations.
5. Use the palette and type system consistently.
6. Prefer real artifacts over abstract visuals.
7. Use mono labels and numbered process markers to preserve the reference site's technical feel.
8. Keep pages scannable and operational.
9. Do not copy Subduxion's copy, logo, imagery, or AI-specific service model.
10. Do not invent client names, partner logos, certifications, metrics, or legal company details.

## CSS Starter Tokens

Agents building UI can begin with this token map.

```css
:root {
  color-scheme: light;

  --color-bg: var(--pp-white);
  --color-bg-dark: var(--pp-ink);
  --color-surface: var(--pp-surface);
  --color-surface-soft: var(--pp-surface-soft);
  --color-text: var(--pp-ink);
  --color-text-inverse: var(--pp-white);
  --color-muted: var(--pp-muted);
  --color-border: var(--pp-line);
  --color-accent: var(--pp-green);
  --color-warning: var(--pp-orange);
  --color-info: var(--pp-blue-soft);

  --radius-card: 8px;
  --radius-button: 0px;
  --shadow-none: none;

  --container: min(1240px, calc(100vw - 40px));
}
```

## Example Homepage Copy Block

```text
Philippe Pasquin

Montreal-based Shopify developer for merchants who need their storefront, integrations, and operations to work cleanly.

Philippe builds Shopify themes, custom storefront components, app integrations, and ecommerce workflows that make stores easier to maintain, easier to operate, and better prepared for growth.

[Start the conversation] [See capabilities]
```

## Quality Bar

A finished artifact for this brand should pass these checks:

- The first viewport clearly says "Philippe Pasquin" and "Shopify developer".
- The work feels personal and senior, not like a generic agency template.
- The visual system uses black, white, grey, and controlled accent color.
- The copy names concrete Shopify problems.
- The process is visible and easy to understand.
- No invented proof, metrics, clients, or credentials.
- No Subduxion-owned assets or direct copy beyond short source-cue references.
- Mobile layout remains readable with no overlapping text or oversized labels.
