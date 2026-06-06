import {useLocation, useRouteLoaderData} from 'react-router';

export type LanguageCode = 'en' | 'fr';
export type ShopifyLanguageCode = 'EN' | 'FR';

export const defaultLanguage: LanguageCode = 'en';

export const languageConfig = {
  en: {
    code: 'en',
    hrefLang: 'en-CA',
    label: 'EN',
    locale: 'en-CA',
    pathPrefix: '',
    shopifyLanguage: 'EN',
    shopifyCountry: 'CA',
  },
  fr: {
    code: 'fr',
    hrefLang: 'fr-CA',
    label: 'FR',
    locale: 'fr-CA',
    pathPrefix: '/fr',
    shopifyLanguage: 'FR',
    shopifyCountry: 'CA',
  },
} as const;

export function getLanguageFromRequest(request: Request): LanguageCode {
  const url = new URL(request.url);
  return getLanguageFromPathSearch(url.pathname, url.search);
}

export function getLanguageFromPathSearch(
  pathname: string,
  search = '',
): LanguageCode {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  return new URLSearchParams(search).get('lang') === 'fr' ? 'fr' : 'en';
}

export function getShopifyI18n(request: Request) {
  const language = getLanguageFromRequest(request);
  const config = languageConfig[language];

  return {
    language: config.shopifyLanguage as ShopifyLanguageCode,
    country: config.shopifyCountry,
  };
}

export function useSelectedLanguage(): LanguageCode {
  const rootData = useRouteLoaderData('root') as {language?: LanguageCode} | undefined;
  const location = useLocation();

  return rootData?.language ?? getLanguageFromPathSearch(location.pathname, location.search);
}

export function stripLanguagePrefix(pathname: string) {
  if (pathname === '/fr') return '/';
  if (pathname.startsWith('/fr/')) return pathname.slice(3) || '/';
  return pathname || '/';
}

export function getLocalizedHref(href: string, language: LanguageCode) {
  if (/^(mailto:|tel:|https?:)/.test(href)) return href;

  const hashIndex = href.indexOf('#');
  const base = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : '';
  const [rawPathname, search = ''] = base.split('?');
  const pathname = stripLanguagePrefix(rawPathname || '/');
  const params = new URLSearchParams(search);

  params.delete('lang');

  const query = params.toString();
  const localizedPath =
    language === 'fr' ? `/fr${pathname === '/' ? '' : pathname}` : pathname;

  return `${localizedPath || '/'}${query ? `?${query}` : ''}${hash}`;
}

export function getLanguageHref(
  location: ReturnType<typeof useLocation>,
  language: LanguageCode,
) {
  const params = new URLSearchParams(location.search);
  params.delete('lang');

  const query = params.toString();
  const href = getLocalizedHref(location.pathname, language);

  return `${href}${query ? `?${query}` : ''}${location.hash}`;
}

export function getCanonicalPath(pathname: string, language: LanguageCode) {
  return getLocalizedHref(stripLanguagePrefix(pathname), language).split('?')[0];
}

export function getLocalizedUrl(siteUrl: string, pathname: string, language: LanguageCode) {
  return `${siteUrl.replace(/\/$/, '')}${getCanonicalPath(pathname, language)}`;
}
