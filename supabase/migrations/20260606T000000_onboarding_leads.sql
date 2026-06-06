-- Onboarding leads captured by the "Get started" flow.
-- Target project: bzmupxouocgjdiodqgbh (Pasquin services site).
-- Mirror of the authoritative Shopify customer record.
-- Apply via the Supabase SQL editor or `supabase db push` once the MCP/CLI is
-- connected to this project.

create table if not exists public.onboarding_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  company_name text,
  store_url text,
  shopify_plan text,
  locale text default 'en',
  plan_handle text,
  plan_name text,
  currency text default 'CAD',
  access_method text,
  collaborator_code text,
  staff_invite_email text,
  project_notes text,
  shopify_customer_id text,
  contract_status text default 'unsigned',
  stage text default 'onboarding',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_onboarding_leads_updated_at on public.onboarding_leads;
create trigger trg_onboarding_leads_updated_at
  before update on public.onboarding_leads
  for each row execute function public.set_updated_at();

-- RLS on; the server writes with the service-role key (which bypasses RLS).
-- No anon/public policies are added on purpose — leads are server-only.
alter table public.onboarding_leads enable row level security;

create index if not exists idx_onboarding_leads_plan on public.onboarding_leads (plan_handle);
create index if not exists idx_onboarding_leads_stage on public.onboarding_leads (stage);
