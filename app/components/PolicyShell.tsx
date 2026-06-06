import type {ReactNode} from 'react';
import {NavLink} from 'react-router';
import {legalNavItems} from '~/lib/legal';
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
  return (
    <>
      <section className="policy-hero">
        <div className="gap-xl" />
        <div className="container">
          <div className="policy-meta-row">
            <div className="hero-proof-callout">{eyebrow}</div>
            <div className="small-text light">Last updated {updated}</div>
          </div>
          <div className="gap-l" />
          <div className="hero-text-wrap policy-hero-wrap">
            <h1>{title}</h1>
            <p className="subtitle light">{description}</p>
          </div>
        </div>
        <div className="gap-xl" />
      </section>

      <section className="container policy-layout">
        <aside className="policy-sidebar" aria-label="Legal pages">
          <div className="mini-heading">Legal</div>
          {legalNavItems.map((item) => (
            <NavLink className="policy-nav-link" key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </aside>

        <div className="policy-content">
          {children}
          <div className="policy-contact">
            <span>Questions about these policies?</span>
            <a href={`mailto:${siteConfig.defaultContactEmail}`}>
              {siteConfig.defaultContactEmail}
            </a>
          </div>
        </div>
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
