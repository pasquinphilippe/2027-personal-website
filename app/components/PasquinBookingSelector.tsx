import {useMemo, useState} from 'react';
import {
  bankPackages,
  getPublicConfig,
  retainerPackages,
} from '~/lib/pasquin';

type EngagementType = 'bank' | 'retainer' | 'audit';

const focusAreas = [
  'Theme cleanup',
  'Product pages',
  'Collections',
  'Cart flow',
  'Apps',
  'Automation',
  'Performance',
  'Launch support',
];

export function PasquinBookingSelector({
  publicConfig,
}: {
  publicConfig: ReturnType<typeof getPublicConfig>;
}) {
  const [engagement, setEngagement] = useState<EngagementType>('bank');
  const [selectedPackage, setSelectedPackage] = useState(bankPackages[0].id);
  const [selectedFocus, setSelectedFocus] = useState<string[]>([
    'Theme cleanup',
    'Performance',
  ]);

  const packages = engagement === 'retainer' ? retainerPackages : bankPackages;

  const activePackage = useMemo(() => {
    if (engagement === 'audit') {
      return {
        id: 'audit',
        name: 'First fit call',
        price: 'Free',
        detail: 'Clarify the right scope before choosing hours',
        hours: '30 minutes',
        bestFor: 'First conversation, constraints, priorities, fit',
      };
    }

    return packages.find((item) => item.id === selectedPackage) ?? packages[0];
  }, [engagement, packages, selectedPackage]);

  const meetingSubject = encodeURIComponent(
    `${activePackage.name} - ${selectedFocus.join(', ')}`,
  );
  const calUrl = publicConfig.calLink
    ? `${publicConfig.calOrigin.replace(/\/$/, '')}/${publicConfig.calLink.replace(/^\//, '')}?notes=${meetingSubject}`
    : '';
  const emailUrl = `mailto:${publicConfig.contactEmail}?subject=${meetingSubject}`;

  function toggleFocus(item: string) {
    setSelectedFocus((current) =>
      current.includes(item)
        ? current.filter((focus) => focus !== item)
        : [...current, item],
    );
  }

  function selectEngagement(nextEngagement: EngagementType) {
    setEngagement(nextEngagement);
    if (nextEngagement === 'bank') setSelectedPackage(bankPackages[0].id);
    if (nextEngagement === 'retainer') setSelectedPackage(retainerPackages[0].id);
  }

  return (
    <section className="container booking" id="booking" aria-labelledby="booking-title">
      <div className="booking-copy">
        <div className="mini-heading">Booking</div>
        <h2 id="booking-title">Choose the right first conversation.</h2>
        <p className="light">
          Pick the engagement model and the type of Shopify work. The selected
          context is passed into the booking or email handoff.
        </p>
      </div>

      <div className="card booking-card">
        <div className="selector-tabs" role="tablist" aria-label="Engagement type">
          {[
            ['bank', 'Project bank'],
            ['retainer', 'Monthly support'],
            ['audit', 'Fit call'],
          ].map(([value, label]) => (
            <button
              className={engagement === value ? 'active' : ''}
              key={value}
              onClick={() => selectEngagement(value as EngagementType)}
              type="button"
            >
              {label}
            </button>
          ))}
        </div>

        {engagement !== 'audit' ? (
          <div className="package-list">
            {packages.map((item) => (
              <button
                className={selectedPackage === item.id ? 'package-row active' : 'package-row'}
                key={item.id}
                onClick={() => setSelectedPackage(item.id)}
                type="button"
              >
                <span>{item.name}</span>
                <strong>{item.price}</strong>
                <em>{item.detail}</em>
              </button>
            ))}
          </div>
        ) : (
          <div className="package-row static">
            <span>First fit call</span>
            <strong>Free</strong>
            <em>Clarify scope before choosing hours</em>
          </div>
        )}

        <div className="focus-picker" aria-label="Project focus">
          <div className="mini-heading">Project focus</div>
          <div className="pill-row">
            {focusAreas.map((area) => (
              <button
                className={selectedFocus.includes(area) ? 'pill active' : 'pill'}
                key={area}
                onClick={() => toggleFocus(area)}
                type="button"
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-summary">
          <div>
            <span>Selected path</span>
            <strong>{activePackage.name}</strong>
          </div>
          <div>
            <span>Investment</span>
            <strong>{activePackage.price}</strong>
          </div>
          <div>
            <span>Best for</span>
            <strong>{activePackage.bestFor}</strong>
          </div>
        </div>

        <div className="btn-grp">
          <a className="btn big" href={calUrl || emailUrl}>
            {calUrl ? 'Open scheduler' : 'Email project brief'}
          </a>
          <a className="btn secondary big" href="/pricing">
            Compare pricing
          </a>
        </div>

        {!calUrl ? (
          <p className="selector-note">
            Add PUBLIC_CAL_LINK to connect this flow to your Cal.com booking page.
          </p>
        ) : null}
      </div>
    </section>
  );
}
