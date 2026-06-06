import {NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {
  getNavItems,
  getSiteText,
  siteConfig,
} from '~/lib/pasquin';
import {getLegalNavItems} from '~/lib/legal';
import {getLocalizedHref, useSelectedLanguage} from '~/lib/i18n';
import {getServicePageSummaries} from '~/lib/servicePages';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer(_props: FooterProps) {
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const navItems = getNavItems(language);
  const services = getServicePageSummaries(language, 'services');
  const capabilities = getServicePageSummaries(language, 'shopifyWork');
  const legalNavItems = getLegalNavItems(language);

  return (
    <footer className="container footer">
      <div className="cols four-up med-gap">
        <div>
          <NavLink
            aria-label={`${siteConfig.logo} home`}
            className="footer-wordmark"
            end
            to={getLocalizedHref('/', language)}
          >
            <span className="brand-slash" aria-hidden="true">
              /
            </span>
            <span className="brand-name" aria-hidden="true">
              pasquin
            </span>
          </NavLink>
          {navItems.map((item) => (
            <NavLink
              className="footer-link"
              key={item.href}
              to={getLocalizedHref(item.href, language)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div>
          <div className="mini-heading">{text.footer.services}</div>
          {services.map((service) => (
            <NavLink
              className="footer-link"
              to={getLocalizedHref(service.href, language)}
              key={service.slug}
            >
              {service.navLabel}
            </NavLink>
          ))}
        </div>

        <div>
          <div className="mini-heading">{text.footer.shopifyWork}</div>
          {capabilities.map((service) => (
            <NavLink
              className="footer-link"
              to={getLocalizedHref(service.href, language)}
              key={service.slug}
            >
              {service.navLabel}
            </NavLink>
          ))}
        </div>

        <div className="footer-note">
          <div>{text.footer.note}</div>
          <div className="gap-m" />
          <div className="btn-grp">
            <NavLink
              className="feat-link"
              to={getLocalizedHref('/contact', language)}
            >
              {text.footer.cta}
            </NavLink>
          </div>
          <div className="gap-m-plus" />
          <nav className="footer-legal-links" aria-label="Legal links">
            {legalNavItems.map((item) => (
              <NavLink key={item.href} to={getLocalizedHref(item.href, language)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="gap-m" />
          <div className="small-text light">
            {text.footer.line1}
            <br />
            {text.footer.line2}
            <br />
            © 2026 Philippe Pasquin
          </div>
        </div>
      </div>
    </footer>
  );
}
