/**
 * Anvil (useanvil.com) Etch e-sign integration (server-only).
 *
 * SCAFFOLD: wired against env placeholders. Provide:
 *   ANVIL_API_KEY            — your Anvil API key (Basic auth username)
 *   ANVIL_ETCH_TEMPLATE_EID  — the Etch template/cast EID for your contract
 *
 * The contract must be signed before the Pay step unlocks. Signing is embedded
 * in-flow: we create a packet with an `embedded` signer, generate a signing
 * URL, render it in an iframe, then poll packet status to confirm completion.
 *
 * TODO (when the real template is ready): map `fields`/`data` below to your
 * template's field IDs so client + plan details prefill the contract.
 */

const ANVIL_GRAPHQL = 'https://graphql.anvil.co';

type AnvilEnv = {
  ANVIL_API_KEY?: string;
  ANVIL_ETCH_TEMPLATE_EID?: string;
};

export function isAnvilConfigured(env: AnvilEnv): boolean {
  return Boolean(env.ANVIL_API_KEY && env.ANVIL_ETCH_TEMPLATE_EID);
}

function authHeader(apiKey: string): string {
  // Anvil uses HTTP Basic auth with the API key as the username.
  const token =
    typeof btoa === 'function'
      ? btoa(`${apiKey}:`)
      : Buffer.from(`${apiKey}:`).toString('base64');
  return `Basic ${token}`;
}

async function anvilGraphql<T>(
  env: AnvilEnv,
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(ANVIL_GRAPHQL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authHeader(env.ANVIL_API_KEY ?? ''),
    },
    body: JSON.stringify({query, variables}),
  });
  if (!res.ok) {
    throw new Error(`Anvil HTTP ${res.status}: ${await res.text().catch(() => '')}`);
  }
  const json = (await res.json()) as {data?: T; errors?: unknown};
  if (json.errors) {
    throw new Error(`Anvil errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

const CREATE_ETCH_PACKET = `
  mutation CreateEtchPacket(
    $name: String!,
    $signers: [JSON!]!,
    $files: [EtchFile!],
    $data: JSON,
    $isTest: Boolean,
    $signatureEmailSubject: String
  ) {
    createEtchPacket(
      name: $name,
      signers: $signers,
      files: $files,
      data: $data,
      isTest: $isTest,
      signatureEmailSubject: $signatureEmailSubject
    ) {
      eid
      status
      documentGroup { eid status signers { eid } }
    }
  }
`;

const GENERATE_SIGN_URL = `
  mutation GenerateEtchSignURL($signerEid: String!, $clientUserId: String!) {
    generateEtchSignURL(signerEid: $signerEid, clientUserId: $clientUserId)
  }
`;

const GET_PACKET = `
  query GetEtchPacket($eid: String!) {
    etchPacket(eid: $eid) {
      eid
      status
      documentGroup { status }
    }
  }
`;

export type CreatePacketArgs = {
  signerName: string;
  signerEmail: string;
  redirectURL: string;
  clientUserId: string;
  /** Free-form data to prefill the contract template. */
  data?: Record<string, unknown>;
  isTest?: boolean;
};

export type CreatePacketResult = {
  packetEid: string;
  signerEid: string;
  signUrl: string;
};

/** Create an embedded-signing Etch packet and return its embedded sign URL. */
export async function createContractPacket(
  env: AnvilEnv,
  args: CreatePacketArgs,
): Promise<CreatePacketResult> {
  const created = await anvilGraphql<{
    createEtchPacket: {
      eid: string;
      documentGroup: {eid: string; signers: {eid: string}[]};
    };
  }>(env, CREATE_ETCH_PACKET, {
    name: `Pasquin services agreement — ${args.signerName}`,
    isTest: args.isTest ?? true,
    signatureEmailSubject: 'Your Pasquin services agreement',
    files: [
      {
        id: 'contract',
        castEid: env.ANVIL_ETCH_TEMPLATE_EID,
      },
    ],
    // TODO: map to your template's field IDs.
    data: {payloads: {contract: {data: args.data ?? {}}}},
    signers: [
      {
        id: 'client',
        name: args.signerName,
        email: args.signerEmail,
        signerType: 'embedded',
        redirectURL: args.redirectURL,
        // TODO: list the template fields this signer fills/signs.
        fields: [{fileId: 'contract', fieldId: 'signature'}],
      },
    ],
  });

  const packetEid = created.createEtchPacket.eid;
  const signerEid = created.createEtchPacket.documentGroup.signers[0]?.eid;
  if (!signerEid) throw new Error('Anvil: no signer returned');

  const urlData = await anvilGraphql<{generateEtchSignURL: string}>(
    env,
    GENERATE_SIGN_URL,
    {signerEid, clientUserId: args.clientUserId},
  );

  return {packetEid, signerEid, signUrl: urlData.generateEtchSignURL};
}

/** True once every signer has completed the packet. */
export async function isPacketSigned(
  env: AnvilEnv,
  packetEid: string,
): Promise<boolean> {
  const data = await anvilGraphql<{
    etchPacket: {status: string; documentGroup: {status: string}} | null;
  }>(env, GET_PACKET, {eid: packetEid});
  const status = data.etchPacket?.status ?? data.etchPacket?.documentGroup?.status;
  return status === 'completed';
}
