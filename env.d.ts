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
  }
}
