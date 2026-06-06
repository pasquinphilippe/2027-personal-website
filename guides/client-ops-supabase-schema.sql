-- Client operations Supabase promotion blueprint.
-- This file is intentionally not in supabase/migrations yet.
-- V1 prototype data lives in app/lib/clientPortal.ts.

create extension if not exists pgcrypto;

create type public.contact_role as enum (
  'owner',
  'billing',
  'project',
  'technical',
  'communications'
);

create type public.communication_channel as enum (
  'email',
  'sms',
  'shopify-account'
);

create type public.company_access_status as enum (
  'needs-invite',
  'invited',
  'active',
  'billing-only',
  'disabled'
);

create type public.payment_method_status as enum (
  'ready',
  'needs-setup',
  'failed',
  'external'
);

create type public.billing_cadence as enum (
  'first-and-fifteenth',
  'subscription'
);

create type public.work_status as enum (
  'queued',
  'in-progress',
  'waiting-client',
  'ready',
  'done'
);

create table public.client_companies (
  id uuid primary key default gen_random_uuid(),
  shopify_company_id text,
  primary_shopify_customer_id text not null,
  handle text not null unique,
  name text not null,
  default_locale text not null default 'en',
  billing_cadence public.billing_cadence not null,
  communication_tier text not null default 'standard',
  retainer_status text not null default 'none',
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  shopify_customer_id text not null,
  name text not null,
  email text not null,
  phone text,
  locale text not null default 'en',
  roles public.contact_role[] not null default '{}',
  receives public.communication_channel[] not null default '{email}',
  access_status public.company_access_status not null default 'needs-invite',
  permissions text[] not null default '{portal}',
  invited_at timestamptz,
  last_active_at timestamptz,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, shopify_customer_id)
);

create table public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  owner_member_id uuid references public.company_members(id) on delete set null,
  status public.payment_method_status not null default 'needs-setup',
  method text not null,
  label text not null,
  next_action text not null default '',
  autopay boolean not null default false,
  shopify_payment_method_id text,
  qbo_customer_id text,
  last_checked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.billing_cycles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.client_companies(id) on delete cascade,
  cadence public.billing_cadence not null,
  cycle_date date not null,
  status text not null default 'collecting',
  included_billing_types text[] not null default '{}',
  rule text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.billing_run_checklist_items (
  id uuid primary key default gen_random_uuid(),
  billing_cycle_id uuid not null references public.billing_cycles(id) on delete cascade,
  company_id uuid not null references public.client_companies(id) on delete cascade,
  title text not null,
  detail text not null default '',
  status text not null default 'review',
  owner text not null default 'pasquin',
  requirement text not null default '',
  action text not null default '',
  visible_to_client boolean not null default true,
  related_time_entry_ids uuid[] not null default '{}',
  template_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  project_key text not null,
  title text not null,
  detail text not null default '',
  status public.work_status not null default 'queued',
  priority text not null default 'normal',
  source text not null default 'client-request',
  due_on date,
  assignee_id uuid,
  created_by_member_id uuid references public.company_members(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.time_entries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  task_id uuid references public.tasks(id) on delete set null,
  client_project text not null,
  task_label text not null,
  work_date date not null,
  start_at timestamptz not null,
  end_at timestamptz,
  duration_minutes integer not null default 0 check (duration_minutes >= 0),
  hourly_rate_cents integer not null default 0 check (hourly_rate_cents >= 0),
  amount_cents integer not null default 0 check (amount_cents >= 0),
  billing_category text not null default 'Billable',
  billing_type text not null,
  invoice_number text,
  qbo_id text,
  owner_qbo_id text,
  ghl_id text,
  will_be_billed boolean not null default false,
  published_to_client_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.time_entry_events (
  id uuid primary key default gen_random_uuid(),
  time_entry_id uuid not null references public.time_entries(id) on delete cascade,
  actor_member_id uuid references public.company_members(id),
  event_type text not null,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create table public.billing_decisions (
  id uuid primary key default gen_random_uuid(),
  time_entry_id uuid not null references public.time_entries(id) on delete cascade,
  company_id uuid not null references public.client_companies(id) on delete cascade,
  decision text not null,
  reason text,
  reviewed_by text not null,
  reviewed_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  invoice_number text,
  status text not null default 'draft',
  amount_cents integer not null default 0 check (amount_cents >= 0),
  due_on date,
  qbo_id text,
  shopify_payment_reference text,
  published_to_client_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  time_entry_id uuid references public.time_entries(id) on delete set null,
  label text not null,
  quantity numeric(10, 2) not null,
  amount_cents integer not null default 0 check (amount_cents >= 0)
);

create table public.retainer_usage_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  shopify_app_subscription_id text,
  event_type text not null,
  minutes_delta integer not null,
  balance_after_minutes integer not null,
  source_time_entry_id uuid references public.time_entries(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.notification_events (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies(id) on delete cascade,
  template_key text not null,
  channel public.communication_channel not null,
  audience text not null,
  status text not null default 'queued',
  rendered_template_hash text,
  payload jsonb not null default '{}',
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create table public.notification_recipients (
  id uuid primary key default gen_random_uuid(),
  notification_event_id uuid not null references public.notification_events(id) on delete cascade,
  company_member_id uuid references public.company_members(id) on delete set null,
  destination text not null,
  delivery_status text not null default 'queued',
  provider_message_id text,
  last_error text,
  created_at timestamptz not null default now(),
  delivered_at timestamptz
);

alter table public.client_companies enable row level security;
alter table public.company_members enable row level security;
alter table public.payment_methods enable row level security;
alter table public.billing_cycles enable row level security;
alter table public.billing_run_checklist_items enable row level security;
alter table public.tasks enable row level security;
alter table public.time_entries enable row level security;
alter table public.time_entry_events enable row level security;
alter table public.billing_decisions enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_line_items enable row level security;
alter table public.retainer_usage_events enable row level security;
alter table public.notification_events enable row level security;
alter table public.notification_recipients enable row level security;

-- Future policy model:
-- 1. Admin service role writes sync rows from Shopify, QBO, GHL, email, SMS, and timers.
-- 2. Client access is scoped by company_id through a trusted membership claim or
--    a private session mapping table. Do not use user-editable user_metadata.
-- 3. Client-facing SELECT policies should hide internal-only columns through views
--    or API serializers, not by relying on the UI.

alter publication supabase_realtime add table public.time_entries;
alter publication supabase_realtime add table public.time_entry_events;
alter publication supabase_realtime add table public.tasks;
alter publication supabase_realtime add table public.billing_decisions;
alter publication supabase_realtime add table public.payment_methods;
alter publication supabase_realtime add table public.billing_cycles;
alter publication supabase_realtime add table public.billing_run_checklist_items;
alter publication supabase_realtime add table public.notification_events;
