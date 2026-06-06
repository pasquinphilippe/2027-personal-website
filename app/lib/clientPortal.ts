import type {LanguageCode} from '~/lib/i18n';

export type LocalizedText = Record<LanguageCode, string>;
export type BillingCategory = 'Billable' | 'NotBillable';
export type BillingType = 'Bi-Monthly' | 'Project based' | 'Monthly retainer';
export type PortalPhaseStatus = 'complete' | 'active' | 'upcoming';
export type WorkStatus = 'queued' | 'in-progress' | 'waiting-client' | 'ready' | 'done';
export type AssetStatus = 'received' | 'needed' | 'review';
export type ContactRole =
  | 'owner'
  | 'billing'
  | 'project'
  | 'technical'
  | 'communications';
export type CommunicationChannel = 'email' | 'sms' | 'shopify-account';
export type BillingCadence = 'first-and-fifteenth' | 'subscription';
export type RetainerAction = 'upgrade' | 'downgrade' | 'cancel';
export type TemplateAudience = 'all' | 'billing' | 'project' | 'technical';
export type BillingCycleStatus =
  | 'collecting'
  | 'ready'
  | 'sent'
  | 'subscription-renewal';
export type BillingRunItemStatus =
  | 'ready'
  | 'review'
  | 'blocked'
  | 'excluded'
  | 'sent';
export type RetainerActionStatus =
  | 'available'
  | 'requested'
  | 'scheduled'
  | 'completed';
export type CompanyAccessStatus =
  | 'needs-invite'
  | 'invited'
  | 'active'
  | 'billing-only'
  | 'disabled';
export type AccessPermission =
  | 'portal'
  | 'requests'
  | 'timesheet'
  | 'billing'
  | 'retainer';
export type PaymentMethodStatus =
  | 'ready'
  | 'needs-setup'
  | 'failed'
  | 'external';

export type PortalClient = {
  id: string;
  name: string;
  project: string;
  contact: string;
  companyAccountId: string;
  shopifyCustomerId: string;
  plan: LocalizedText;
  health: 'steady' | 'attention' | 'new';
  tags: string[];
  metafields: {
    companyHandle: string;
    billingCadence: BillingCadence;
    defaultLocale: LanguageCode;
    communicationTier: 'standard' | 'priority';
    retainerStatus: 'none' | 'active' | 'paused' | 'cancelling';
  };
  nextAction: LocalizedText;
};

export type CompanyContact = {
  id: string;
  clientId: string;
  name: string;
  email: string;
  phone?: string;
  roles: ContactRole[];
  locale: LanguageCode;
  receives: CommunicationChannel[];
  tags: string[];
};

export type CompanyAccessInvite = {
  id: string;
  clientId: string;
  contactId: string;
  shopifyCustomerId: string;
  status: CompanyAccessStatus;
  permissions: AccessPermission[];
  invitedAt: string;
  lastActiveAt?: string;
  requiredTags: string[];
  requiredMetafields: string[];
  nextStep: LocalizedText;
};

export type BillingPolicy = {
  id: string;
  clientId: string;
  cadence: BillingCadence;
  label: LocalizedText;
  nextBillingDate: string;
  invoiceRecipients: string[];
  communicationRecipients: string[];
  paymentMethod: 'shopify-payment-method' | 'external-invoice';
  paymentStatus: 'ready' | 'missing' | 'failed';
};

export type PaymentMethodProfile = {
  id: string;
  clientId: string;
  ownerContactId: string;
  status: PaymentMethodStatus;
  method: 'shopify-payment-method' | 'external-invoice' | 'qbo-card';
  label: LocalizedText;
  nextAction: LocalizedText;
  autopay: boolean;
  shopifyPaymentMethodId?: string;
  qboCustomerId?: string;
  lastCheckedAt: string;
};

export type RetainerSubscription = {
  id: string;
  clientId: string;
  appSubscriptionId: string;
  planName: string;
  status: 'active' | 'pending-upgrade' | 'pending-cancel' | 'cancelled';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  monthlyMinutes: number;
  usedMinutes: number;
  upgradeTo?: string;
  cancelEffective?: string;
  selfServeActions: RetainerAction[];
};

export type CommunicationTemplate = {
  id: string;
  title: LocalizedText;
  channel: CommunicationChannel;
  audience: TemplateAudience;
  cadence: 'event' | 'first' | 'fifteenth' | 'monthly';
  trigger: LocalizedText;
  liquidFile: string;
  customerTags: string[];
  metafieldKeys: string[];
};

export type BillingCycle = {
  id: string;
  cadence: BillingCadence;
  title: LocalizedText;
  date: string;
  status: BillingCycleStatus;
  clientIds: string[];
  includedBillingTypes: BillingType[];
  rule: LocalizedText;
  readyTimeEntryIds: string[];
  blockedTimeEntryIds: string[];
  invoiceRecordIds: string[];
};

export type BillingRunChecklistItem = {
  id: string;
  cycleId: string;
  clientId: string;
  title: LocalizedText;
  detail: LocalizedText;
  status: BillingRunItemStatus;
  owner: 'pasquin' | 'client' | 'shopify' | 'qbo';
  requirement: LocalizedText;
  action: LocalizedText;
  visibleToClient: boolean;
  relatedTimeEntryIds: string[];
  templateId?: string;
};

export type RetainerActionRequest = {
  id: string;
  clientId: string;
  subscriptionId?: string;
  action: RetainerAction;
  status: RetainerActionStatus;
  label: LocalizedText;
  detail: LocalizedText;
  effectiveDate: string;
  shopifyMutation: 'appSubscriptionCancel' | 'appSubscriptionLineItemsUpdate';
  notificationTemplateId: string;
};

export type NotificationAudienceCheck = {
  id: string;
  templateId: string;
  clientId: string;
  recipientContactIds: string[];
  requiredTags: string[];
  requiredMetafields: string[];
  status: 'ready' | 'missing-recipient' | 'missing-metafield';
};

export type OnboardingPhase = {
  id: string;
  number: string;
  title: LocalizedText;
  summary: LocalizedText;
  status: PortalPhaseStatus;
  owner: LocalizedText;
  action: LocalizedText;
};

export type OnboardingMilestone = {
  id: string;
  phaseId: string;
  title: LocalizedText;
  summary: LocalizedText;
  points: number;
  status: PortalPhaseStatus;
  unlock: LocalizedText;
};

export type OnboardingAchievement = {
  id: string;
  title: LocalizedText;
  detail: LocalizedText;
  points: number;
  unlocked: boolean;
};

export type AssetRequest = {
  id: string;
  clientId: string;
  title: LocalizedText;
  detail: LocalizedText;
  status: AssetStatus;
  due: string;
};

export type PortalTask = {
  id: string;
  clientId: string;
  projectId: string;
  title: LocalizedText;
  detail: LocalizedText;
  status: WorkStatus;
  priority: 'low' | 'normal' | 'high';
  source: 'client-request' | 'onboarding' | 'admin';
  due: string;
};

export type TimeEntry = {
  id: string;
  clientId: string;
  projectId: string;
  clientProject: string;
  task: string;
  date: string;
  start: string;
  end: string;
  totalTime: string;
  amountCents: number;
  billingCategory: BillingCategory;
  invoiceNumber: string;
  month: string;
  timeId: string;
  durationMinutes: number;
  billingType: BillingType;
  qboId: string;
  hourlyRateCents: number;
  durationQuantity: number;
  willBeBilled: boolean;
  utcStart: string;
  utcEnd: string;
  ownerQboId: string;
  ghlId: string;
};

export type RetainerBank = {
  id: string;
  clientId: string;
  label: LocalizedText;
  period: string;
  totalMinutes: number;
  usedMinutes: number;
  rolloverMinutes: number;
  hourlyRateCents: number;
};

export type InvoiceRecord = {
  id: string;
  clientId: string;
  invoiceNumber: string;
  status: 'draft' | 'ready' | 'sent' | 'not-ready';
  amountCents: number;
  due: string;
};

