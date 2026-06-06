import type {Route} from './+types/og.services.$slug[.svg]';
import {getServicePageByHandle} from '~/lib/servicePages';
import {getLanguageFromRequest} from '~/lib/i18n';
import {siteConfig} from '~/lib/pasquin';

function escapeSvg(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(text: string, maxChars: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

export function loader({params, request}: Route.LoaderArgs) {
  const language = getLanguageFromRequest(request);
  const service = getServicePageByHandle(params.slug, language);
  const title = service?.title ?? siteConfig.name;
  const eyebrow = service?.eyebrow ?? siteConfig.descriptor;

  const lines = wrapText(escapeSvg(title), 28);
  const safeEyebrow = escapeSvg(eyebrow);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAF9F4" />
      <stop offset="100%" stop-color="#F1EFE5" />
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="64" y="92" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="28" fill="#6f6f66" letter-spacing="2">${escapeSvg(siteConfig.logo).toUpperCase()}</text>
  <text x="64" y="200" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="24" fill="#fc9e2a" letter-spacing="3">${safeEyebrow.toUpperCase()}</text>
${lines
  .map(
    (line, index) =>
      `  <text x="64" y="${280 + index * 78}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-weight="600" font-size="64" fill="#2b2b25">${line}</text>`,
  )
  .join('\n')}
  <text x="64" y="582" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" font-size="22" fill="#49493f">${escapeSvg(siteConfig.name)} - ${escapeSvg(siteConfig.location.city)}, ${escapeSvg(siteConfig.location.country)}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': `max-age=${60 * 60 * 24}`,
    },
  });
}
