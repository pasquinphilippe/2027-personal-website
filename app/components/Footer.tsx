import {NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {
  capabilities,
  merchantWins,
  navItems,
  services,
  siteConfig,
} from '~/lib/pasquin';

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
          <div className="mini-heading">{siteConfig.logo}</div>
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
          <div className="small-text light">
            {merchantWins.slice(0, 3).join(' / ')}
            <br />
            © 2026 Philippe Pasquin
          </div>
        </div>
      </div>
    </footer>
  );
}
