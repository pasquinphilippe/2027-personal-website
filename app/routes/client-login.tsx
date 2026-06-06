import {useEffect, useMemo, useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/client-login';
import {
  formatDuration,
  formatMoney,
  getAssetStatusLabel,
  getBillingCadenceLabel,
  getBillingCycleAmount,
  getBillingCycleMinutes,
  getBillingCycleStatusLabel,
  getBillingRunItemStatusLabel,
  getClientAccessInvites,
  getClientAssets,
  getClientBillingPolicy,
  getClientBillingCycles,
  getClientBillingRunChecklistItems,
  getClientCommunicationTemplates,
  getClientContacts,
  getClientInvoices,
  getClientNotificationChecks,
  getClientPaymentMethodProfile,
  getClientRetainerBank,
  getClientRetainerActions,
  getClientRetainerSubscription,
  getClientTasks,
  getClientTimeEntries,
  getClientById,
  getCompanyAccessStatusLabel,
  getContactById,
  getOnboardingLevel,
  getOnboardingScore,
  getPaymentMethodStatusLabel,
  getRoleLabel,
  getRetainerActionStatusLabel,
  getStatusLabel,
  onboardingAchievements,
  onboardingMilestones,
  onboardingPhases,
  portalClients,
  sumAmount,
  sumMinutes,
  type AssetRequest,
  type BillingCycle,
  type BillingRunChecklistItem,
  type CommunicationTemplate,
  type CompanyAccessInvite,
  type CompanyContact,
  type NotificationAudienceCheck,
  type OnboardingAchievement,
  type OnboardingMilestone,
  type PaymentMethodProfile,
  type PortalTask,
  type RetainerActionRequest,
  type RetainerSubscription,
  type WorkStatus,
} from '~/lib/clientPortal';
import {dataBoundaries} from '~/lib/clientDataArchitecture';
import {
  CUSTOMER_PORTAL_QUERY,
  resolvePortalContext,
  type PortalContext,
} from '~/lib/customerPortalContext';
import {getPublicConfig} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLocalizedHref,
  useSelectedLanguage,
  type LanguageCode,
} from '~/lib/i18n';

type ClientPortalCopy = {
  title: string;
  label: string;
  intro: string;
  nextStep: string;
  openScheduler: string;
  sendBrief: string;
  contact: string;
  progress: string;
  currentPhase: string;
  workspace: string;
  activeClient: string;
  plan: string;
  contactPerson: string;
  phaseOwner: string;
  clientChecklist: string;
  requestQueue: string;
  timeAndBank: string;
  financials: string;
  usedTime: string;
  remainingBank: string;
  billableTotal: string;
  invoiceStatus: string;
  recentTime: string;
  assets: string;
  due: string;
  task: string;
  priority: string;
  advanceStatus: string;
  noBank: string;
  billingReady: string;
  invoice: string;
  amount: string;
  hiddenIds: string;
  adminNote: string;
  teamAccess: string;
  accountRoles: string;
  billingSetup: string;
  billingCadence: string;
  nextBilling: string;
  paymentStatus: string;
  subscription: string;
  noSubscription: string;
  includedTime: string;
  selfServe: string;
  communications: string;
  trigger: string;
  audience: string;
  dataModel: string;
  systemOfRecord: string;
  realtime: string;
  synced: string;
  notRealtime: string;
  sampleAccounts: string;
  billingCycles: string;
  billingRule: string;
  retainerActions: string;
  effective: string;
  notificationChecks: string;
  recipients: string;
  requirements: string;
  readiness: string;
  nextMission: string;
  level: string;
  earned: string;
  total: string;
  milestones: string;
  achievements: string;
  unlocks: string;
  claimReward: string;
  rewardClaimed: string;
  dashboardMenu: string;
  projectSnapshot: string;
  accountAccess: string;
  permissions: string;
  paymentMethod: string;
  autopay: string;
  lastChecked: string;
  billingReadiness: string;
  owner: string;
  requirement: string;
  actionNeeded: string;
  workspacePage: string;
  pageAction: string;
  pageContext: string;
  reviewBrief: string;
  openRequests: string;
  manageRetainer: string;
  openFinancials: string;
  openAccount: string;
  openTimeBank: string;
  contactBilling: string;
  readinessMetric: string;
};

