import {useEffect, useState} from 'react';
import {NavLink} from 'react-router';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {
  moreNavItems,
  navItems,
  primaryNavItems,
  services,
  siteConfig,
  contactNavItem,
} from '~/lib/pasquin';

interface HeaderProps {
  header: HeaderQuery;
  cart?: Promise<CartApiQueryFragment | null>;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header(_props: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function updateHeaderState() {
      setIsScrolled(window.scrollY > 12);
    }

    updateHeaderState();
    window.addEventListener('scroll', updateHeaderState, {passive: true});
    return () => window.removeEventListener('scroll', updateHeaderState);
  }, []);

  return (
    <header className={`header no-print${isScrolled ? ' is-scrolled' : ''}`}>
      <div className="container">
        <div className="header-inner">
          <NavLink prefetch="intent" to="/" className="site-wordmark" end>
            {siteConfig.logo}
          </NavLink>

          <div className="nav-wrap">
            <nav className="nav mini-nav" aria-label="Primary navigation">
              {primaryNavItems.map((item) => (
                <NavLink
                  className="nav-link"
                  end={item.href === '/'}
                  key={item.href}
                  prefetch="intent"
                  to={item.href}
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="nav-link nav-more">
                More
                <div className="nav-dropdown">
                  <div className="nav-dropdown-inner">
                    {moreNavItems.map((item) => (
                      <NavLink
                        className="dropdown-link"
                        key={item.href}
                        prefetch="intent"
                        to={item.href}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <NavLink className="nav-link contact-nav-link" prefetch="intent" to="/contact">
                {contactNavItem.label}
              </NavLink>
            </nav>
          </div>

          <NavLink className="btn secondary header-contact-btn" to="/contact">
            Contact
          </NavLink>
          <HeaderMenuMobileToggle />
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({
  viewport,
}: {
  header?: HeaderQuery;
  viewport: Viewport;
  publicStoreDomain?: string;
}) {
  const {close} = useAside();

  return (
    <nav className={`header-menu-${viewport}`} aria-label={`${viewport} navigation`}>
      <NavLink end onClick={close} prefetch="intent" to="/">
        What We Do
      </NavLink>
      {navItems
        .filter((item) => item.href !== '/')
        .map((item) => (
          <NavLink key={item.href} onClick={close} prefetch="intent" to={item.href}>
            {item.label}
          </NavLink>
        ))}
      <div className="mobile-menu-services">
        <span>Services</span>
        {services.map((service) => (
          <a href="/#services" key={service.title} onClick={close}>
            {service.title}
          </a>
        ))}
      </div>
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button className="menu-toggle reset" onClick={() => open('mobile')} type="button">
      Menu
    </button>
  );
}
