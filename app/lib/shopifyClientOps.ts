export const CLIENT_PORTAL_APP_METAFIELDS_TOML = `# shopify.app.toml

[customer.metafields.app.client_portal]
type = "json"
name = "Pasquin Client Portal"
access.admin = "merchant_read_write"

[customer.metafields.app.company_account]
type = "json"
name = "Pasquin Company Account"
access.admin = "merchant_read_write"

[customer.metafields.app.contact_roles]
type = "json"
name = "Pasquin Contact Roles"
access.admin = "merchant_read_write"

[customer.metafields.app.billing_policy]
type = "json"
name = "Pasquin Billing Policy"
access.admin = "merchant_read_write"

[customer.metafields.app.billing_run_summary]
type = "json"
name = "Pasquin Billing Run Summary"
access.admin = "merchant_read_write"

[customer.metafields.app.retainer_subscription]
type = "json"
name = "Pasquin Retainer Subscription"
access.admin = "merchant_read_write"

[customer.metafields.app.access_invites]
type = "json"
name = "Pasquin Access Invites"
access.admin = "merchant_read_write"

[customer.metafields.app.payment_method]
type = "json"
name = "Pasquin Payment Method"
access.admin = "merchant_read_write"

[customer.metafields.app.invoice_delivery]
type = "json"
name = "Pasquin Invoice Delivery"
access.admin = "merchant_read_write"

[customer.metafields.app.asset_requests]
type = "json"
name = "Pasquin Asset Requests"
access.admin = "merchant_read_write"

[customer.metafields.app.client_summary]
type = "json"
name = "Pasquin Client Summary"
access.admin = "merchant_read_write"`;

export const SET_CUSTOMER_PORTAL_METADATA_MUTATION = `mutation SetCustomerPortalMetadata(
  $customerId: ID!
  $clientPortal: String!
  $companyAccount: String!
  $contactRoles: String!
  $billingPolicy: String!
  $billingRunSummary: String!
  $retainerSubscription: String!
  $accessInvites: String!
  $paymentMethod: String!
  $invoiceDelivery: String!
  $assetRequests: String!
  $clientSummary: String!
) {
  metafieldsSet(
    metafields: [
      {
        ownerId: $customerId
        key: "client_portal"
        type: "json"
        value: $clientPortal
      }
      {
        ownerId: $customerId
        key: "company_account"
        type: "json"
        value: $companyAccount
      }
      {
        ownerId: $customerId
        key: "contact_roles"
        type: "json"
        value: $contactRoles
      }
      {
        ownerId: $customerId
        key: "billing_policy"
        type: "json"
        value: $billingPolicy
      }
      {
        ownerId: $customerId
        key: "billing_run_summary"
        type: "json"
        value: $billingRunSummary
      }
      {
        ownerId: $customerId
        key: "retainer_subscription"
        type: "json"
        value: $retainerSubscription
      }
      {
        ownerId: $customerId
        key: "access_invites"
        type: "json"
        value: $accessInvites
      }
      {
        ownerId: $customerId
        key: "payment_method"
        type: "json"
        value: $paymentMethod
      }
      {
        ownerId: $customerId
        key: "invoice_delivery"
        type: "json"
        value: $invoiceDelivery
      }
      {
        ownerId: $customerId
        key: "asset_requests"
        type: "json"
        value: $assetRequests
      }
      {
        ownerId: $customerId
        key: "client_summary"
        type: "json"
        value: $clientSummary
      }
    ]
  ) {
    metafields {
      id
      key
      jsonValue
    }
    userErrors {
      field
      message
    }
  }
}`;

export const READ_CUSTOMER_PORTAL_METADATA_QUERY = `query ReadCustomerPortalMetadata(
  $customerId: ID!
) {
  customer(id: $customerId) {
    id
    defaultEmailAddress {
      emailAddress
    }
    tags
    clientPortal: metafield(key: "client_portal") {
      jsonValue
    }
    companyAccount: metafield(key: "company_account") {
      jsonValue
    }
    contactRoles: metafield(key: "contact_roles") {
      jsonValue
    }
    billingPolicy: metafield(key: "billing_policy") {
      jsonValue
    }
    billingRunSummary: metafield(key: "billing_run_summary") {
      jsonValue
    }
    retainerSubscription: metafield(key: "retainer_subscription") {
      jsonValue
    }
    accessInvites: metafield(key: "access_invites") {
      jsonValue
    }
    paymentMethod: metafield(key: "payment_method") {
      jsonValue
    }
    invoiceDelivery: metafield(key: "invoice_delivery") {
      jsonValue
    }
    assetRequests: metafield(key: "asset_requests") {
      jsonValue
    }
    clientSummary: metafield(key: "client_summary") {
      jsonValue
    }
  }
}`;

export const TAG_CLIENT_CONTACT_MUTATION = `mutation TagClientContact(
  $customerId: ID!
  $tags: [String!]!
) {
  tagsAdd(id: $customerId, tags: $tags) {
    node {
      id
    }
    userErrors {
      field
      message
    }
  }
}`;

export const CLIENT_SEGMENT_RULES = [
  {
    id: 'active-portal-clients',
    label: 'Active portal clients',
    query: 'customer_tags CONTAINS "pasquin:portal-active"',
  },
  {
    id: 'billing-contacts',
    label: 'Billing contacts',
    query: 'customer_tags CONTAINS "pasquin:role-billing"',
  },
  {
    id: 'retainer-clients',
    label: 'Retainer clients',
    query: 'customer_tags CONTAINS "pasquin:retainer-active"',
  },
  {
    id: 'account-invite-pending',
    label: 'Account invite pending',
    query: 'customer_tags CONTAINS "pasquin:access-invited"',
  },
  {
    id: 'payment-setup-needed',
    label: 'Payment setup needed',
    query: 'customer_tags CONTAINS "pasquin:payment-missing"',
  },
  {
    id: 'bi-monthly-billing',
    label: '1st and 15th billing clients',
    query: 'customer_tags CONTAINS "pasquin:billing-bi-monthly"',
  },
  {
    id: 'billing-run-ready',
    label: 'Billing run ready',
    query: 'customer_tags CONTAINS "pasquin:billing-run-ready"',
  },
  {
    id: 'billing-run-blocked',
    label: 'Billing run blocked',
    query: 'customer_tags CONTAINS "pasquin:billing-run-blocked"',
  },
];

export const SHOPIFY_CUSTOMER_TAGS = [
  'pasquin:client',
  'pasquin:portal-active',
  'pasquin:portal-onboarding',
  'pasquin:billing-bi-monthly',
  'pasquin:billing-run-ready',
  'pasquin:billing-run-blocked',
  'pasquin:billing-run-review',
  'pasquin:retainer-active',
  'pasquin:project-based',
  'pasquin:access-active',
  'pasquin:access-invited',
  'pasquin:payment-ready',
  'pasquin:payment-missing',
  'pasquin:role-owner',
  'pasquin:role-billing',
  'pasquin:role-project',
  'pasquin:role-technical',
  'pasquin:role-communications',
];

export const CLIENT_PORTAL_METAFIELD_KEYS = [
  'client_portal',
  'company_account',
  'contact_roles',
  'billing_policy',
  'billing_run_summary',
  'retainer_subscription',
  'access_invites',
  'payment_method',
  'invoice_delivery',
  'asset_requests',
  'client_summary',
];
