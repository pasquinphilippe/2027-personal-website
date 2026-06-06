import type {LocalizedText} from '~/lib/clientPortal';

export type SourceSystem = 'shopify' | 'supabase' | 'derived';
export type SyncDirection = 'shopify-to-supabase' | 'supabase-to-shopify' | 'none';
export type SupabaseTableState = 'realtime' | 'ledger' | 'reference';

export type DataBoundary = {
  id: string;
  domain: LocalizedText;
  source: SourceSystem;
  syncDirection: SyncDirection;
  realtime: boolean;
  summary: LocalizedText;
  examples: string[];
};

export type SupabaseTablePlan = {
  table: string;
  state: SupabaseTableState;
  owner: LocalizedText;
  purpose: LocalizedText;
  realtime: boolean;
};

export const dataBoundaries: DataBoundary[] = [
  {
    id: 'identity-access',
    domain: {
      en: 'Identity and account access',
      fr: 'Identite et acces compte',
    },
    source: 'shopify',
    syncDirection: 'shopify-to-supabase',
    realtime: false,
    summary: {
      en: 'Shopify customer accounts, tags, company handle, locale, and role eligibility stay authoritative in Shopify.',
      fr: 'Comptes clients Shopify, tags, entreprise, langue et roles restent autoritaires dans Shopify.',
    },
    examples: ['customer.tags', 'customer.metafields.$app.company_account', 'Customer Account API'],
  },
  {
    id: 'contacts-preferences',
    domain: {
      en: 'Employees and communication preferences',
      fr: 'Employes et preferences de communication',
    },
    source: 'shopify',
    syncDirection: 'shopify-to-supabase',
    realtime: false,
    summary: {
      en: 'Billing, project, technical, and communication roles are stored on customer metafields and mirrored for portal queries.',
      fr: 'Roles facturation, projet, technique et communications sont stockes dans les metafields client et miroitent dans le portail.',
    },
    examples: ['contact_roles', 'pasquin:role-billing', 'pasquin:role-project'],
  },
  {
    id: 'timesheets',
    domain: {
      en: 'Timesheets and live work logs',
      fr: 'Feuilles de temps et journal live',
    },
    source: 'supabase',
    syncDirection: 'supabase-to-shopify',
    realtime: true,
    summary: {
      en: 'Every timer start, stop, edit, approval, and billing decision belongs in Supabase for fast inserts and realtime dashboards.',
      fr: 'Chaque depart, arret, edition, approbation et decision facturation vit dans Supabase pour vitesse et realtime.',
    },
    examples: ['time_entries', 'time_entry_events', 'billing_decisions'],
  },
  {
    id: 'retainers',
    domain: {
      en: 'Retainer subscriptions',
      fr: 'Abonnements retainer',
    },
    source: 'shopify',
    syncDirection: 'shopify-to-supabase',
    realtime: false,
    summary: {
      en: 'The Shopify subscription app remains authoritative for plan, payment method, renewal, upgrade, downgrade, and cancellation status.',
      fr: "L'app abonnement Shopify reste autoritaire pour plan, paiement, renouvellement, upgrade, downgrade et annulation.",
    },
    examples: ['AppSubscription', 'retainer_subscription', 'subscription_contract_id'],
  },
  {
    id: 'invoices',
    domain: {
      en: 'Invoices and billing ledger',
      fr: 'Factures et ledger facturation',
    },
    source: 'supabase',
    syncDirection: 'supabase-to-shopify',
    realtime: true,
    summary: {
      en: 'Supabase assembles line items, approvals, and billing readiness; Shopify/payment records hold checkout and payment evidence.',
      fr: 'Supabase assemble lignes, approbations et preparation; Shopify/paiements gardent les preuves de paiement.',
    },
    examples: ['invoices', 'invoice_line_items', 'payment_reference'],
  },
  {
    id: 'notifications',
    domain: {
      en: 'Notifications and audit trail',
      fr: 'Notifications et audit',
    },
    source: 'supabase',
    syncDirection: 'supabase-to-shopify',
    realtime: true,
    summary: {
      en: 'Liquid-rendered email/SMS events, delivery status, retries, and per-recipient audit logs belong in Supabase.',
      fr: 'Emails/SMS Liquid, statut, retries et audit par destinataire vivent dans Supabase.',
    },
    examples: ['notification_events', 'notification_recipients', 'rendered_template_hash'],
  },
  {
    id: 'client-summary',
    domain: {
      en: 'Client-facing summary',
      fr: 'Resume cote client',
    },
    source: 'derived',
    syncDirection: 'supabase-to-shopify',
    realtime: false,
    summary: {
      en: 'Small rollups can be mirrored to Shopify metafields for segments and account notifications without storing the whole timesheet there.',
      fr: 'De petits resumes peuvent etre miroites vers Shopify pour segments et notifications sans y stocker toute la feuille de temps.',
    },
    examples: ['last_published_timesheet_at', 'open_invoice_count', 'retainer_minutes_remaining'],
  },
];

export const realtimeTables = [
  'time_entries',
  'time_entry_events',
  'tasks',
  'billing_decisions',
  'payment_methods',
  'billing_cycles',
  'billing_run_checklist_items',
  'notification_events',
];

