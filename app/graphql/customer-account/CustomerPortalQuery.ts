// Customer-readable identity for the client portal.
// The portal app metafields in shopifyClientOps.ts are currently admin-only,
// so we resolve a workspace from tags + email here and let a later Admin API
// shim fill in metafield-backed lookups when those definitions are deployed
// with `access.customer_account = "read"`.
export const CUSTOMER_PORTAL_QUERY = `#graphql
  query CustomerPortal {
    customer {
      id
      firstName
      lastName
      tags
      emailAddress {
        emailAddress
      }
    }
  }
` as const;
