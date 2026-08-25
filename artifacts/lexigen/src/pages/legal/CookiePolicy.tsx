import { LegalLayout } from "./LegalLayout";
import { legalHeading, legalTitles, legalUi } from "@/i18n/legalLocale";

export default function CookiePolicy() {
  return (
    <LegalLayout title={legalUi(...legalTitles.cookies)} updated={legalUi("1 June 2026", "1 juin 2026")}>
      <p><strong>{legalUi("Effective Date:", "Date d’entrée en vigueur :")}</strong> {legalUi("1 June 2026", "1 juin 2026")}</p>

      <h2>{legalHeading("1. ", "Introduction")}</h2>
      <p>
        {legalUi(
          'This Cookie Policy explains how Lexigenz Trading ("Company", "we", "us", or "our") uses cookies, tracking technologies, and similar tools on our website, applications, digital platforms, and related services (collectively referred to as the "Services").',
          'La présente politique relative aux cookies explique comment Lexigenz Trading (« Société », « nous », « notre » ou « nos ») utilise des cookies, des technologies de suivi et des outils similaires sur son site web, ses applications, ses plateformes numériques et ses services connexes (collectivement désignés les « Services »).'
        )}
      </p>
      <p>{legalUi("This Policy is designed to comply with applicable privacy and electronic communications laws, including but not limited to:", "La présente politique vise à respecter les lois applicables en matière de confidentialité et de communications électroniques, notamment :")}</p>
      <ul>
        <li>{legalUi('The Protection of Personal Information Act, 2013 ("POPIA") of South Africa;', 'The Protection of Personal Information Act, 2013 (« POPIA ») d’Afrique du Sud ;')}</li>
        <li>{legalUi('The Electronic Communications and Transactions Act, 2002 ("ECTA");', 'The Electronic Communications and Transactions Act, 2002 (« ECTA ») ;')}</li>
        <li>{legalUi('The General Data Protection Regulation (EU) 2016/679 ("GDPR"), where applicable;', 'The General Data Protection Regulation (EU) 2016/679 (« GDPR »), le cas échéant ;')}</li>
        <li>{legalUi("The United Kingdom Data Protection Act 2018 and UK GDPR, where applicable;", "The United Kingdom Data Protection Act 2018 et le UK GDPR, le cas échéant ;")}</li>
        <li>{legalUi('The California Consumer Privacy Act ("CCPA") and California Privacy Rights Act ("CPRA"), where applicable;', 'The California Consumer Privacy Act (« CCPA ») et le California Privacy Rights Act (« CPRA »), le cas échéant ;')}</li>
        <li>{legalUi("Applicable consumer protection and electronic communications legislation in jurisdictions where our Services are offered.", "La législation applicable en matière de protection des consommateurs et de communications électroniques dans les juridictions où nos Services sont proposés.")}</li>
      </ul>
      <p>
        {legalUi(
          "By continuing to use our Services after being presented with our cookie notice and preference management options, you acknowledge that cookies and similar technologies may be used in accordance with this Policy and your selected preferences.",
          "En continuant à utiliser nos Services après avoir pris connaissance de notre avis relatif aux cookies et des options de gestion des préférences, vous reconnaissez que des cookies et des technologies similaires peuvent être utilisés conformément à la présente politique et à vos préférences."
        )}
      </p>

      <h2>{legalHeading("2. ", "What Are Cookies?")}</h2>
      <p>
        {legalUi(
          "Cookies are small text files that are placed and stored on a user's device (including computers, tablets, smartphones, and other internet-enabled devices) when visiting a website or using a digital service.",
          "Les cookies sont de petits fichiers texte déposés et stockés sur l’appareil d’un utilisateur (notamment les ordinateurs, tablettes, smartphones et autres appareils connectés à internet) lorsqu’il visite un site web ou utilise un service numérique."
        )}
      </p>
      <p>{legalUi("Cookies enable websites and systems to:", "Les cookies permettent aux sites web et aux systèmes de :")}</p>
      <ul>
        <li>{legalUi("Recognize returning users", "Reconnaître les utilisateurs récurrents")}</li>
        <li>{legalUi("Maintain session information", "Conserver les informations de session")}</li>
        <li>{legalUi("Authenticate users", "Authentifier les utilisateurs")}</li>
        <li>{legalUi("Remember preferences and settings", "Mémoriser les préférences et les paramètres")}</li>
        <li>{legalUi("Analyze website performance", "Analyser les performances du site web")}</li>
        <li>{legalUi("Improve security", "Améliorer la sécurité")}</li>
        <li>{legalUi("Personalize content and services", "Personnaliser le contenu et les services")}</li>
        <li>{legalUi("Measure marketing effectiveness", "Mesurer l’efficacité du marketing")}</li>
        <li>{legalUi("Detect fraud and abuse", "Détecter la fraude et les abus")}</li>
      </ul>

      <h2>{legalHeading("3. ", "Types of Cookies We Use")}</h2>

      <h2>{legalHeading("3.1 ", "Strictly Necessary Cookies")}</h2>
      <p>{legalUi("These cookies are essential for the operation, security, and functionality of our Services. Examples include user authentication, login session management, security verification, load balancing, fraud prevention, and consent management records.", "Ces cookies sont essentiels au fonctionnement, à la sécurité et aux fonctionnalités de nos Services. Il peut s’agir notamment de l’authentification des utilisateurs, de la gestion des sessions de connexion, de la vérification de sécurité, de l’équilibrage de charge, de la prévention de la fraude et de l’enregistrement de la gestion du consentement.")}</p>
      <p><strong>{legalUi("Legal Basis:", "Base juridique :")}</strong> {legalUi("Legitimate interests; contractual necessity; compliance with legal obligations. These cookies cannot generally be disabled.", "Intérêts légitimes ; nécessité contractuelle ; respect des obligations légales. Ces cookies ne peuvent généralement pas être désactivés.")}</p>

      <h2>{legalHeading("3.2 ", "Functional Cookies")}</h2>
      <p>{legalUi("Functional cookies allow us to remember user preferences and enhance user experience, including theme or display preferences, language preferences, accessibility settings, user interface customization, and saved preferences for the word generator experience.", "Les cookies fonctionnels nous permettent de mémoriser les préférences des utilisateurs et d’améliorer leur expérience, notamment les préférences de thème ou d’affichage, les préférences linguistiques, les paramètres d’accessibilité, la personnalisation de l’interface et les préférences enregistrées pour le générateur de mots.")}</p>
      <p><strong>{legalUi("Legal Basis:", "Base juridique :")}</strong> {legalUi("User consent where required; legitimate interests where permitted by law.", "Consentement de l’utilisateur lorsque cela est requis ; intérêts légitimes lorsque la loi l’autorise.")}</p>

      <h2>{legalHeading("3.3 ", "Performance and Analytics Cookies")}</h2>
      <p>{legalUi("These cookies collect information regarding how users interact with our Services, including pages visited, time spent on pages, click behaviour, navigation paths, device type, browser type, operating system, geographic region, and referral sources. Examples may include Google Analytics and similar providers. Information collected is generally aggregated and anonymized.", "Ces cookies collectent des informations sur la manière dont les utilisateurs interagissent avec nos Services, notamment les pages visitées, le temps passé sur les pages, le comportement en matière de clics, les parcours de navigation, le type d’appareil, le type de navigateur, le système d’exploitation, la région géographique et les sources de provenance. Google Analytics et des fournisseurs similaires peuvent en être des exemples. Les informations collectées sont généralement agrégées et anonymisées.")}</p>
      <p><strong>{legalUi("Legal Basis:", "Base juridique :")}</strong> {legalUi("User consent where required; legitimate interests where permitted by applicable law.", "Consentement de l’utilisateur lorsque cela est requis ; intérêts légitimes lorsque la loi applicable l’autorise.")}</p>

      <h2>{legalHeading("3.4 ", "Advertising and Marketing Cookies")}</h2>
      <p>{legalUi("These cookies are used to deliver targeted advertisements, measure campaign effectiveness, limit repetitive advertisements, build audience profiles, and conduct remarketing. Examples include technologies operated by Google Ads, Meta Platforms, LinkedIn, TikTok, and X (formerly Twitter).", "Ces cookies sont utilisés pour diffuser des publicités ciblées, mesurer l’efficacité des campagnes, limiter la répétition des publicités, établir des profils d’audience et effectuer du remarketing. Les technologies exploitées par Google Ads, Meta Platforms, LinkedIn, TikTok et X (anciennement Twitter) en sont des exemples.")}</p>
      <p><strong>{legalUi("Legal Basis:", "Base juridique :")}</strong> {legalUi("Explicit user consent where legally required. No marketing cookies will be activated before obtaining valid consent where required.", "Consentement explicite de l’utilisateur lorsque la loi l’exige. Aucun cookie marketing ne sera activé avant l’obtention d’un consentement valide lorsque celui-ci est requis.")}</p>

      <h2>{legalHeading("3.5 ", "Social Media Cookies")}</h2>
      <p>{legalUi("Social media cookies facilitate interaction with social networking platforms, including social sharing functions, embedded videos, social media widgets, and platform integrations. Users should review the privacy and cookie policies of those platforms independently.", "Les cookies de réseaux sociaux facilitent l’interaction avec les plateformes de réseaux sociaux, notamment les fonctions de partage, les vidéos intégrées, les widgets de réseaux sociaux et les intégrations de plateformes. Les utilisateurs doivent consulter séparément les politiques de confidentialité et relatives aux cookies de ces plateformes.")}</p>

      <h2>{legalHeading("3.6 ", "Security Cookies")}</h2>
      <p>{legalUi("Security cookies help detect unauthorized access, prevent cyberattacks, mitigate fraud, monitor suspicious activity, and protect user accounts. These cookies are critical to maintaining the integrity and security of our Services.", "Les cookies de sécurité aident à détecter les accès non autorisés, à prévenir les cyberattaques, à limiter la fraude, à surveiller les activités suspectes et à protéger les comptes utilisateurs. Ces cookies sont essentiels au maintien de l’intégrité et de la sécurité de nos Services.")}</p>

      <h2>{legalHeading("4. ", "First-Party and Third-Party Cookies")}</h2>
      <p>
        <strong>{legalUi("First-Party Cookies", "Cookies internes")}</strong> {legalUi("are placed directly by us and are generally used for operational, security, and performance purposes.", "sont déposés directement par nous et sont généralement utilisés à des fins opérationnelles, de sécurité et de performance.")}
      </p>
      <p>
        <strong>{legalUi("Third-Party Cookies", "Cookies tiers")}</strong> {legalUi("are placed by external service providers, vendors, partners, and technology platforms including analytics providers, advertising networks, payment processors, social media platforms, and fraud detection providers. We do not control third-party cookie technologies once deployed.", "sont déposés par des prestataires de services, fournisseurs, partenaires et plateformes technologiques externes, notamment des fournisseurs d’analyses, réseaux publicitaires, prestataires de paiement, plateformes de réseaux sociaux et fournisseurs de détection de la fraude. Nous ne contrôlons pas les technologies de cookies tiers une fois qu’elles sont déployées.")}
      </p>

      <h2>{legalHeading("5. ", "Similar Tracking Technologies")}</h2>
      <p>{legalUi("In addition to cookies, we may use web beacons, pixels, local storage, session replay tools, and software development kits (SDKs). These technologies may collect information similar to cookies and are governed by this Policy.", "Outre les cookies, nous pouvons utiliser des balises web, des pixels, le stockage local, des outils de relecture de session et des kits de développement logiciel (SDK). Ces technologies peuvent collecter des informations similaires à celles des cookies et sont régies par la présente politique.")}</p>

      <h2>{legalHeading("6. ", "Information Collected Through Cookies")}</h2>
      <p>{legalUi("Depending on the type of cookie used, information collected may include IP address, device identifiers, browser type, device type, operating system, language preferences, geographic location (approximate), session identifiers, website activity, search activity, referral URLs, transaction metadata, and user preferences.", "Selon le type de cookie utilisé, les informations collectées peuvent comprendre l’adresse IP, les identifiants de l’appareil, le type de navigateur, le type d’appareil, le système d’exploitation, les préférences linguistiques, la localisation géographique approximative, les identifiants de session, l’activité sur le site web, l’activité de recherche, les URL de provenance, les métadonnées de transaction et les préférences de l’utilisateur.")}</p>

      <h2>{legalHeading("7. ", "Legal Basis for Cookie Processing")}</h2>
      <p>{legalUi("Depending on the jurisdiction and purpose of processing, we may rely on user consent, contractual necessity, legitimate interests, or legal obligations.", "Selon la juridiction et la finalité du traitement, nous pouvons nous appuyer sur le consentement de l’utilisateur, la nécessité contractuelle, les intérêts légitimes ou les obligations légales.")}</p>

      <h2>{legalHeading("8. ", "Consent Management")}</h2>
      <p>{legalUi("Users may manage cookie preferences through our cookie banner, cookie preference centre, browser settings, or device privacy settings. Consent must be freely given, informed, specific, and capable of withdrawal at any time. Withdrawal of consent will not affect processing conducted before withdrawal.", "Les utilisateurs peuvent gérer leurs préférences en matière de cookies via notre bannière de cookies, notre centre de préférences, les paramètres de leur navigateur ou les paramètres de confidentialité de leur appareil. Le consentement doit être libre, éclairé, spécifique et révocable à tout moment. Le retrait du consentement n’affectera pas les traitements effectués avant ce retrait.")}</p>

      <h2>{legalHeading("9. ", "How to Control Cookies")}</h2>
      <p>{legalUi("Users may configure browser settings to block cookies, delete cookies, receive cookie notifications, or restrict third-party cookies. Blocking certain cookies may affect website functionality and user experience.", "Les utilisateurs peuvent configurer les paramètres de leur navigateur pour bloquer les cookies, les supprimer, recevoir des notifications relatives aux cookies ou limiter les cookies tiers. Le blocage de certains cookies peut affecter le fonctionnement du site web et l’expérience utilisateur.")}</p>

      <h2>{legalHeading("10. ", "Data Retention")}</h2>
      <p>{legalUi("Session cookies are deleted automatically when the browser session ends. Persistent cookies remain stored until their expiry date is reached, they are manually deleted, or consent is withdrawn. Cookie-related information will not be retained longer than necessary for the purposes for which it was collected.", "Les cookies de session sont automatiquement supprimés à la fin de la session du navigateur. Les cookies persistants restent stockés jusqu’à leur date d’expiration, leur suppression manuelle ou le retrait du consentement. Les informations relatives aux cookies ne seront pas conservées plus longtemps que nécessaire aux fins pour lesquelles elles ont été collectées.")}</p>

      <h2>{legalHeading("11. ", "International Data Transfers")}</h2>
      <p>{legalUi("Cookie information may be processed, stored, or transferred outside the country in which users reside. Where international transfers occur, we implement appropriate safeguards including standard contractual clauses, adequacy decisions, and data transfer agreements.", "Les informations relatives aux cookies peuvent être traitées, stockées ou transférées en dehors du pays de résidence des utilisateurs. Lorsque des transferts internationaux ont lieu, nous mettons en place des garanties appropriées, notamment des clauses contractuelles types, des décisions d’adéquation et des accords de transfert de données.")}</p>

      <h2>{legalHeading("12. ", "Data Security")}</h2>
      <p>{legalUi("We maintain appropriate technical, organizational, and administrative safeguards to protect information collected through cookies. While we take reasonable steps to protect information, no system can guarantee absolute security.", "Nous maintenons des mesures de protection techniques, organisationnelles et administratives appropriées pour protéger les informations collectées par les cookies. Bien que nous prenions des mesures raisonnables pour protéger ces informations, aucun système ne peut garantir une sécurité absolue.")}</p>

      <h2>{legalHeading("13. ", "User Rights")}</h2>
      <p>{legalUi("Depending on applicable law, users may have rights to access, correct, delete, restrict, object to processing, withdraw consent, request portability of data, and lodge complaints with a supervisory authority. Requests relating to cookie-related personal information may be submitted using the contact details below.", "Selon la loi applicable, les utilisateurs peuvent disposer du droit d’accéder à leurs données, de les rectifier, de les supprimer, d’en limiter le traitement, de s’opposer à leur traitement, de retirer leur consentement, d’en demander la portabilité et de déposer une réclamation auprès d’une autorité de contrôle. Les demandes relatives aux informations personnelles liées aux cookies peuvent être envoyées aux coordonnées ci-dessous.")}</p>

      <h2>{legalHeading("14. ", "Children's Privacy")}</h2>
      <p>{legalUi("Our Services are not intentionally directed toward children under the age defined by applicable law. We do not knowingly deploy non-essential tracking technologies for children where prohibited by law.", "Nos Services ne s’adressent pas intentionnellement aux enfants n’ayant pas atteint l’âge défini par la loi applicable. Nous ne déployons pas sciemment de technologies de suivi non essentielles pour les enfants lorsque la loi l’interdit.")}</p>

      <h2>{legalHeading("15. ", "Regulatory Compliance")}</h2>
      <p>{legalUi("We continuously review our cookie practices to maintain compliance with applicable privacy, consumer protection, cybersecurity, and electronic communications laws.", "Nous réexaminons régulièrement nos pratiques en matière de cookies afin de rester en conformité avec les lois applicables relatives à la confidentialité, à la protection des consommateurs, à la cybersécurité et aux communications électroniques.")}</p>

      <h2>{legalHeading("16. ", "Changes to This Cookie Policy")}</h2>
      <p>{legalUi("We reserve the right to amend this Cookie Policy at any time. Material changes will be communicated through appropriate channels including website notices where required by law.", "Nous nous réservons le droit de modifier la présente politique relative aux cookies à tout moment. Les modifications importantes seront communiquées par les canaux appropriés, notamment par des avis sur le site web lorsque la loi l’exige.")}</p>

      <h2>{legalHeading("17. ", "Contact Information")}</h2>
      <p>{legalUi("For questions, concerns, requests, or complaints regarding this Cookie Policy or our use of cookies and tracking technologies, please contact:", "Pour toute question, préoccupation, demande ou réclamation concernant la présente politique relative aux cookies ou notre utilisation des cookies et technologies de suivi, veuillez contacter :")}</p>
      <p>
        <strong>{legalUi("Information Officer / Data Protection Officer", "Responsable de l’information / Délégué à la protection des données")}</strong><br />
        Lexigenz Trading<br />
        {legalUi("Email: ", "E-mail : ")}<a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a>
      </p>
    </LegalLayout>
  );
}
