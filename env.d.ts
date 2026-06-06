/// <reference types="vite/client" />
/// <reference types="react-router" />
/// <reference types="@shopify/oxygen-workers-types" />
/// <reference types="@shopify/hydrogen/react-router-types" />

// Enhance TypeScript's built-in typings.
import '@total-typescript/ts-reset';

declare global {
  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    PUBLIC_STOREFRONT_ID: string;
    PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID: string;
    SHOP_ID: string;
    PUBLIC_CHECKOUT_DOMAIN: string;
    PUBLIC_SITE_URL?: string;
    PUBLIC_CONTACT_EMAIL?: string;
    PUBLIC_SUPPORT_EMAIL?: string;
    PUBLIC_CAL_ORIGIN?: string;
    PUBLIC_CAL_LINK?: string;
    CAL_API_KEY?: string;
    // Onboarding ("Get started") flow
    PRIVATE_SHOPIFY_ADMIN_API_TOKEN?: string;
    ADMIN_API_VERSION?: string;
    SUPABASE_URL?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
    SUPABASE_LEADS_TABLE?: string;
    ANVIL_API_KEY?: string;
    ANVIL_ETCH_TEMPLATE_EID?: string;
    // Local/dev only: lets the Pay step proceed without a signed Anvil contract.
    ALLOW_UNSIGNED_CHECKOUT?: string;
  }
}
