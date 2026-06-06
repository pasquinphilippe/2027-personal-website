import {Suspense, useEffect, useState} from 'react';
import {Await, Link, NavLink, useLocation} from 'react-router';
import type {CartApiQueryFragment, HeaderQuery} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {
  getMoreNavItems,
  getNavItems,
  getPrimaryNavItems,
  getSiteText,
  siteConfig,
} from '~/lib/pasquin';
import {getServicePageSummaries} from '~/lib/servicePages';
import {
  getLanguageHref,
  getLocalizedHref,
  languageConfig,
  useSelectedLanguage,
  type LanguageCode,
} from '~/lib/i18n';

interface HeaderProps {
  header: HeaderQuery;
  cart?: Promise<CartApiQueryFragment | null>;
  isLoggedIn?: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';
export function Header({isLoggedIn}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  const primaryNavItems = getPrimaryNavItems(language);
  const moreNavItems = getMoreNavItems(language);

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
            to={getLocalizedHref('/', language)}
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
                {text.nav.more}
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
              {text.nav.contact}
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
  const text = getSiteText(language);
  const navItems = getNavItems(language);
  const services = getServicePageSummaries(language, 'services');

  return (
    <nav className={`header-menu-${viewport}`} aria-label={`${viewport} navigation`}>
      {navItems.map((item) => (
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
        <span>{text.nav.services}</span>
        {services.map((service) => (
          <NavLink
            key={service.slug}
            onClick={close}
            prefetch="intent"
            to={getLocalizedHref(service.href, language)}
          >
            {service.navLabel}
          </NavLink>
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
  const selectedLanguage = useSelectedLanguage();
  const languages: Array<{
    code: LanguageCode;
    label: string;
    hrefLang: string;
  }> = [
    {
      code: 'en',
      label: languageConfig.en.label,
      hrefLang: languageConfig.en.hrefLang,
    },
    {
      code: 'fr',
      label: languageConfig.fr.label,
      hrefLang: languageConfig.fr.hrefLang,
    },
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
  const text = getSiteText(language);
  const fallback = (
    <NavLink
      aria-label={text.nav.loginAria}
      className={className}
      onClick={onClick}
      prefetch="intent"
      to={getLoginHref(false, language)}
    >
      {text.nav.login}
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
            aria-label={loggedIn ? text.nav.clientAria : text.nav.loginAria}
            className={className}
            onClick={onClick}
            prefetch="intent"
            to={getLoginHref(loggedIn, language)}
          >
            {loggedIn ? text.nav.client : text.nav.login}
          </NavLink>
        )}
      </Await>
    </Suspense>
  );
}

function getLoginHref(loggedIn: boolean, language: LanguageCode) {
  if (loggedIn) {
    return getLocalizedHref('/account', language);
  }

  return getLocalizedHref('/client-login', language);
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  const language = useSelectedLanguage();
  const text = getSiteText(language);
  return (
    <button className="menu-toggle reset" onClick={() => open('mobile')} type="button">
      {text.nav.menu}
    </button>
  );
}
