import type {Route} from './+types/privacy-policy';
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
          ? 'Politique de confidentialite | Philippe Pasquin'
          : 'Privacy Policy | Philippe Pasquin',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? 'Politique de confidentialite pour Philippe Pasquin, developpeur Shopify base a Montreal.'
          : 'Privacy policy for Philippe Pasquin, a Montreal-based Shopify developer.',
    },
  ];
};

export default function PrivacyPolicyPage() {
  const language = useSelectedLanguage();

  if (language === 'fr') {
    return (
      <PolicyShell
        eyebrow="Confidentialite"
        title="Politique de confidentialite"
        description="Comment les renseignements personnels sont recueillis, utilises, partages et proteges lorsque vous utilisez ce site ou contactez Philippe Pasquin pour des services de developpement Shopify."
        updated={updatedFr}
      >
        <PolicySection title="A qui s’applique cette politique">
          <p>
            Cette politique s’applique au site {siteConfig.defaultSiteUrl}, aux
            parcours de contact et de prise de rendez-vous du site, ainsi qu’aux
            discussions de service avec Philippe Pasquin.
          </p>
          <p>
            Philippe Pasquin est base a Montreal, Quebec, et offre des services
            de developpement Shopify aux marchands et aux equipes ecommerce.
          </p>
        </PolicySection>

        <PolicySection title="Renseignements recueillis">
          <p>
            Le site et le parcours de service peuvent recueillir les
            renseignements personnels que vous fournissez directement, incluant
            votre nom, adresse courriel, entreprise, role, contexte de boutique
            Shopify, notes de projet, preferences de rendez-vous et messages
            envoyes par formulaire, courriel ou outil de planification.
          </p>
          <p>
            Le site peut aussi recueillir des renseignements techniques limites,
            comme l’adresse IP, le navigateur, l’appareil, les pages visitees,
            la source de reference et les donnees de journaux serveur. Si des
            outils d’analytics, Google Tag Manager, pixels publicitaires,
            widgets de clavardage ou outils de planification integres sont
            ajoutes, ces fournisseurs doivent etre indiques dans cette politique
            et dans l’avis sur les cookies.
          </p>
        </PolicySection>

        <PolicySection title="Utilisation des renseignements">
          <p>Les renseignements personnels servent a:</p>
          <ul>
            <li>Repondre aux demandes et planifier des rendez-vous.</li>
            <li>
              Evaluer l’admissibilite, la portee, les delais et les prix des
              travaux Shopify.
            </li>
            <li>
              Livrer les banques d’heures, retainers, travaux de support et
              projets.
            </li>
            <li>
              Gerer la facturation, les dossiers, les communications client et
              les suivis.
            </li>
            <li>
              Garder le site fiable, securitaire, mesurable et continuellement
              ameliore.
            </li>
            <li>
              Respecter les obligations legales, fiscales, comptables et
              contractuelles.
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="Partage et fournisseurs de services">
          <p>
            Les renseignements personnels peuvent etre partages avec des
            fournisseurs qui aident a exploiter le site et l’entreprise,
            incluant l’hebergement, la planification, le courriel, les
            analytics, la gestion de projet, la comptabilite, les paiements et
            la securite. Ces fournisseurs peuvent traiter des renseignements au
            Quebec, au Canada, aux Etats-Unis ou dans d’autres juridictions.
          </p>
          <p>
            Les renseignements personnels ne sont pas vendus. Ils peuvent etre
            communiques lorsque la loi l’exige, pour proteger des droits legaux
            ou selon vos instructions dans le cadre de travaux de developpement
            Shopify.
          </p>
        </PolicySection>

        <PolicySection title="Consentement, acces et choix">
          <p>
            Vous pouvez contacter {siteConfig.defaultSupportEmail} pour demander
            l’acces a vos renseignements personnels, demander une correction,
            retirer votre consentement lorsque applicable ou poser des questions
            sur les pratiques de confidentialite.
          </p>
          <p>
            Certains renseignements peuvent devoir etre conserves pour des
            raisons legales, de securite, de comptabilite, contractuelles ou de
            gestion d’entreprise legitime.
          </p>
        </PolicySection>

        <PolicySection title="Conservation et securite">
          <p>
            Les renseignements personnels sont conserves seulement aussi
            longtemps que raisonnablement necessaire pour la fin pour laquelle
            ils ont ete recueillis, pour les dossiers de service ou lorsque la
            loi l’exige. Des mesures administratives, techniques et
            organisationnelles raisonnables sont utilisees pour proteger les
            renseignements traites par le site et le parcours client.
          </p>
        </PolicySection>

        <PolicySection title="Changements a la politique">
          <p>
            Cette politique doit etre mise a jour chaque fois que le site ajoute
            ou modifie des fonctionnalites qui touchent les renseignements
            personnels, incluant formulaires, selecteurs de rendez-vous,
            portails clients, analytics, Google Tag Manager, pixels, cookies,
            widgets de clavardage, medias integres ou integrations tierces.
          </p>
        </PolicySection>
      </PolicyShell>
    );
  }

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
          You can contact {siteConfig.defaultSupportEmail} to request access to
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
