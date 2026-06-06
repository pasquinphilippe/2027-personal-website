import {Link, useLoaderData, useLocation} from 'react-router';
import type {Route} from './+types/client-login';
import {getPublicConfig} from '~/lib/pasquin';

const portalItems = [
  ['01', 'Retainers', 'Monthly priorities, support notes, and next actions.'],
  ['02', 'Bank of hours', 'Scope, remaining time, and implementation status.'],
  ['03', 'Launch support', 'Checklist items, blockers, and handoff references.'],
];

export const meta: Route.MetaFunction = () => [
  {title: 'Client Portal | Philippe Pasquin Shopify Developer'},
  {
    name: 'description',
    content:
      'Client portal access for active Shopify development retainers, bank-of-hours work, and launch support with Philippe Pasquin.',
  },
];

export async function loader({context}: Route.LoaderArgs) {
  return {
    publicConfig: getPublicConfig(context.env),
  };
}

export default function ClientLoginPage() {
  const {publicConfig} = useLoaderData<typeof loader>();
  const location = useLocation();
  const language = new URLSearchParams(location.search).get('lang') === 'fr' ? 'fr' : 'en';
  const contactPath = language === 'fr' ? '/contact?lang=fr' : '/contact';
  const requestAccessHref = `mailto:${publicConfig.contactEmail}?subject=${encodeURIComponent(
    'Client portal access',
  )}`;

  return (
    <section className="client-login-page">
      <div className="gap-xl" />
      <div className="container wide">
        <div className="client-login-shell">
          <div className="client-login-copy">
            <div className="hero-proof-callout">
              <span className="hero-proof-dot" aria-hidden="true"></span>
              <span>Client portal / Shopify support workspace</span>
            </div>
            <div className="gap-l" />
            <h1>Client access for active Shopify work.</h1>
            <div className="gap-m" />
            <p className="subtitle light">
              Portal access is issued after the scope is confirmed, so priorities,
              files, notes, and decisions stay organized around the work.
            </p>
            <div className="gap-m-plus" />
            <div className="btn-grp">
              <a className="btn big" href={requestAccessHref}>
                Request Access
              </a>
              <Link className="btn secondary big" to={contactPath}>
                Book a Meeting
              </Link>
            </div>
          </div>

          <div className="client-login-panel" aria-label="Portal access details">
            <div>
              <div className="mini-heading">Access Status</div>
              <div className="gap-s" />
              <h2 className="h4">Invitation required.</h2>
              <p className="light">
                If you already have an active workspace, use the access link sent
                with your onboarding details.
              </p>
            </div>

            <div className="client-login-list">
              {portalItems.map(([number, title, text]) => (
                <div className="client-login-row" key={title}>
                  <span>{number}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pill-row">
              <span className="pill">Private by default</span>
              <span className="pill">Scope-first</span>
              <span className="pill">Merchant-focused</span>
            </div>
          </div>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}