export const portalClients: PortalClient[] = [
  {
    id: 'sportive-plus',
    name: 'Sportive Plus',
    project: 'Refonte de site web',
    contact: 'Operations team',
    companyAccountId: 'company-sportive-plus',
    shopifyCustomerId: 'gid://shopify/Customer/1018520244',
    plan: {
      en: '40-hour launch bank',
      fr: "Banque de lancement 40 h",
    },
    health: 'steady',
    tags: [
      'pasquin:client',
      'pasquin:billing-bi-monthly',
      'pasquin:portal-active',
      'pasquin:segment-launch-bank',
    ],
    metafields: {
      companyHandle: 'sportive-plus',
      billingCadence: 'first-and-fifteenth',
      defaultLocale: 'fr',
      communicationTier: 'priority',
      retainerStatus: 'none',
    },
    nextAction: {
      en: 'Review theme setup priorities and approve the kickoff brief.',
      fr: "Reviser les priorites d'installation de theme et approuver le brief.",
    },
  },
  {
    id: 'pianos-bolduc',
    name: 'Pianos Bolduc',
    project: 'Support mensuel',
    contact: 'Marketing team',
    companyAccountId: 'company-pianos-bolduc',
    shopifyCustomerId: 'gid://shopify/Customer/1018520245',
    plan: {
      en: 'Monthly support',
      fr: 'Support mensuel',
    },
    health: 'attention',
    tags: [
      'pasquin:client',
      'pasquin:retainer-active',
      'pasquin:portal-active',
      'pasquin:segment-monthly-support',
    ],
    metafields: {
      companyHandle: 'pianos-bolduc',
      billingCadence: 'subscription',
      defaultLocale: 'fr',
      communicationTier: 'standard',
      retainerStatus: 'active',
    },
    nextAction: {
      en: 'Confirm banner assets for the next monthly update.',
      fr: 'Confirmer les bannieres pour la prochaine mise a jour mensuelle.',
    },
  },
  {
    id: 'renodrop',
    name: 'RenoDrop',
    project: 'Crawler',
    contact: 'Founder',
    companyAccountId: 'company-renodrop',
    shopifyCustomerId: 'gid://shopify/Customer/1018520246',
    plan: {
      en: 'Project based',
      fr: 'Projet ponctuel',
    },
    health: 'new',
    tags: [
      'pasquin:client',
      'pasquin:project-based',
      'pasquin:portal-onboarding',
    ],
    metafields: {
      companyHandle: 'renodrop',
      billingCadence: 'first-and-fifteenth',
      defaultLocale: 'en',
      communicationTier: 'standard',
      retainerStatus: 'none',
    },
    nextAction: {
      en: 'Validate crawler scope before billing is enabled.',
      fr: 'Valider la portee du crawler avant activation de la facturation.',
    },
  },
  {
    id: 'mystea',
    name: 'Mystea',
    project: 'Support mensuel',
    contact: 'Store team',
    companyAccountId: 'company-mystea',
    shopifyCustomerId: 'gid://shopify/Customer/1018520247',
    plan: {
      en: 'Monthly support',
      fr: 'Support mensuel',
    },
    health: 'steady',
    tags: [
      'pasquin:client',
      'pasquin:retainer-active',
      'pasquin:portal-active',
      'pasquin:segment-monthly-support',
    ],
    metafields: {
      companyHandle: 'mystea',
      billingCadence: 'subscription',
      defaultLocale: 'fr',
      communicationTier: 'priority',
      retainerStatus: 'active',
    },
    nextAction: {
      en: 'Confirm POS delivery handoff notes.',
      fr: 'Confirmer les notes de transfert pour la livraison PDV.',
    },
  },
];

export const companyContacts: CompanyContact[] = [
  {
    id: 'sportive-ops',
    clientId: 'sportive-plus',
    name: 'Operations lead',
    email: 'operations@sportive-plus.example',
    phone: '+15145550101',
    roles: ['owner', 'project', 'communications'],
    locale: 'fr',
    receives: ['email', 'sms', 'shopify-account'],
    tags: ['pasquin:role-owner', 'pasquin:role-project'],
  },
  {
    id: 'sportive-billing',
    clientId: 'sportive-plus',
    name: 'Finance contact',
    email: 'finance@sportive-plus.example',
    roles: ['billing'],
    locale: 'fr',
    receives: ['email'],
    tags: ['pasquin:role-billing'],
  },
  {
    id: 'sportive-dev',
    clientId: 'sportive-plus',
    name: 'Technical reviewer',
    email: 'web@sportive-plus.example',
    roles: ['technical'],
    locale: 'fr',
    receives: ['email', 'shopify-account'],
    tags: ['pasquin:role-technical'],
  },
  {
    id: 'pianos-marketing',
    clientId: 'pianos-bolduc',
    name: 'Marketing lead',
    email: 'marketing@pianos-bolduc.example',
    roles: ['project', 'communications'],
    locale: 'fr',
    receives: ['email'],
    tags: ['pasquin:role-project'],
  },
  {
    id: 'pianos-billing',
    clientId: 'pianos-bolduc',
    name: 'Billing contact',
    email: 'billing@pianos-bolduc.example',
    roles: ['billing'],
    locale: 'fr',
    receives: ['email'],
    tags: ['pasquin:role-billing'],
  },
  {
    id: 'renodrop-founder',
    clientId: 'renodrop',
    name: 'Founder',
    email: 'founder@renodrop.example',
    phone: '+15145550122',
    roles: ['owner', 'billing', 'project', 'technical'],
    locale: 'en',
    receives: ['email', 'sms', 'shopify-account'],
    tags: [
      'pasquin:role-owner',
      'pasquin:role-billing',
      'pasquin:role-project',
      'pasquin:role-technical',
    ],
  },
  {
    id: 'mystea-store',
    clientId: 'mystea',
    name: 'Store lead',
    email: 'store@mystea.example',
    roles: ['project', 'communications'],
    locale: 'fr',
    receives: ['email', 'shopify-account'],
    tags: ['pasquin:role-project', 'pasquin:role-communications'],
  },
  {
    id: 'mystea-billing',
    clientId: 'mystea',
    name: 'Billing admin',
    email: 'billing@mystea.example',
    roles: ['billing'],
    locale: 'fr',
    receives: ['email'],
    tags: ['pasquin:role-billing'],
  },
];

export const companyAccessInvites: CompanyAccessInvite[] = [
  {
    id: 'access-sportive-ops',
    clientId: 'sportive-plus',
    contactId: 'sportive-ops',
    shopifyCustomerId: 'gid://shopify/Customer/1018520244',
    status: 'active',
    permissions: ['portal', 'requests', 'timesheet'],
    invitedAt: '2024-07-25',
    lastActiveAt: '2024-08-06',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-owner'],
    requiredMetafields: ['client_portal', 'company_account', 'contact_roles'],
    nextStep: {
      en: 'Review the kickoff brief and confirm priorities.',
      fr: 'Reviser le brief de lancement et confirmer les priorites.',
    },
  },
  {
    id: 'access-sportive-billing',
    clientId: 'sportive-plus',
    contactId: 'sportive-billing',
    shopifyCustomerId: 'gid://shopify/Customer/1018520248',
    status: 'billing-only',
    permissions: ['portal', 'timesheet', 'billing'],
    invitedAt: '2024-07-25',
    lastActiveAt: '2024-08-05',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'invoice_delivery'],
    nextStep: {
      en: 'Approve invoice recipients for the August 15 billing run.',
      fr: 'Approuver les destinataires de facture pour le 15 aout.',
    },
  },
  {
    id: 'access-sportive-dev',
    clientId: 'sportive-plus',
    contactId: 'sportive-dev',
    shopifyCustomerId: 'gid://shopify/Customer/1018520249',
    status: 'invited',
    permissions: ['portal', 'requests'],
    invitedAt: '2024-08-02',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-technical'],
    requiredMetafields: ['client_portal', 'contact_roles'],
    nextStep: {
      en: 'Activate the account to review theme access tasks.',
      fr: 'Activer le compte pour reviser les acces theme.',
    },
  },
  {
    id: 'access-pianos-marketing',
    clientId: 'pianos-bolduc',
    contactId: 'pianos-marketing',
    shopifyCustomerId: 'gid://shopify/Customer/1018520245',
    status: 'active',
    permissions: ['portal', 'requests', 'retainer'],
    invitedAt: '2024-07-29',
    lastActiveAt: '2024-08-06',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-project'],
    requiredMetafields: ['client_portal', 'retainer_subscription'],
    nextStep: {
      en: 'Confirm the banner queue for the next support block.',
      fr: 'Confirmer la file de bannieres pour le prochain bloc support.',
    },
  },
  {
    id: 'access-pianos-billing',
    clientId: 'pianos-bolduc',
    contactId: 'pianos-billing',
    shopifyCustomerId: 'gid://shopify/Customer/1018520250',
    status: 'active',
    permissions: ['portal', 'billing', 'retainer'],
    invitedAt: '2024-07-29',
    lastActiveAt: '2024-08-01',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'payment_method'],
    nextStep: {
      en: 'No action needed; Shopify subscription billing is ready.',
      fr: "Aucune action requise; la facturation abonnement Shopify est prete.",
    },
  },
  {
    id: 'access-renodrop-founder',
    clientId: 'renodrop',
    contactId: 'renodrop-founder',
    shopifyCustomerId: 'gid://shopify/Customer/1018520246',
    status: 'needs-invite',
    permissions: ['portal', 'requests', 'timesheet', 'billing'],
    invitedAt: '',
    requiredTags: ['pasquin:portal-onboarding', 'pasquin:role-owner'],
    requiredMetafields: ['client_portal', 'company_account', 'billing_policy'],
    nextStep: {
      en: 'Send account invite after crawler scope is approved.',
      fr: "Envoyer l'invitation apres validation de la portee crawler.",
    },
  },
  {
    id: 'access-mystea-store',
    clientId: 'mystea',
    contactId: 'mystea-store',
    shopifyCustomerId: 'gid://shopify/Customer/1018520247',
    status: 'active',
    permissions: ['portal', 'requests', 'retainer'],
    invitedAt: '2024-07-22',
    lastActiveAt: '2024-08-05',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-project'],
    requiredMetafields: ['client_portal', 'retainer_subscription'],
    nextStep: {
      en: 'Review POS delivery notes.',
      fr: 'Reviser les notes de livraison PDV.',
    },
  },
  {
    id: 'access-mystea-billing',
    clientId: 'mystea',
    contactId: 'mystea-billing',
    shopifyCustomerId: 'gid://shopify/Customer/1018520251',
    status: 'invited',
    permissions: ['portal', 'billing', 'retainer'],
    invitedAt: '2024-08-04',
    requiredTags: ['pasquin:portal-active', 'pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'payment_method'],
    nextStep: {
      en: 'Activate billing access before the September renewal.',
      fr: "Activer l'acces facturation avant le renouvellement de septembre.",
    },
  },
];

