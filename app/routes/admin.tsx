import {useMemo, useState} from 'react';
import {redirect} from 'react-router';
import type {Route} from './+types/admin';
import {CUSTOMER_PORTAL_QUERY, OWNER_TAG} from '~/lib/customerPortalContext';
import {
  assetRequests,
  billingRunChecklistItems,
  billingCycles,
  billingPolicies,
  companyAccessInvites,
  communicationTemplates,
  formatDuration,
  formatMoney,
  getAssetStatusLabel,
  getBillingCadenceLabel,
  getBillingCycleAmount,
  getBillingCycleMinutes,
  getBillingCycleStatusLabel,
  getBillingRunChecklistItems,
  getBillingRunItemStatusLabel,
  getCompanyAccessStatusLabel,
  getClientById,
  getClientBillingPolicy,
  getClientContacts,
  getClientRetainerSubscription,
  getContactById,
  getNextWorkStatus,
  getPaymentMethodStatusLabel,
  getRetainerActionStatusLabel,
  getRoleLabel,
  getStatusLabel,
  invoiceRecords,
  maskExternalId,
  notificationAudienceChecks,
  paymentMethodProfiles,
  portalClients,
  portalTasks,
  retainerActionRequests,
  retainerBanks,
  sumAmount,
  sumMinutes,
  timeEntries,
  type AssetStatus,
  type BillingCategory,
  type BillingCycleStatus,
  type BillingRunItemStatus,
  type CompanyAccessStatus,
  type PaymentMethodStatus,
  type RetainerActionStatus,
  type TimeEntry,
  type WorkStatus,
} from '~/lib/clientPortal';
import {
  dataBoundaries,
  realtimeTables,
  shopifyToSupabaseSyncPoints,
  supabaseTablePlan,
  supabaseToShopifySyncPoints,
} from '~/lib/clientDataArchitecture';
import {
  CLIENT_PORTAL_METAFIELD_KEYS,
  CLIENT_SEGMENT_RULES,
  SHOPIFY_CUSTOMER_TAGS,
} from '~/lib/shopifyClientOps';

type ClientFilter = 'all' | string;
type BillingFilter = 'all' | BillingCategory;
type InvoiceFilter = 'all' | 'has-invoice' | 'missing-invoice' | 'will-bill';
type TaskFilter = 'all' | WorkStatus;

const workStatuses: WorkStatus[] = [
  'queued',
  'in-progress',
  'waiting-client',
  'ready',
  'done',
];

const assetStatuses: AssetStatus[] = ['received', 'needed', 'review'];
const accessStatuses: CompanyAccessStatus[] = [
  'needs-invite',
  'invited',
  'active',
  'billing-only',
  'disabled',
];
const paymentStatuses: PaymentMethodStatus[] = [
  'ready',
  'needs-setup',
  'failed',
  'external',
];

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'Internal Admin | Pasquin'},
    {name: 'robots', content: 'noindex,nofollow,noarchive'},
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  const {customerAccount} = context;

  const isLoggedIn = await customerAccount.isLoggedIn();
  if (!isLoggedIn) {
    throw redirect('/account/login?returnTo=/admin');
  }

  const {data} = await customerAccount.query(CUSTOMER_PORTAL_QUERY);
  const tags = data?.customer?.tags ?? [];
  if (!tags.includes(OWNER_TAG)) {
    throw redirect('/client-login');
  }

  return null;
}

