import {Suspense, useEffect, useState} from 'react';
import {Await, Link, NavLink, useLocation} from 'react-router';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {
  moreNavItems,
  navItems,
  primaryNavItems,
  services,
  siteConfig,
} from '~/lib/pasquin';

interface HeaderProps {
  header: HeaderQuery;
  cart?: Promise<CartApiQueryFragment | null>;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';
type LanguageCode = 'en' | 'fr';

export function Header({isLoggedIn}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const language = useSelectedLanguage();

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
          <NavLink
            aria-label={`${siteConfig.logo} home`}
            className="site-wordmark"
            end
            prefetch="intent"
            to="/"
          >
            <span className="brand-slash" aria-hidden="true">
              /
            </span>
            <span className="brand-name" aria-hidden="true">
              pasquin
            </span>
          </NavLink>

          <div className="nav-wrap">
            <nav className="nav mini-nav" aria-label="Primary navigation">
              {primaryNavItems.map((item) => (
                <NavLink
                  className="nav-link"
                  end={item.href === '/'}
                  key={item.href}
                  prefetch="intent"
                  to={getLocalizedHref(item.href, language)}
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
                        to={getLocalizedHref(item.href, language)}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="header-actions">
            <LanguageSwitcher />
            <ClientLoginLink isLoggedIn={isLoggedIn} language={language} />
            <NavLink
              className="btn secondary header-contact-btn"
              to={getLocalizedHref('/contact', language)}
            >
              Contact
            </NavLink>
          </div>
          <HeaderMenuMobileToggle />
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({
  isLoggedIn,
  viewport,
}: {
  header?: HeaderQuery;
  isLoggedIn?: Promise<boolean>;
  viewport: Viewport;
  publicStoreDomain?: string;
}) {
  const {close} = useAside();
  const language = useSelectedLanguage();

  return (
    <nav className={`header-menu-${viewport}`} aria-label={`${viewport} navigation`}>
      <NavLink
        end
        onClick={close}
        prefetch="intent"
        to={getLocalizedHref('/', language)}
      >
        What We Do
      </NavLink>
      {navItems
        .filter((item) => item.href !== '/')
        .map((item) => (
          <NavLink
            key={item.href}
            onClick={close}
            prefetch="intent"
            to={getLocalizedHref(item.href, language)}
          >
            {item.label}
          </NavLink>
        ))}
      <div className="mobile-menu-services">
        <span>Services</span>
        {services.map((service) => (
          <a
            href={getLocalizedHref('/#services', language)}
            key={service.title}
            onClick={close}
          >
            {service.title}
          </a>
        ))}
      </div>
      <div className="mobile-menu-tools">
        <LanguageSwitcher onNavigate={close} />
        <ClientLoginLink
          className="mobile-login-link"
          isLoggedIn={isLoggedIn}
          language={language}
          onClick={close}
        />
      </div>
    </nav>
  );
}

function LanguageSwitcher({onNavigate}: {onNavigate?: () => void}) {
  const location = useLocation();
  const selectedLanguage = getSelectedLanguage(location.search);
  const languages: Array<{code: LanguageCode; label: string; hrefLang: string}> = [
    {code: 'en', label: 'EN', hrefLang: 'en-CA'},
    {code: 'fr', label: 'FR', hrefLang: 'fr-CA'},
  ];

  return (
    <div className="language-switcher" aria-label="Language" role="group">
      {languages.map((language) => {
        const isActive = selectedLanguage === language.code;

        return (
          <Link
            aria-current={isActive ? 'true' : undefined}
            className={`language-link${isActive ? ' active' : ''}`}
            hrefLang={language.hrefLang}
            key={language.code}
            onClick={onNavigate}
            to={getLanguageHref(location, language.code)}
          >
            {language.label}
          </Link>
        );
      })}
    </div>
  );
}

function ClientLoginLink({
  className = 'client-login-link',
  isLoggedIn,
  language,
  onClick,
}: {
  className?: string;
  isLoggedIn?: Promise<boolean>;
  language: LanguageCode;
  onClick?: () => void;
}) {
  const fallback = (
    <NavLink
      aria-label="Client login"
      className={className}
      onClick={onClick}
      prefetch="intent"
      to={getLoginHref(false, language)}
    >
      Login
    </NavLink>
  );

  if (!isLoggedIn) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <Await resolve={isLoggedIn} errorElement={fallback}>
        {(loggedIn) => (
          <NavLink
            aria-label={loggedIn ? 'Client account' : 'Client login'}
            className={className}
            onClick={onClick}
            prefetch="intent"
            to={getLoginHref(loggedIn, language)}
          >
            {loggedIn ? 'Client' : 'Login'}
          </NavLink>
        )}
      </Await>
    </Suspense>
  );
}

function useSelectedLanguage() {
  const location = useLocation();
  return getSelectedLanguage(location.search);
}

function getSelectedLanguage(search: string): LanguageCode {
  return new URLSearchParams(search).get('lang') === 'fr' ? 'fr' : 'en';
}

function getLanguageHref(
  location: ReturnType<typeof useLocation>,
  language: LanguageCode,
) {
  const params = new URLSearchParams(location.search);

  if (language === 'fr') {
    params.set('lang', 'fr');
  } else {
    params.delete('lang');
  }

  const search = params.toString();
  return `${location.pathname}${search ? `?${search}` : ''}${location.hash}`;
}

function getLocalizedHref(href: string, language: LanguageCode) {
  const hashIndex = href.indexOf('#');
  const base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const [pathname, search = ''] = base.split('?');
  const params = new URLSearchParams(search);

  if (language === 'fr') {
    params.set('lang', 'fr');
  } else {
    params.delete('lang');
  }

  const query = params.toString();
  return `${pathname || '/'}${query ? `?${query}` : ''}${hash}`;
}

function getLoginHref(loggedIn: boolean, language: LanguageCode) {
  if (loggedIn) {
    return getLocalizedHref('/account', language);
  }

  return language === 'fr' ? '/account/login?locale=fr-CA' : '/account/login';
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button className="menu-toggle reset" onClick={() => open('mobile')} type="button">
      Menu
    </button>
  );
}