export const billingPolicies: BillingPolicy[] = [
  {
    id: 'sportive-bi-monthly',
    clientId: 'sportive-plus',
    cadence: 'first-and-fifteenth',
    label: {
      en: 'Invoices on the 1st and 15th',
      fr: 'Factures le 1er et le 15',
    },
    nextBillingDate: '2024-08-15',
    invoiceRecipients: ['sportive-billing'],
    communicationRecipients: ['sportive-ops', 'sportive-billing'],
    paymentMethod: 'external-invoice',
    paymentStatus: 'ready',
  },
  {
    id: 'pianos-subscription',
    clientId: 'pianos-bolduc',
    cadence: 'subscription',
    label: {
      en: 'Retainer billed by Shopify subscription app',
      fr: 'Retainer facture par app abonnement Shopify',
    },
    nextBillingDate: '2024-09-01',
    invoiceRecipients: ['pianos-billing'],
    communicationRecipients: ['pianos-marketing', 'pianos-billing'],
    paymentMethod: 'shopify-payment-method',
    paymentStatus: 'ready',
  },
  {
    id: 'renodrop-bi-monthly',
    clientId: 'renodrop',
    cadence: 'first-and-fifteenth',
    label: {
      en: 'Project invoices on the 1st and 15th',
      fr: 'Factures projet le 1er et le 15',
    },
    nextBillingDate: '2024-08-15',
    invoiceRecipients: ['renodrop-founder'],
    communicationRecipients: ['renodrop-founder'],
    paymentMethod: 'external-invoice',
    paymentStatus: 'missing',
  },
  {
    id: 'mystea-subscription',
    clientId: 'mystea',
    cadence: 'subscription',
    label: {
      en: 'Retainer billed by Shopify subscription app',
      fr: 'Retainer facture par app abonnement Shopify',
    },
    nextBillingDate: '2024-09-01',
    invoiceRecipients: ['mystea-billing'],
    communicationRecipients: ['mystea-store', 'mystea-billing'],
    paymentMethod: 'shopify-payment-method',
    paymentStatus: 'ready',
  },
];

export const paymentMethodProfiles: PaymentMethodProfile[] = [
  {
    id: 'payment-sportive-external',
    clientId: 'sportive-plus',
    ownerContactId: 'sportive-billing',
    status: 'external',
    method: 'external-invoice',
    label: {
      en: 'External invoice approval',
      fr: 'Approbation facture externe',
    },
    nextAction: {
      en: 'Finance receives QBO invoices on the 1st and 15th.',
      fr: 'Finance recoit les factures QBO le 1er et le 15.',
    },
    autopay: false,
    qboCustomerId: '6',
    lastCheckedAt: '2024-08-06T12:00:00-05:00',
  },
  {
    id: 'payment-pianos-shopify',
    clientId: 'pianos-bolduc',
    ownerContactId: 'pianos-billing',
    status: 'ready',
    method: 'shopify-payment-method',
    label: {
      en: 'Shopify subscription payment method',
      fr: 'Methode de paiement abonnement Shopify',
    },
    nextAction: {
      en: 'Autopay is ready for the next retainer renewal.',
      fr: 'Autopay est pret pour le prochain renouvellement retainer.',
    },
    autopay: true,
    shopifyPaymentMethodId: 'gid://shopify/CustomerPaymentMethod/700001',
    lastCheckedAt: '2024-08-06T11:15:00-05:00',
  },
  {
    id: 'payment-renodrop-missing',
    clientId: 'renodrop',
    ownerContactId: 'renodrop-founder',
    status: 'needs-setup',
    method: 'external-invoice',
    label: {
      en: 'Invoice profile pending',
      fr: 'Profil facture en attente',
    },
    nextAction: {
      en: 'Confirm billing details before the August 15 invoice run.',
      fr: 'Confirmer les details de facturation avant le cycle du 15 aout.',
    },
    autopay: false,
    lastCheckedAt: '2024-08-06T10:00:00-05:00',
  },
  {
    id: 'payment-mystea-shopify',
    clientId: 'mystea',
    ownerContactId: 'mystea-billing',
    status: 'ready',
    method: 'shopify-payment-method',
    label: {
      en: 'Shopify subscription payment method',
      fr: 'Methode de paiement abonnement Shopify',
    },
    nextAction: {
      en: 'Payment method is ready; billing contact should activate portal access.',
      fr: "La methode est prete; le contact facturation doit activer l'acces portail.",
    },
    autopay: true,
    shopifyPaymentMethodId: 'gid://shopify/CustomerPaymentMethod/700002',
    lastCheckedAt: '2024-08-06T11:30:00-05:00',
  },
];

export const retainerSubscriptions: RetainerSubscription[] = [
  {
    id: 'sub-pianos-operator',
    clientId: 'pianos-bolduc',
    appSubscriptionId: 'gid://shopify/AppSubscription/900001',
    planName: 'Operator',
    status: 'active',
    currentPeriodStart: '2024-08-01',
    currentPeriodEnd: '2024-08-31',
    monthlyMinutes: 300,
    usedMinutes: 34,
    upgradeTo: 'Growth',
    selfServeActions: ['upgrade', 'cancel'],
  },
  {
    id: 'sub-mystea-growth',
    clientId: 'mystea',
    appSubscriptionId: 'gid://shopify/AppSubscription/900002',
    planName: 'Growth',
    status: 'active',
    currentPeriodStart: '2024-08-01',
    currentPeriodEnd: '2024-08-31',
    monthlyMinutes: 900,
    usedMinutes: 37,
    selfServeActions: ['downgrade', 'cancel'],
  },
];

export const retainerActionRequests: RetainerActionRequest[] = [
  {
    id: 'sportive-upgrade-retainer',
    clientId: 'sportive-plus',
    action: 'upgrade',
    status: 'available',
    label: {
      en: 'Move to monthly retainer',
      fr: 'Passer en retainer mensuel',
    },
    detail: {
      en: 'Keep the launch bank active and start a Shopify subscription app plan for ongoing support.',
      fr: "Garder la banque de lancement active et demarrer un plan via l'app abonnement Shopify.",
    },
    effectiveDate: '2024-09-01',
    shopifyMutation: 'appSubscriptionLineItemsUpdate',
    notificationTemplateId: 'retainer-change',
  },
  {
    id: 'pianos-upgrade-growth',
    clientId: 'pianos-bolduc',
    subscriptionId: 'sub-pianos-operator',
    action: 'upgrade',
    status: 'available',
    label: {
      en: 'Upgrade to Growth',
      fr: 'Upgrade vers Growth',
    },
    detail: {
      en: 'Increase the included monthly support bank from 5h to 15h for the next renewal.',
      fr: 'Augmenter la banque mensuelle de 5 h a 15 h au prochain renouvellement.',
    },
    effectiveDate: '2024-09-01',
    shopifyMutation: 'appSubscriptionLineItemsUpdate',
    notificationTemplateId: 'retainer-change',
  },
  {
    id: 'pianos-cancel-retainer',
    clientId: 'pianos-bolduc',
    subscriptionId: 'sub-pianos-operator',
    action: 'cancel',
    status: 'available',
    label: {
      en: 'Cancel at period end',
      fr: 'Annuler a la fin de periode',
    },
    detail: {
      en: 'Schedule cancellation after the current subscription period so existing support time remains available.',
      fr: 'Planifier la fin apres la periode courante pour conserver le temps deja inclus.',
    },
    effectiveDate: '2024-08-31',
    shopifyMutation: 'appSubscriptionCancel',
    notificationTemplateId: 'retainer-change',
  },
  {
    id: 'mystea-downgrade-operator',
    clientId: 'mystea',
    subscriptionId: 'sub-mystea-growth',
    action: 'downgrade',
    status: 'requested',
    label: {
      en: 'Downgrade to Operator',
      fr: 'Downgrade vers Operator',
    },
    detail: {
      en: 'Client requested a lower monthly support bank after this billing period.',
      fr: 'Le client a demande une banque mensuelle plus basse apres cette periode.',
    },
    effectiveDate: '2024-09-01',
    shopifyMutation: 'appSubscriptionLineItemsUpdate',
    notificationTemplateId: 'retainer-change',
  },
];

