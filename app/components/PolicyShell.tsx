import type {ReactNode} from 'react';
import {NavLink} from 'react-router';
import {getLegalNavItems} from '~/lib/legal';
import {getLocalizedHref, useSelectedLanguage} from '~/lib/i18n';
import {siteConfig} from '~/lib/pasquin';

export function PolicyShell({
  eyebrow,
  title,
  description,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  children: ReactNode;
}) {
  const language = useSelectedLanguage();
  const legalNavItems = getLegalNavItems(language);
  const legalHeading = language === 'fr' ? 'Politiques' : 'Legal';
  const legalAriaLabel = language === 'fr' ? 'Pages legales' : 'Legal pages';
  const updatedLabel = language === 'fr' ? 'Mis a jour le' : 'Last updated';
  const questionsLabel =
    language === 'fr'
      ? 'Questions sur ces politiques?'
      : 'Questions about these policies?';

  return (
    <>
      <section className="container policy-page">
        <header className="policy-header">
          <div className="policy-meta-row">
            <span className="hero-proof-callout">{eyebrow}</span>
            <span className="small-text light">
              {updatedLabel} {updated}
            </span>
          </div>
          <div className="policy-heading-grid">
            <h1>{title}</h1>
            <p className="subtitle light">{description}</p>
          </div>

          <div className="policy-nav-bar">
            <span className="mini-heading">{legalHeading}</span>
            <nav className="policy-nav" aria-label={legalAriaLabel}>
              {legalNavItems.map((item) => (
                <NavLink
                  className="policy-nav-link"
                  key={item.href}
                  to={getLocalizedHref(item.href, language)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <article className="policy-content">
          {children}
          <div className="policy-contact">
            <span>{questionsLabel}</span>
            <a href={`mailto:${siteConfig.defaultSupportEmail}`}>
              {siteConfig.defaultSupportEmail}
            </a>
          </div>
        </article>
      </section>

      <div className="gap-xxl" />
    </>
  );
}

export function PolicySection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="policy-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PolicyTable({
  rows,
}: {
  rows: Array<{label: string; purpose: string; status: string}>;
}) {
  return (
    <div className="policy-table" role="table">
      {rows.map((row) => (
        <div className="policy-row" key={row.label} role="row">
          <strong role="cell">{row.label}</strong>
          <span role="cell">{row.purpose}</span>
          <em role="cell">{row.status}</em>
        </div>
      ))}
    </div>
  );
}
