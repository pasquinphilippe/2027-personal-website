import type {Route} from './+types/cookie-notice';
import {
  PolicySection,
  PolicyShell,
  PolicyTable,
} from '~/components/PolicyShell';
import {getLanguageFromPathSearch, useSelectedLanguage} from '~/lib/i18n';

const updated = 'June 6, 2026';
const updatedFr = '6 juin 2026';

export const meta: Route.MetaFunction = ({location}) => {
  const language = getLanguageFromPathSearch(location.pathname, location.search);

  return [
    {
      title:
        language === 'fr'
          ? 'Avis sur les cookies | Philippe Pasquin'
          : 'Cookie Notice | Philippe Pasquin',
    },
    {
      name: 'description',
      content:
        language === 'fr'
          ? 'Avis sur les cookies et le suivi pour les services de developpement Shopify de Philippe Pasquin.'
          : 'Cookie and tracking notice for Philippe Pasquin Shopify development services.',
    },
  ];
};

export default function CookieNoticePage() {
  const language = useSelectedLanguage();

  if (language === 'fr') {
    return (
      <PolicyShell
        eyebrow="Cookies"
        title="Avis sur les cookies"
        description="Un inventaire clair des cookies, outils de suivi, analytics, pixels et outils integres utilises par ce site."
        updated={updatedFr}
      >
        <PolicySection title="Utilisation actuelle des cookies">
          <p>
            Le site est concu pour rester leger. Il peut utiliser des cookies ou
            moyens de stockage strictement necessaires au fonctionnement du
            site, a la securite, au routage, au traitement des formulaires, aux
            parcours de compte ou portail client et aux flux de planification.
          </p>
          <p>
            Les analytics, pixels publicitaires, Google Tag Manager, heatmaps,
            widgets de clavardage et autres outils de suivi non essentiels ne
            doivent pas etre consideres comme actifs tant qu’ils ne sont pas
            explicitement configures dans le codebase ou l’environnement de
            production et listes ici.
          </p>
        </PolicySection>

        <PolicySection title="Inventaire du suivi">
          <PolicyTable
            rows={[
              {
                label: 'Operation essentielle du site',
                purpose:
                  'Routage, securite, livraison des formulaires, fiabilite du service et gestion de session de base.',
                status: 'Requis',
              },
              {
                label: 'Selecteur de rendez-vous',
                purpose:
                  'Contexte de reservation et preferences de disponibilite lorsqu’un outil de planification est active.',
                status: 'Selon la fonctionnalite',
              },
              {
                label: 'Analytics',
                purpose:
                  'Mesure du trafic et de la performance seulement si un outil analytics est configure.',
                status: 'Non active par defaut',
              },
              {
                label: 'Pixels marketing',
                purpose:
                  'Mesure publicitaire ou reciblage seulement si un pixel est configure.',
                status: 'Non active par defaut',
              },
            ]}
          />
        </PolicySection>

        <PolicySection title="Gestion des cookies">
          <p>
            Vous pouvez bloquer ou supprimer les cookies dans les parametres de
            votre navigateur. Certaines fonctions essentielles peuvent ne pas
            fonctionner correctement si les cookies ou moyens de stockage requis
            sont desactives.
          </p>
          <p>
            Si ce site ajoute une banniere de consentement ou un centre de
            preferences, cette interface devrait devenir la principale facon
            d’accepter, refuser ou ajuster le suivi non essentiel.
          </p>
        </PolicySection>

        <PolicySection title="Mises a jour requises">
          <p>
            Cet avis doit etre mis a jour avant ou en meme temps que l’ajout de
            tout nouveau conteneur Google Tag Manager, propriete GA4, pixel Meta,
            pixel TikTok, balise LinkedIn Insight, heatmap, widget de
            clavardage, integration infolettre, integration de rendez-vous ou
            autre script tiers.
          </p>
          <p>
            Chaque mise a jour devrait indiquer le fournisseur, l’objectif, le
            type de donnees, le statut de consentement et si l’outil place des
            cookies ou utilise un stockage similaire.
          </p>
        </PolicySection>
      </PolicyShell>
    );
  }

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