export const communicationTemplates: CommunicationTemplate[] = [
  {
    id: 'account-invite',
    title: {
      en: 'Client account invitation',
      fr: 'Invitation au compte client',
    },
    channel: 'email',
    audience: 'all',
    cadence: 'event',
    trigger: {
      en: 'Workspace created or employee added',
      fr: 'Espace cree ou employe ajoute',
    },
    liquidFile: 'app/notifications/liquid/client-account-invite.email.liquid',
    customerTags: ['pasquin:portal-onboarding', 'pasquin:portal-active'],
    metafieldKeys: ['client_portal', 'company_account', 'contact_roles'],
  },
  {
    id: 'brief-reminder',
    title: {
      en: 'Assets and brief reminder',
      fr: 'Rappel assets et brief',
    },
    channel: 'email',
    audience: 'project',
    cadence: 'event',
    trigger: {
      en: 'Required onboarding assets are still needed',
      fr: 'Assets requis toujours manquants',
    },
    liquidFile: 'app/notifications/liquid/assets-brief-reminder.email.liquid',
    customerTags: ['pasquin:role-project'],
    metafieldKeys: ['client_portal', 'asset_requests'],
  },
  {
    id: 'account-access-reminder',
    title: {
      en: 'Account access reminder',
      fr: "Rappel d'acces au compte",
    },
    channel: 'email',
    audience: 'all',
    cadence: 'event',
    trigger: {
      en: 'Invited employee has not activated access',
      fr: "Employe invite n'a pas encore active son acces",
    },
    liquidFile: 'app/notifications/liquid/account-access-reminder.email.liquid',
    customerTags: ['pasquin:portal-active'],
    metafieldKeys: ['client_portal', 'company_account', 'contact_roles'],
  },
  {
    id: 'timesheet-summary',
    title: {
      en: 'Timesheet summary',
      fr: 'Resume feuille de temps',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'first',
    trigger: {
      en: 'Timesheet is published for the billing cycle',
      fr: 'Feuille de temps publiee pour le cycle',
    },
    liquidFile: 'app/notifications/liquid/timesheet-summary.email.liquid',
    customerTags: ['pasquin:role-billing'],
    metafieldKeys: ['billing_policy', 'retainer_bank'],
  },
  {
    id: 'billing-run-precheck',
    title: {
      en: 'Billing run precheck',
      fr: 'Precheck cycle facturation',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'first',
    trigger: {
      en: 'Upcoming 1st/15th billing run has client-visible review items',
      fr: 'Cycle 1er/15 a des items visibles a reviser',
    },
    liquidFile: 'app/notifications/liquid/billing-run-precheck.email.liquid',
    customerTags: ['pasquin:role-billing'],
    metafieldKeys: ['billing_policy', 'billing_run_summary', 'invoice_delivery'],
  },
  {
    id: 'payment-method-request',
    title: {
      en: 'Payment method request',
      fr: 'Demande methode de paiement',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'Billing profile or Shopify subscription payment method is missing',
      fr: 'Profil de facturation ou paiement abonnement Shopify manquant',
    },
    liquidFile: 'app/notifications/liquid/payment-method-request.email.liquid',
    customerTags: ['pasquin:role-billing'],
    metafieldKeys: ['billing_policy', 'payment_method'],
  },
  {
    id: 'payment-method-request-sms',
    title: {
      en: 'Payment method SMS',
      fr: 'SMS methode de paiement',
    },
    channel: 'sms',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'Billing contact has SMS enabled and payment setup blocks billing',
      fr: 'Contact facturation SMS actif et paiement bloque la facturation',
    },
    liquidFile: 'app/notifications/liquid/payment-method-request.sms.liquid',
    customerTags: ['pasquin:role-billing', 'pasquin:payment-missing'],
    metafieldKeys: ['billing_policy', 'payment_method'],
  },
  {
    id: 'billing-blocker',
    title: {
      en: 'Billing blocker notice',
      fr: 'Avis blocage facturation',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'A payment, invoice recipient, or approval blocker prevents billing',
      fr: 'Paiement, destinataire facture ou approbation bloque la facturation',
    },
    liquidFile: 'app/notifications/liquid/billing-blocker.email.liquid',
    customerTags: ['pasquin:role-billing'],
    metafieldKeys: ['billing_policy', 'billing_run_summary', 'payment_method'],
  },
  {
    id: 'billing-blocker-sms',
    title: {
      en: 'Billing blocker SMS',
      fr: 'SMS blocage facturation',
    },
    channel: 'sms',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'Client-visible blocker prevents the 1st/15th invoice run',
      fr: 'Blocage visible client empeche le cycle facture 1er/15',
    },
    liquidFile: 'app/notifications/liquid/billing-blocker.sms.liquid',
    customerTags: ['pasquin:role-billing', 'pasquin:billing-run-blocked'],
    metafieldKeys: ['billing_policy', 'billing_run_summary', 'payment_method'],
  },
  {
    id: 'invoice-ready',
    title: {
      en: 'Invoice ready',
      fr: 'Facture prete',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'fifteenth',
    trigger: {
      en: 'Invoice is ready or sent',
      fr: 'Facture prete ou envoyee',
    },
    liquidFile: 'app/notifications/liquid/invoice-ready.email.liquid',
    customerTags: ['pasquin:role-billing'],
    metafieldKeys: ['billing_policy'],
  },
  {
    id: 'retainer-change',
    title: {
      en: 'Retainer change confirmation',
      fr: 'Confirmation changement retainer',
    },
    channel: 'email',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'Retainer upgraded, downgraded, or cancellation scheduled',
      fr: 'Retainer modifie ou annulation planifiee',
    },
    liquidFile: 'app/notifications/liquid/retainer-change.email.liquid',
    customerTags: ['pasquin:retainer-active'],
    metafieldKeys: ['retainer_subscription'],
  },
  {
    id: 'urgent-request-sms',
    title: {
      en: 'Urgent request SMS',
      fr: 'SMS demande urgente',
    },
    channel: 'sms',
    audience: 'project',
    cadence: 'event',
    trigger: {
      en: 'High-priority request needs a client response',
      fr: 'Demande prioritaire necessite une reponse client',
    },
    liquidFile: 'app/notifications/liquid/urgent-request.sms.liquid',
    customerTags: ['pasquin:role-project'],
    metafieldKeys: ['client_portal'],
  },
  {
    id: 'retainer-low-bank-sms',
    title: {
      en: 'Retainer low bank SMS',
      fr: 'SMS banque retainer basse',
    },
    channel: 'sms',
    audience: 'billing',
    cadence: 'event',
    trigger: {
      en: 'Retainer bank falls below the low-balance threshold',
      fr: "Banque retainer sous le seuil d'alerte",
    },
    liquidFile: 'app/notifications/liquid/retainer-low-bank.sms.liquid',
    customerTags: ['pasquin:retainer-active', 'pasquin:role-billing'],
    metafieldKeys: ['retainer_subscription', 'client_summary'],
  },
];

export const billingCycles: BillingCycle[] = [
  {
    id: 'billing-2024-08-01',
    cadence: 'first-and-fifteenth',
    title: {
      en: 'August 1 billing run',
      fr: 'Facturation du 1er aout',
    },
    date: '2024-08-01',
    status: 'sent',
    clientIds: ['sportive-plus'],
    includedBillingTypes: ['Bi-Monthly', 'Project based'],
    rule: {
      en: 'Bill approved project and bank work on the first day of the month. Retainers are excluded.',
      fr: 'Facturer les travaux approuves le premier jour du mois. Retainers exclus.',
    },
    readyTimeEntryIds: ['time-sportive-theme-install'],
    blockedTimeEntryIds: [],
    invoiceRecordIds: ['invoice-sportive-024282'],
  },
  {
    id: 'billing-2024-08-15',
    cadence: 'first-and-fifteenth',
    title: {
      en: 'August 15 billing run',
      fr: 'Facturation du 15 aout',
    },
    date: '2024-08-15',
    status: 'ready',
    clientIds: ['sportive-plus', 'renodrop'],
    includedBillingTypes: ['Bi-Monthly', 'Project based'],
    rule: {
      en: 'Review billable rows, exclude non-billable discovery, then generate invoice-ready summaries.',
      fr: 'Reviser les lignes facturables, exclure la decouverte non facturable, puis preparer les factures.',
    },
    readyTimeEntryIds: [],
    blockedTimeEntryIds: ['time-renodrop-crawler'],
    invoiceRecordIds: [],
  },
  {
    id: 'retainer-2024-09-01',
    cadence: 'subscription',
    title: {
      en: 'September retainer renewals',
      fr: 'Renouvellements retainers septembre',
    },
    date: '2024-09-01',
    status: 'subscription-renewal',
    clientIds: ['pianos-bolduc', 'mystea'],
    includedBillingTypes: ['Monthly retainer'],
    rule: {
      en: 'Shopify subscription app renews retainers; Supabase mirrors usage and notification history.',
      fr: "L'app abonnement Shopify renouvelle les retainers; Supabase miroite usage et notifications.",
    },
    readyTimeEntryIds: ['time-pianos-banners', 'time-mystea-pos'],
    blockedTimeEntryIds: [],
    invoiceRecordIds: ['invoice-pianos-draft', 'invoice-mystea-draft'],
  },
];