const clientPortalCopy: Record<LanguageCode, ClientPortalCopy> = {
  en: {
    title: 'Client workspace for the first Shopify sprint.',
    label: 'Private onboarding prototype',
    intro:
      'A guided workspace that keeps booking, access, assets, requests, time, retainers, and financials in one calm place.',
    nextStep: 'Next client step',
    openScheduler: 'Open scheduler',
    sendBrief: 'Email the brief',
    contact: 'Contact',
    progress: 'Onboarding progress',
    currentPhase: 'Current phase',
    workspace: 'Workspace',
    activeClient: 'Active client',
    plan: 'Plan',
    contactPerson: 'Contact',
    phaseOwner: 'Owner',
    clientChecklist: 'Client checklist',
    requestQueue: 'Requests and tasks',
    timeAndBank: 'Timesheet and retainer bank',
    financials: 'Financials',
    usedTime: 'Used time',
    remainingBank: 'Remaining bank',
    billableTotal: 'Billable total',
    invoiceStatus: 'Invoice status',
    recentTime: 'Recent time',
    assets: 'Assets',
    due: 'Due',
    task: 'Task',
    priority: 'Priority',
    advanceStatus: 'Advance status',
    noBank: 'No active bank for this sample client.',
    billingReady: 'Billing-ready items',
    invoice: 'Invoice',
    amount: 'Amount',
    hiddenIds: 'Internal QBO, GHL, and TimeID references stay hidden from clients.',
    adminNote: 'Owner admin stays separate at /admin and is not linked in public navigation.',
    teamAccess: 'Team access',
    accountRoles: 'Company account and roles',
    billingSetup: 'Billing setup',
    billingCadence: 'Billing cadence',
    nextBilling: 'Next billing',
    paymentStatus: 'Payment status',
    subscription: 'Retainer subscription',
    noSubscription: 'No active Shopify subscription for this sample client.',
    includedTime: 'Included time',
    selfServe: 'Self-serve actions',
    communications: 'Communications',
    trigger: 'Trigger',
    audience: 'Audience',
    dataModel: 'Data model',
    systemOfRecord: 'System of record',
    realtime: 'Realtime',
    synced: 'Synced',
    notRealtime: 'Not realtime',
    sampleAccounts: 'Sample workspaces',
    billingCycles: 'Billing cycles',
    billingRule: 'Billing rule',
    retainerActions: 'Retainer actions',
    effective: 'Effective',
    notificationChecks: 'Notification checks',
    recipients: 'Recipients',
    requirements: 'Requirements',
    readiness: 'Readiness score',
    nextMission: 'Next mission',
    level: 'Level',
    earned: 'Earned',
    total: 'Total',
    milestones: 'Milestones',
    achievements: 'Achievements',
    unlocks: 'Unlocks',
    claimReward: 'Claim reward',
    rewardClaimed: 'Reward claimed',
    dashboardMenu: 'Dashboard menu',
    projectSnapshot: 'Project snapshot',
    accountAccess: 'Account access',
    permissions: 'Permissions',
    paymentMethod: 'Payment method',
    autopay: 'Autopay',
    lastChecked: 'Last checked',
    billingReadiness: 'Billing readiness',
    owner: 'Owner',
    requirement: 'Requirement',
    actionNeeded: 'Action needed',
    workspacePage: 'Workspace page',
    pageAction: 'Client action',
    pageContext: 'Page context',
    reviewBrief: 'Review brief',
    openRequests: 'Open requests',
    manageRetainer: 'Manage retainer',
    openFinancials: 'Open financials',
    openAccount: 'Open account',
    openTimeBank: 'Open time bank',
    contactBilling: 'Contact billing',
    readinessMetric: 'Readiness',
  },
  fr: {
    title: 'Espace client pour le premier sprint Shopify.',
    label: "Prototype d'onboarding prive",
    intro:
      "Un espace guide qui regroupe rendez-vous, acces, assets, demandes, temps, banques d'heures et finances.",
    nextStep: 'Prochaine etape client',
    openScheduler: 'Ouvrir le calendrier',
    sendBrief: 'Envoyer le brief',
    contact: 'Contact',
    progress: "Progression de l'onboarding",
    currentPhase: 'Phase active',
    workspace: 'Espace',
    activeClient: 'Client actif',
    plan: 'Plan',
    contactPerson: 'Contact',
    phaseOwner: 'Responsable',
    clientChecklist: 'Checklist client',
    requestQueue: 'Demandes et taches',
    timeAndBank: "Feuille de temps et banque d'heures",
    financials: 'Finances',
    usedTime: 'Temps utilise',
    remainingBank: 'Banque restante',
    billableTotal: 'Total facturable',
    invoiceStatus: 'Statut facture',
    recentTime: 'Temps recent',
    assets: 'Assets',
    due: 'Echeance',
    task: 'Tache',
    priority: 'Priorite',
    advanceStatus: 'Avancer le statut',
    noBank: "Aucune banque active pour ce client d'exemple.",
    billingReady: 'Items prets a facturer',
    invoice: 'Facture',
    amount: 'Montant',
    hiddenIds:
      'Les references internes QBO, GHL et TimeID restent masquees cote client.',
    adminNote:
      "L'admin proprietaire reste separe a /admin et n'est pas lie dans la navigation publique.",
    teamAccess: 'Acces equipe',
    accountRoles: 'Compte entreprise et roles',
    billingSetup: 'Configuration facturation',
    billingCadence: 'Rythme facturation',
    nextBilling: 'Prochaine facturation',
    paymentStatus: 'Statut paiement',
    subscription: 'Abonnement retainer',
    noSubscription: "Aucun abonnement Shopify actif pour ce client d'exemple.",
    includedTime: 'Temps inclus',
    selfServe: 'Actions autonomes',
    communications: 'Communications',
    trigger: 'Declencheur',
    audience: 'Audience',
    dataModel: 'Modele de donnees',
    systemOfRecord: 'Source de verite',
    realtime: 'Temps reel',
    synced: 'Synchronise',
    notRealtime: 'Pas temps reel',
    sampleAccounts: 'Espaces exemples',
    billingCycles: 'Cycles de facturation',
    billingRule: 'Regle de facturation',
    retainerActions: 'Actions retainer',
    effective: 'Effectif',
    notificationChecks: 'Verifications notifications',
    recipients: 'Destinataires',
    requirements: 'Exigences',
    readiness: 'Score de preparation',
    nextMission: 'Prochaine mission',
    level: 'Niveau',
    earned: 'Gagne',
    total: 'Total',
    milestones: 'Jalons',
    achievements: 'Succes',
    unlocks: 'Debloque',
    claimReward: 'Reclamer',
    rewardClaimed: 'Recompense reclamee',
    dashboardMenu: 'Menu du tableau',
    projectSnapshot: 'Resume projet',
    accountAccess: 'Acces au compte',
    permissions: 'Permissions',
    paymentMethod: 'Methode de paiement',
    autopay: 'Autopay',
    lastChecked: 'Derniere verification',
    billingReadiness: 'Preparation facturation',
    owner: 'Responsable',
    requirement: 'Exigence',
    actionNeeded: 'Action requise',
    workspacePage: 'Page espace client',
    pageAction: 'Action client',
    pageContext: 'Contexte de page',
    reviewBrief: 'Reviser le brief',
    openRequests: 'Ouvrir les demandes',
    manageRetainer: 'Gerer le retainer',
    openFinancials: 'Ouvrir finances',
    openAccount: 'Ouvrir compte',
    openTimeBank: "Ouvrir banque d'heures",
    contactBilling: 'Contacter facturation',
    readinessMetric: 'Preparation',
  },
};

