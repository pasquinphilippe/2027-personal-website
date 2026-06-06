import type {Route} from './+types/cookie-notice';
import {
  PolicySection,
  PolicyShell,
  PolicyTable,
} from '~/components/PolicyShell';

const updated = 'June 6, 2026';

export const meta: Route.MetaFunction = () => [
  {title: 'Cookie Notice | Philippe Pasquin'},
  {
    name: 'description',
    content:
      'Cookie and tracking notice for Philippe Pasquin Shopify development services.',
  },
];

export default function CookieNoticePage() {
  return (
    <PolicyShell
      eyebrow="Cookies"
      title="Cookie Notice"
      description="A clear inventory of cookies, tracking, analytics, pixels, and embedded tools used by this website."
      updated={updated}
    >
      <PolicySection title="Current cookie use">
        <p>
          The website is designed to stay lightweight. It may use strictly
          necessary cookies or similar storage for site operation, security,
          routing, form handling, account or client-portal flows, and scheduling
          workflows.
        </p>
        <p>
          Analytics, advertising pixels, Google Tag Manager, heatmaps, chat
          widgets, and other non-essential tracking tools should not be treated
          as enabled until they are explicitly configured in the codebase or
          production environment and listed here.
        </p>
      </PolicySection>

      <PolicySection title="Tracking inventory">
        <PolicyTable
          rows={[
            {
              label: 'Essential site operation',
              purpose: 'Routing, security, form delivery, service reliability, and basic session handling.',
              status: 'Required',
            },
            {
              label: 'Meeting selector',
              purpose: 'Booking context and availability preferences when a scheduling tool is enabled.',
              status: 'Feature-based',
            },
            {
              label: 'Analytics',
              purpose: 'Traffic and performance measurement only if an analytics tool is configured.',
              status: 'Not enabled by default',
            },
            {
              label: 'Marketing pixels',
              purpose: 'Advertising measurement or retargeting only if a pixel is configured.',
              status: 'Not enabled by default',
            },
          ]}
        />
      </PolicySection>

      <PolicySection title="Managing cookies">
        <p>
          You can block or delete cookies in your browser settings. Some
          essential features may not work correctly if required cookies or
          storage are disabled.
        </p>
        <p>
          If this website adds a consent banner or preference center, that
          interface should become the primary way to accept, reject, or adjust
          non-essential tracking.
        </p>
      </PolicySection>

      <PolicySection title="Required updates">
        <p>
          This notice must be updated before or at the same time as any new
          Google Tag Manager container, GA4 property, Meta pixel, TikTok pixel,
          LinkedIn Insight tag, heatmap, chat widget, newsletter embed, meeting
          embed, or other third-party script is added.
        </p>
        <p>
          Each update should list the provider, purpose, data type, consent
          status, and whether the tool sets cookies or uses similar storage.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