export const billingRunChecklistItems: BillingRunChecklistItem[] = [
  {
    id: 'check-sportive-aug01-approved-time',
    cycleId: 'billing-2024-08-01',
    clientId: 'sportive-plus',
    title: {
      en: 'Approved theme installation time',
      fr: 'Temps installation theme approuve',
    },
    detail: {
      en: 'Billable theme setup was reviewed and exported to invoice inv_024282.',
      fr: 'Le setup theme facturable a ete revise et exporte vers inv_024282.',
    },
    status: 'sent',
    owner: 'pasquin',
    requirement: {
      en: 'Invoice number and QBO customer are attached.',
      fr: 'Numero facture et client QBO attaches.',
    },
    action: {
      en: 'No client action needed.',
      fr: 'Aucune action client requise.',
    },
    visibleToClient: true,
    relatedTimeEntryIds: ['time-sportive-theme-install'],
    templateId: 'invoice-ready',
  },
  {
    id: 'check-sportive-aug15-brief',
    cycleId: 'billing-2024-08-15',
    clientId: 'sportive-plus',
    title: {
      en: 'Brief approval before next billing run',
      fr: 'Approbation du brief avant prochaine facturation',
    },
    detail: {
      en: 'Waiting-client tasks must be resolved before new billable work is added to the August 15 run.',
      fr: 'Les items en attente client doivent etre resolus avant ajout au cycle du 15 aout.',
    },
    status: 'review',
    owner: 'client',
    requirement: {
      en: 'Kickoff brief and campaign assets are confirmed.',
      fr: 'Brief kickoff et assets campagne confirmes.',
    },
    action: {
      en: 'Approve the brief or comment on blocked assets.',
      fr: 'Approuver le brief ou commenter les assets bloques.',
    },
    visibleToClient: true,
    relatedTimeEntryIds: [],
    templateId: 'billing-run-precheck',
  },
  {
    id: 'check-renodrop-aug15-nonbillable',
    cycleId: 'billing-2024-08-15',
    clientId: 'renodrop',
    title: {
      en: 'Crawler discovery excluded from invoice',
      fr: 'Decouverte crawler exclue de la facture',
    },
    detail: {
      en: 'Initial crawler discovery is marked NotBillable and will stay out of the August 15 invoice run.',
      fr: 'La decouverte initiale crawler est NotBillable et reste hors facture du 15 aout.',
    },
    status: 'excluded',
    owner: 'pasquin',
    requirement: {
      en: 'Scope must be approved before billing is enabled.',
      fr: 'La portee doit etre approuvee avant activation facture.',
    },
    action: {
      en: 'Confirm crawler scope to start billable implementation.',
      fr: 'Confirmer la portee crawler pour commencer le travail facturable.',
    },
    visibleToClient: true,
    relatedTimeEntryIds: ['time-renodrop-crawler'],
    templateId: 'billing-run-precheck',
  },
  {
    id: 'check-renodrop-aug15-payment',
    cycleId: 'billing-2024-08-15',
    clientId: 'renodrop',
    title: {
      en: 'Billing profile missing',
      fr: 'Profil facturation manquant',
    },
    detail: {
      en: 'Invoice delivery and payment details must be confirmed before project invoices are sent.',
      fr: 'Livraison facture et details paiement doivent etre confirmes avant envoi des factures projet.',
    },
    status: 'blocked',
    owner: 'client',
    requirement: {
      en: 'Billing contact, invoice destination, and payment profile are complete.',
      fr: 'Contact facturation, destination facture et profil paiement sont complets.',
    },
    action: {
      en: 'Complete billing setup.',
      fr: 'Completer la configuration facturation.',
    },
    visibleToClient: true,
    relatedTimeEntryIds: [],
    templateId: 'payment-method-request',
  },
  {
    id: 'check-pianos-sept-retainer',
    cycleId: 'retainer-2024-09-01',
    clientId: 'pianos-bolduc',
    title: {
      en: 'Retainer renewal handled by Shopify',
      fr: 'Renouvellement retainer gere par Shopify',
    },
    detail: {
      en: 'Monthly support renewal is excluded from first/15th invoices and handled by the Shopify subscription app.',
      fr: "Le renouvellement support mensuel est exclu du 1er/15 et gere par l'app abonnement Shopify.",
    },
    status: 'ready',
    owner: 'shopify',
    requirement: {
      en: 'Payment method and subscription status are active.',
      fr: 'Methode paiement et abonnement actifs.',
    },
    action: {
      en: 'Upgrade or cancel before the renewal date if needed.',
      fr: 'Upgrade ou annuler avant la date de renouvellement au besoin.',
    },
    visibleToClient: true,
    relatedTimeEntryIds: ['time-pianos-banners'],
    templateId: 'retainer-change',
  },
  {
    id: 'check-mystea-sept-billing-access',
    cycleId: 'retainer-2024-09-01',
    clientId: 'mystea',
    title: {
      en: 'Billing contact activation pending',
      fr: 'Activation contact facturation en attente',
    },
    detail: {
      en: 'The Shopify subscription payment method is ready, but the billing contact still needs portal access.',
      fr: "La methode de paiement Shopify est prete, mais le contact facturation doit activer l'acces portail.",
    },
    status: 'review',
    owner: 'client',
    requirement: {
      en: 'Billing admin activates account before renewal notice.',
      fr: "L'admin facturation active son compte avant l'avis renouvellement.",
    },
    action: {
      en: 'Activate billing access.',
      fr: "Activer l'acces facturation.",
    },
    visibleToClient: true,
    relatedTimeEntryIds: ['time-mystea-pos'],
    templateId: 'account-access-reminder',
  },
];