const portalDashboardSections = [
  {
    id: 'overview',
    label: {en: 'Overview', fr: "Vue d'ensemble"},
    detail: {
      en: 'Readiness, next mission, and current numbers.',
      fr: 'Preparation, prochaine mission et chiffres courants.',
    },
  },
  {
    id: 'launch',
    label: {en: 'Launch plan', fr: 'Plan de lancement'},
    detail: {
      en: 'Milestones, achievements, and active phase.',
      fr: 'Jalons, succes et phase active.',
    },
  },
  {
    id: 'account',
    label: {en: 'Account', fr: 'Compte'},
    detail: {
      en: 'Team roles, access, and retainer controls.',
      fr: 'Roles equipe, acces et actions retainer.',
    },
  },
  {
    id: 'requests',
    label: {en: 'Requests', fr: 'Demandes'},
    detail: {
      en: 'Assets, brief items, requests, and tasks.',
      fr: 'Assets, brief, demandes et taches.',
    },
  },
  {
    id: 'time',
    label: {en: 'Time bank', fr: "Banque d'heures"},
    detail: {
      en: 'Recent time, billable work, and remaining bank.',
      fr: 'Temps recent, facturable et banque restante.',
    },
  },
  {
    id: 'financials',
    label: {en: 'Financials', fr: 'Finances'},
    detail: {
      en: 'Invoices, billing cycles, and payment state.',
      fr: 'Factures, cycles et statut de paiement.',
    },
  },
  {
    id: 'sync',
    label: {en: 'Sync', fr: 'Sync'},
    detail: {
      en: 'Notifications, templates, and source-of-truth data.',
      fr: 'Notifications, modeles et sources de verite.',
    },
  },
] as const;

type PortalDashboardSection = (typeof portalDashboardSections)[number];
type PortalDashboardSectionId = PortalDashboardSection['id'];
type PortalPageAction = {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};
type PortalPageStat = {
  label: string;
  value: string;
};

function getDashboardSectionIdFromHash(
  hash: string,
): PortalDashboardSectionId | null {
  const sectionId = hash.replace(/^#?portal-/, '');

  return portalDashboardSections.some((section) => section.id === sectionId)
    ? (sectionId as PortalDashboardSectionId)
    : null;
}

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Portail client | Philippe Pasquin Developpeur Shopify'
          : 'Client Portal | Philippe Pasquin Shopify Developer',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? "Prototype de portail client pour onboarding, demandes, temps, banques d'heures et finances Shopify."
          : 'Client portal prototype for Shopify onboarding, requests, time, bank-of-hours work, and financial visibility.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;
  const publicConfig = getPublicConfig(context.env);

  const isLoggedIn = await customerAccount.isLoggedIn();
  if (!isLoggedIn) {
    return {
      publicConfig,
      portalContext: null as PortalContext | null,
    };
  }

  const {data} = await customerAccount.query(CUSTOMER_PORTAL_QUERY);
  const customer = data?.customer;
  if (!customer?.id) {
    return {
      publicConfig,
      portalContext: null as PortalContext | null,
    };
  }

  const portalContext = resolvePortalContext({customer});
  return {publicConfig, portalContext};
}

