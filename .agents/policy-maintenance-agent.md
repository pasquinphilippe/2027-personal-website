# Policy Maintenance Agent

Use this agent rule whenever a website change affects personal information,
cookies, tracking, marketing measurement, client access, scheduling, or any
third-party script.

## Trigger Conditions

Update the policy pages when a change adds, removes, or modifies any of these:

- Contact forms, quote forms, newsletter capture, downloads, or lead magnets.
- Meeting selectors, calendar embeds, Cal.com configuration, or booking flows.
- Client login, account portals, authentication, or gated client resources.
- Google Tag Manager, GA4, Meta pixel, TikTok pixel, LinkedIn Insight tag, or
  any advertising or retargeting tag.
- Heatmaps, session replay, chat widgets, support widgets, surveys, analytics,
  A/B testing tools, personalization, or conversion tracking.
- Cookies, localStorage, sessionStorage, browser identifiers, URL identifiers,
  server logs, or consent banner behavior.
- Third-party embeds such as video, maps, forms, payment, accounting, CRM,
  email marketing, or project-management tools.
- New data uses, new vendors, international processing changes, or changed
  retention/security practices.

## Files To Review

- `app/routes/privacy-policy.tsx`
- `app/routes/cookie-notice.tsx`
- `app/routes/terms-of-use.tsx`
- `app/lib/legal.ts`
- `app/components/Footer.tsx`
- `app/styles/legal.css`

## Required Workflow

1. Identify the feature, script, pixel, vendor, or data flow being changed.
2. List the provider, purpose, personal information involved, storage method,
   consent state, retention expectation, and whether processing may happen
   outside Quebec or Canada.
3. Verify current requirements against official sources before changing
   compliance-sensitive language:
   - Office of the Privacy Commissioner of Canada for PIPEDA and meaningful
     consent:
     `https://www.priv.gc.ca/en/privacy-topics/collecting-personal-information/consent/gl_omc_201805/`
   - Commission d'acces a l'information du Quebec for Quebec privacy rules,
     website collection, cookies, and policy requirements:
     `https://www.cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/collecte-renseignements-personnels_entreprises`
   - CRTC / CASL guidance for commercial electronic messages:
     `https://crtc.gc.ca/eng/com500/guide.htm`
4. Update the policy pages in the same commit or a separate adjacent commit.
   Use `chore: update policy disclosures for <feature>` when the policy change
   is separate from the feature implementation.
5. Keep the pages plain-language, specific, and accurate. Do not claim a tool
   is disabled, consented, anonymized, first-party, or essential unless the code
   or production configuration proves it.
6. Update the `Last updated` date on every policy page that changed.
7. If legal interpretation is uncertain, write a narrow operational disclosure
   and flag the point for legal review instead of inventing a guarantee.

## Cookie Notice Inventory Format

For every tracking or storage tool, keep an inventory entry with:

- Provider name
- Tool/script name
- Purpose
- Data or events collected
- Cookie/storage behavior
- Required or optional status
- Consent requirement or preference-center behavior
- Regions where data may be processed

## Verification

Run focused checks after every policy update:

- `npx eslint --no-error-on-unmatched-pattern app/components/Footer.tsx app/components/PolicyShell.tsx app/lib/legal.ts app/root.tsx app/routes/privacy-policy.tsx app/routes/cookie-notice.tsx app/routes/terms-of-use.tsx`
- `npm run typecheck`
- `npm run build`

Also verify that `/privacy-policy`, `/cookie-notice`, `/terms-of-use`, and the
home footer links render in the local preview.
