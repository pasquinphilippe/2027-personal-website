/**
 * Supabase mirror for onboarding leads (server-only).
 *
 * Uses the PostgREST endpoint so we avoid pulling in the supabase-js bundle.
 * Every call is best-effort: if Supabase isn't configured or the insert fails,
 * we log and return null so Shopify lead capture is never blocked.
 */

type SupabaseEnv = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SUPABASE_LEADS_TABLE?: string;
};

export function isSupabaseConfigured(env: SupabaseEnv): boolean {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
}

const DEFAULT_TABLE = 'onboarding_leads';

/** Insert a lead row; returns the new row id or null on any failure. */
export async function mirrorLeadToSupabase(
  env: SupabaseEnv,
  row: Record<string, unknown>,
): Promise<{id: string} | null> {
  if (!isSupabaseConfigured(env)) {
    console.warn('[onboarding] Supabase not configured — skipping mirror');
    return null;
  }
  const table = env.SUPABASE_LEADS_TABLE || DEFAULT_TABLE;
  // on_conflict=email pairs with the unique(email) constraint so re-submits
  // upsert instead of erroring (Prefer: resolution=merge-duplicates).
  const url = `${env.SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/${table}?on_conflict=email`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY!}`,
        Prefer: 'return=representation,resolution=merge-duplicates',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) {
      console.error(
        `[onboarding] Supabase insert failed HTTP ${res.status}: ${await res
          .text()
          .catch(() => '')}`,
      );
      return null;
    }
    const data = (await res.json()) as Array<{id?: string}>;
    return data[0]?.id ? {id: String(data[0].id)} : null;
  } catch (error) {
    console.error('[onboarding] Supabase insert threw', error);
    return null;
  }
}

/** Patch a lead row by email (e.g. after contract signed). Best-effort. */
export async function updateLeadInSupabase(
  env: SupabaseEnv,
  email: string,
  patch: Record<string, unknown>,
): Promise<void> {
  if (!isSupabaseConfigured(env)) return;
  const table = env.SUPABASE_LEADS_TABLE || DEFAULT_TABLE;
  const url = `${env.SUPABASE_URL!.replace(/\/$/, '')}/rest/v1/${table}?email=eq.${encodeURIComponent(
    email,
  )}`;
  try {
    await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      body: JSON.stringify(patch),
    });
  } catch (error) {
    console.error('[onboarding] Supabase update threw', error);
  }
}