export default function AdminPage() {
  const [clientFilter, setClientFilter] = useState<ClientFilter>('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [billingFilter, setBillingFilter] = useState<BillingFilter>('all');
  const [invoiceFilter, setInvoiceFilter] = useState<InvoiceFilter>('all');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [taskStatuses, setTaskStatuses] = useState<Record<string, WorkStatus>>(
    () =>
      Object.fromEntries(
        portalTasks.map((task) => [task.id, task.status]),
      ) as Record<string, WorkStatus>,
  );
  const [assetStatusesById, setAssetStatusesById] = useState<
    Record<string, AssetStatus>
  >(
    () =>
      Object.fromEntries(
        assetRequests.map((asset) => [asset.id, asset.status]),
      ) as Record<string, AssetStatus>,
  );
  const [billingCycleStatuses, setBillingCycleStatuses] = useState<
    Record<string, BillingCycleStatus>
  >(
    () =>
      Object.fromEntries(
        billingCycles.map((cycle) => [cycle.id, cycle.status]),
      ) as Record<string, BillingCycleStatus>,
  );
  const [billingRunItemStatuses, setBillingRunItemStatuses] = useState<
    Record<string, BillingRunItemStatus>
  >(
    () =>
      Object.fromEntries(
        billingRunChecklistItems.map((item) => [item.id, item.status]),
      ) as Record<string, BillingRunItemStatus>,
  );
  const [retainerActionStatuses, setRetainerActionStatuses] = useState<
    Record<string, RetainerActionStatus>
  >(
    () =>
      Object.fromEntries(
        retainerActionRequests.map((action) => [action.id, action.status]),
      ) as Record<string, RetainerActionStatus>,
  );
  const [accessStatusesById, setAccessStatusesById] = useState<
    Record<string, CompanyAccessStatus>
  >(
    () =>
      Object.fromEntries(
        companyAccessInvites.map((invite) => [invite.id, invite.status]),
      ) as Record<string, CompanyAccessStatus>,
  );
  const [paymentStatusesById, setPaymentStatusesById] = useState<
    Record<string, PaymentMethodStatus>
  >(
    () =>
      Object.fromEntries(
        paymentMethodProfiles.map((profile) => [profile.id, profile.status]),
      ) as Record<string, PaymentMethodStatus>,
  );

  const months = useMemo(
    () => Array.from(new Set(timeEntries.map((entry) => entry.month))),
    [],
  );

  const filteredTimeEntries = useMemo(
    () =>
      timeEntries.filter((entry) => {
        if (clientFilter !== 'all' && entry.clientId !== clientFilter) return false;
        if (monthFilter !== 'all' && entry.month !== monthFilter) return false;
        if (billingFilter !== 'all' && entry.billingCategory !== billingFilter) {
          return false;
        }
        if (invoiceFilter === 'has-invoice' && !entry.invoiceNumber) return false;
        if (invoiceFilter === 'missing-invoice' && entry.invoiceNumber) return false;
        if (invoiceFilter === 'will-bill' && !entry.willBeBilled) return false;
        return true;
      }),
    [billingFilter, clientFilter, invoiceFilter, monthFilter],
  );

  const visibleTasks = useMemo(
    () =>
      portalTasks
        .map((task) => ({...task, status: taskStatuses[task.id] ?? task.status}))
        .filter((task) => {
          if (clientFilter !== 'all' && task.clientId !== clientFilter) return false;
          if (taskFilter !== 'all' && task.status !== taskFilter) return false;
          return true;
        }),
    [clientFilter, taskFilter, taskStatuses],
  );

  const visibleAssets = useMemo(
    () =>
      assetRequests
        .map((asset) => ({
          ...asset,
          status: assetStatusesById[asset.id] ?? asset.status,
        }))
        .filter((asset) => clientFilter === 'all' || asset.clientId === clientFilter),
    [assetStatusesById, clientFilter],
  );

  const billableEntries = filteredTimeEntries.filter(
    (entry) => entry.billingCategory === 'Billable',
  );
  const nonBillableEntries = filteredTimeEntries.filter(
    (entry) => entry.billingCategory === 'NotBillable',
  );
  const missingInvoiceEntries = filteredTimeEntries.filter(
    (entry) => entry.billingCategory === 'Billable' && !entry.invoiceNumber,
  );
  const totalAmount = sumAmount(billableEntries);
  const billableMinutes = sumMinutes(billableEntries);
  const nonBillableMinutes = sumMinutes(nonBillableEntries);

  function advanceTask(taskId: string) {
    setTaskStatuses((current) => ({
      ...current,
      [taskId]: getNextWorkStatus(current[taskId] ?? 'queued'),
    }));
  }

  function advanceAsset(assetId: string) {
    setAssetStatusesById((current) => {
      const currentStatus = current[assetId] ?? 'needed';
      const nextStatus =
        assetStatuses[(assetStatuses.indexOf(currentStatus) + 1) % assetStatuses.length];

      return {
        ...current,
        [assetId]: nextStatus,
      };
    });
  }

  function advanceBillingCycle(cycleId: string) {
    setBillingCycleStatuses((current) => {
      const currentStatus = current[cycleId] ?? 'collecting';
      const order: BillingCycleStatus[] = [
        'collecting',
        'ready',
        'sent',
        'subscription-renewal',
      ];
      const nextStatus = order[(order.indexOf(currentStatus) + 1) % order.length];

      return {
        ...current,
        [cycleId]: nextStatus,
      };
    });
  }

  function advanceBillingRunItem(itemId: string) {
    setBillingRunItemStatuses((current) => {
      const currentStatus = current[itemId] ?? 'review';
      const order: BillingRunItemStatus[] = [
        'review',
        'ready',
        'sent',
        'excluded',
        'blocked',
      ];
      const nextStatus = order[(order.indexOf(currentStatus) + 1) % order.length];

      return {
        ...current,
        [itemId]: nextStatus,
      };
    });
  }

  function advanceRetainerAction(actionId: string) {
    setRetainerActionStatuses((current) => {
      const currentStatus = current[actionId] ?? 'available';
      const order: RetainerActionStatus[] = [
        'available',
        'requested',
        'scheduled',
        'completed',
      ];
      const nextStatus = order[(order.indexOf(currentStatus) + 1) % order.length];

      return {
        ...current,
        [actionId]: nextStatus,
      };
    });
  }

  function advanceAccessInvite(inviteId: string) {
    setAccessStatusesById((current) => {
      const currentStatus = current[inviteId] ?? 'needs-invite';
      const nextStatus =
        accessStatuses[(accessStatuses.indexOf(currentStatus) + 1) % accessStatuses.length];

      return {
        ...current,
        [inviteId]: nextStatus,
      };
    });
  }

  function advancePaymentProfile(profileId: string) {
    setPaymentStatusesById((current) => {
      const currentStatus = current[profileId] ?? 'needs-setup';
      const nextStatus =
        paymentStatuses[
          (paymentStatuses.indexOf(currentStatus) + 1) % paymentStatuses.length
        ];

      return {
        ...current,
        [profileId]: nextStatus,
      };
    });
  }

  return (
    <section className="admin-page">
      <div className="gap-xl" />
      <div className="container wide">
        <div className="admin-header">
          <div>
            <div className="mini-heading">Internal prototype / noindex</div>
            <h1>Client operations admin</h1>
            <p className="subtitle light">
              Timesheet review, request triage, retainer banks, billing readiness,
              and internal IDs in one owner-facing workspace.
            </p>
          </div>
          <div className="admin-warning">
            Sample data only. This route is intentionally unlinked from public
            navigation.
          </div>
        </div>

        <div className="gap-l" />
        <section className="admin-filter-bar" aria-label="Admin filters">
          <label>
            Client
            <select
              value={clientFilter}
              onChange={(event) => setClientFilter(event.currentTarget.value)}
            >
              <option value="all">All clients</option>
              {portalClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Month
            <select
              value={monthFilter}
              onChange={(event) => setMonthFilter(event.currentTarget.value)}
            >
              <option value="all">All months</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
          <label>
            Billing
            <select
              value={billingFilter}
              onChange={(event) =>
                setBillingFilter(event.currentTarget.value as BillingFilter)
              }
            >
              <option value="all">All billing</option>
              <option value="Billable">Billable</option>
              <option value="NotBillable">Non billable</option>
            </select>
          </label>
          <label>
            Invoice
            <select
              value={invoiceFilter}
              onChange={(event) =>
                setInvoiceFilter(event.currentTarget.value as InvoiceFilter)
              }
            >
              <option value="all">All invoice states</option>
              <option value="has-invoice">Has invoice</option>
              <option value="missing-invoice">Missing invoice</option>
              <option value="will-bill">Will be billed</option>
            </select>
          </label>
        </section>

        <div className="admin-metric-grid">
          <AdminMetric
            label="Billable amount"
            value={formatMoney(totalAmount)}
            note={`${billableEntries.length} billable rows`}
          />
          <AdminMetric
            label="Billable time"
            value={formatDuration(billableMinutes)}
            note="Ready for invoice review"
          />
          <AdminMetric
            label="Non billable time"
            value={formatDuration(nonBillableMinutes)}
            note={`${nonBillableEntries.length} internal rows`}
          />
          <AdminMetric
            label="Needs billing decision"
            value={String(missingInvoiceEntries.length)}
            note="Billable rows missing invoice number"
          />
        </div>

        <section className="admin-panel">
          <PanelTitle
            eyebrow="Billing runs"
            title="1st/15th invoices and Shopify subscription renewals"
          />
          <div className="admin-billing-run-grid">
            {billingCycles.map((cycle) => {
              const status = billingCycleStatuses[cycle.id] ?? cycle.status;
              const checklist = getBillingRunChecklistItems(cycle.id);
              const blockedCount = checklist.filter((item) => {
                const itemStatus = billingRunItemStatuses[item.id] ?? item.status;
                return itemStatus === 'blocked';
              }).length;

              return (
                <article className="admin-billing-run" key={cycle.id}>
                  <div>
                    <span>{cycle.date}</span>
                    <strong>{cycle.title.en}</strong>
                    <p>{cycle.rule.en}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Amount</dt>
                      <dd>{formatMoney(getBillingCycleAmount(cycle))}</dd>
                    </div>
                    <div>
                      <dt>Time</dt>
                      <dd>{formatDuration(getBillingCycleMinutes(cycle))}</dd>
                    </div>
                    <div>
                      <dt>Blocked</dt>
                      <dd>{cycle.blockedTimeEntryIds.length + blockedCount}</dd>
                    </div>
                    <div>
                      <dt>Checklist</dt>
                      <dd>{checklist.length}</dd>
                    </div>
                  </dl>
                  <div className="admin-row-actions">
                    <span className={`portal-status ${status}`}>
                      {getBillingCycleStatusLabel(status, 'en')}
                    </span>
                    <button
                      onClick={() => advanceBillingCycle(cycle.id)}
                      type="button"
                    >
                      Advance
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="admin-panel">
          <PanelTitle
            eyebrow="Billing checklist"
            title="Invoice blockers, approvals, and retainer exclusions"
          />
          <div className="admin-work-list">
            {billingRunChecklistItems.map((item) => {
              const client = getClientById(item.clientId);
              const cycle = billingCycles.find(
                (billingCycle) => billingCycle.id === item.cycleId,
              );
              const status = billingRunItemStatuses[item.id] ?? item.status;

              return (
                <article
                  className="admin-work-row admin-readiness-row"
                  key={item.id}
                >
                  <div>
                    <span>
                      {client?.name ?? item.clientId} /{' '}
                      {cycle?.title.en ?? item.cycleId}
                    </span>
                    <strong>{item.title.en}</strong>
                    <p>{item.detail.en}</p>
                    <code>{item.requirement.en}</code>
                  </div>
                  <div className="admin-row-actions">
                    <span className={`portal-status ${status}`}>
                      {getBillingRunItemStatusLabel(status, 'en')}
                    </span>
                    <span>{item.owner}</span>
                    <span>{item.templateId ?? 'no-template'}</span>
                    <button
                      type="button"
                      onClick={() => advanceBillingRunItem(item.id)}
                    >
                      Advance
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="admin-grid">
          <section className="admin-panel">
            <PanelTitle
              eyebrow="Shopify"
              title="Identity, accounts, metafields, segments, and subscriptions"
            />
            <div className="admin-model-stack">
              <div>
                <h3>Customer tags</h3>
                <div className="admin-token-list">
                  {SHOPIFY_CUSTOMER_TAGS.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>App-owned customer metafields</h3>
                <div className="admin-token-list">
                  {CLIENT_PORTAL_METAFIELD_KEYS.map((key) => (
                    <span key={key}>$app.{key}</span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Segments</h3>
                <div className="admin-segment-list">
                  {CLIENT_SEGMENT_RULES.map((segment) => (
                    <article key={segment.id}>
                      <strong>{segment.label}</strong>
                      <code>{segment.query}</code>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle
              eyebrow="Supabase"
              title="Realtime operations source of truth"
            />
            <div className="admin-table-plan">
              {supabaseTablePlan.map((table) => (
                <article key={table.table}>
                  <div>
                    <strong>{table.table}</strong>
                    <span>{table.owner.en}</span>
                  </div>
                  <p>{table.purpose.en}</p>
                  <em>{table.realtime ? 'Realtime' : table.state}</em>
                </article>
              ))}
            </div>
            <div className="admin-realtime-note">
              Realtime publication: {realtimeTables.join(', ')}
            </div>
          </section>
        </div>

        <section className="admin-panel admin-account-section">
          <PanelTitle
            eyebrow="Accounts"
            title="Company members, billing roles, and retainer controls"
          />
          <div className="admin-account-grid">
            {portalClients.map((client) => {
              const contacts = getClientContacts(client.id);
              const policy = billingPolicies.find(
                (billingPolicy) => billingPolicy.clientId === client.id,
              );
              const subscription = getClientRetainerSubscription(client.id);

              return (
                <article className="admin-account-row" key={client.id}>
                  <div>
                    <span>{client.companyAccountId}</span>
                    <strong>{client.name}</strong>
                    <p>{client.project}</p>
                  </div>
                  <div>
                    <span>Billing</span>
                    <strong>
                      {policy
                        ? getBillingCadenceLabel(policy.cadence, 'en')
                        : 'Not configured'}
                    </strong>
                    <p>{policy ? `Next ${policy.nextBillingDate}` : 'Needs setup'}</p>
                  </div>
                  <div>
                    <span>Contacts</span>
                    {contacts.map((contact) => (
                      <p key={contact.id}>
                        {contact.name} -{' '}
                        {contact.roles
                          .map((role) => getRoleLabel(role, 'en'))
                          .join(', ')}
                      </p>
                    ))}
                  </div>
                  <div>
                    <span>Retainer</span>
                    <strong>{subscription?.planName ?? 'No subscription'}</strong>
                    <p>{subscription?.status ?? client.metafields.retainerStatus}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="admin-grid">
          <section className="admin-panel">
            <PanelTitle
              eyebrow="Access readiness"
              title="Employee invites and permissions"
            />
            <div className="admin-work-list">
              {companyAccessInvites.map((invite) => {
                const client = getClientById(invite.clientId);
                const contact = getContactById(invite.contactId);
                const status = accessStatusesById[invite.id] ?? invite.status;

                return (
                  <article
                    className="admin-work-row admin-readiness-row"
                    key={invite.id}
                  >
                    <div>
                      <span>{client?.name ?? invite.clientId}</span>
                      <strong>{contact?.name ?? invite.contactId}</strong>
                      <p>{invite.nextStep.en}</p>
                      <code>{invite.requiredMetafields.join(', ')}</code>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${status}`}>
                        {getCompanyAccessStatusLabel(status, 'en')}
                      </span>
                      <span>{invite.permissions.join(', ')}</span>
                      <button
                        type="button"
                        onClick={() => advanceAccessInvite(invite.id)}
                      >
                        Advance
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle
              eyebrow="Payment readiness"
              title="Payment methods and invoice delivery"
            />
            <div className="admin-work-list">
              {paymentMethodProfiles.map((profile) => {
                const client = getClientById(profile.clientId);
                const contact = getContactById(profile.ownerContactId);
                const status =
                  paymentStatusesById[profile.id] ?? profile.status;

                return (
                  <article
                    className="admin-work-row admin-readiness-row"
                    key={profile.id}
                  >
                    <div>
                      <span>{client?.name ?? profile.clientId}</span>
                      <strong>{profile.label.en}</strong>
                      <p>
                        Owner: {contact?.name ?? profile.ownerContactId} /{' '}
                        {profile.nextAction.en}
                      </p>
                      <code>
                        {profile.method} / autopay{' '}
                        {profile.autopay ? 'enabled' : 'disabled'}
                      </code>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${status}`}>
                        {getPaymentMethodStatusLabel(status, 'en')}
                      </span>
                      <span>{profile.lastCheckedAt}</span>
                      <button
                        type="button"
                        onClick={() => advancePaymentProfile(profile.id)}
                      >
                        Advance
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <div className="admin-grid">
          <section className="admin-panel">
            <PanelTitle
              eyebrow="Retainer actions"
              title="Client self-service requests"
            />
            <div className="admin-work-list">
              {retainerActionRequests.map((action) => {
                const client = getClientById(action.clientId);
                const status =
                  retainerActionStatuses[action.id] ?? action.status;

                return (
                  <article className="admin-work-row" key={action.id}>
                    <div>
                      <span>{client?.name ?? action.clientId}</span>
                      <strong>{action.label.en}</strong>
                      <p>{action.detail.en}</p>
                      <code>{action.shopifyMutation}</code>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${status}`}>
                        {getRetainerActionStatusLabel(status, 'en')}
                      </span>
                      <span>{action.effectiveDate}</span>
                      <button
                        type="button"
                        onClick={() => advanceRetainerAction(action.id)}
                      >
                        Advance
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle
              eyebrow="Audience checks"
              title="Tags, metafields, and recipients before notifications"
            />
            <div className="admin-work-list">
              {notificationAudienceChecks.map((check) => {
                const client = getClientById(check.clientId);

                return (
                  <article className="admin-work-row" key={check.id}>
                    <div>
                      <span>{client?.name ?? check.clientId}</span>
                      <strong>{check.templateId}</strong>
                      <p>
                        {check.recipientContactIds.length} recipients /{' '}
                        {check.requiredTags.join(', ')}
                      </p>
                      <code>{check.requiredMetafields.join(', ')}</code>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${check.status}`}>
                        {check.status}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <div className="admin-grid">
          <section className="admin-panel admin-panel-large">
            <PanelTitle
              eyebrow="Timesheet"
              title="Review time, billing type, invoice state, QBO, and GHL"
            />
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client / Project</th>
                    <th>Task</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Amount</th>
                    <th>Billing</th>
                    <th>Invoice</th>
                    <th>IDs</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTimeEntries.map((entry) => (
                    <TimesheetRow entry={entry} key={entry.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle eyebrow="Retainers" title="Banks and usage" />
            <div className="admin-bank-list">
              {retainerBanks.map((bank) => {
                const client = getClientById(bank.clientId);
                const subscription = getClientRetainerSubscription(bank.clientId);
                const total = bank.totalMinutes + bank.rolloverMinutes;
                const usedPercent = total
                  ? Math.min(Math.round((bank.usedMinutes / total) * 100), 100)
                  : 0;

                return (
                  <article className="admin-bank-row" key={bank.id}>
                    <div>
                      <span>{client?.name ?? bank.clientId}</span>
                      <strong>{bank.label.en}</strong>
                    </div>
                    <div className="admin-bank-track" aria-hidden="true">
                      <span style={{width: `${usedPercent}%`}} />
                    </div>
                    <p>
                      {formatDuration(bank.usedMinutes)} used of{' '}
                      {formatDuration(total)}
                    </p>
                    <small>
                      {subscription
                        ? `${subscription.planName} / ${subscription.status}`
                        : 'Bank without subscription'}
                    </small>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <div className="admin-grid">
          <section className="admin-panel">
            <div className="admin-panel-heading">
              <PanelTitle eyebrow="Tasks" title="Request triage" />
              <select
                value={taskFilter}
                onChange={(event) =>
                  setTaskFilter(event.currentTarget.value as TaskFilter)
                }
              >
                <option value="all">All tasks</option>
                {workStatuses.map((status) => (
                  <option key={status} value={status}>
                    {getStatusLabel(status, 'en')}
                  </option>
                ))}
              </select>
            </div>
            <div className="admin-work-list">
              {visibleTasks.map((task) => {
                const client = getClientById(task.clientId);

                return (
                  <article className="admin-work-row" key={task.id}>
                    <div>
                      <span>{client?.name ?? task.clientId}</span>
                      <strong>{task.title.en}</strong>
                      <p>{task.detail.en}</p>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${task.status}`}>
                        {getStatusLabel(task.status, 'en')}
                      </span>
                      <button type="button" onClick={() => advanceTask(task.id)}>
                        Advance
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle eyebrow="Assets" title="Brief and access queue" />
            <div className="admin-work-list">
              {visibleAssets.map((asset) => {
                const client = getClientById(asset.clientId);

                return (
                  <article className="admin-work-row" key={asset.id}>
                    <div>
                      <span>{client?.name ?? asset.clientId}</span>
                      <strong>{asset.title.en}</strong>
                      <p>{asset.detail.en}</p>
                    </div>
                    <div className="admin-row-actions">
                      <span className={`portal-status ${asset.status}`}>
                        {getAssetStatusLabel(asset.status, 'en')}
                      </span>
                      <button type="button" onClick={() => advanceAsset(asset.id)}>
                        Advance
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <section className="admin-panel">
          <PanelTitle
            eyebrow="Financials"
            title="Invoice readiness and accounting handoff"
          />
          <div className="admin-invoice-grid">
            {invoiceRecords.map((invoice) => {
              const client = getClientById(invoice.clientId);
              const policy = client ? getClientBillingPolicy(client.id) : undefined;

              return (
                <article className="admin-invoice-card" key={invoice.id}>
                  <span>{client?.name ?? invoice.clientId}</span>
                  <strong>{invoice.invoiceNumber}</strong>
                  <div>
                    <p>{formatMoney(invoice.amountCents)}</p>
                    <em>{invoice.status}</em>
                  </div>
                  <p>
                    {policy ? getBillingCadenceLabel(policy.cadence, 'en') : 'No policy'}
                  </p>
                  <small>Due {invoice.due}</small>
                </article>
              );
            })}
          </div>
        </section>

        <div className="admin-grid">
          <section className="admin-panel">
            <PanelTitle eyebrow="Comms" title="Liquid email and SMS triggers" />
            <div className="admin-work-list">
              {communicationTemplates.map((template) => (
                <article className="admin-work-row" key={template.id}>
                  <div>
                    <span>{template.channel} / {template.audience}</span>
                    <strong>{template.title.en}</strong>
                    <p>{template.trigger.en}</p>
                    <code>{template.liquidFile}</code>
                  </div>
                  <div className="admin-row-actions">
                    <span>{template.cadence}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="admin-panel">
            <PanelTitle eyebrow="Sync" title="Shopify and Supabase handoff" />
            <div className="admin-sync-grid">
              <SyncColumn title="Shopify to Supabase" items={shopifyToSupabaseSyncPoints} />
              <SyncColumn title="Supabase to Shopify" items={supabaseToShopifySyncPoints} />
            </div>
            <div className="admin-boundary-list">
              {dataBoundaries.map((boundary) => (
                <article key={boundary.id}>
                  <strong>{boundary.domain.en}</strong>
                  <span>{boundary.source} / {boundary.syncDirection}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}

function SyncColumn({
  items,
  title,
}: {
  items: Array<{label: string; effect: string}>;
  title: string;
}) {
  return (
    <div className="admin-sync-column">
      <h3>{title}</h3>
      {items.map((item) => (
        <article key={item.label}>
          <strong>{item.label}</strong>
          <p>{item.effect}</p>
        </article>
      ))}
    </div>
  );
}

function AdminMetric({
  label,
  note,
  value,
}: {
  label: string;
  note: string;
  value: string;
}) {
  return (
    <section className="admin-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <p>{note}</p>
    </section>
  );
}

function PanelTitle({eyebrow, title}: {eyebrow: string; title: string}) {
  return (
    <div className="admin-section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function TimesheetRow({entry}: {entry: TimeEntry}) {
  const client = getClientById(entry.clientId);
  const invoiceLabel = entry.invoiceNumber || 'Missing';

  return (
    <tr>
      <td data-label="Client / Project">
        <strong>{client?.name ?? entry.clientId}</strong>
        <span>{entry.projectId}</span>
      </td>
      <td data-label="Task">{entry.task}</td>
      <td data-label="Date">{entry.date}</td>
      <td data-label="Time">
        <strong>{formatDuration(entry.durationMinutes)}</strong>
        <span>
          {entry.start} - {entry.end}
        </span>
      </td>
      <td data-label="Amount">{formatMoney(entry.amountCents)}</td>
      <td data-label="Billing">
        <span className={`portal-status ${entry.billingCategory}`}>
          {entry.billingCategory}
        </span>
        <small>{entry.billingType}</small>
      </td>
      <td data-label="Invoice">
        <strong>{invoiceLabel}</strong>
        <span>{entry.willBeBilled ? 'Will bill' : 'Hold'}</span>
      </td>
      <td data-label="IDs">
        <span>QBO {entry.qboId || 'Missing'}</span>
        <span>Owner {entry.ownerQboId || 'Missing'}</span>
        <span>GHL {maskExternalId(entry.ghlId)}</span>
      </td>
    </tr>
  );
}
