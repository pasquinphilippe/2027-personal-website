import {NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {
  capabilities,
  navItems,
  services,
  siteConfig,
} from '~/lib/pasquin';
import {legalNavItems} from '~/lib/legal';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer(_props: FooterProps) {
  return (
    <footer className="container footer">
      <div className="cols four-up med-gap">
        <div>
          <NavLink
            aria-label={`${siteConfig.logo} home`}
            className="footer-wordmark"
            end
            to="/"
          >
            <span className="brand-slash" aria-hidden="true">
              /
            </span>
            <span className="brand-name" aria-hidden="true">
              pasquin
            </span>
          </NavLink>
          {navItems.map((item) => (
            <NavLink className="footer-link" key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div>
          <div className="mini-heading">Services</div>
          {services.map((service) => (
            <a className="footer-link" href="/#services" key={service.title}>
              {service.title}
            </a>
          ))}
        </div>

        <div>
          <div className="mini-heading">Shopify work</div>
          {capabilities.slice(0, 7).map((item) => (
            <a className="footer-link" href="/work" key={item}>
              {item}
            </a>
          ))}
        </div>

        <div className="footer-note">
          <div>
            Personal Shopify development from Montreal for merchants who need
            lean execution, cleaner storefronts, and steady technical support.
          </div>
          <div className="gap-m" />
          <div className="btn-grp">
            <NavLink className="feat-link" to="/contact">
              Get in touch
            </NavLink>
          </div>
          <div className="gap-m-plus" />
          <nav className="footer-legal-links" aria-label="Legal links">
            {legalNavItems.map((item) => (
              <NavLink key={item.href} to={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="gap-m" />
          <div className="small-text light">
            Montreal, Quebec / Shopify development
            <br />
            Bank of hours + monthly retainers
            <br />
            © 2026 Philippe Pasquin
          </div>
        </div>
      </div>
    </footer>
  );
}
