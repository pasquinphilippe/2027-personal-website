import type {Route} from './+types/privacy-policy';
import {PolicySection, PolicyShell} from '~/components/PolicyShell';
import {siteConfig} from '~/lib/pasquin';

const updated = 'June 6, 2026';

export const meta: Route.MetaFunction = () => [
  {title: 'Privacy Policy | Philippe Pasquin'},
  {
    name: 'description',
    content:
      'Privacy policy for Philippe Pasquin, a Montreal-based Shopify developer.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyShell
      eyebrow="Privacy"
      title="Privacy Policy"
      description="How personal information is collected, used, shared, and protected when you use this website or contact Philippe Pasquin for Shopify development services."
      updated={updated}
    >
      <PolicySection title="Who this policy applies to">
        <p>
          This policy applies to the website at {siteConfig.defaultSiteUrl}, the
          contact and meeting workflows on the website, and service discussions
          with Philippe Pasquin.
        </p>
        <p>
          Philippe Pasquin is based in Montreal, Quebec and provides Shopify
          development services to merchants and ecommerce teams.
        </p>
      </PolicySection>

      <PolicySection title="Information collected">
        <p>
          The website and service workflow may collect personal information that
          you provide directly, including your name, email address, company,
          role, Shopify store context, project notes, meeting preferences, and
          messages sent through forms, email, or scheduling tools.
        </p>
        <p>
          The website may also collect limited technical information such as IP
          address, browser, device, pages visited, referral source, and server
          log data. If analytics, Google Tag Manager, advertising pixels, chat
          widgets, or embedded scheduling tools are added, those providers must
          be reflected in this policy and the Cookie Notice.
        </p>
      </PolicySection>

      <PolicySection title="How information is used">
        <p>Personal information is used to:</p>
        <ul>
          <li>Respond to inquiries and schedule meetings.</li>
          <li>Evaluate Shopify development fit, scope, timelines, and pricing.</li>
          <li>Deliver bank-of-hours, retainer, support, and project work.</li>
          <li>Manage billing, records, client communication, and follow-up.</li>
          <li>Keep the website reliable, secure, measurable, and improved.</li>
          <li>Comply with legal, tax, accounting, and contractual obligations.</li>
        </ul>
      </PolicySection>

      <PolicySection title="Sharing and service providers">
        <p>
          Personal information may be shared with service providers that help run
          the website and business, including hosting, scheduling, email,
          analytics, project management, accounting, payment, and security tools.
          These providers may process information in Quebec, Canada, the United
          States, or other jurisdictions.
        </p>
        <p>
          Personal information is not sold. It may be disclosed if required by
          law, to protect legal rights, or with your direction in connection with
          Shopify development work.
        </p>
      </PolicySection>

      <PolicySection title="Consent, access, and choices">
        <p>
          You can contact {siteConfig.defaultContactEmail} to request access to
          personal information, ask for corrections, withdraw consent where
          applicable, or ask questions about privacy practices.
        </p>
        <p>
          Some information may need to be retained where required for legal,
          security, accounting, contractual, or legitimate business purposes.
        </p>
      </PolicySection>

      <PolicySection title="Retention and security">
        <p>
          Personal information is kept only as long as reasonably needed for the
          purpose it was collected, for service records, or as required by law.
          Reasonable administrative, technical, and organizational safeguards are
          used to protect the information handled through the website and client
          workflow.
        </p>
      </PolicySection>

      <PolicySection title="Policy changes">
        <p>
          This policy should be updated whenever the website adds or changes
          features that affect personal information, including forms, meeting
          selectors, client portals, analytics, Google Tag Manager, pixels,
          cookies, chat widgets, embedded media, or third-party integrations.
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
