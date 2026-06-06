import {Link, useLoaderData} from 'react-router';
import type {Route} from './+types/client-login';
import {clientPortalItems, getPublicConfig, getSiteText} from '~/lib/pasquin';
import {
  getLanguageFromPathSearch,
  getLocalizedHref,
  useSelectedLanguage,
} from '~/lib/i18n';

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
          ? "Acces portail client pour retainers Shopify actifs, banques d'heures et support lancement avec Philippe Pasquin."
          : 'Client portal access for active Shopify development retainers, bank-of-hours work, and launch support with Philippe Pasquin.',
    },
  ];
};

export async function loader({context}: Route.LoaderArgs) {
  return {
    publicConfig: getPublicConfig(context.env),
  };
}

export default function ClientLoginPage() {
  const {publicConfig} = useLoaderData<typeof loader>();
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const contactPath = getLocalizedHref('/contact', language);
  const requestAccessHref = `mailto:${publicConfig.contactEmail}?subject=${encodeURIComponent(
    text.clientLogin.subject,
  )}`;

  return (
    <section className="client-login-page">
      <div className="gap-xl" />
      <div className="container wide">
        <div className="client-login-shell">
          <div className="client-login-copy">
            <div className="hero-proof-callout">
              <span className="hero-proof-dot" aria-hidden="true"></span>
              <span>{text.clientLogin.proof}</span>
            </div>
            <div className="gap-l" />
            <h1>{text.clientLogin.title}</h1>
            <div className="gap-m" />
            <p className="subtitle light">
              {text.clientLogin.intro}
            </p>
            <div className="gap-m-plus" />
            <div className="btn-grp">
              <a className="btn big" href={requestAccessHref}>
                {text.clientLogin.requestAccess}
              </a>
              <Link className="btn secondary big" to={contactPath}>
                {text.clientLogin.bookMeeting}
              </Link>
            </div>
          </div>

          <div className="client-login-panel" aria-label="Portal access details">
            <div>
              <div className="mini-heading">{text.clientLogin.statusHeading}</div>
              <div className="gap-s" />
              <h2 className="h4">{text.clientLogin.statusTitle}</h2>
              <p className="light">
                {text.clientLogin.statusText}
              </p>
            </div>

            <div className="client-login-list">
              {clientPortalItems.map((item) => (
                <div className="client-login-row" key={item.number}>
                  <span>{item.number}</span>
                  <div>
                    <strong>{item.title[language]}</strong>
                    <p>{item.text[language]}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pill-row">
              {text.clientLogin.pills.map((pill) => (
                <span className="pill" key={pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="gap-xxl" />
    </section>
  );
}