export const notificationAudienceChecks: NotificationAudienceCheck[] = [
  {
    id: 'sportive-account-invite-ready',
    templateId: 'account-invite',
    clientId: 'sportive-plus',
    recipientContactIds: ['sportive-ops', 'sportive-billing', 'sportive-dev'],
    requiredTags: ['pasquin:portal-active'],
    requiredMetafields: ['client_portal', 'company_account', 'contact_roles'],
    status: 'ready',
  },
  {
    id: 'sportive-timesheet-billing-ready',
    templateId: 'timesheet-summary',
    clientId: 'sportive-plus',
    recipientContactIds: ['sportive-billing'],
    requiredTags: ['pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'client_summary'],
    status: 'ready',
  },
  {
    id: 'sportive-billing-precheck-ready',
    templateId: 'billing-run-precheck',
    clientId: 'sportive-plus',
    recipientContactIds: ['sportive-billing'],
    requiredTags: ['pasquin:role-billing'],
    requiredMetafields: [
      'billing_policy',
      'billing_run_summary',
      'invoice_delivery',
    ],
    status: 'ready',
  },
  {
    id: 'sportive-dev-access-pending',
    templateId: 'account-access-reminder',
    clientId: 'sportive-plus',
    recipientContactIds: ['sportive-dev'],
    requiredTags: ['pasquin:portal-active', 'pasquin:role-technical'],
    requiredMetafields: ['client_portal', 'company_account', 'contact_roles'],
    status: 'ready',
  },
  {
    id: 'pianos-retainer-ready',
    templateId: 'retainer-change',
    clientId: 'pianos-bolduc',
    recipientContactIds: ['pianos-billing'],
    requiredTags: ['pasquin:retainer-active', 'pasquin:role-billing'],
    requiredMetafields: ['retainer_subscription', 'billing_policy'],
    status: 'ready',
  },
  {
    id: 'renodrop-payment-missing',
    templateId: 'payment-method-request',
    clientId: 'renodrop',
    recipientContactIds: ['renodrop-founder'],
    requiredTags: ['pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'payment_method'],
    status: 'missing-metafield',
  },
  {
    id: 'renodrop-payment-missing-sms',
    templateId: 'payment-method-request-sms',
    clientId: 'renodrop',
    recipientContactIds: ['renodrop-founder'],
    requiredTags: ['pasquin:role-billing', 'pasquin:payment-missing'],
    requiredMetafields: ['billing_policy', 'payment_method'],
    status: 'missing-metafield',
  },
  {
    id: 'renodrop-billing-blocked',
    templateId: 'billing-blocker',
    clientId: 'renodrop',
    recipientContactIds: ['renodrop-founder'],
    requiredTags: ['pasquin:role-billing'],
    requiredMetafields: [
      'billing_policy',
      'billing_run_summary',
      'payment_method',
    ],
    status: 'missing-metafield',
  },
  {
    id: 'renodrop-billing-blocked-sms',
    templateId: 'billing-blocker-sms',
    clientId: 'renodrop',
    recipientContactIds: ['renodrop-founder'],
    requiredTags: ['pasquin:role-billing', 'pasquin:billing-run-blocked'],
    requiredMetafields: [
      'billing_policy',
      'billing_run_summary',
      'payment_method',
    ],
    status: 'missing-metafield',
  },
  {
    id: 'renodrop-invoice-blocked',
    templateId: 'invoice-ready',
    clientId: 'renodrop',
    recipientContactIds: ['renodrop-founder'],
    requiredTags: ['pasquin:role-billing'],
    requiredMetafields: ['billing_policy'],
    status: 'ready',
  },
  {
    id: 'mystea-billing-access-pending',
    templateId: 'account-access-reminder',
    clientId: 'mystea',
    recipientContactIds: ['mystea-billing'],
    requiredTags: ['pasquin:portal-active', 'pasquin:role-billing'],
    requiredMetafields: ['billing_policy', 'payment_method'],
    status: 'ready',
  },
];

export const onboardingPhases: OnboardingPhase[] = [
  {
    id: 'booking',
    number: '01',
    title: {en: 'Booking', fr: 'Rendez-vous'},
    summary: {
      en: 'Choose the right first conversation and engagement path.',
      fr: 'Choisir la bonne premiere conversation et le bon modele.',
    },
    status: 'complete',
    owner: {en: 'Client and Pasquin', fr: 'Client et Pasquin'},
    action: {en: 'Meeting path selected', fr: 'Chemin de rendez-vous choisi'},
  },
  {
    id: 'account',
    number: '02',
    title: {en: 'Account creation', fr: 'Creation du compte'},
    summary: {
      en: 'Issue the private workspace invite and confirm billing contacts.',
      fr: "Envoyer l'invitation privee et confirmer les contacts de facturation.",
    },
    status: 'complete',
    owner: {en: 'Pasquin', fr: 'Pasquin'},
    action: {en: 'Access invitation ready', fr: 'Invitation prete'},
  },
  {
    id: 'brief',
    number: '03',
    title: {en: 'Assets and brief', fr: 'Assets et brief'},
    summary: {
      en: 'Collect logins, theme access, design notes, launch constraints, and priorities.',
      fr: 'Regrouper acces, theme, notes design, contraintes et priorites.',
    },
    status: 'active',
    owner: {en: 'Client', fr: 'Client'},
    action: {en: 'Approve kickoff brief', fr: 'Approuver le brief'},
  },
  {
    id: 'scope',
    number: '04',
    title: {en: 'Scope and kickoff', fr: 'Portee et kickoff'},
    summary: {
      en: 'Translate the brief into a bank, retainer, first sprint, and decision log.',
      fr: 'Transformer le brief en banque, retainer, premier sprint et journal de decisions.',
    },
    status: 'upcoming',
    owner: {en: 'Pasquin', fr: 'Pasquin'},
    action: {en: 'Confirm first sprint', fr: 'Confirmer le premier sprint'},
  },
  {
    id: 'requests',
    number: '05',
    title: {en: 'Requests and tasks', fr: 'Demandes et taches'},
    summary: {
      en: 'Track requested work, waiting items, priorities, and shipping status.',
      fr: 'Suivre les demandes, items en attente, priorites et livraisons.',
    },
    status: 'upcoming',
    owner: {en: 'Shared', fr: 'Partage'},
    action: {en: 'Triage incoming requests', fr: 'Trier les demandes'},
  },
  {
    id: 'time',
    number: '06',
    title: {en: 'Timesheet and retainer bank', fr: "Feuille de temps et banque d'heures"},
    summary: {
      en: 'Make used time, remaining bank, non-billable work, and rollover easy to read.',
      fr: 'Rendre le temps utilise, restant, non facturable et reporte facile a lire.',
    },
    status: 'upcoming',
    owner: {en: 'Pasquin', fr: 'Pasquin'},
    action: {en: 'Publish time summary', fr: 'Publier le resume de temps'},
  },
  {
    id: 'financials',
    number: '07',
    title: {en: 'Financials', fr: 'Finances'},
    summary: {
      en: 'Show invoices, billing readiness, open amounts, and what will be billed.',
      fr: 'Afficher factures, preparation facturation, montants et items a facturer.',
    },
    status: 'upcoming',
    owner: {en: 'Pasquin', fr: 'Pasquin'},
    action: {en: 'Prepare next invoice', fr: 'Preparer la prochaine facture'},
  },
  {
    id: 'handoff',
    number: '08',
    title: {en: 'Handoff and support', fr: 'Transfert et support'},
    summary: {
      en: 'Close the loop with notes, QA outcomes, and the next support rhythm.',
      fr: 'Fermer la boucle avec notes, QA et prochain rythme de support.',
    },
    status: 'upcoming',
    owner: {en: 'Shared', fr: 'Partage'},
    action: {en: 'Confirm support rhythm', fr: 'Confirmer le rythme de support'},
  },
];

export const onboardingMilestones: OnboardingMilestone[] = [
  {
    id: 'mission-booking',
    phaseId: 'booking',
    title: {en: 'Meeting path chosen', fr: 'Chemin de rencontre choisi'},
    summary: {
      en: 'The right engagement path is selected and the workspace is open.',
      fr: "Le bon chemin d'engagement est choisi et l'espace est ouvert.",
    },
    points: 120,
    status: 'complete',
    unlock: {
      en: 'Private workspace access',
      fr: "Acces a l'espace prive",
    },
  },
  {
    id: 'mission-account',
    phaseId: 'account',
    title: {en: 'Team roles mapped', fr: 'Roles equipe mappees'},
    summary: {
      en: 'Owner, billing, project, technical, and communication roles are separated.',
      fr: 'Roles proprietaire, facturation, projet, technique et communications separes.',
    },
    points: 180,
    status: 'complete',
    unlock: {
      en: 'Audience-aware notifications',
      fr: 'Notifications par audience',
    },
  },
  {
    id: 'mission-brief',
    phaseId: 'brief',
    title: {en: 'Kickoff brief in review', fr: 'Brief kickoff en revision'},
    summary: {
      en: 'Assets, access, priorities, launch constraints, and first sprint decisions are being confirmed.',
      fr: 'Assets, acces, priorites, contraintes et decisions sprint sont en confirmation.',
    },
    points: 220,
    status: 'active',
    unlock: {
      en: 'Sprint scope and billing rules',
      fr: 'Portee sprint et regles de facturation',
    },
  },
  {
    id: 'mission-scope',
    phaseId: 'scope',
    title: {en: 'Scope ready to lock', fr: 'Portee prete a verrouiller'},
    summary: {
      en: 'The brief turns into a first sprint, time bank, or retainer path.',
      fr: 'Le brief devient un premier sprint, une banque ou un retainer.',
    },
    points: 160,
    status: 'upcoming',
    unlock: {
      en: 'Start of delivery rhythm',
      fr: 'Debut du rythme de livraison',
    },
  },
  {
    id: 'mission-finance',
    phaseId: 'financials',
    title: {en: 'Billing clarity unlocked', fr: 'Clarte facturation debloquee'},
    summary: {
      en: 'Invoice cadence, payment method, retainer state, and visibility rules are confirmed.',
      fr: 'Rythme facture, paiement, retainer et visibilite sont confirmes.',
    },
    points: 180,
    status: 'upcoming',
    unlock: {
      en: 'Clean billing handoff',
      fr: 'Transfert facturation clair',
    },
  },
];

export const onboardingAchievements: OnboardingAchievement[] = [
  {
    id: 'badge-access',
    title: {en: 'Access verified', fr: 'Acces verifies'},
    detail: {
      en: 'Shopify collaborator access and internal owner visibility are confirmed.',
      fr: 'Acces collaborateur Shopify et visibilite owner confirmes.',
    },
    points: 120,
    unlocked: true,
  },
  {
    id: 'badge-finance',
    title: {en: 'Finance lane ready', fr: 'Voie finance prete'},
    detail: {
      en: 'Billing contact, cadence, and invoice destination are separated from project chatter.',
      fr: 'Contact facturation, cadence et facture separes des conversations projet.',
    },
    points: 180,
    unlocked: true,
  },
  {
    id: 'badge-launch',
    title: {en: 'Launch control', fr: 'Controle lancement'},
    detail: {
      en: 'Brief approval unlocks the first sprint plan and delivery rhythm.',
      fr: 'Approbation du brief debloque le premier sprint et le rythme.',
    },
    points: 220,
    unlocked: false,
  },
];


export const assetRequests: AssetRequest[] = [
  {
    id: 'shopify-access',
    clientId: 'sportive-plus',
    title: {en: 'Shopify collaborator access', fr: 'Acces collaborateur Shopify'},
    detail: {
      en: 'Theme, products, apps, and settings access for setup work.',
      fr: 'Acces theme, produits, apps et parametres pour le travail initial.',
    },
    status: 'received',
    due: 'Ready',
  },
  {
    id: 'brand-assets',
    clientId: 'sportive-plus',
    title: {en: 'Brand and campaign assets', fr: 'Assets marque et campagne'},
    detail: {
      en: 'Logo files, banners, promo copy, and launch imagery.',
      fr: 'Logos, bannieres, textes promo et images de lancement.',
    },
    status: 'needed',
    due: 'Aug 8',
  },
  {
    id: 'brief-approval',
    clientId: 'sportive-plus',
    title: {en: 'Kickoff brief approval', fr: 'Approbation du brief'},
    detail: {
      en: 'Confirm priority order, constraints, and first sprint boundaries.',
      fr: 'Confirmer ordre des priorites, contraintes et limites du premier sprint.',
    },
    status: 'review',
    due: 'Aug 9',
  },
  {
    id: 'billing-contact',
    clientId: 'sportive-plus',
    title: {en: 'Billing contact', fr: 'Contact facturation'},
    detail: {
      en: 'Confirm invoice recipient and purchase order requirements.',
      fr: 'Confirmer destinataire des factures et besoins de bon de commande.',
    },
    status: 'received',
    due: 'Ready',
  },
];

export const portalTasks: PortalTask[] = [
  {
    id: 'theme-install',
    clientId: 'sportive-plus',
    projectId: 'sportive-refonte',
    title: {en: 'Theme installation', fr: 'Installation de themes'},
    detail: {
      en: 'Set up base theme, confirm sections, and list first cleanup items.',
      fr: 'Installer le theme, confirmer les sections et lister les premiers correctifs.',
    },
    status: 'in-progress',
    priority: 'high',
    source: 'onboarding',
    due: 'Aug 9',
  },
  {
    id: 'campaign-assets',
    clientId: 'sportive-plus',
    projectId: 'sportive-refonte',
    title: {en: 'Campaign assets review', fr: 'Revision des assets campagne'},
    detail: {
      en: 'Validate banner sizes, homepage placement, and promo copy.',
      fr: 'Valider formats de bannieres, placement accueil et textes promo.',
    },
    status: 'waiting-client',
    priority: 'normal',
    source: 'client-request',
    due: 'Aug 12',
  },
  {
    id: 'pianos-banners',
    clientId: 'pianos-bolduc',
    projectId: 'pianos-support',
    title: {en: 'Monthly banner change', fr: 'Changement de bannieres'},
    detail: {
      en: 'Replace seasonal banners and confirm collection landing links.',
      fr: 'Remplacer les bannieres saisonnieres et confirmer les liens collections.',
    },
    status: 'ready',
    priority: 'normal',
    source: 'client-request',
    due: 'Aug 6',
  },
  {
    id: 'crawler-scope',
    clientId: 'renodrop',
    projectId: 'renodrop-crawler',
    title: {en: 'Initial crawler scope', fr: 'Portee initiale du crawler'},
    detail: {
      en: 'Document crawler inputs, output shape, and non-billable discovery.',
      fr: 'Documenter entrees, sorties et decouverte non facturable.',
    },
    status: 'queued',
    priority: 'high',
    source: 'admin',
    due: 'Aug 14',
  },
  {
    id: 'mystea-pos',
    clientId: 'mystea',
    projectId: 'mystea-support',
    title: {en: 'POS delivery handoff', fr: 'Livraison PDV'},
    detail: {
      en: 'Finish support notes and confirm what is billable this cycle.',
      fr: 'Finaliser les notes support et confirmer la facturation du cycle.',
    },
    status: 'done',
    priority: 'low',
    source: 'admin',
    due: 'Aug 5',
  },
];

export const timeEntries: TimeEntry[] = [
  {
    id: 'time-sportive-theme-install',
    clientId: 'sportive-plus',
    projectId: 'sportive-refonte',
    clientProject: 'Sportive Plus - Refonte de site web',
    task: 'Installation de themes',
    date: '2024-08-01',
    start: '09:30:00',
    end: '11:15:00',
    totalTime: '1:45:00',
    amountCents: 21875,
    billingCategory: 'Billable',
    invoiceNumber: 'inv_024282',
    month: 'Aug-2024',
    timeId: '',
    durationMinutes: 105,
    billingType: 'Bi-Monthly',
    qboId: '6',
    hourlyRateCents: 12500,
    durationQuantity: 1.75,
    willBeBilled: false,
    utcStart: '2024-08-01T09:30:00-05:00',
    utcEnd: '2024-08-01T11:15:00-05:00',
    ownerQboId: '6',
    ghlId: 'FSPotuOXfl7QguuCV7PC',
  },
  {
    id: 'time-pianos-banners',
    clientId: 'pianos-bolduc',
    projectId: 'pianos-support',
    clientProject: 'Pianos Bolduc - Support mensuel',
    task: 'Changement de bannieres',
    date: '2024-08-01',
    start: '09:10:00',
    end: '09:44:00',
    totalTime: '0:34:00',
    amountCents: 5415,
    billingCategory: 'Billable',
    invoiceNumber: '',
    month: 'Aug-2024',
    timeId: '',
    durationMinutes: 34,
    billingType: 'Bi-Monthly',
    qboId: '22',
    hourlyRateCents: 9500,
    durationQuantity: 0.57,
    willBeBilled: false,
    utcStart: '2024-08-01T09:10:00-05:00',
    utcEnd: '2024-08-01T09:44:00-05:00',
    ownerQboId: '22',
    ghlId: 'drAZtU2ScWyqL7g9BNEK',
  },
  {
    id: 'time-renodrop-crawler',
    clientId: 'renodrop',
    projectId: 'renodrop-crawler',
    clientProject: 'RenoDrop - Crawler',
    task: 'Initial Crawler',
    date: '2024-08-05',
    start: '10:00:00',
    end: '11:45:00',
    totalTime: '1:45:00',
    amountCents: 26250,
    billingCategory: 'NotBillable',
    invoiceNumber: '',
    month: 'Aug-2024',
    timeId: '',
    durationMinutes: 105,
    billingType: 'Project based',
    qboId: '',
    hourlyRateCents: 15000,
    durationQuantity: 1.75,
    willBeBilled: false,
    utcStart: '2024-08-05T10:00:00-05:00',
    utcEnd: '2024-08-05T11:45:00-05:00',
    ownerQboId: '',
    ghlId: '',
  },
  {
    id: 'time-mystea-pos',
    clientId: 'mystea',
    projectId: 'mystea-support',
    clientProject: 'Mystea - Support mensuel',
    task: 'Livraison PDV',
    date: '2024-08-05',
    start: '12:00:00',
    end: '12:37:00',
    totalTime: '0:37:00',
    amountCents: 4650,
    billingCategory: 'Billable',
    invoiceNumber: '',
    month: 'Aug-2024',
    timeId: '',
    durationMinutes: 37,
    billingType: 'Bi-Monthly',
    qboId: '',
    hourlyRateCents: 7500,
    durationQuantity: 0.62,
    willBeBilled: false,
    utcStart: '2024-08-05T12:00:00-05:00',
    utcEnd: '2024-08-05T12:37:00-05:00',
    ownerQboId: '',
    ghlId: '',
  },
];

export const retainerBanks: RetainerBank[] = [
  {
    id: 'sportive-launch-bank',
    clientId: 'sportive-plus',
    label: {en: 'Launch bank', fr: 'Banque lancement'},
    period: 'Aug-2024',
    totalMinutes: 40 * 60,
    usedMinutes: 105,
    rolloverMinutes: 0,
    hourlyRateCents: 12500,
  },
  {
    id: 'pianos-monthly-support',
    clientId: 'pianos-bolduc',
    label: {en: 'Monthly support', fr: 'Support mensuel'},
    period: 'Aug-2024',
    totalMinutes: 5 * 60,
    usedMinutes: 34,
    rolloverMinutes: 30,
    hourlyRateCents: 9500,
  },
  {
    id: 'mystea-monthly-support',
    clientId: 'mystea',
    label: {en: 'Monthly support', fr: 'Support mensuel'},
    period: 'Aug-2024',
    totalMinutes: 5 * 60,
    usedMinutes: 37,
    rolloverMinutes: 30,
    hourlyRateCents: 7500,
  },
];

export const invoiceRecords: InvoiceRecord[] = [
  {
    id: 'invoice-sportive-024282',
    clientId: 'sportive-plus',
    invoiceNumber: 'inv_024282',
    status: 'sent',
    amountCents: 21875,
    due: '2024-08-15',
  },
  {
    id: 'invoice-pianos-draft',
    clientId: 'pianos-bolduc',
    invoiceNumber: 'Draft',
    status: 'ready',
    amountCents: 5415,
    due: '2024-08-15',
  },
  {
    id: 'invoice-mystea-draft',
    clientId: 'mystea',
    invoiceNumber: 'Draft',
    status: 'ready',
    amountCents: 4650,
    due: '2024-08-15',
  },
];

export function getClientById(clientId: string) {
  return portalClients.find((client) => client.id === clientId);
}

export function getPrimaryPortalClient() {
  return portalClients[0];
}

export function getClientAssets(clientId: string) {
  return assetRequests.filter((asset) => asset.clientId === clientId);
}

export function getClientTasks(clientId: string) {
  return portalTasks.filter((task) => task.clientId === clientId);
}

export function getClientTimeEntries(clientId: string) {
  return timeEntries.filter((entry) => entry.clientId === clientId);
}

export function getClientRetainerBank(clientId: string) {
  return retainerBanks.find((bank) => bank.clientId === clientId);
}

export function getClientInvoices(clientId: string) {
  return invoiceRecords.filter((invoice) => invoice.clientId === clientId);
}

export function getClientContacts(clientId: string) {
  return companyContacts.filter((contact) => contact.clientId === clientId);
}

export function getContactById(contactId: string) {
  return companyContacts.find((contact) => contact.id === contactId);
}

export function getClientAccessInvites(clientId: string) {
  return companyAccessInvites.filter((invite) => invite.clientId === clientId);
}

export function getClientBillingPolicy(clientId: string) {
  return billingPolicies.find((policy) => policy.clientId === clientId);
}

export function getClientPaymentMethodProfile(clientId: string) {
  return paymentMethodProfiles.find((profile) => profile.clientId === clientId);
}

export function getClientRetainerSubscription(clientId: string) {
  return retainerSubscriptions.find(
    (subscription) => subscription.clientId === clientId,
  );
}

export function getClientCommunicationTemplates(clientId: string) {
  const client = getClientById(clientId);
  if (!client) return [];

  return communicationTemplates.filter((template) =>
    template.customerTags.some((tag) => client.tags.includes(tag)) ||
    template.customerTags.some((tag) =>
      getClientContacts(clientId).some((contact) => contact.tags.includes(tag)),
    ),
  );
}

export function getClientBillingCycles(clientId: string) {
  return billingCycles.filter((cycle) => cycle.clientIds.includes(clientId));
}

export function getClientBillingRunChecklistItems(clientId: string) {
  return billingRunChecklistItems.filter(
    (item) => item.clientId === clientId && item.visibleToClient,
  );
}

export function getBillingRunChecklistItems(cycleId: string) {
  return billingRunChecklistItems.filter((item) => item.cycleId === cycleId);
}

export function getClientRetainerActions(clientId: string) {
  return retainerActionRequests.filter((action) => action.clientId === clientId);
}

export function getClientNotificationChecks(clientId: string) {
  return notificationAudienceChecks.filter((check) => check.clientId === clientId);
}

export function getOnboardingScore() {
  const earnedPoints = onboardingMilestones.reduce((total, milestone) => {
    if (milestone.status === 'complete') return total + milestone.points;
    if (milestone.status === 'active') return total + Math.round(milestone.points * 0.45);
    return total;
  }, 0);
  const totalPoints = onboardingMilestones.reduce(
    (total, milestone) => total + milestone.points,
    0,
  );

  return {
    earnedPoints,
    totalPoints,
    percent: Math.round((earnedPoints / totalPoints) * 100),
  };
}

export function getOnboardingLevel(language: LanguageCode) {
  const score = getOnboardingScore();

  if (score.percent >= 80) {
    return {
      label: {en: 'Launch ready', fr: 'Pret lancement'}[language],
      detail: {
        en: 'Delivery, billing, and communications are aligned.',
        fr: 'Livraison, facturation et communications sont alignees.',
      }[language],
    };
  }

  if (score.percent >= 45) {
    return {
      label: {en: 'Setup momentum', fr: 'Momentum setup'}[language],
      detail: {
        en: 'Core access and roles are done; brief approval is the next unlock.',
        fr: "Acces et roles sont faits; l'approbation du brief debloque la suite.",
      }[language],
    };
  }

  return {
    label: {en: 'Foundation', fr: 'Fondation'}[language],
    detail: {
      en: 'The workspace is open and the setup path is being shaped.',
      fr: "L'espace est ouvert et le chemin de setup se precise.",
    }[language],
  };
}

export function getBillingCycleAmount(cycle: BillingCycle) {
  const readyEntries = timeEntries.filter((entry) =>
    cycle.readyTimeEntryIds.includes(entry.id),
  );
  const invoiceAmounts = invoiceRecords
    .filter((invoice) => cycle.invoiceRecordIds.includes(invoice.id))
    .reduce((total, invoice) => total + invoice.amountCents, 0);

  return invoiceAmounts || sumAmount(readyEntries);
}

export function getBillingCycleMinutes(cycle: BillingCycle) {
  const readyEntries = timeEntries.filter((entry) =>
    cycle.readyTimeEntryIds.includes(entry.id),
  );

  return sumMinutes(readyEntries);
}

export function getRetainerActionStatusLabel(
  status: RetainerActionStatus,
  language: LanguageCode,
) {
  const labels: Record<RetainerActionStatus, LocalizedText> = {
    available: {en: 'Available', fr: 'Disponible'},
    requested: {en: 'Requested', fr: 'Demande'},
    scheduled: {en: 'Scheduled', fr: 'Planifie'},
    completed: {en: 'Completed', fr: 'Complete'},
  };

  return labels[status][language];
}

export function getCompanyAccessStatusLabel(
  status: CompanyAccessStatus,
  language: LanguageCode,
) {
  const labels: Record<CompanyAccessStatus, LocalizedText> = {
    'needs-invite': {en: 'Needs invite', fr: 'Invitation requise'},
    invited: {en: 'Invited', fr: 'Invite'},
    active: {en: 'Active', fr: 'Actif'},
    'billing-only': {en: 'Billing only', fr: 'Facturation seulement'},
    disabled: {en: 'Disabled', fr: 'Desactive'},
  };

  return labels[status][language];
}

export function getPaymentMethodStatusLabel(
  status: PaymentMethodStatus,
  language: LanguageCode,
) {
  const labels: Record<PaymentMethodStatus, LocalizedText> = {
    ready: {en: 'Ready', fr: 'Pret'},
    'needs-setup': {en: 'Needs setup', fr: 'Configuration requise'},
    failed: {en: 'Failed', fr: 'Echec'},
    external: {en: 'External invoice', fr: 'Facture externe'},
  };

  return labels[status][language];
}

export function getBillingCycleStatusLabel(
  status: BillingCycleStatus,
  language: LanguageCode,
) {
  const labels: Record<BillingCycleStatus, LocalizedText> = {
    collecting: {en: 'Collecting', fr: 'En collecte'},
    ready: {en: 'Ready', fr: 'Pret'},
    sent: {en: 'Sent', fr: 'Envoye'},
    'subscription-renewal': {
      en: 'Subscription renewal',
      fr: 'Renouvellement abonnement',
    },
  };

  return labels[status][language];
}

export function getBillingRunItemStatusLabel(
  status: BillingRunItemStatus,
  language: LanguageCode,
) {
  const labels: Record<BillingRunItemStatus, LocalizedText> = {
    ready: {en: 'Ready', fr: 'Pret'},
    review: {en: 'Review', fr: 'Revision'},
    blocked: {en: 'Blocked', fr: 'Bloque'},
    excluded: {en: 'Excluded', fr: 'Exclu'},
    sent: {en: 'Sent', fr: 'Envoye'},
  };

  return labels[status][language];
}

export function getRoleLabel(role: ContactRole, language: LanguageCode) {
  const labels: Record<ContactRole, LocalizedText> = {
    owner: {en: 'Owner', fr: 'Proprietaire'},
    billing: {en: 'Billing', fr: 'Facturation'},
    project: {en: 'Project', fr: 'Projet'},
    technical: {en: 'Technical', fr: 'Technique'},
    communications: {en: 'Communications', fr: 'Communications'},
  };

  return labels[role][language];
}

export function getBillingCadenceLabel(
  cadence: BillingCadence,
  language: LanguageCode,
) {
  const labels: Record<BillingCadence, LocalizedText> = {
    'first-and-fifteenth': {
      en: 'Billed on the 1st and 15th',
      fr: 'Facture le 1er et le 15',
    },
    subscription: {
      en: 'Shopify subscription app',
      fr: 'App abonnement Shopify',
    },
  };

  return labels[cadence][language];
}

export function sumMinutes(entries: TimeEntry[]) {
  return entries.reduce((total, entry) => total + entry.durationMinutes, 0);
}

export function sumAmount(entries: TimeEntry[]) {
  return entries.reduce((total, entry) => total + entry.amountCents, 0);
}

export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) return `${remainingMinutes}m`;
  if (!remainingMinutes) return `${hours}h`;
  return `${hours}h ${String(remainingMinutes).padStart(2, '0')}m`;
}

