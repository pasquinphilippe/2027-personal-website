import type {
  CartApiQueryFragment,
  FooterQuery,
  HeaderQuery,
} from 'storefrontapi.generated';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header, HeaderMenu} from '~/components/Header';

interface PageLayoutProps {
  cart: Promise<CartApiQueryFragment | null>;
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
  children?: React.ReactNode;
}

export function PageLayout({
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}: PageLayoutProps) {
  return (
    <Aside.Provider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <MobileMenuAside
        header={header}
        isLoggedIn={isLoggedIn}
        publicStoreDomain={publicStoreDomain}
      />
      {header && (
        <Header
          header={header}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main id="main">{children}</main>
      <Footer
        footer={footer}
        header={header}
        publicStoreDomain={publicStoreDomain}
      />
    </Aside.Provider>
  );
}

function MobileMenuAside({
  header,
  isLoggedIn,
  publicStoreDomain,
}: {
  header: PageLayoutProps['header'];
  isLoggedIn: PageLayoutProps['isLoggedIn'];
  publicStoreDomain: PageLayoutProps['publicStoreDomain'];
}) {
  return (
    <Aside type="mobile" heading="MENU">
      <HeaderMenu
        header={header}
        isLoggedIn={isLoggedIn}
        viewport="mobile"
        publicStoreDomain={publicStoreDomain}
      />
    </Aside>
  );
}
