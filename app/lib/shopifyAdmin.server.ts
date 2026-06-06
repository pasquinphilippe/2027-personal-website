/**
 * Minimal Shopify Admin GraphQL client + customer upsert for onboarding.
 *
 * Server-only (`.server.ts`): never imported by client components, so the
 * private admin token is never shipped to the browser.
 */

const DEFAULT_ADMIN_API_VERSION = '2026-04';

type AdminEnv = {
  PUBLIC_STORE_DOMAIN?: string;
  PRIVATE_SHOPIFY_ADMIN_API_TOKEN?: string;
  ADMIN_API_VERSION?: string;
};

export function isAdminConfigured(env: AdminEnv): boolean {
  return Boolean(env.PUBLIC_STORE_DOMAIN && env.PRIVATE_SHOPIFY_ADMIN_API_TOKEN);
}

async function adminFetch<T>(
  env: AdminEnv,
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const version = env.ADMIN_API_VERSION || DEFAULT_ADMIN_API_VERSION;
  const url = `https://${env.PUBLIC_STORE_DOMAIN}/admin/api/${version}/graphql.json`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': env.PRIVATE_SHOPIFY_ADMIN_API_TOKEN ?? '',
    },
    body: JSON.stringify({query, variables}),
  });
  if (!res.ok) {
    throw new Error(`Admin API HTTP ${res.status}`);
  }
  const json = (await res.json()) as {data?: T; errors?: unknown};
  if (json.errors) {
    throw new Error(`Admin API errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

const CUSTOMER_CREATE = `
  mutation OnboardingCustomerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`;

const CUSTOMER_SEARCH = `
  query OnboardingCustomerSearch($query: String!) {
    customers(first: 1, query: $query) { nodes { id } }
  }
`;

const CUSTOMER_UPDATE = `
  mutation OnboardingCustomerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer { id }
      userErrors { field message }
    }
  }
`;

const METAFIELDS_SET = `
  mutation OnboardingMetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields { id key namespace }
      userErrors { field message }
    }
  }
`;

const TAGS_ADD = `
  mutation OnboardingTagsAdd($id: ID!, $tags: [String!]!) {
    tagsAdd(id: $id, tags: $tags) { node { id } userErrors { field message } }
  }
`;

export type UpsertCustomerArgs = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  metafields: Record<string, unknown>; // key -> json value (namespace "custom")
  tags: string[];
};

/**
 * Create the customer if new, otherwise reuse the existing record, then set
 * the client-portal metafields and tags. Returns the customer GID.
 */
export async function upsertOnboardingCustomer(
  env: AdminEnv,
  args: UpsertCustomerArgs,
): Promise<{customerId: string}> {
  const baseInput = {
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email,
  };

  let customerId: string | null = null;

  const created = await adminFetch<{
    customerCreate: {
      customer: {id: string} | null;
      userErrors: {field: string[]; message: string}[];
    };
  }>(env, CUSTOMER_CREATE, {input: baseInput});

  if (created.customerCreate.customer) {
    customerId = created.customerCreate.customer.id;
  } else {
    const taken = created.customerCreate.userErrors.some((e) =>
      /taken|already/i.test(e.message),
    );
    if (taken) {
      const found = await adminFetch<{customers: {nodes: {id: string}[]}}>(
        env,
        CUSTOMER_SEARCH,
        {query: `email:${args.email}`},
      );
      customerId = found.customers.nodes[0]?.id ?? null;
      if (customerId) {
        await adminFetch(env, CUSTOMER_UPDATE, {
          input: {id: customerId, firstName: args.firstName, lastName: args.lastName},
        });
      }
    }
    if (!customerId) {
      throw new Error(
        `customerCreate failed: ${JSON.stringify(created.customerCreate.userErrors)}`,
      );
    }
  }

  const metafields = Object.entries(args.metafields).map(([key, value]) => ({
    ownerId: customerId as string,
    namespace: 'custom',
    key,
    type: 'json',
    value: JSON.stringify(value),
  }));

  await adminFetch(env, METAFIELDS_SET, {metafields});
  if (args.tags.length) {
    await adminFetch(env, TAGS_ADD, {id: customerId, tags: args.tags});
  }

  return {customerId};
}

/** Stores the signed-contract reference back on the customer. */
export async function markContractSigned(
  env: AdminEnv,
  customerId: string,
  contract: Record<string, unknown>,
) {
  await adminFetch(env, METAFIELDS_SET, {
    metafields: [
      {
        ownerId: customerId,
        namespace: 'custom',
        key: 'client_portal',
        type: 'json',
        value: JSON.stringify({stage: 'contract-signed', contract}),
      },
    ],
  });
  await adminFetch(env, TAGS_ADD, {
    id: customerId,
    tags: ['pasquin:contract-signed'],
  });
}
