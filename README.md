# / pasquin Shopify Service Website

Personal service website for Philippe Pasquin, a Montreal-based Shopify developer.

The public-facing design now follows the old Never Before Seen layout language from `Copy website/`: light background, lean spacing, centered pill navigation, large sparse page intros, rounded work cards, pricing cards, CTA sections, ticker/footer patterns, and multiple pages.

Hydrogen remains the implementation stack underneath:

- Hydrogen 2026.4 on React Router.
- Oxygen-compatible server runtime.
- Shopify commerce scaffold remains available for future store routes.
- Custom service pages for What We Do, Work, Pricing, About, Testimonials, Contact.
- Custom meeting selector that can hand off to Cal.com.

## Local Development

```bash
npm install
npm run dev
```

The generated Hydrogen project includes Mock.shop defaults for local development. To connect a real Shopify store, use Shopify's Hydrogen link flow and set the storefront env vars.

## Environment Variables

```bash
SESSION_SECRET=...
PUBLIC_SITE_URL=https://your-domain.com
PUBLIC_CONTACT_EMAIL=hello@pasquin.ca
PUBLIC_SUPPORT_EMAIL=support@pasquin.ca
PUBLIC_CAL_ORIGIN=https://cal.com
PUBLIC_CAL_LINK=your-cal-username/shopify-strategy-call
CAL_API_KEY=cal_live_...
```

`CAL_API_KEY` is private. Keep it in local `.env` or Oxygen secrets only. The
visible booking selector uses `PUBLIC_CAL_LINK` for the client-side handoff;
server-side Cal.com API routes should read `CAL_API_KEY`.

Shopify storefront variables are managed by Hydrogen/Oxygen when linked:

```bash
PUBLIC_STORE_DOMAIN=...
PUBLIC_STOREFRONT_API_TOKEN=...
PUBLIC_STOREFRONT_ID=...
PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID=...
SHOP_ID=...
PUBLIC_CHECKOUT_DOMAIN=...
```

Customer Account API OAuth requires the Hydrogen tunnel in local development:

```bash
npm run dev -- --customer-account-push
```

Open the generated `https://*.tryhydrogen.dev` URL for `/account/*` OAuth
routes instead of `localhost`.

## Pages

- `/` - What We Do style homepage.
- `/work` - Shopify work cards.
- `/pricing` - Bank-of-hours and retainer pricing.
- `/about` - Personal positioning.
- `/testimonials` - Placeholder working signals until real client quotes are added.
- `/contact` - Booking selector and direct email.
- `/llms.txt` - GEO/agent summary.

## Booking Setup

The visible selector is custom so it can be optimized, tracked, and personalized. It can connect to Cal.com, an open-source scheduling platform that can be hosted by Cal.com or self-hosted.

Set `PUBLIC_CAL_LINK` to activate the scheduling handoff. Without it, the CTA falls back to a prefilled email.
