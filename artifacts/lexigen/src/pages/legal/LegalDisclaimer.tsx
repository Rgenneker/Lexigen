import { LegalLayout } from "./LegalLayout";
import { legalHeading, legalTitles, legalUi } from "@/i18n/legalLocale";

export default function LegalDisclaimer() {
  return (
    <LegalLayout title={legalUi(...legalTitles.disclaimer)} updated={legalUi("June 2026", "juin 2026")}>
      <h2>{legalHeading("1. ", "Important Notice")}</h2>
      <p>
        {legalUi(
          'Welcome to Lexigenz.com ("Platform"). By accessing, browsing, registering for, or using this website, mobile application, database, APIs, tools, word generation tools, word lists, vocabulary services, or any related products and services provided by Lexigenz.com ("we", "us", or "our"), you acknowledge that you have read, understood, and agree to be bound by this Legal Disclaimer, our Terms of Use, and Privacy Policy.',
          'Bienvenue sur Lexigenz.com (la « Plateforme »). En accédant à ce site web, à cette application mobile, à cette base de données, à ces API, outils, générateurs de mots, listes de mots, services de vocabulaire ou à tout produit ou service connexe fourni par Lexigenz.com (« nous », « notre » ou « nos »), en les parcourant, en vous y inscrivant ou en les utilisant, vous reconnaissez avoir lu et compris le présent avertissement juridique, nos conditions d’utilisation et notre politique de confidentialité, et acceptez d’être lié par ceux-ci.'
        )}
      </p>
      <p>{legalUi("If you do not agree with any provision contained herein, you must immediately discontinue use of the Platform.", "Si vous n’acceptez pas l’une des dispositions des présentes, vous devez immédiatement cesser d’utiliser la Plateforme.")}</p>

      <h2>{legalHeading("2. ", "Information Purposes Only")}</h2>
      <p>{legalUi("The Platform is intended solely for informational, educational, research, and reference purposes. The information available through the Platform, including but not limited to:", "La Plateforme est destinée uniquement à des fins informatives, éducatives, de recherche et de référence. Les informations disponibles sur la Plateforme comprennent notamment :")}</p>
      <ul>
        <li>{legalUi("Word generation results and vocabulary suggestions", "Résultats des générateurs de mots et suggestions de vocabulaire")}</li>
        <li>{legalUi("Definition and usage examples", "Définitions et exemples d’utilisation")}</li>
        <li>{legalUi("Writing prompts and phrase ideas", "Consignes d’écriture et idées de phrases")}</li>
        <li>{legalUi("Language learning aids and word-of-the-day content", "Supports d’apprentissage des langues et contenu du mot du jour")}</li>
        <li>{legalUi("Word lists and linguistic reference materials", "Listes de mots et documents de référence linguistiques")}</li>
      </ul>
      <p>{legalUi("is provided for general informational purposes only and should not be construed as professional writing or editorial advice, legal advice, medical advice, or financial or investment advice. Users should seek independent professional advice before making any important business, legal, creative, or other decisions.", "sont fournies uniquement à titre informatif général et ne doivent pas être interprétées comme des conseils professionnels en matière de rédaction ou d’édition, des conseils juridiques, médicaux, financiers ou d’investissement. Les utilisateurs doivent solliciter un avis professionnel indépendant avant de prendre toute décision importante d’ordre commercial, juridique, créatif ou autre.")}</p>

      <h2>{legalHeading("3. ", "No Recommendation")}</h2>
      <p>{legalUi("Nothing on this Platform constitutes an endorsement of a particular word, phrase, or writing style; a recommendation regarding how to use generated content; or a guarantee that generated text is correct, appropriate, or suitable for your needs. Any decisions made based on information obtained from the Platform are made solely at the user's own risk.", "Rien sur cette Plateforme ne constitue une approbation d’un mot, d’une phrase ou d’un style d’écriture particulier, une recommandation concernant l’utilisation du contenu généré, ni une garantie que le texte généré est correct, approprié ou adapté à vos besoins. Toute décision prise sur la base d’informations obtenues sur la Plateforme relève exclusivement des risques de l’utilisateur.")}</p>

      <h2>{legalHeading("4. ", "No Guarantee of Accuracy")}</h2>
      <p>
        {legalUi(
          "While we endeavour to maintain accurate, complete, and current information, we make no representations or warranties regarding the accuracy, completeness, reliability, timeliness, availability, suitability, currency, or quality of any information presented on the Platform. Information may contain errors, omissions, inaccuracies, delays, outdated content, technical faults, or third-party reporting errors. Content may change without notice.",
          "Bien que nous nous efforcions de maintenir des informations exactes, complètes et à jour, nous ne faisons aucune déclaration et n’offrons aucune garantie quant à l’exactitude, l’exhaustivité, la fiabilité, l’actualité, la disponibilité, l’adéquation, la mise à jour ou la qualité des informations présentées sur la Plateforme. Les informations peuvent contenir des erreurs, omissions, inexactitudes, retards, contenus obsolètes, défauts techniques ou erreurs de compte rendu de tiers. Le contenu peut être modifié sans préavis."
        )}
      </p>
      <p>{legalUi("We are under no obligation to update, correct, revise, or verify any information displayed on the Platform.", "Nous n’avons aucune obligation de mettre à jour, corriger, réviser ou vérifier les informations affichées sur la Plateforme.")}</p>

      <h2>{legalHeading("5. ", "Content and Data Disclaimer")}</h2>
      <p>
        {legalUi(
          "Content and word data may be sourced from dictionaries, public word lists, language APIs, third-party providers, and community contributions. Word generation and vocabulary outputs may vary depending on user input and system processing. Content may be approximate, indicative, or temporarily unavailable.",
          "Le contenu et les données lexicales peuvent provenir de dictionnaires, de listes de mots publiques, d’API linguistiques, de fournisseurs tiers et de contributions de la communauté. Les résultats des générateurs de mots et du vocabulaire peuvent varier selon les saisies de l’utilisateur et le traitement du système. Le contenu peut être approximatif, indicatif ou temporairement indisponible."
        )}
      </p>
      <p>{legalUi("Generated text is not guaranteed to be original, error-free, or suitable for publication. Users must independently verify the accuracy and appropriateness of all content before relying on it.", "Il n’est pas garanti que le texte généré soit original, exempt d’erreurs ou adapté à la publication. Les utilisateurs doivent vérifier de manière indépendante l’exactitude et la pertinence de tout contenu avant de s’y fier.")}</p>

      <h2>{legalHeading("6. ", "Generator and Analytics Disclaimer")}</h2>
      <p>{legalUi("The Platform provides word generators, vocabulary tools, phrase suggestion tools, writing prompts, and other analytical services. Results generated by such tools:", "La Plateforme fournit des générateurs de mots, des outils de vocabulaire, des outils de suggestion de phrases, des consignes d’écriture et d’autres services analytiques. Les résultats générés par ces outils :")}</p>
      <ul>
        <li>{legalUi("Are estimates only, based on user-provided information", "Ne sont que des estimations fondées sur les informations fournies par l’utilisateur")}</li>
        <li>{legalUi("May contain assumptions and are not guaranteed", "Peuvent contenir des hypothèses et ne sont pas garantis")}</li>
        <li>{legalUi("Should not be relied upon as professional advice", "Ne doivent pas être considérés comme des conseils professionnels")}</li>
      </ul>
      <p>{legalUi("Past outputs, assumptions, projections, and generated content do not guarantee future results. We accept no responsibility for decisions made using tool outputs.", "Les résultats, hypothèses, projections et contenus générés antérieurs ne garantissent pas les résultats futurs. Nous déclinons toute responsabilité concernant les décisions prises à l’aide des résultats des outils.")}</p>

      <h2>{legalHeading("7. ", "Third-Party Content")}</h2>
      <p>{legalUi("The Platform includes third-party content, research, news feeds, hyperlinks, embedded services, external websites, and APIs. We do not control, endorse, verify, or assume responsibility for any third-party content. Users access third-party resources entirely at their own risk.", "La Plateforme comprend du contenu tiers, des travaux de recherche, des flux d’actualités, des hyperliens, des services intégrés, des sites web externes et des API. Nous ne contrôlons, n’approuvons ni ne vérifions aucun contenu tiers et n’assumons aucune responsabilité à son égard. Les utilisateurs accèdent aux ressources de tiers entièrement à leurs propres risques.")}</p>

      <h2>{legalHeading("8. ", "No Fiduciary Relationship")}</h2>
      <p>
        {legalUi(
          "Use of the Platform does not create an advisory relationship, fiduciary relationship, brokerage relationship, agency relationship, partnership, or joint venture between the user and the Platform. Lexigenz.com is not a registered broker-dealer, investment adviser, financial planner, or any other type of regulated financial entity in any jurisdiction.",
          "L’utilisation de la Plateforme ne crée aucune relation de conseil, relation fiduciaire, relation de courtage, relation d’agence, société de personnes ou coentreprise entre l’utilisateur et la Plateforme. Lexigenz.com n’est ni un courtier-négociant enregistré, ni un conseiller en investissement, ni un planificateur financier, ni aucun autre type d’entité financière réglementée dans quelque juridiction que ce soit."
        )}
      </p>

      <h2>{legalHeading("9. ", "User Responsibility")}</h2>
      <p>{legalUi("Users acknowledge and agree that they are solely responsible for:", "Les utilisateurs reconnaissent et acceptent être seuls responsables de :")}</p>
      <ul>
        <li>{legalUi("Evaluating information and verifying data accuracy", "Évaluer les informations et vérifier l’exactitude des données")}</li>
        <li>{legalUi("Conducting independent research", "Effectuer des recherches indépendantes")}</li>
        <li>{legalUi("Consulting qualified professionals", "Consulter des professionnels qualifiés")}</li>
        <li>{legalUi("Complying with applicable laws and regulations", "Respecter les lois et réglementations applicables")}</li>
        <li>{legalUi("Assessing content suitability for intended use", "Évaluer l’adéquation du contenu à l’usage prévu")}</li>
        <li>{legalUi("Managing their own risks", "Gérer leurs propres risques")}</li>
      </ul>
      <p>{legalUi("The Platform shall not be responsible for any decisions made by users.", "La Plateforme ne saurait être responsable des décisions prises par les utilisateurs.")}</p>

      <h2>{legalHeading("10. ", "No Warranty")}</h2>
      <p>{legalUi('The Platform is provided on an "AS IS" and "AS AVAILABLE" basis. We expressly disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, accuracy, availability, reliability, non-infringement, and performance.', 'La Plateforme est fournie « EN L’ÉTAT » et « SELON DISPONIBILITÉ ». Nous excluons expressément toute garantie, y compris, sans s’y limiter, les garanties de qualité marchande, d’adéquation à un usage particulier, d’exactitude, de disponibilité, de fiabilité, d’absence de contrefaçon et de performance.')}</p>

      <h2>{legalHeading("11. ", "Changes to This Disclaimer")}</h2>
      <p>{legalUi("We reserve the right to amend, modify, update, or replace this Disclaimer at any time without prior notice. Continued use of the Platform following publication of changes constitutes acceptance of such changes.", "Nous nous réservons le droit de modifier, mettre à jour ou remplacer le présent avertissement à tout moment et sans préavis. La poursuite de l’utilisation de la Plateforme après la publication de modifications vaut acceptation de ces changements.")}</p>

      <h2>{legalHeading("12. ", "Governing Law")}</h2>
      <p>{legalUi("This Disclaimer shall be governed by and interpreted in accordance with the laws of South Africa. Any disputes arising from the use of the Platform shall be subject to the exclusive jurisdiction of the courts of South Africa.", "Le présent avertissement est régi et interprété conformément aux lois de l’Afrique du Sud. Tout litige découlant de l’utilisation de la Plateforme relève de la compétence exclusive des tribunaux d’Afrique du Sud.")}</p>

      <h2>{legalHeading("13. ", "Contact Information")}</h2>
      <p>
        {legalUi("For questions regarding this Disclaimer, please contact:", "Pour toute question concernant le présent avertissement, veuillez contacter :")}<br /><br />
        <strong>Lexigenz.com</strong><br />
        {legalUi("Email: ", "E-mail : ")}<a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a><br />
        {legalUi("Website: ", "Site web : ")}<a href="https://lexigenz.com">https://lexigenz.com</a>
      </p>

      <div className="mt-10 p-6 rounded-2xl border border-destructive/30 bg-destructive/5">
        <h3 className="font-bold text-base mb-2 text-foreground">{legalUi("Risk Warning", "Avertissement relatif aux risques")}</h3>
        <p className="text-sm text-muted-foreground m-0">
          {legalUi(
            "Use of the Platform for plagiarism, defamation, harassment, or any unlawful or irregular activity is prohibited. Generated content is not a substitute for qualified professional advice, and users should not rely on the Site for illegal, unethical, or prohibited uses.",
            "L’utilisation de la Plateforme à des fins de plagiat, de diffamation, de harcèlement ou pour toute activité illicite ou irrégulière est interdite. Le contenu généré ne remplace pas l’avis d’un professionnel qualifié et les utilisateurs ne doivent pas s’appuyer sur le Site pour des usages illégaux, contraires à l’éthique ou interdits."
          )}
        </p>
      </div>
    </LegalLayout>
  );
}
