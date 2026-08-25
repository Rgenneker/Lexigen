import { LegalLayout } from "./LegalLayout";
import { legalHeading, legalTitles, legalUi } from "@/i18n/legalLocale";

export default function Terms() {
  return (
    <LegalLayout title={legalUi(...legalTitles.terms)} updated={legalUi("1 June 2026", "1 juin 2026")}>
      <p>
        {legalUi(
          'Please read these Terms and Conditions carefully before using Lexigenz.com (the "Site") operated by Lexigenz Trading ("we", "us", or "our"). By accessing or using the Site, you agree to be bound by these Terms.',
          'Veuillez lire attentivement les présentes conditions générales avant d’utiliser Lexigenz.com (le « Site »), exploité par Lexigenz Trading (« nous », « notre » ou « nos »). En accédant au Site ou en l’utilisant, vous acceptez d’être lié par les présentes conditions.'
        )}
      </p>

      <h2>{legalHeading("", "Contents")}</h2>
      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground text-sm">
        <li>{legalUi("Acceptance of Terms", "Acceptation des conditions")}</li>
        <li>{legalUi("Use of the Service", "Utilisation du service")}</li>
        <li>{legalUi("Intellectual Property", "Propriété intellectuelle")}</li>
        <li>{legalUi("No Professional Advice", "Absence de conseil professionnel")}</li>
        <li>{legalUi("Disclaimer of Warranties", "Exclusion de garanties")}</li>
        <li>{legalUi("Limitation of Liability", "Limitation de responsabilité")}</li>
        <li>{legalUi("Third-Party Advertising", "Publicité de tiers")}</li>
        <li>{legalUi("Links to Third-Party Sites", "Liens vers des sites tiers")}</li>
        <li>{legalUi("Changes to Terms", "Modifications des conditions")}</li>
        <li>{legalUi("Governing Law", "Droit applicable")}</li>
        <li>{legalUi("Contact", "Contact")}</li>
      </ol>

      <h2>{legalHeading("1. ", "Acceptance of Terms")}</h2>
      <p>
        {legalUi(
          "By accessing Lexigenz.com you confirm that you are at least 13 years of age and that you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, please discontinue use of the Site immediately.",
          "En accédant à Lexigenz.com, vous confirmez être âgé d’au moins 13 ans et accepter les présentes conditions ainsi que notre politique de confidentialité. Si vous n’acceptez pas ces conditions, veuillez cesser immédiatement d’utiliser le Site."
        )}
      </p>

      <h2>{legalHeading("2. ", "Use of the Service")}</h2>
      <p>
        {legalUi(
          "You may use the word generation tools and content on Lexigenz.com for personal, educational, and non-commercial purposes only. You agree not to:",
          "Vous pouvez utiliser les générateurs de mots et le contenu de Lexigenz.com uniquement à des fins personnelles, éducatives et non commerciales. Vous vous engagez à ne pas :"
        )}
      </p>
      <ul>
        <li>{legalUi("Copy, scrape, republish, or redistribute any word generator, tool, or content without written permission", "Copier, extraire, republier ou redistribuer un générateur de mots, un outil ou un contenu sans autorisation écrite")}</li>
        <li>{legalUi("Use the Site in any manner that could damage, disable, overburden, or impair it", "Utiliser le Site d’une manière susceptible de l’endommager, de le désactiver, de le surcharger ou d’en altérer le fonctionnement")}</li>
        <li>{legalUi("Attempt to gain unauthorised access to any part of the Site or its infrastructure", "Tenter d’obtenir un accès non autorisé à une partie quelconque du Site ou de son infrastructure")}</li>
        <li>{legalUi("Use automated scripts, bots, or scrapers to access word generator outputs", "Utiliser des scripts automatisés, des robots ou des extracteurs pour accéder aux résultats des générateurs de mots")}</li>
        <li>{legalUi("Frame or embed any word generator or page on another website without prior written consent", "Insérer ou intégrer un générateur de mots ou une page sur un autre site web sans consentement écrit préalable")}</li>
      </ul>

      <h2>{legalHeading("3. ", "Intellectual Property")}</h2>
      <p>
        {legalUi(
          "All content on Lexigenz.com - including but not limited to word generator logic, code, design, text, graphics, and the Lexigenz name and logo - is the exclusive intellectual property of Lexigenz Trading and is protected by South African and international copyright and trademark law.",
          "Tout le contenu de Lexigenz.com — y compris, sans s’y limiter, la logique des générateurs de mots, le code, le design, les textes, les graphiques, ainsi que le nom et le logo Lexigenz — constitue la propriété intellectuelle exclusive de Lexigenz Trading et est protégé par les lois sud-africaines et internationales relatives au droit d’auteur et aux marques."
        )}
      </p>
      <p>
        {legalUi(
          "The Lexigenz trademark is registered in South Africa. Unauthorised use of the mark or any confusingly similar mark is prohibited.",
          "La marque Lexigenz est déposée en Afrique du Sud. Toute utilisation non autorisée de cette marque ou d’une marque présentant une similitude susceptible de créer une confusion est interdite."
        )}
      </p>

      <h2>{legalHeading("4. ", "No Professional Advice")}</h2>
      <p>
        {legalUi(
          "All word generators and content on Lexigenz.com are provided for educational and informational purposes only and do not constitute financial, legal, medical, tax, or any other professional advice.",
          "Tous les générateurs de mots et contenus de Lexigenz.com sont fournis uniquement à des fins éducatives et informatives et ne constituent pas des conseils financiers, juridiques, médicaux, fiscaux ou autres conseils professionnels."
        )}
      </p>
      <p>
        {legalUi(
          "Word generation results are based on the inputs provided and the selected language model or algorithm. They do not account for your specific situation, jurisdiction-specific regulations, or real-time market conditions. Always consult a qualified professional before making financial, health, or legal decisions.",
          "Les résultats des générateurs de mots reposent sur les données saisies et sur le modèle linguistique ou l’algorithme sélectionné. Ils ne tiennent pas compte de votre situation particulière, des réglementations propres à votre juridiction ni des conditions du marché en temps réel. Consultez toujours un professionnel qualifié avant de prendre des décisions financières, sanitaires ou juridiques."
        )}
      </p>

      <h2>{legalHeading("5. ", "Disclaimer of Warranties")}</h2>
      <p>
        {legalUi(
          'The Site and all word generators are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
          'Le Site et tous les générateurs de mots sont fournis « EN L’ÉTAT » et « SELON DISPONIBILITÉ », sans garantie d’aucune sorte, expresse ou implicite, y compris, sans s’y limiter, les garanties implicites de qualité marchande, d’adéquation à un usage particulier ou d’absence de contrefaçon.'
        )}
      </p>
      <p>
        {legalUi(
          "We do not warrant that the Site will be uninterrupted, error-free, or that generated words will be accurate, complete, or current. Generated content is indicative and may not reflect the latest usage trends or your personal context.",
          "Nous ne garantissons pas que le Site sera disponible sans interruption ou sans erreur, ni que les mots générés seront exacts, complets ou à jour. Le contenu généré est fourni à titre indicatif et peut ne pas refléter les dernières tendances d’usage ni votre contexte personnel."
        )}
      </p>

      <h2>{legalHeading("6. ", "Limitation of Liability")}</h2>
      <p>
        {legalUi(
          "To the maximum extent permitted by applicable law, Lexigenz Trading and its directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Site or its word generators - even if advised of the possibility of such damages.",
          "Dans toute la mesure permise par la loi applicable, Lexigenz Trading ainsi que ses dirigeants, employés et mandataires ne sauraient être responsables de dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre utilisation ou de votre impossibilité d’utiliser le Site ou ses générateurs de mots, même s’ils ont été informés de la possibilité de tels dommages."
        )}
      </p>
      <p>
        {legalUi(
          "Our total liability to you for any claim arising from use of the Site shall not exceed ZAR 500 (five hundred South African rand).",
          "Notre responsabilité totale envers vous pour toute réclamation découlant de l’utilisation du Site ne dépassera pas 500 ZAR (cinq cents rands sud-africains)."
        )}
      </p>

      <h2>{legalHeading("7. ", "Third-Party Advertising")}</h2>
      <p>
        {legalUi(
          "Lexigenz.com displays advertisements served by Google AdSense and potentially other third-party networks. These advertisers may use cookies and similar tracking technologies to serve personalised ads based on your browsing behaviour.",
          "Lexigenz.com affiche des publicités diffusées par Google AdSense et éventuellement par d’autres réseaux tiers. Ces annonceurs peuvent utiliser des cookies et des technologies de suivi similaires afin de diffuser des publicités personnalisées en fonction de votre comportement de navigation."
        )}
      </p>
      <p>
        {legalUi(
          "We do not control the content of third-party advertisements and are not responsible for any products, services, or content advertised. For information about how Google uses your data, please review Google's Privacy Policy.",
          "Nous ne contrôlons pas le contenu des publicités de tiers et ne sommes pas responsables des produits, services ou contenus annoncés. Pour savoir comment Google utilise vos données, veuillez consulter la politique de confidentialité de Google."
        )}
      </p>
      <p>
        {legalUi(
          "You can opt out of personalised advertising by visiting Google Ads Settings or aboutads.info.",
          "Vous pouvez refuser la publicité personnalisée en consultant les paramètres des annonces Google ou aboutads.info."
        )}
      </p>

      <h2>{legalHeading("8. ", "Links to Third-Party Sites")}</h2>
      <p>
        {legalUi(
          "The Site may contain links to third-party websites. These links are provided for convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the privacy policy of every site you visit.",
          "Le Site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour votre commodité. Nous n’exerçons aucun contrôle sur le contenu, les politiques de confidentialité ou les pratiques des sites tiers et déclinons toute responsabilité à leur égard. Nous vous recommandons de consulter la politique de confidentialité de chaque site que vous visitez."
        )}
      </p>

      <h2>{legalHeading("9. ", "Changes to Terms")}</h2>
      <p>
        {legalUi(
          "We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the updated Terms. We recommend checking this page periodically.",
          "Nous nous réservons le droit de modifier les présentes conditions à tout moment. Les modifications prendront effet dès leur publication sur le Site. La poursuite de votre utilisation du Site après toute modification vaut acceptation des conditions mises à jour. Nous vous recommandons de consulter régulièrement cette page."
        )}
      </p>

      <h2>{legalHeading("10. ", "Governing Law")}</h2>
      <p>
        {legalUi(
          "These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.",
          "Les présentes conditions sont régies et interprétées conformément aux lois de la République d’Afrique du Sud. Tout litige découlant des présentes conditions relève de la compétence exclusive des tribunaux d’Afrique du Sud."
        )}
      </p>

      <h2>{legalHeading("11. ", "Contact")}</h2>
      <p>
        {legalUi("If you have questions about these Terms, please contact us at ", "Si vous avez des questions concernant ces conditions, veuillez nous contacter à l’adresse ")}
        <a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a>
        {legalUi(" or visit our ", " ou consulter notre ")}
        <a href="/contact">{legalUi("Contact page", "page de contact")}</a>.
      </p>
    </LegalLayout>
  );
}
