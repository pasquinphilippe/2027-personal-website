import type {Route} from './+types/terms-of-use';
import {PolicySection, PolicyShell} from '~/components/PolicyShell';
import {siteConfig} from '~/lib/pasquin';

const updated = 'June 6, 2026';

export const meta: Route.MetaFunction = () => [
  {title: 'Terms of Use | Philippe Pasquin'},
  {
    name: 'description',
    content:
      'Terms of use for the Philippe Pasquin Shopify development website.',
  },
];

export default function TermsOfUsePage() {
  return (
    <PolicyShell
      eyebrow="Terms"
      title="Terms of Use"
      description="The basic terms for using this website, submitting inquiries, and reviewing Shopify development service information."
      updated={updated}
    >
      <PolicySection title="Website use">
        <p>
          This website provides information about Shopify development services,
          bank-of-hours packages, retainers, support options, and ways to contact
          Philippe Pasquin.
        </p>
        <p>
          You agree not to misuse the website, interfere with its operation,
          attempt unauthorized access, or submit unlawful, harmful, or misleading
          information.
        </p>
      </PolicySection>

      <PolicySection title="Service information">
        <p>
          Website content, pricing examples, timelines, and service descriptions
          are provided for general information. A service relationship starts
          only when scope, terms, payment, and responsibilities are confirmed in
          writing.
        </p>
        <p>
          Bank-of-hours and retainer availability may change based on schedule,
          project fit, technical risk, and client requirements.
        </p>
      </PolicySection>

      <PolicySection title="Intellectual property">
        <p>
          The website design, copy, structure, and brand elements belong to
          Philippe Pasquin unless otherwise stated. You may not copy, resell, or
          reuse them as a competing service website without permission.
        </p>
        <p>
          Shopify, Hydrogen, and other third-party product or service names are
          trademarks of their respective owners.
        </p>
      </PolicySection>

      <PolicySection title="Third-party links and tools">
        <p>
          The website may link to or embed third-party tools for scheduling,
          email, analytics, client access, Shopify services, or related
          workflows. Those third parties are responsible for their own websites,
          terms, privacy practices, and service availability.
        </p>
      </PolicySection>

      <PolicySection title="No warranty">
        <p>
          The website is provided on an as-available basis. While reasonable care
          is taken to keep content accurate and useful, no guarantee is made that
          the website will always be error-free, uninterrupted, or fully current.
        </p>
      </PolicySection>

      <PolicySection title="Governing law and contact">
        <p>
          These terms are governed by the laws of Quebec and Canada, as
          applicable. Questions about these terms can be sent to{' '}
          <a href={`mailto:${siteConfig.defaultContactEmail}`}>
            {siteConfig.defaultContactEmail}
          </a>
          .
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
