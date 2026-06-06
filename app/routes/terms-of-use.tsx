import type {Route} from './+types/terms-of-use';
import {PolicySection, PolicyShell} from '~/components/PolicyShell';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';
import {siteConfig} from '~/lib/pasquin';

const updated = 'June 6, 2026';
const updatedFr = '6 juin 2026';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? "Conditions d'utilisation | Philippe Pasquin"
          : 'Terms of Use | Philippe Pasquin',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? "Conditions d'utilisation pour le site de developpement Shopify de Philippe Pasquin."
          : 'Terms of use for the Philippe Pasquin Shopify development website.',
    },
  ];
};

export default function TermsOfUsePage() {
  const language = useSelectedLanguage();

  if (language === 'fr') {
    return (
      <PolicyShell
        eyebrow="Conditions"
        title="Conditions d’utilisation"
        description="Les conditions de base pour utiliser ce site, soumettre des demandes et consulter les renseignements sur les services de developpement Shopify."
        updated={updatedFr}
      >
        <PolicySection title="Utilisation du site">
          <p>
            Ce site fournit de l’information sur les services de developpement
            Shopify, les banques d’heures, les retainers, les options de support
            et les moyens de contacter Philippe Pasquin.
          </p>
          <p>
            Vous acceptez de ne pas abuser du site, nuire a son fonctionnement,
            tenter un acces non autorise ou soumettre des renseignements
            illegaux, nuisibles ou trompeurs.
          </p>
        </PolicySection>

        <PolicySection title="Renseignements sur les services">
          <p>
            Le contenu du site, les exemples de prix, les delais et les
            descriptions de services sont fournis a titre d’information
            generale. Une relation de service commence seulement lorsque la
            portee, les conditions, le paiement et les responsabilites sont
            confirmes par ecrit.
          </p>
          <p>
            La disponibilite des banques d’heures et retainers peut changer
            selon l’horaire, l’adequation du projet, le risque technique et les
            exigences client.
          </p>
        </PolicySection>

        <PolicySection title="Propriete intellectuelle">
          <p>
            Le design, la redaction, la structure et les elements de marque du
            site appartiennent a Philippe Pasquin, sauf indication contraire.
            Vous ne pouvez pas les copier, revendre ou reutiliser pour un site
            de service concurrent sans permission.
          </p>
          <p>
            Shopify, Hydrogen et les autres noms de produits ou services tiers
            sont des marques de commerce de leurs proprietaires respectifs.
          </p>
        </PolicySection>

        <PolicySection title="Liens et outils tiers">
          <p>
            Le site peut creer des liens vers des outils tiers ou les integrer
            pour la planification, le courriel, les analytics, l’acces client,
            les services Shopify ou des flux connexes. Ces tiers sont
            responsables de leurs propres sites, conditions, pratiques de
            confidentialite et disponibilite de service.
          </p>
        </PolicySection>

        <PolicySection title="Aucune garantie">
          <p>
            Le site est fourni selon sa disponibilite. Meme si un soin
            raisonnable est apporte pour garder le contenu exact et utile,
            aucune garantie n’est donnee que le site sera toujours sans erreur,
            ininterrompu ou entierement a jour.
          </p>
        </PolicySection>

        <PolicySection title="Droit applicable et contact">
          <p>
            Ces conditions sont regies par les lois du Quebec et du Canada,
            selon le cas. Les questions sur ces conditions peuvent etre envoyees
            a{' '}
            <a href={`mailto:${siteConfig.defaultSupportEmail}`}>
              {siteConfig.defaultSupportEmail}
            </a>
            .
          </p>
        </PolicySection>
      </PolicyShell>
    );
  }

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
          <a href={`mailto:${siteConfig.defaultSupportEmail}`}>
            {siteConfig.defaultSupportEmail}
          </a>
          .
        </p>
      </PolicySection>
    </PolicyShell>
  );
}
