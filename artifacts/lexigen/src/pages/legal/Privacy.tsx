import { LegalLayout } from "./LegalLayout";
import { legalHeading, legalTitles, legalUi } from "@/i18n/legalLocale";

export default function Privacy() {
  return (
    <LegalLayout title={legalUi(...legalTitles.privacy)} updated={legalUi("1 June 2026", "1 juin 2026")}>
      <p>
        {legalUi(
          'Lexigenz Trading ("we", "us", "our") operates Lexigenz.com. This Privacy Policy explains how we handle information when you use our word generation and word-of-the-day tools. We are committed to protecting your privacy and being transparent about our practices.',
          'Lexigenz Trading (« nous », « notre » ou « nos ») exploite Lexigenz.com. La présente politique de confidentialité explique comment nous traitons les informations lorsque vous utilisez nos générateurs de mots et nos outils du mot du jour. Nous nous engageons à protéger votre vie privée et à faire preuve de transparence concernant nos pratiques.'
        )}
      </p>

      <h2>{legalHeading("", "Contents")}</h2>
      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
        <li>{legalUi("Information We Collect", "Informations que nous collectons")}</li>
        <li>{legalUi("How We Use Information", "Utilisation des informations")}</li>
        <li>{legalUi("Google AdSense & Cookies", "Google AdSense et cookies")}</li>
        <li>{legalUi("Analytics", "Analyses")}</li>
        <li>{legalUi("Data Storage & Security", "Stockage et sécurité des données")}</li>
        <li>{legalUi("Children's Privacy", "Protection de la vie privée des enfants")}</li>
        <li>{legalUi("Your Rights", "Vos droits")}</li>
        <li>{legalUi("Changes to This Policy", "Modifications de cette politique")}</li>
        <li>{legalUi("Contact Us", "Nous contacter")}</li>
      </ol>

      <h2>{legalHeading("1. ", "Information We Collect")}</h2>
      <p>
        <strong>{legalUi("Word generation data:", "Données de génération de mots :")}</strong>
        {legalUi(" None. All word generation inputs and outputs are processed locally in your browser using JavaScript. No words, phrases, or user entries are transmitted to our servers or stored outside your device unless you choose to create an account.", " Aucune. Toutes les données saisies et tous les résultats des générateurs de mots sont traités localement dans votre navigateur à l’aide de JavaScript. Aucun mot, aucune phrase ni aucune saisie utilisateur n’est transmis à nos serveurs ou stocké en dehors de votre appareil, sauf si vous choisissez de créer un compte.")}
      </p>
      <p>
        <strong>{legalUi("Automatically collected data:", "Données collectées automatiquement :")}</strong>
        {legalUi(" Like most websites, our hosting infrastructure may automatically log standard server access data, including your IP address (truncated), browser type, referring URL, pages visited, and timestamps. This data is used solely for security monitoring and aggregate traffic analysis.", " Comme la plupart des sites web, notre infrastructure d’hébergement peut enregistrer automatiquement des données standard d’accès au serveur, notamment votre adresse IP (tronquée), le type de navigateur, l’URL de provenance, les pages consultées et les horodatages. Ces données sont utilisées uniquement pour surveiller la sécurité et analyser le trafic de manière agrégée.")}
      </p>
      <p>
        <strong>{legalUi("Contact form:", "Formulaire de contact :")}</strong>
        {legalUi(" If you use our contact form, it opens your email client with pre-filled content. No data passes through our servers via the form itself.", " Si vous utilisez notre formulaire de contact, celui-ci ouvre votre client de messagerie avec un contenu prérempli. Aucune donnée ne transite par nos serveurs via le formulaire lui-même.")}
      </p>

      <h2>{legalHeading("2. ", "How We Use Information")}</h2>
      <p>{legalUi("We use automatically collected technical data to:", "Nous utilisons les données techniques collectées automatiquement pour :")}</p>
      <ul>
        <li>{legalUi("Monitor the security and performance of the Site", "Surveiller la sécurité et les performances du Site")}</li>
        <li>{legalUi("Understand aggregate usage patterns to improve our word generation tools", "Comprendre les tendances d’utilisation agrégées afin d’améliorer nos générateurs de mots")}</li>
        <li>{legalUi("Detect and prevent abuse or unauthorised access", "Détecter et empêcher les abus ou les accès non autorisés")}</li>
      </ul>
      <p>{legalUi("We do not sell, rent, or share your data with third parties for marketing purposes.", "Nous ne vendons, ne louons ni ne partageons vos données avec des tiers à des fins marketing.")}</p>

      <h2>{legalHeading("3. ", "Google AdSense & Cookies")}</h2>
      <p>
        {legalUi(
          "Lexigenz.com may use Google AdSense to display advertisements. Google AdSense uses cookies and similar tracking technologies to serve ads based on your prior visits to our Site and other sites on the internet.",
          "Lexigenz.com peut utiliser Google AdSense pour afficher des publicités. Google AdSense utilise des cookies et des technologies de suivi similaires afin de diffuser des annonces en fonction de vos visites antérieures sur notre Site et sur d’autres sites internet."
        )}
      </p>
      <p>{legalUi("Cookies used by Google AdSense may include:", "Les cookies utilisés par Google AdSense peuvent notamment comprendre :")}</p>
      <ul>
        <li><strong>__ga, __gads</strong> {legalUi("- Google advertising and analytics cookies", "— cookies publicitaires et analytiques de Google")}</li>
        <li><strong>IDE</strong> {legalUi("- DoubleClick cookie used by Google for targeting advertisements", "— cookie DoubleClick utilisé par Google pour le ciblage publicitaire")}</li>
        <li><strong>DSID, FLC</strong> {legalUi("- frequency capping and ad personalisation", "— limitation de la fréquence et personnalisation des publicités")}</li>
      </ul>
      <p>{legalUi("You can opt out of personalised advertising at any time via Google Ads Settings, the Digital Advertising Alliance opt-out, or your browser's cookie settings.", "Vous pouvez à tout moment refuser la publicité personnalisée via les paramètres des annonces Google, le mécanisme de désactivation de la Digital Advertising Alliance ou les paramètres de cookies de votre navigateur.")}</p>
      <p>
        {legalUi(
          "We also store a single theme key in your browser's localStorage to remember your light/dark mode preference. This data never leaves your device.",
          "Nous stockons également une seule clé de thème dans le localStorage de votre navigateur afin de mémoriser votre préférence pour le mode clair ou sombre. Ces données ne quittent jamais votre appareil."
        )}
      </p>

      <h2>{legalHeading("4. ", "Analytics")}</h2>
      <p>
        {legalUi(
          "We may use Google Analytics to understand aggregate usage of the Site. If enabled, Google Analytics collects anonymised data about pages visited, session duration, and device type. IP addresses are anonymised. You can opt out using the Google Analytics opt-out browser add-on.",
          "Nous pouvons utiliser Google Analytics pour comprendre l’utilisation agrégée du Site. Si cette fonctionnalité est activée, Google Analytics collecte des données anonymisées concernant les pages consultées, la durée des sessions et le type d’appareil. Les adresses IP sont anonymisées. Vous pouvez refuser cette collecte à l’aide du module complémentaire de navigateur de désactivation de Google Analytics."
        )}
      </p>

      <h2>{legalHeading("5. ", "Data Storage & Security")}</h2>
      <p>
        {legalUi(
          "We implement reasonable technical measures to protect the Site from unauthorised access. Because word generation data is processed exclusively client-side and no personal word inputs are transmitted to us, the risk of a data breach affecting your generator inputs is zero by design.",
          "Nous mettons en œuvre des mesures techniques raisonnables pour protéger le Site contre les accès non autorisés. Les données de génération de mots étant traitées exclusivement côté client et aucune saisie personnelle de mots ne nous étant transmise, le risque qu’une violation de données affecte vos saisies de générateur est nul par conception."
        )}
      </p>
      <p>
        {legalUi(
          "We cannot guarantee absolute security of data transmitted over the internet. Use the Site at your own risk in accordance with our Terms of Service.",
          "Nous ne pouvons garantir la sécurité absolue des données transmises sur internet. Vous utilisez le Site à vos propres risques, conformément à nos conditions d’utilisation du service."
        )}
      </p>

      <h2>{legalHeading("6. ", "Children's Privacy")}</h2>
      <p>
        {legalUi(
          "Lexigenz.com is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.",
          "Lexigenz.com ne s’adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de renseignements personnels auprès d’enfants. Si vous pensez qu’un enfant nous a fourni des renseignements personnels, veuillez nous contacter et nous prendrons les mesures nécessaires pour les supprimer."
        )}
      </p>

      <h2>{legalHeading("7. ", "Your Rights")}</h2>
      <p>
        {legalUi(
          "Depending on your jurisdiction, you may have rights under applicable data protection law (including POPIA in South Africa and GDPR in the EU), including the right to access, correct, or delete personal data held about you.",
          "Selon votre juridiction, vous pouvez bénéficier de droits prévus par la législation applicable en matière de protection des données, notamment la POPIA en Afrique du Sud et le RGPD dans l’Union européenne, y compris le droit d’accéder aux données personnelles vous concernant, de les rectifier ou de les supprimer."
        )}
      </p>
      <p>
        {legalUi("Because we collect minimal identifiable data, most requests can be addressed simply by clearing your browser's cookies and localStorage. For other requests, contact us at ", "Comme nous collectons très peu de données permettant de vous identifier, la plupart des demandes peuvent être traitées simplement en effaçant les cookies et le localStorage de votre navigateur. Pour toute autre demande, contactez-nous à l’adresse ")}
        <a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a>.
      </p>

      <h2>{legalHeading("8. ", "Changes to This Policy")}</h2>
      <p>
        {legalUi(
          'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the revised Policy.',
          "Nous pouvons mettre à jour cette politique de confidentialité périodiquement. Les modifications seront publiées sur cette page avec une date de « Dernière mise à jour » actualisée. La poursuite de votre utilisation du Site après toute modification vaut acceptation de la politique révisée."
        )}
      </p>

      <h2>{legalHeading("9. ", "Contact Us")}</h2>
      <p>
        {legalUi("For privacy-related questions or requests, contact us at ", "Pour toute question ou demande relative à la confidentialité, contactez-nous à l’adresse ")}
        <a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a>
        {legalUi(" or visit our ", " ou consultez notre ")}
        <a href="/contact">{legalUi("Contact page", "page de contact")}</a>.
      </p>
    </LegalLayout>
  );
}
