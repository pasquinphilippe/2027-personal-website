import type {LanguageCode} from '~/lib/i18n';

export const legalNavItems = [
  {label: 'Privacy Policy', href: '/privacy-policy'},
  {label: 'Cookie Notice', href: '/cookie-notice'},
  {label: 'Terms of Use', href: '/terms-of-use'},
];

const legalNavItemsFr = [
  {label: 'Politique de confidentialite', href: '/privacy-policy'},
  {label: 'Avis sur les cookies', href: '/cookie-notice'},
  {label: "Conditions d'utilisation", href: '/terms-of-use'},
];

export function getLegalNavItems(language: LanguageCode = 'en') {
  return language === 'fr' ? legalNavItemsFr : legalNavItems;
}
