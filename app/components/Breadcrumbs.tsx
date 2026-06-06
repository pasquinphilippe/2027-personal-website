import {Link} from 'react-router';
import type {LanguageCode} from '~/lib/i18n';
import {getLocalizedHref, getLocalizedUrl} from '~/lib/i18n';

export type Breadcrumb = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
  language: LanguageCode;
  siteUrl: string;
  /**
   * When true, emit a BreadcrumbList JSON-LD alongside the visible list.
   * Set to false on pages that already emit a BreadcrumbList in a parent
   * `@graph` to avoid duplicating the schema.
   */
  emitJsonLd?: boolean;
};

export function Breadcrumbs({
  items,
  language,
  siteUrl,
  emitJsonLd = true,
}: BreadcrumbsProps) {
  if (!items.length) return null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: getLocalizedUrl(siteUrl, item.href, language),
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {emitJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
        />
      ) : null}
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const href = getLocalizedHref(item.href, language);
          return (
            <li key={`${href}-${item.label}`}>
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <Link to={href}>{item.label}</Link>
              )}
              {!isLast && <span aria-hidden="true"> / </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
