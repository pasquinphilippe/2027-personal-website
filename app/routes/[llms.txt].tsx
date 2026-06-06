import type {Route} from './+types/[llms.txt]';
import {
  bankPackages,
  faqs,
  getPublicConfig,
  retainerPackages,
  services,
  siteConfig,
} from '~/lib/pasquin';

export function loader({context}: Route.LoaderArgs) {
  const publicConfig = getPublicConfig(context.env);
  const lines = [
    '# Philippe Pasquin',
    '',
    '> Montreal-based Shopify developer for merchants that need storefront improvements, theme cleanup, app integrations, automation, performance work, and ongoing technical support.',
    '',
    '## Business',
    `- Name: ${siteConfig.name}`,
    `- Brand mark: ${siteConfig.logo}`,
    `- Location: ${siteConfig.location.city}, ${siteConfig.location.region}, ${siteConfig.location.country}`,
    `- Email: ${publicConfig.contactEmail}`,
    '- Primary category: Shopify developer',
    '- Service area: Montreal, Canada, and remote Shopify merchants',
    '- Site style: light, lean, multi-page personal service site inspired by the previous Never Before Seen layout system',
    '- Primary pages: What We Do, Work, Pricing, About, Testimonials, Contact',
    '',
    '## Services',
    ...services.map((service) => `- ${service.title}: ${service.text}`),
    '',
    '## Bank of hours',
    ...bankPackages.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. Best for ${item.bestFor}.`,
    ),
    '',
    '## Monthly retainers',
    ...retainerPackages.map(
      (item) =>
        `- ${item.name}: ${item.hours}, ${item.price}, ${item.detail}. ${item.rollover}.`,
    ),
    '',
    '## FAQ',
    ...faqs.flatMap((faq) => [`- Q: ${faq.question}`, `  A: ${faq.answer}`]),
    '',
    '## Booking',
    'Use the booking section on the website to choose a bank of hours, retainer, or diagnostic call before scheduling.',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