export function formatMoney(cents: number) {
  return `CA$${(cents / 100).toFixed(2)}`;
}

export function getStatusLabel(status: WorkStatus, language: LanguageCode) {
  const labels: Record<WorkStatus, LocalizedText> = {
    queued: {en: 'Queued', fr: 'En file'},
    'in-progress': {en: 'In progress', fr: 'En cours'},
    'waiting-client': {en: 'Waiting on client', fr: 'En attente client'},
    ready: {en: 'Ready for review', fr: 'Pret pour revision'},
    done: {en: 'Done', fr: 'Complete'},
  };

  return labels[status][language];
}

export function getAssetStatusLabel(status: AssetStatus, language: LanguageCode) {
  const labels: Record<AssetStatus, LocalizedText> = {
    received: {en: 'Received', fr: 'Recu'},
    needed: {en: 'Needed', fr: 'Requis'},
    review: {en: 'Review', fr: 'Revision'},
  };

  return labels[status][language];
}

export function getNextWorkStatus(status: WorkStatus): WorkStatus {
  const order: WorkStatus[] = [
    'queued',
    'in-progress',
    'waiting-client',
    'ready',
    'done',
  ];
  const index = order.indexOf(status);
  return order[(index + 1) % order.length];
}

export function maskExternalId(value: string) {
  if (!value) return 'Missing';
  if (value.length <= 8) return value;
  return `${value.slice(0, 3)}...${value.slice(-5)}`;
}
