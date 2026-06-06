import {CUSTOMER_PORTAL_QUERY} from '~/graphql/customer-account/CustomerPortalQuery';
import {
  getClientById,
  getPrimaryPortalClient,
  portalClients,
  type PortalClient,
} from '~/lib/clientPortal';

export const OWNER_TAG = 'pasquin:owner';
export const CLIENT_TAG = 'pasquin:client';

export {CUSTOMER_PORTAL_QUERY};

export type PortalCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string | null;
  tags: string[];
};

export type PortalContext = {
  customer: PortalCustomer;
  isOwner: boolean;
  client: PortalClient;
  matchedBy: 'tag' | 'email' | 'fallback';
};

function findClientByHandle(handle: string | null) {
  if (!handle) return null;
  return (
    portalClients.find(
      (entry) => entry.metafields.companyHandle === handle || entry.id === handle,
    ) ?? null
  );
}

function findClientByTag(tags: string[]) {
  const taggedHandle = tags
    .map((tag) => {
      const match = tag.match(/^pasquin:(segment|company|client)-(.+)$/);
      return match ? match[2] : null;
    })
    .find(Boolean);
  return findClientByHandle(taggedHandle ?? null);
}

function findClientByEmail(email: string | null) {
  if (!email) return null;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;
  return (
    portalClients.find((entry) => {
      const handle = entry.metafields.companyHandle?.toLowerCase();
      return Boolean(handle && domain.includes(handle));
    }) ?? null
  );
}

export function resolvePortalContext(args: {
  customer: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    emailAddress?: {emailAddress?: string | null} | null;
    tags?: string[] | null;
  };
}): PortalContext {
  const tags = args.customer.tags ?? [];
  const emailAddress = args.customer.emailAddress?.emailAddress ?? null;

  const matchedByTag = findClientByTag(tags);
  const matchedByEmail = matchedByTag ? null : findClientByEmail(emailAddress);

  const client = matchedByTag ?? matchedByEmail ?? getPrimaryPortalClient();

  const matchedBy: PortalContext['matchedBy'] = matchedByTag
    ? 'tag'
    : matchedByEmail
    ? 'email'
    : 'fallback';

  return {
    customer: {
      id: args.customer.id,
      firstName: args.customer.firstName ?? null,
      lastName: args.customer.lastName ?? null,
      emailAddress,
      tags,
    },
    isOwner: tags.includes(OWNER_TAG),
    client,
    matchedBy,
  };
}

export {findClientByHandle, getClientById};