export default function ClientLoginPage() {
  const {publicConfig, portalContext} = useLoaderData<typeof loader>();
  const language = useSelectedLanguage();
  const copy = clientPortalCopy[language];
  const isAuthenticated = portalContext !== null;
  const canSwitchClient = portalContext?.isOwner ?? !isAuthenticated;
  const defaultClientId = portalContext?.client.id ?? 'sportive-plus';
  const [selectedClientId, setSelectedClientId] = useState(defaultClientId);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [activeDashboardSection, setActiveDashboardSection] =
    useState<PortalDashboardSectionId>('overview');
  const client = getClientById(selectedClientId) ?? portalClients[0];
  const clientAssets = getClientAssets(client.id);
  const clientTasks = getClientTasks(client.id);
  const clientTimeEntries = getClientTimeEntries(client.id);
  const clientInvoices = getClientInvoices(client.id);
  const retainerBank = getClientRetainerBank(client.id);
  const clientContacts = getClientContacts(client.id);
  const clientAccessInvites = getClientAccessInvites(client.id);
  const billingPolicy = getClientBillingPolicy(client.id);
  const paymentProfile = getClientPaymentMethodProfile(client.id);
  const retainerSubscription = getClientRetainerSubscription(client.id);
  const retainerActions = getClientRetainerActions(client.id);
  const clientBillingCycles = getClientBillingCycles(client.id);
  const clientBillingChecklist = getClientBillingRunChecklistItems(client.id);
  const clientCommunicationTemplates = getClientCommunicationTemplates(client.id);
  const notificationChecks = getClientNotificationChecks(client.id);
  const onboardingScore = getOnboardingScore();
  const onboardingLevel = getOnboardingLevel(language);
  const activeMilestone =
    onboardingMilestones.find((milestone) => milestone.status === 'active') ??
    onboardingMilestones[0];
  const [activePhaseId, setActivePhaseId] = useState('brief');
  const [taskStatuses, setTaskStatuses] = useState<Record<string, WorkStatus>>(
    () =>
      Object.fromEntries(
        portalClients
          .flatMap((portalClient) => getClientTasks(portalClient.id))
          .map((task) => [task.id, task.status]),
      ) as Record<string, WorkStatus>,
  );

  const activePhase =
    onboardingPhases.find((phase) => phase.id === activePhaseId) ??
    onboardingPhases[0];
  const billableEntries = clientTimeEntries.filter(
    (entry) => entry.billingCategory === 'Billable',
  );
  const billableMinutes = sumMinutes(billableEntries);
  const billableAmount = sumAmount(billableEntries);
  const remainingMinutes = retainerBank
    ? Math.max(retainerBank.totalMinutes + retainerBank.rolloverMinutes - retainerBank.usedMinutes, 0)
    : 0;
  const schedulerNotes = encodeURIComponent(
    `${client.name} - ${activePhase.title[language]}`,
  );
  const schedulerUrl = publicConfig.calLink
    ? `${publicConfig.calOrigin.replace(/\/$/, '')}/${publicConfig.calLink.replace(/^\//, '')}?notes=${schedulerNotes}`
    : '';
  const briefUrl = `mailto:${publicConfig.contactEmail}?subject=${schedulerNotes}`;
  const pageStats: PortalPageStat[] = [
    {
      label: copy.readinessMetric,
      value: `${onboardingScore.percent}%`,
    },
    {
      label: copy.nextBilling,
      value: billingPolicy?.nextBillingDate ?? 'N/A',
    },
    {
      label: copy.remainingBank,
      value: retainerBank ? formatDuration(remainingMinutes) : 'N/A',
    },
  ];

  const visibleTasks = useMemo(
    () =>
      clientTasks.map((task) => ({
        ...task,
        status: taskStatuses[task.id] ?? task.status,
      })),
    [clientTasks, taskStatuses],
  );
  const menuBadges: Record<PortalDashboardSectionId, string> = {
    overview: `${onboardingScore.percent}%`,
    launch: `${onboardingMilestones.filter((milestone) => milestone.status === 'complete').length}/${onboardingMilestones.length}`,
    account: String(clientContacts.length),
    requests: String(
      clientAssets.filter((asset) => asset.status !== 'received').length +
        visibleTasks.filter((task) => task.status !== 'done').length,
    ),
    time: formatDuration(billableMinutes),
    financials: formatMoney(billableAmount),
    sync: String(
      notificationChecks.filter((check) => check.status === 'ready').length,
    ),
  };

  useEffect(() => {
    function syncSectionFromHash() {
      const sectionId = getDashboardSectionIdFromHash(window.location.hash);

      if (sectionId) setActiveDashboardSection(sectionId);
    }

    syncSectionFromHash();
    window.addEventListener('hashchange', syncSectionFromHash);

    return () => window.removeEventListener('hashchange', syncSectionFromHash);
  }, []);

  function selectDashboardSection(sectionId: PortalDashboardSectionId) {
    const url = new URL(window.location.href);

    url.hash = `portal-${sectionId}`;

    if (window.location.hash !== url.hash) {
      window.history.pushState(null, '', url);
    }

    setActiveDashboardSection(sectionId);
    window.requestAnimationFrame(() => {
      const shell = document.querySelector('.portal-shell');
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (!shell) return;

      window.scrollTo({
        top: Math.max(
          shell.getBoundingClientRect().top + window.scrollY - 104,
          0,
        ),
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  }

  function advanceTask(taskId: string) {
    setTaskStatuses((current) => {
      const currentStatus = current[taskId] ?? 'queued';
      const order: WorkStatus[] = [
        'queued',
        'in-progress',
        'waiting-client',
        'ready',
        'done',
      ];
      const nextStatus = order[(order.indexOf(currentStatus) + 1) % order.length];

      return {
        ...current,
        [taskId]: nextStatus,
      };
    });
  }

  return (
    <section className="client-portal-page">
      <div className="gap-l" />
      <div className="container wide">
        {!isAuthenticated ? (
          <div className="portal-guest-banner" role="status">
            <div>
              <strong>
                {language === 'fr'
                  ? 'Apercu prive du portail client.'
                  : 'Private preview of the client portal.'}
              </strong>
              <p>
                {language === 'fr'
                  ? "Connectez-vous avec votre compte Shopify pour ouvrir votre espace, vos demandes, votre temps et vos factures."
                  : 'Sign in with your Shopify account to open your workspace, requests, time entries, and invoices.'}
              </p>
            </div>
            <div className="btn-grp">
              <Link className="btn" to="/account/login?returnTo=/client-login">
                {language === 'fr' ? 'Se connecter' : 'Sign in'}
              </Link>
              <a className="btn secondary" href={schedulerUrl || briefUrl}>
                {schedulerUrl ? copy.openScheduler : copy.sendBrief}
              </a>
            </div>
          </div>
        ) : null}
        <div className="portal-workspace-header">
          <div>
            <div className="hero-proof-callout">
              <span className="hero-proof-dot" aria-hidden="true"></span>
              <span>{copy.label}</span>
            </div>
            <div className="gap-m" />
            <h1>
              {language === 'fr'
                ? `${copy.workspace} ${client.name}`
                : `${client.name} ${copy.workspace.toLowerCase()}`}
            </h1>
            <div className="gap-m" />
            <p className="subtitle light">
              {client.project}. {copy.intro}
            </p>
          </div>
          <div className="portal-next-step">
            <span>{copy.nextStep}</span>
            <strong>{client.nextAction[language]}</strong>
            <div className="btn-grp">
              <a className="btn" href={schedulerUrl || briefUrl}>
                {schedulerUrl ? copy.openScheduler : copy.sendBrief}
              </a>
              <Link
                className="btn secondary"
                to={getLocalizedHref('/contact', language)}
              >
                {copy.contact}
              </Link>
            </div>
          </div>
        </div>

        <div className="gap-l" />
        <div className="portal-shell">
          <aside className="portal-rail-panel" aria-label={copy.progress}>
            <div className="portal-client-card">
              <span>{copy.workspace}</span>
              <strong>{client.name}</strong>
              <p>{client.project}</p>
            </div>
            <nav className="portal-dashboard-menu" aria-label={copy.dashboardMenu}>
              <span>{copy.dashboardMenu}</span>
              <div>
                {portalDashboardSections.map((section) => (
                  <button
                    aria-current={
                      activeDashboardSection === section.id ? 'page' : undefined
                    }
                    className={
                      activeDashboardSection === section.id ? 'active' : ''
                    }
                    key={section.id}
                    onClick={() => selectDashboardSection(section.id)}
                    type="button"
                  >
                    <strong>{section.label[language]}</strong>
                    <span>{section.detail[language]}</span>
                    <em>{menuBadges[section.id]}</em>
                  </button>
                ))}
              </div>
            </nav>
            {canSwitchClient ? (
              <div className="portal-account-switcher">
                <span>{copy.sampleAccounts}</span>
                <div>
                  {portalClients.map((portalClient) => (
                    <button
                      className={
                        portalClient.id === client.id ? 'active' : undefined
                      }
                      key={portalClient.id}
                      onClick={() => setSelectedClientId(portalClient.id)}
                      type="button"
                    >
                      {portalClient.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="portal-sidebar-block">
              <span>{copy.projectSnapshot}</span>
              <dl className="portal-meta-list">
                <div>
                  <dt>{copy.plan}</dt>
                  <dd>{client.plan[language]}</dd>
                </div>
                <div>
                  <dt>{copy.currentPhase}</dt>
                  <dd>{activePhase.title[language]}</dd>
                </div>
                <div>
                  <dt>{copy.contactPerson}</dt>
                  <dd>{client.contact}</dd>
                </div>
              </dl>
            </div>
            <div className="portal-sidebar-block">
              <span>{copy.billingSetup}</span>
              <dl className="portal-meta-list">
                <div>
                  <dt>{copy.billingCadence}</dt>
                  <dd>
                    {billingPolicy
                      ? getBillingCadenceLabel(billingPolicy.cadence, language)
                      : 'N/A'}
                  </dd>
                </div>
                <div>
                  <dt>{copy.nextBilling}</dt>
                  <dd>{billingPolicy?.nextBillingDate ?? 'N/A'}</dd>
                </div>
                <div>
                  <dt>{copy.remainingBank}</dt>
                  <dd>{retainerBank ? formatDuration(remainingMinutes) : 'N/A'}</dd>
                </div>
              </dl>
            </div>
            <div className="portal-progress">
              <div>
                <span>{copy.readiness}</span>
                <strong>{onboardingScore.percent}%</strong>
              </div>
              <div className="portal-progress-track" aria-hidden="true">
                <span style={{width: `${onboardingScore.percent}%`}} />
              </div>
            </div>
          </aside>

          <main
            className="portal-main"
            aria-label={copy.activeClient}
            aria-live="polite"
          >
            {activeDashboardSection === 'overview' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-overview"
            >
              <DashboardPageHeader
                actions={[
                  {label: copy.openScheduler, href: schedulerUrl || briefUrl},
                  {
                    label: copy.openFinancials,
                    onClick: () => selectDashboardSection('financials'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={client.nextAction[language]}
                stats={pageStats}
                section={portalDashboardSections[0]}
              />
              <div className="portal-game-board">
                <div className="portal-score-card">
                  <span>{copy.readiness}</span>
                  <strong>{onboardingScore.percent}%</strong>
                  <p>{onboardingLevel.detail}</p>
                  <div className="portal-score-ring" aria-hidden="true">
                    <span style={{height: `${onboardingScore.percent}%`}} />
                  </div>
                </div>

                <div className="portal-mission-card">
                  <span>{copy.nextMission}</span>
                  <h2>{activeMilestone.title[language]}</h2>
                  <p>{activeMilestone.summary[language]}</p>
                  <div className="portal-mission-meta">
                    <span>
                      {copy.earned}: {onboardingScore.earnedPoints}
                    </span>
                    <span>
                      {copy.total}: {onboardingScore.totalPoints}
                    </span>
                    <span>
                      {copy.level}: {onboardingLevel.label}
                    </span>
                  </div>
                </div>

                <div
                  className={`portal-unlock-card ${
                    rewardClaimed ? 'claimed' : ''
                  }`}
                >
                  <span>{copy.unlocks}</span>
                  <strong>{activeMilestone.unlock[language]}</strong>
                  <button
                    aria-pressed={rewardClaimed}
                    onClick={() => setRewardClaimed((current) => !current)}
                    type="button"
                  >
                    {rewardClaimed ? copy.rewardClaimed : copy.claimReward}
                  </button>
                </div>
              </div>

              <div className="portal-summary-grid">
                <MetricPanel
                  label={copy.usedTime}
                  value={formatDuration(billableMinutes)}
                  note={`${clientTimeEntries.length} ${copy.recentTime.toLowerCase()}`}
                />
                <MetricPanel
                  label={copy.remainingBank}
                  value={retainerBank ? formatDuration(remainingMinutes) : 'N/A'}
                  note={retainerBank ? retainerBank.label[language] : copy.noBank}
                />
                <MetricPanel
                  label={copy.billableTotal}
                  value={formatMoney(billableAmount)}
                  note={copy.billingReady}
                />
              </div>
            </section>
            )}

            {activeDashboardSection === 'launch' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-launch"
            >
              <DashboardPageHeader
                actions={[
                  {label: copy.reviewBrief, href: briefUrl},
                  {
                    label: copy.openRequests,
                    onClick: () => selectDashboardSection('requests'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={activePhase.action[language]}
                stats={pageStats}
                section={portalDashboardSections[1]}
              />
              <div className="portal-content-grid portal-gamified-grid">
                <section className="portal-panel">
                  <PanelTitle title={copy.milestones} eyebrow={copy.progress} />
                  <div className="portal-milestone-list">
                    {onboardingMilestones.map((milestone) => (
                      <MilestoneRow
                        key={milestone.id}
                        language={language}
                        milestone={milestone}
                        onSelectPhase={setActivePhaseId}
                      />
                    ))}
                  </div>
                </section>

                <section className="portal-panel">
                  <PanelTitle title={copy.achievements} eyebrow={copy.earned} />
                  <div className="portal-achievement-list">
                    {onboardingAchievements.map((achievement) => (
                      <AchievementCard
                        achievement={achievement}
                        key={achievement.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>
              </div>

              <section className="portal-phase-panel">
                <div className="portal-panel-heading">
                  <div>
                    <span>{copy.currentPhase}</span>
                    <h2>{activePhase.title[language]}</h2>
                  </div>
                  <div className="portal-phase-owner">
                    <span>{copy.phaseOwner}</span>
                    <strong>{activePhase.owner[language]}</strong>
                  </div>
                </div>
                <p>{activePhase.summary[language]}</p>
                <div className="portal-action-strip">
                  <span>{activePhase.action[language]}</span>
                </div>
              </section>
            </section>
            )}

            {activeDashboardSection === 'account' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-account"
            >
              <DashboardPageHeader
                actions={[
                  {label: copy.manageRetainer, href: '#portal-account-retainer'},
                  {
                    label: copy.openFinancials,
                    onClick: () => selectDashboardSection('financials'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={
                  retainerSubscription
                    ? `${copy.subscription}: ${retainerSubscription.status}`
                    : client.nextAction[language]
                }
                stats={pageStats}
                section={portalDashboardSections[2]}
              />
              <div className="portal-content-grid">
                <section className="portal-panel">
                  <PanelTitle title={copy.accountAccess} eyebrow={copy.teamAccess} />
                  <div className="portal-row-list">
                    {clientAccessInvites.map((invite) => (
                      <AccessInviteRow
                        copy={copy}
                        invite={invite}
                        key={invite.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>

                <section className="portal-panel">
                  <PanelTitle title={copy.billingSetup} eyebrow={copy.billingCadence} />
                  <BillingPanel
                    billingPolicy={billingPolicy}
                    copy={copy}
                    language={language}
                    paymentProfile={paymentProfile}
                    retainerActions={retainerActions}
                    retainerSubscription={retainerSubscription}
                  />
                </section>
              </div>

              <div className="portal-content-grid single">
                <section className="portal-panel">
                  <PanelTitle title={copy.accountRoles} eyebrow={copy.teamAccess} />
                  <div className="portal-team-list">
                    {clientContacts.map((contact) => (
                      <ContactRow
                        contact={contact}
                        key={contact.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </section>
            )}

            {activeDashboardSection === 'requests' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-requests"
            >
              <DashboardPageHeader
                actions={[
                  {label: copy.sendBrief, href: briefUrl},
                  {
                    label: copy.openTimeBank,
                    onClick: () => selectDashboardSection('time'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={client.nextAction[language]}
                stats={pageStats}
                section={portalDashboardSections[3]}
              />
              <div className="portal-content-grid">
                <section className="portal-panel">
                  <PanelTitle title={copy.clientChecklist} eyebrow={copy.assets} />
                  <div className="portal-row-list">
                    {clientAssets.map((asset) => (
                      <AssetRow
                        asset={asset}
                        copy={copy}
                        key={asset.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>

                <section className="portal-panel">
                  <PanelTitle title={copy.requestQueue} eyebrow={copy.task} />
                  <div className="portal-row-list">
                    {visibleTasks.map((task) => (
                      <TaskRow
                        copy={copy}
                        key={task.id}
                        language={language}
                        onAdvance={advanceTask}
                        task={task}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </section>
            )}

            {activeDashboardSection === 'time' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-time"
            >
              <DashboardPageHeader
                actions={[
                  {
                    label: copy.openFinancials,
                    onClick: () => selectDashboardSection('financials'),
                  },
                  {
                    label: copy.openRequests,
                    onClick: () => selectDashboardSection('requests'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={`${formatDuration(billableMinutes)} ${copy.billingReady.toLowerCase()}`}
                stats={pageStats}
                section={portalDashboardSections[4]}
              />
              <div className="portal-content-grid single">
                <section className="portal-panel">
                  <PanelTitle title={copy.timeAndBank} eyebrow={copy.recentTime} />
                  <div className="portal-time-list">
                    {clientTimeEntries.map((entry) => (
                      <div className="portal-time-row" key={entry.id}>
                        <div>
                          <strong>{entry.task}</strong>
                          <span>{entry.date}</span>
                        </div>
                        <div>
                          <strong>{formatDuration(entry.durationMinutes)}</strong>
                          <span>{entry.billingCategory}</span>
                        </div>
                        <div>
                          <strong>{formatMoney(entry.amountCents)}</strong>
                          <span>{entry.billingType}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </section>
            )}

            {activeDashboardSection === 'financials' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-financials"
            >
              <DashboardPageHeader
                actions={[
                  {
                    label: copy.contactBilling,
                    href: `mailto:${publicConfig.contactEmail}?subject=${encodeURIComponent(`${client.name} billing`)}`,
                  },
                  {
                    label: copy.openAccount,
                    onClick: () => selectDashboardSection('account'),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={`${copy.billableTotal}: ${formatMoney(billableAmount)}`}
                stats={pageStats}
                section={portalDashboardSections[5]}
              />
              <div className="portal-content-grid">
                <section className="portal-panel">
                  <PanelTitle title={copy.financials} eyebrow={copy.invoiceStatus} />
                  <div className="portal-invoice-list">
                    {clientInvoices.map((invoice) => (
                      <div className="portal-invoice-row" key={invoice.id}>
                        <div>
                          <span>{copy.invoice}</span>
                          <strong>{invoice.invoiceNumber}</strong>
                        </div>
                        <div>
                          <span>{copy.amount}</span>
                          <strong>{formatMoney(invoice.amountCents)}</strong>
                        </div>
                        <span className={`portal-status ${invoice.status}`}>
                          {invoice.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="portal-muted-note">{copy.hiddenIds}</p>
                </section>

                <section className="portal-panel">
                  <PanelTitle title={copy.billingCycles} eyebrow={copy.billingRule} />
                  <div className="portal-cycle-list">
                    {clientBillingCycles.map((cycle) => (
                      <BillingCycleRow
                        copy={copy}
                        cycle={cycle}
                        key={cycle.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>
              </div>

              <div className="portal-content-grid single">
                <section className="portal-panel">
                  <PanelTitle
                    title={copy.billingReadiness}
                    eyebrow={copy.billingReady}
                  />
                  <div className="portal-row-list">
                    {clientBillingChecklist.map((item) => (
                      <BillingChecklistRow
                        copy={copy}
                        item={item}
                        key={item.id}
                        language={language}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </section>
            )}

            {activeDashboardSection === 'sync' && (
            <section
              className="portal-dashboard-section portal-dashboard-page"
              id="portal-sync"
            >
              <DashboardPageHeader
                actions={[
                  {
                    label: copy.openAccount,
                    onClick: () => selectDashboardSection('account'),
                  },
                  {
                    label: copy.contact,
                    href: getLocalizedHref('/contact', language),
                    variant: 'secondary',
                  },
                ]}
                clientName={client.name}
                copy={copy}
                language={language}
                nextAction={copy.synced}
                stats={pageStats}
                section={portalDashboardSections[6]}
              />
              <div className="portal-content-grid">
                <section className="portal-panel">
                  <PanelTitle
                    title={copy.notificationChecks}
                    eyebrow={copy.communications}
                  />
                  <div className="portal-row-list">
                    {notificationChecks.map((check) => (
                      <NotificationCheckRow
                        check={check}
                        copy={copy}
                        key={check.id}
                      />
                    ))}
                  </div>
                </section>

                <section className="portal-panel">
                  <PanelTitle title={copy.communications} eyebrow={copy.synced} />
                  <div className="portal-row-list">
                    {clientCommunicationTemplates.map((template) => (
                      <CommunicationRow
                        copy={copy}
                        key={template.id}
                        language={language}
                        template={template}
                      />
                    ))}
                  </div>
                </section>
              </div>

              <div className="portal-content-grid single">
                <section className="portal-panel">
                  <PanelTitle title={copy.dataModel} eyebrow={copy.systemOfRecord} />
                  <div className="portal-data-boundary-list">
                    {dataBoundaries.slice(0, 5).map((boundary) => (
                      <article className="portal-data-boundary" key={boundary.id}>
                        <div>
                          <strong>{boundary.domain[language]}</strong>
                          <p>{boundary.summary[language]}</p>
                        </div>
                        <span className={`portal-source ${boundary.source}`}>
                          {boundary.source}
                        </span>
                        <em>
                          {boundary.realtime ? copy.realtime : copy.notRealtime}
                        </em>
                      </article>
                    ))}
                  </div>
                </section>
              </div>
            </section>
            )}

            <div className="portal-admin-note">{copy.adminNote}</div>
          </main>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}

function DashboardPageHeader({
  actions,
  clientName,
  copy,
  language,
  nextAction,
  stats,
  section,
}: {
  actions: PortalPageAction[];
  clientName: string;
  copy: ClientPortalCopy;
  language: LanguageCode;
  nextAction: string;
  stats: PortalPageStat[];
  section: PortalDashboardSection;
}) {
  return (
    <div className="portal-page-header">
      <div className="portal-page-heading">
        <span>{copy.workspacePage}</span>
        <strong>{clientName}</strong>
      </div>
      <div className="portal-page-title-block">
        <div>
          <span>{section.detail[language]}</span>
          <h2>{section.label[language]}</h2>
        </div>
        <p>
          {copy.pageContext}: {nextAction}
        </p>
      </div>
      <div className="portal-page-command-bar" aria-label={copy.pageAction}>
        {actions.map((action) =>
          action.href ? (
            <a
              className={action.variant === 'secondary' ? 'btn secondary' : 'btn'}
              href={action.href}
              key={action.label}
            >
              {action.label}
            </a>
          ) : (
            <button
              className={action.variant === 'secondary' ? 'btn secondary' : 'btn'}
              disabled={!action.onClick}
              key={action.label}
              onClick={action.onClick}
              type="button"
            >
              {action.label}
            </button>
          ),
        )}
      </div>
      <dl className="portal-page-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function AccessInviteRow({
  copy,
  invite,
  language,
}: {
  copy: ClientPortalCopy;
  invite: CompanyAccessInvite;
  language: LanguageCode;
}) {
  const contact = getContactById(invite.contactId);

  return (
    <article className="portal-work-row portal-access-row">
      <div>
        <strong>{contact?.name ?? invite.contactId}</strong>
        <p>{invite.nextStep[language]}</p>
      </div>
      <div className="portal-row-meta">
        <span className={`portal-status ${invite.status}`}>
          {getCompanyAccessStatusLabel(invite.status, language)}
        </span>
        <span>
          {copy.permissions}:{' '}
          {invite.permissions
            .map((permission) => permission.replace('-', ' '))
            .join(', ')}
        </span>
        <span>{(invite.lastActiveAt ?? invite.invitedAt) || '-'}</span>
      </div>
    </article>
  );
}

function ContactRow({
  contact,
  language,
}: {
  contact: CompanyContact;
  language: LanguageCode;
}) {
  return (
    <article className="portal-team-row">
      <div>
        <strong>{contact.name}</strong>
        <span>{contact.email}</span>
      </div>
      <div className="portal-chip-row">
        {contact.roles.map((role) => (
          <span key={role}>{getRoleLabel(role, language)}</span>
        ))}
      </div>
    </article>
  );
}

function MilestoneRow({
  language,
  milestone,
  onSelectPhase,
}: {
  language: LanguageCode;
  milestone: OnboardingMilestone;
  onSelectPhase: (phaseId: string) => void;
}) {
  return (
    <button
      className={`portal-milestone-row ${milestone.status}`}
      onClick={() => onSelectPhase(milestone.phaseId)}
      type="button"
    >
      <span>{milestone.points} pts</span>
      <div>
        <strong>{milestone.title[language]}</strong>
        <p>{milestone.summary[language]}</p>
      </div>
      <em>{milestone.status}</em>
    </button>
  );
}

function AchievementCard({
  achievement,
  language,
}: {
  achievement: OnboardingAchievement;
  language: LanguageCode;
}) {
  return (
    <article className={`portal-achievement-card ${achievement.unlocked ? 'unlocked' : ''}`}>
      <span>{achievement.points} pts</span>
      <strong>{achievement.title[language]}</strong>
      <p>{achievement.detail[language]}</p>
    </article>
  );
}

function BillingPanel({
  billingPolicy,
  copy,
  language,
  paymentProfile,
  retainerActions,
  retainerSubscription,
}: {
  billingPolicy: ReturnType<typeof getClientBillingPolicy>;
  copy: ClientPortalCopy;
  language: LanguageCode;
  paymentProfile: PaymentMethodProfile | undefined;
  retainerActions: RetainerActionRequest[];
  retainerSubscription: RetainerSubscription | undefined;
}) {
  const [selectedActionId, setSelectedActionId] = useState(
    retainerActions[0]?.id ?? '',
  );
  const selectedAction =
    retainerActions.find((action) => action.id === selectedActionId) ??
    retainerActions[0];

  return (
    <div className="portal-billing-stack">
      <dl className="portal-billing-meta">
        <div>
          <dt>{copy.billingCadence}</dt>
          <dd>
            {billingPolicy
              ? getBillingCadenceLabel(billingPolicy.cadence, language)
              : '-'}
          </dd>
        </div>
        <div>
          <dt>{copy.nextBilling}</dt>
          <dd>{billingPolicy?.nextBillingDate ?? '-'}</dd>
        </div>
        <div>
          <dt>{copy.paymentStatus}</dt>
          <dd>{billingPolicy?.paymentStatus ?? '-'}</dd>
        </div>
      </dl>

      {paymentProfile && (
        <div className="portal-retainer-box">
          <span>{copy.paymentMethod}</span>
          <strong>{paymentProfile.label[language]}</strong>
          <p>{paymentProfile.nextAction[language]}</p>
          <div className="portal-row-meta">
            <span className={`portal-status ${paymentProfile.status}`}>
              {getPaymentMethodStatusLabel(paymentProfile.status, language)}
            </span>
            <span>
              {copy.autopay}: {paymentProfile.autopay ? 'On' : 'Off'}
            </span>
            <span>
              {copy.lastChecked}: {paymentProfile.lastCheckedAt}
            </span>
          </div>
        </div>
      )}

      <div className="portal-retainer-box" id="portal-account-retainer">
        <span>{copy.subscription}</span>
        {retainerSubscription ? (
          <>
            <strong>{retainerSubscription.planName}</strong>
            <p>
              {copy.includedTime}:{' '}
              {formatDuration(retainerSubscription.monthlyMinutes)} /{' '}
              {formatDuration(retainerSubscription.usedMinutes)} used
            </p>
            <div className="portal-chip-row">
              {retainerSubscription.selfServeActions.map((action) => (
                <button
                  key={action}
                  onClick={() => {
                    const matchingAction = retainerActions.find(
                      (retainerAction) => retainerAction.action === action,
                    );

                    if (matchingAction) setSelectedActionId(matchingAction.id);
                  }}
                  type="button"
                >
                  {action}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p>{copy.noSubscription}</p>
        )}
      </div>

      {selectedAction && (
        <div className="portal-retainer-action-preview">
          <div>
            <span>{copy.retainerActions}</span>
            <strong>{selectedAction.label[language]}</strong>
            <p>{selectedAction.detail[language]}</p>
          </div>
          <div className="portal-row-meta">
            <span className={`portal-status ${selectedAction.status}`}>
              {getRetainerActionStatusLabel(selectedAction.status, language)}
            </span>
            <span>
              {copy.effective}: {selectedAction.effectiveDate}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function BillingCycleRow({
  copy,
  cycle,
  language,
}: {
  copy: ClientPortalCopy;
  cycle: BillingCycle;
  language: LanguageCode;
}) {
  return (
    <article className="portal-cycle-row">
      <div>
        <strong>{cycle.title[language]}</strong>
        <p>{cycle.rule[language]}</p>
      </div>
      <dl>
        <div>
          <dt>{copy.amount}</dt>
          <dd>{formatMoney(getBillingCycleAmount(cycle))}</dd>
        </div>
        <div>
          <dt>{copy.usedTime}</dt>
          <dd>{formatDuration(getBillingCycleMinutes(cycle))}</dd>
        </div>
        <div>
          <dt>{copy.due}</dt>
          <dd>{cycle.date}</dd>
        </div>
      </dl>
      <span className={`portal-status ${cycle.status}`}>
        {getBillingCycleStatusLabel(cycle.status, language)}
      </span>
    </article>
  );
}

function BillingChecklistRow({
  copy,
  item,
  language,
}: {
  copy: ClientPortalCopy;
  item: BillingRunChecklistItem;
  language: LanguageCode;
}) {
  return (
    <article className="portal-work-row">
      <div>
        <strong>{item.title[language]}</strong>
        <p>{item.detail[language]}</p>
      </div>
      <div className="portal-row-meta">
        <span className={`portal-status ${item.status}`}>
          {getBillingRunItemStatusLabel(item.status, language)}
        </span>
        <span>
          {copy.owner}: {item.owner}
        </span>
        <span>
          {copy.requirement}: {item.requirement[language]}
        </span>
        <span>
          {copy.actionNeeded}: {item.action[language]}
        </span>
      </div>
    </article>
  );
}

function NotificationCheckRow({
  check,
  copy,
}: {
  check: NotificationAudienceCheck;
  copy: ClientPortalCopy;
}) {
  return (
    <article className="portal-work-row">
      <div>
        <strong>{check.templateId}</strong>
        <p>
          {copy.recipients}: {check.recipientContactIds.length}
        </p>
      </div>
      <div className="portal-row-meta">
        <span className={`portal-status ${check.status}`}>{check.status}</span>
        <span>
          {copy.requirements}: {check.requiredMetafields.join(', ')}
        </span>
      </div>
    </article>
  );
}

function CommunicationRow({
  copy,
  language,
  template,
}: {
  copy: ClientPortalCopy;
  language: LanguageCode;
  template: CommunicationTemplate;
}) {
  return (
    <article className="portal-work-row">
      <div>
        <strong>{template.title[language]}</strong>
        <p>{template.trigger[language]}</p>
      </div>
      <div className="portal-row-meta">
        <span>{template.channel}</span>
        <span>
          {copy.audience}: {template.audience}
        </span>
      </div>
    </article>
  );
}

function PanelTitle({eyebrow, title}: {eyebrow: string; title: string}) {
  return (
    <div className="portal-section-title">
      <span>{eyebrow}</span>
      <h3>{title}</h3>
    </div>
  );
}

function MetricPanel({
  label,
  note,
  value,
}: {
  label: string;
  note: string;
  value: string;
}) {
  return (
    <section className="portal-metric-panel">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </section>
  );
}

function AssetRow({
  asset,
  copy,
  language,
}: {
  asset: AssetRequest;
  copy: ClientPortalCopy;
  language: LanguageCode;
}) {
  return (
    <article className="portal-work-row">
      <div>
        <strong>{asset.title[language]}</strong>
        <p>{asset.detail[language]}</p>
      </div>
      <div className="portal-row-meta">
        <span className={`portal-status ${asset.status}`}>
          {getAssetStatusLabel(asset.status, language)}
        </span>
        <span>
          {copy.due}: {asset.due}
        </span>
      </div>
    </article>
  );
}

function TaskRow({
  copy,
  language,
  onAdvance,
  task,
}: {
  copy: ClientPortalCopy;
  language: LanguageCode;
  onAdvance: (taskId: string) => void;
  task: PortalTask;
}) {
  return (
    <article className="portal-work-row">
      <div>
        <strong>{task.title[language]}</strong>
        <p>{task.detail[language]}</p>
      </div>
      <div className="portal-row-meta">
        <span className={`portal-status ${task.status}`}>
          {getStatusLabel(task.status, language)}
        </span>
        <span>
          {copy.priority}: {task.priority}
        </span>
        <button type="button" onClick={() => onAdvance(task.id)}>
          {copy.advanceStatus}
        </button>
      </div>
    </article>
  );
}
