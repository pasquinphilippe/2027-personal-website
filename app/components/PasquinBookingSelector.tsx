import {useMemo, useState} from 'react';
import {
  focusAreas,
  getBankPackages,
  getFocusAreaLabel,
  getPublicConfig,
  getRetainerPackages,
  getSiteText,
} from '~/lib/pasquin';
import {getLocalizedHref, useSelectedLanguage} from '~/lib/i18n';

type EngagementType = 'bank' | 'retainer' | 'audit';

export function PasquinBookingSelector({
  publicConfig,
}: {
  publicConfig: ReturnType<typeof getPublicConfig>;
}) {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const bankPackages = getBankPackages(language);
  const retainerPackages = getRetainerPackages(language);
  const [engagement, setEngagement] = useState<EngagementType>('bank');
  const [selectedPackage, setSelectedPackage] = useState(bankPackages[0].id);
  const [selectedFocus, setSelectedFocus] = useState([
    'theme-cleanup',
    'performance',
  ]);

  const packages = engagement === 'retainer' ? retainerPackages : bankPackages;

  const activePackage = useMemo(() => {
    if (engagement === 'audit') {
      return {
        id: 'audit',
        name: text.booking.auditName,
        price: text.booking.auditPrice,
        detail: text.booking.auditDetail,
        hours: text.booking.auditHours,
        bestFor: text.booking.auditBestFor,
      };
    }

    return packages.find((item) => item.id === selectedPackage) ?? packages[0];
  }, [engagement, packages, selectedPackage, text]);

  const meetingSubject = encodeURIComponent(
    `${activePackage.name} - ${selectedFocus
      .map((focus) => getFocusAreaLabel(focus, language))
      .join(', ')}`,
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
    <section
      className="container booking"
      id="booking"
      aria-labelledby="booking-title"
    >
      <div className="booking-copy">
        <div className="mini-heading">{text.booking.heading}</div>
        <h2 id="booking-title">{text.booking.title}</h2>
        <p className="light">{text.booking.intro}</p>
      </div>

      <div className="card booking-card">
        <div className="selector-tabs" role="tablist" aria-label="Engagement type">
          {[
            ['bank', text.booking.tabs.bank],
            ['retainer', text.booking.tabs.retainer],
            ['audit', text.booking.tabs.audit],
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
                className={
                  selectedPackage === item.id ? 'package-row active' : 'package-row'
                }
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
            <span>{text.booking.auditName}</span>
            <strong>{text.booking.auditPrice}</strong>
            <em>{text.booking.auditDetail}</em>
          </div>
        )}

        <div className="focus-picker" aria-label="Project focus">
          <div className="mini-heading">{text.booking.focusHeading}</div>
          <div className="pill-row">
            {focusAreas.map((area) => (
              <button
                className={selectedFocus.includes(area.id) ? 'pill active' : 'pill'}
                key={area.id}
                onClick={() => toggleFocus(area.id)}
                type="button"
              >
                {area[language]}
              </button>
            ))}
          </div>
        </div>

        <div className="booking-summary">
          <div>
            <span>{text.booking.selectedPath}</span>
            <strong>{activePackage.name}</strong>
          </div>
          <div>
            <span>{text.booking.investment}</span>
            <strong>{activePackage.price}</strong>
          </div>
          <div>
            <span>{text.booking.bestFor}</span>
            <strong>{activePackage.bestFor}</strong>
          </div>
        </div>

        <div className="btn-grp">
          <a className="btn big" href={calUrl || emailUrl}>
            {calUrl ? text.booking.scheduler : text.booking.emailBrief}
          </a>
          <a
            className="btn secondary big"
            href={getLocalizedHref('/pricing', language)}
          >
            {text.booking.compare}
          </a>
        </div>

        {!calUrl ? (
          <p className="selector-note">{text.booking.calNote}</p>
        ) : null}
      </div>
    </section>
  );
}