export const supabaseTablePlan: SupabaseTablePlan[] = [
  {
    table: 'client_companies',
    state: 'reference',
    owner: {en: 'Mirrored from Shopify', fr: 'Miroir depuis Shopify'},
    purpose: {
      en: 'Fast portal lookup for company workspace, locale, and Shopify customer/company references.',
      fr: 'Lookup rapide du workspace, langue et references Shopify.',
    },
    realtime: false,
  },
  {
    table: 'company_members',
    state: 'reference',
    owner: {en: 'Mirrored from Shopify', fr: 'Miroir depuis Shopify'},
    purpose: {
      en: 'Employee roles, portal access state, billing recipients, project contacts, and communication preferences.',
      fr: 'Roles employes, etat acces portail, destinataires facturation, contacts projet et preferences.',
    },
    realtime: false,
  },
  {
    table: 'payment_methods',
    state: 'realtime',
    owner: {en: 'Mirrored from Shopify/QBO', fr: 'Miroir depuis Shopify/QBO'},
    purpose: {
      en: 'Payment method readiness, autopay, failed setup, and invoice owner routing.',
      fr: 'Preparation paiement, autopay, echecs configuration et routage owner facture.',
    },
    realtime: true,
  },
  {
    table: 'billing_cycles',
    state: 'realtime',
    owner: {en: 'Supabase billing scheduler', fr: 'Scheduler facturation Supabase'},
    purpose: {
      en: '1st/15th billing runs, subscription renewal mirrors, readiness state, and blocked items.',
      fr: 'Cycles 1er/15, miroirs abonnements, etat preparation et items bloques.',
    },
    realtime: true,
  },
  {
    table: 'billing_run_checklist_items',
    state: 'realtime',
    owner: {en: 'Supabase billing scheduler', fr: 'Scheduler facturation Supabase'},
    purpose: {
      en: 'Client-visible readiness items, blockers, retainer exclusions, and pre-invoice actions for each billing run.',
      fr: 'Items preparation visibles client, blocages, exclusions retainer et actions pre-facture par cycle.',
    },
    realtime: true,
  },
  {
    table: 'time_entries',
    state: 'realtime',
    owner: {en: 'Supabase source of truth', fr: 'Source de verite Supabase'},
    purpose: {
      en: 'Timer rows, edited durations, billable decisions, invoice linkage, QBO and GHL sync fields.',
      fr: 'Temps, durees editees, decisions facturables, factures, champs QBO et GHL.',
    },
    realtime: true,
  },
  {
    table: 'time_entry_events',
    state: 'realtime',
    owner: {en: 'Supabase source of truth', fr: 'Source de verite Supabase'},
    purpose: {
      en: 'Start, stop, edit, approve, publish, and sync audit history for each time entry.',
      fr: 'Audit depart, arret, edition, approbation, publication et sync.',
    },
    realtime: true,
  },
  {
    table: 'tasks',
    state: 'realtime',
    owner: {en: 'Supabase source of truth', fr: 'Source de verite Supabase'},
    purpose: {
      en: 'Client requests, internal tasks, priority, assignee, state, due date, and source channel.',
      fr: 'Demandes, taches internes, priorite, responsable, statut, echeance et source.',
    },
    realtime: true,
  },
  {
    table: 'billing_decisions',
    state: 'realtime',
    owner: {en: 'Supabase source of truth', fr: 'Source de verite Supabase'},
    purpose: {
      en: 'Owner review of will-be-billed, non-billable reason, invoice hold, and approval state.',
      fr: 'Revision owner de facturation, raison non facturable, blocage facture et approbation.',
    },
    realtime: true,
  },
  {
    table: 'retainer_usage_events',
    state: 'ledger',
    owner: {en: 'Supabase derived ledger', fr: 'Ledger derive Supabase'},
    purpose: {
      en: 'Usage, rollover, low-balance signal, and published client summary for retainer banks.',
      fr: 'Utilisation, report, alerte solde bas et resume client des banques.',
    },
    realtime: false,
  },
  {
    table: 'invoices',
    state: 'ledger',
    owner: {en: 'Supabase billing ledger', fr: 'Ledger facturation Supabase'},
    purpose: {
      en: 'Invoice readiness, exported invoice number, payment reference, and client-visible amount.',
      fr: 'Preparation facture, numero exporte, reference paiement et montant visible.',
    },
    realtime: false,
  },
  {
    table: 'notification_events',
    state: 'realtime',
    owner: {en: 'Supabase source of truth', fr: 'Source de verite Supabase'},
    purpose: {
      en: 'Liquid-rendered email/SMS queue, delivery state, retries, and audit trail.',
      fr: 'Queue email/SMS Liquid, statut livraison, retries et audit.',
    },
    realtime: true,
  },
];

export const shopifyMetafieldPlan = [
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

export const shopifyToSupabaseSyncPoints = [
  {
    label: 'Customer account created',
    effect: 'Create or update client_companies, company_members, and access state mirror rows.',
  },
  {
    label: 'Tag or role metafield changed',
    effect: 'Refresh segments, notification audiences, and portal permissions.',
  },
  {
    label: 'Retainer subscription changed',
    effect: 'Sync plan status, payment readiness, and cancellation/upgrade state before allowing bank usage.',
  },
  {
    label: 'Payment method changed',
    effect: 'Refresh payment_methods and payment-related customer segments.',
  },
];

export const supabaseToShopifySyncPoints = [
  {
    label: 'Timesheet published',
    effect: 'Mirror small summary metafields, not the full timesheet row set.',
  },
  {
    label: 'Invoice ready',
    effect: 'Update billing_policy, billing_run_summary, invoice_delivery, and client_summary metafields for account notices and segments.',
  },
  {
    label: 'Notification delivered',
    effect: 'Store delivery audit in Supabase and optionally tag account state in Shopify.',
  },
];
