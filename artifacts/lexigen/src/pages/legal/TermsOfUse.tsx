import { LegalLayout } from "./LegalLayout";
import { isFrench, isSpanish, legalHeading, legalTitles, legalUi } from "@/i18n/legalLocale";

export default function TermsOfUse() {
  return (
    <LegalLayout title={legalUi(...legalTitles.termsOfUse)} updated={legalUi("1 June 2026", "1 juin 2026")}>
      <p>
        {legalUi(
          'These Terms of Use ("Terms") constitute a legally binding agreement between Lexigenz Trading, including its subsidiaries, affiliates, successors, assigns, officers, employees, agents, and representatives ("Company", "we", "us", or "our"), and any individual, entity, customer, visitor, user, subscriber, merchant, partner, or organization ("User", "you", or "your") accessing or using our website, mobile applications, software, platforms, products, or related services (collectively, the "Services").',
          'Les présentes conditions d’utilisation (« Conditions ») constituent un accord juridiquement contraignant entre Lexigenz Trading, y compris ses filiales, sociétés affiliées, successeurs, ayants droit, dirigeants, employés, mandataires et représentants (« Société », « nous », « notre » ou « nos »), et toute personne physique, entité, client, visiteur, utilisateur, abonné, commerçant, partenaire ou organisation (« Utilisateur », « vous » ou « votre ») qui accède à notre site web, à nos applications mobiles, logiciels, plateformes, produits ou services connexes, ou les utilise (collectivement, les « Services »).'
        )}
      </p>
      <p>
        {legalUi(
          "Our Services include a word generator and word-of-the-day experience designed to deliver personalized vocabulary, definitions, daily word suggestions, and related word content based on user preferences and date of birth data.",
          "Nos Services comprennent un générateur de mots et une expérience du mot du jour conçus pour fournir un vocabulaire personnalisé, des définitions, des suggestions de mots quotidiennes et du contenu lexical connexe en fonction des préférences de l’utilisateur et de ses données de naissance."
        )}
      </p>
      <p>
        {legalUi(
          "By accessing, browsing, registering for, subscribing to, purchasing, or otherwise using any part of the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you must immediately discontinue use of the Services.",
          "En accédant aux Services, en les parcourant, en vous y inscrivant, en vous y abonnant, en les achetant ou en utilisant de toute autre manière une partie quelconque des Services, vous reconnaissez avoir lu et compris les présentes conditions et acceptez d’être lié par celles-ci. Si vous n’acceptez pas ces conditions, vous devez immédiatement cesser d’utiliser les Services."
        )}
      </p>

      <h2>{legalHeading("1. ", "Acceptance of Terms")}</h2>
      <p>
        {legalUi("By accessing Lexigenz.com you confirm that you are at least 13 years of age and agree to these Terms and our ", "En accédant à Lexigenz.com, vous confirmez être âgé d’au moins 13 ans et accepter les présentes conditions ainsi que notre ")}
        <a href="/privacy">{legalUi("Privacy Policy", "politique de confidentialité")}</a>
        {legalUi(". If you do not agree, please discontinue use of the Site immediately.", ". Si vous n’acceptez pas ces conditions, veuillez cesser immédiatement d’utiliser le Site.")}
      </p>

      <h2>{legalHeading("2. ", "Eligibility")}</h2>
      <p>{legalUi("To use the Services, you represent and warrant that you are at least 18 years of age (or 13 with parental consent), possess the legal capacity to enter into binding agreements, and that your use does not violate any applicable law, regulation, contractual obligation, or court order.", "Pour utiliser les Services, vous déclarez et garantissez être âgé d’au moins 18 ans (ou de 13 ans avec le consentement parental), avoir la capacité juridique de conclure des accords contraignants et que votre utilisation ne viole aucune loi, réglementation, obligation contractuelle ou décision de justice applicable.")}</p>

      <h2>{legalHeading("3. ", "Business Purpose of the Services")}</h2>
      <p>{legalUi("The Services are provided for lawful commercial, informational, transactional, operational, and business purposes. Nothing contained within the Services shall be interpreted as legal, financial, tax, investment, medical, or professional advice.", "Les Services sont fournis à des fins commerciales, informatives, transactionnelles, opérationnelles et professionnelles licites. Aucune information contenue dans les Services ne doit être interprétée comme un conseil juridique, financier, fiscal, d’investissement, médical ou professionnel.")}</p>

      <h2>{legalHeading("4. ", "Account Registration")}</h2>
      <p>{legalUi("Where registration is required, you agree to provide accurate, complete, and current information; maintain the accuracy of all account information; safeguard login credentials; prevent unauthorized access; and notify the Company immediately of any suspected security incident. You are solely responsible for all activities conducted under your account.", "Lorsque l’inscription est requise, vous acceptez de fournir des informations exactes, complètes et à jour, de maintenir l’exactitude de toutes les informations de votre compte, de protéger vos identifiants de connexion, d’empêcher tout accès non autorisé et d’informer immédiatement la Société de tout incident de sécurité présumé. Vous êtes seul responsable de toutes les activités effectuées sous votre compte.")}</p>

      <h2>{legalHeading("5. ", "User Responsibilities")}</h2>
      <p>{legalUi("Users shall use the Services lawfully and ethically, comply with all applicable laws and regulations, maintain adequate cybersecurity safeguards, ensure that information submitted is truthful and accurate, respect intellectual property rights, and protect confidential information obtained through the Services.", "Les Utilisateurs doivent utiliser les Services de manière légale et éthique, respecter toutes les lois et réglementations applicables, maintenir des mesures de cybersécurité adéquates, s’assurer que les informations soumises sont véridiques et exactes, respecter les droits de propriété intellectuelle et protéger les informations confidentielles obtenues par l’intermédiaire des Services.")}</p>

      <h2>{legalHeading("6. ", "Prohibited Conduct")}</h2>
      <p>{legalUi("Users shall not directly or indirectly engage in:", "Les Utilisateurs ne doivent pas, directement ou indirectement, se livrer aux activités suivantes :")}</p>
      <ul>
        <li><strong>{legalUi("System Abuse:", "Abus du système :")}</strong> {legalUi("Attempting unauthorized access, circumventing security measures, interfering with service functionality, introducing malware or malicious code, or conducting denial-of-service attacks.", "Tenter d’obtenir un accès non autorisé, contourner les mesures de sécurité, perturber le fonctionnement du service, introduire des logiciels malveillants ou du code malveillant, ou mener des attaques par déni de service.")}</li>
        <li><strong>{legalUi("Fraudulent Activities:", "Activités frauduleuses :")}</strong> {legalUi("Impersonating any person or entity, submitting false information, committing identity theft, engaging in fraudulent transactions, or facilitating money laundering.", "Usurper l’identité d’une personne ou d’une entité, soumettre de fausses informations, commettre une usurpation d’identité, effectuer des transactions frauduleuses ou faciliter le blanchiment d’argent.")}</li>
        <li><strong>{legalUi("Intellectual Property Violations:", "Atteintes à la propriété intellectuelle :")}</strong> {legalUi("Copying, reproducing, distributing, modifying, or exploiting proprietary content without authorization, reverse engineering software, or removing ownership notices.", "Copier, reproduire, distribuer, modifier ou exploiter un contenu exclusif sans autorisation, effectuer de l’ingénierie inverse sur un logiciel ou supprimer les mentions de propriété.")}</li>
        <li><strong>{legalUi("Illegal Activities:", "Activités illégales :")}</strong> {legalUi("Using the Services for unlawful purposes, promoting criminal conduct, or violating sanctions, export controls, or trade restrictions.", "Utiliser les Services à des fins illicites, promouvoir une conduite criminelle ou violer des sanctions, des contrôles à l’exportation ou des restrictions commerciales.")}</li>
        <li><strong>{legalUi("Data Misuse:", "Mauvaise utilisation des données :")}</strong> {legalUi("Harvesting personal information, conducting unauthorized scraping, or monitoring or intercepting communications unlawfully.", "Collecter des informations personnelles, effectuer une extraction non autorisée, ou surveiller ou intercepter illégalement des communications.")}</li>
      </ul>

      <h2>{legalHeading("7. ", "Intellectual Property Rights")}</h2>
      <p>{legalUi("All rights, title, and interest in the Services remain exclusively owned by Lexigenz Trading or its licensors. Protected materials include software, databases, source code, designs, logos, trade names, trademarks, trade secrets, documentation, written content, audio and visual materials, algorithms, and business processes. No ownership rights are transferred to users through use of the Services.", "Tous les droits, titres et intérêts relatifs aux Services restent la propriété exclusive de Lexigenz Trading ou de ses concédants. Les éléments protégés comprennent les logiciels, bases de données, codes sources, designs, logos, noms commerciaux, marques, secrets commerciaux, documents, contenus écrits, éléments audio et visuels, algorithmes et processus commerciaux. L’utilisation des Services ne transfère aucun droit de propriété aux utilisateurs.")}</p>

      <h2>{legalHeading("8. ", "User-Generated Content")}</h2>
      <p>{legalUi("Where users submit content, users represent and warrant that they possess all necessary rights, the content does not infringe third-party rights, and the content complies with applicable laws. Users grant the Company a worldwide, royalty-free, perpetual, transferable, sublicensable licence to host, process, display, store, reproduce, distribute, and use User Content as necessary to provide and improve the Services.", "Lorsque les utilisateurs soumettent du contenu, ils déclarent et garantissent détenir tous les droits nécessaires, que le contenu ne porte pas atteinte aux droits de tiers et qu’il respecte les lois applicables. Les utilisateurs accordent à la Société une licence mondiale, libre de redevances, perpétuelle, transférable et pouvant faire l’objet d’une sous-licence, pour héberger, traiter, afficher, stocker, reproduire, distribuer et utiliser le contenu utilisateur dans la mesure nécessaire à la fourniture et à l’amélioration des Services.")}</p>

      <h2>{legalHeading("9. ", "Privacy and Data Protection")}</h2>
      <p>{legalUi("The collection, use, disclosure, storage, and protection of personal information shall be governed by our ", "La collecte, l’utilisation, la divulgation, le stockage et la protection des informations personnelles sont régis par notre ")}<a href="/privacy">{legalUi("Privacy Policy", "politique de confidentialité")}</a>{legalUi(". The Company undertakes to process personal information in accordance with POPIA, GDPR (where applicable), UK GDPR, CCPA/CPRA (where applicable), and other applicable privacy legislation.", ". La Société s’engage à traiter les informations personnelles conformément à la POPIA, au RGPD (le cas échéant), au RGPD britannique, au CCPA/CPRA (le cas échéant) et à toute autre législation applicable en matière de confidentialité.")}</p>

      <h2>{legalHeading("10. ", "Information Security")}</h2>
      <p>{legalUi("The Company maintains commercially reasonable technical, administrative, and organizational safeguards. No security measure is infallible. Users remain responsible for implementing their own cybersecurity controls.", "La Société maintient des mesures de protection techniques, administratives et organisationnelles commercialement raisonnables. Aucune mesure de sécurité n’est infaillible. Les Utilisateurs restent responsables de la mise en œuvre de leurs propres contrôles de cybersécurité.")}</p>

      <h2>{legalHeading("11. ", "Third-Party Services")}</h2>
      <p>{legalUi("The Services may integrate with or provide access to third-party platforms. The Company does not control third-party services, does not guarantee their accuracy or availability, and is not responsible for third-party acts, omissions, content, or security practices. Use of third-party services is at the user's own risk.", "Les Services peuvent s’intégrer à des plateformes tierces ou en permettre l’accès. La Société ne contrôle pas les services tiers, ne garantit ni leur exactitude ni leur disponibilité et n’est pas responsable des actes, omissions, contenus ou pratiques de sécurité de tiers. L’utilisation de services tiers s’effectue aux propres risques de l’utilisateur.")}</p>

      <h2>{legalHeading("12. ", "Fees, Payments, and Billing")}</h2>
      <p>{legalUi("Where fees apply, all fees are payable in the currency specified and prices may be subject to taxes and regulatory charges. Unless otherwise stated, fees are non-refundable, and partial usage periods are not refundable. The Company reserves the right to revise pricing upon reasonable notice.", "Lorsque des frais s’appliquent, ils sont payables dans la devise indiquée et les prix peuvent être soumis à des taxes et à des frais réglementaires. Sauf indication contraire, les frais ne sont pas remboursables et les périodes d’utilisation partielles ne donnent pas droit à un remboursement. La Société se réserve le droit de réviser ses tarifs moyennant un préavis raisonnable.")}</p>

      <h2>{legalHeading("13. ", "Service Availability")}</h2>
      <p>{legalUi("The Company does not guarantee continuous availability, uninterrupted access, error-free performance, or compatibility with all devices. The Company may modify, upgrade, suspend, or discontinue features with or without prior notice where necessary for security, legal, operational, or technical reasons.", "La Société ne garantit ni une disponibilité continue, ni un accès ininterrompu, ni un fonctionnement sans erreur, ni la compatibilité avec tous les appareils. La Société peut modifier, mettre à niveau, suspendre ou supprimer des fonctionnalités, avec ou sans préavis, lorsque cela est nécessaire pour des raisons de sécurité, juridiques, opérationnelles ou techniques.")}</p>

      <h2>{legalHeading("14. ", "Disclaimers")}</h2>
      <p>{legalUi('To the maximum extent permitted by law, the Services are provided "AS IS" and "AS AVAILABLE." The Company disclaims all warranties, whether express, implied, statutory, or otherwise.', 'Dans toute la mesure permise par la loi, les Services sont fournis « EN L’ÉTAT » et « SELON DISPONIBILITÉ ». La Société exclut toute garantie, qu’elle soit expresse, implicite, légale ou autre.')}</p>

      <h2>{isSpanish() ? "15. Limitación de Responsabilidad" : legalHeading("15. ", "Limitation of Liability")}</h2>
      {isFrench() ? (
        <>
          <p>Dans toute la mesure permise par la législation applicable, la Société exclut et n’accepte aucune responsabilité découlant de, ou liée à, l’accès de l’Utilisateur à la Plateforme, à son utilisation ou à l’impossibilité de l’utiliser, ainsi qu’à ses services, contenus, fonctionnalités, jeux, intégrations de tiers ou services connexes. Sans limiter la portée de ce qui précède, la Société ne saurait être tenue responsable de tout dommage direct, indirect, accessoire, consécutif, spécial, exemplaire ou punitif, ni de toute perte de revenus, de bénéfices, d’opportunités commerciales, de clientèle ou de réputation commerciale, d’économies escomptées, de données, ou de toute autre perte économique ou non économique, que cette responsabilité découle d’un contrat, d’un délit civil (responsabilité délictuelle), d’une négligence, d’une disposition légale ou de toute autre cause. La Société ne saurait en outre être tenue responsable de toute perte, de tout dommage, de toute interruption, de tout accès non autorisé, de toute violation de données, cyberattaque, logiciel malveillant (malware), défaillance du système, acte ou omission d’un tiers, ou de tout autre incident informatique ou de sécurité causé par, ou attribuable à, des tiers ou à des circonstances échappant au contrôle raisonnable de la Société.</p>
          <p>La Société n’accepte aucune responsabilité globale ou cumulative envers l’Utilisateur. Aucun plafond monétaire de responsabilité, montant minimal de responsabilité ou montant global de responsabilité ne s’applique et aucun de ces montants ne saurait être considéré comme créant un quelconque droit à indemnisation ou à compensation.</p>
          <p>Aucune disposition de la présente clause n’exclut ni ne limite une responsabilité qui ne peut légalement être exclue ou limitée en vertu de la législation applicable, y compris les droits ou recours auxquels il ne peut être renoncé en vertu de la législation applicable en matière de protection des consommateurs.</p>
        </>
      ) : isSpanish() ? (
        <>
          <p>En la máxima medida permitida por la legislación aplicable, la Compañía excluye y no aceptará responsabilidad alguna derivada de, o relacionada con, el acceso del Usuario a la Plataforma, su uso o la imposibilidad de utilizarla, así como sus servicios, contenidos, funcionalidades, juegos, integraciones con terceros o servicios relacionados.</p>
          <p>Sin limitar lo anterior, la Compañía no será responsable de ningún daño directo, indirecto, incidental, consecuente, especial, ejemplar o punitivo, ni de ninguna pérdida de ingresos, beneficios, oportunidades comerciales, fondo de comercio, ahorros previstos, datos u otras pérdidas económicas o no económicas, ya sea que dichas pérdidas o daños se deriven de un contrato, responsabilidad extracontractual (delito civil), negligencia, disposición legal o cualquier otra causa.</p>
          <p>Asimismo, la Compañía no será responsable de ninguna pérdida, daño, interrupción, acceso no autorizado, violación de datos, ciberataque, software malicioso (malware), fallo del sistema, acto u omisión de terceros, ni de ningún otro incidente cibernético o de seguridad causado por, o atribuible a, terceros o a circunstancias que se encuentren fuera del control razonable de la Compañía.</p>
          <p>La Compañía no acepta ninguna responsabilidad agregada o acumulativa frente al Usuario. No se aplicará ningún límite monetario de responsabilidad, importe mínimo de responsabilidad ni importe de responsabilidad agregada, ni se considerará que ninguno de ellos crea derecho alguno a indemnización o compensación.</p>
          <p>Nada de lo dispuesto en esta cláusula excluye o limita cualquier responsabilidad que, conforme a la legislación aplicable, no pueda ser legalmente excluida o limitada, incluidos aquellos derechos o recursos a los que no pueda renunciarse en virtud de la legislación aplicable en materia de protección del consumidor.</p>
        </>
      ) : (
        <>
          <p>To the fullest extent permitted by applicable law, the Company excludes and shall not accept any liability arising out of or in connection with the User's access to, use of, or inability to use the Platform, its services, content, features, games, third-party integrations, or related services.</p>
          <p>Without limiting the foregoing, the Company shall not be liable for any direct, indirect, incidental, consequential, special, exemplary, or punitive damages, or for any loss of revenue, profits, business opportunities, goodwill, anticipated savings, data, or other economic or non-economic loss, whether arising in contract, delict (tort), negligence, statute, or otherwise.</p>
          <p>The Company shall further not be liable for any loss, damage, interruption, unauthorised access, data breach, cyberattack, malware, system failure, third-party act or omission, or other cyber or security incident caused by or attributable to third parties or circumstances beyond the Company's reasonable control.</p>
          <p>The Company does not accept any aggregate or cumulative liability to the User. No monetary liability cap, minimum liability amount, or aggregate liability amount shall apply or be deemed to create an entitlement to compensation.</p>
          <p>Nothing in this clause excludes or limits any liability that cannot lawfully be excluded or limited under applicable law, including any rights or remedies that may not be waived under applicable consumer protection legislation.</p>
        </>
      )}

      <h2>{legalHeading("16. ", "Indemnification")}</h2>
      <p>{legalUi("Users agree to indemnify, defend, and hold harmless the Company from and against any claims, damages, liabilities, costs, penalties, losses, expenses, and legal fees arising from violation of these Terms, unlawful conduct, regulatory breaches, intellectual property infringement, or misuse of the Services.", "Les Utilisateurs acceptent d’indemniser, de défendre et de garantir la Société contre toute réclamation, tout dommage, toute responsabilité, tout coût, toute pénalité, perte, dépense ou frais juridiques découlant de la violation des présentes conditions, d’une conduite illicite, d’un manquement réglementaire, d’une atteinte à la propriété intellectuelle ou d’une mauvaise utilisation des Services.")}</p>

      <h2>{legalHeading("17. ", "Compliance with Laws")}</h2>
      <p>{legalUi("Users agree to comply with all applicable privacy laws, consumer protection laws, anti-corruption laws, anti-money laundering laws, export control regulations, sanctions laws, and cybersecurity regulations.", "Les Utilisateurs acceptent de respecter toutes les lois applicables en matière de confidentialité, de protection des consommateurs, de lutte contre la corruption et le blanchiment d’argent, ainsi que les réglementations relatives aux contrôles à l’exportation, aux sanctions et à la cybersécurité.")}</p>

      <h2>{legalHeading("18. ", "Force Majeure")}</h2>
      <p>{legalUi("The Company shall not be liable for delays or failures caused by events beyond its reasonable control, including natural disasters, war, terrorism, civil unrest, government action, utility failures, telecommunications outages, cyberattacks, labour disputes, or pandemics.", "La Société ne saurait être responsable des retards ou défaillances causés par des événements échappant raisonnablement à son contrôle, notamment les catastrophes naturelles, la guerre, le terrorisme, les troubles civils, les mesures gouvernementales, les défaillances des services publics, les pannes de télécommunications, les cyberattaques, les conflits du travail ou les pandémies.")}</p>

      <h2>{legalHeading("19. ", "Suspension and Termination")}</h2>
      <p>{legalUi("The Company may immediately suspend or terminate access where these Terms are breached, fraud is suspected, security risks arise, or regulatory obligations require action. Termination shall not affect accrued rights, obligations, liabilities, or remedies.", "La Société peut immédiatement suspendre ou résilier l’accès en cas de violation des présentes conditions, de soupçon de fraude, de risque de sécurité ou lorsque des obligations réglementaires l’exigent. La résiliation n’affecte pas les droits, obligations, responsabilités ou recours déjà acquis.")}</p>

      <h2>{legalHeading("20. ", "Governing Law")}</h2>
      <p>{legalUi("These Terms shall be governed by and interpreted in accordance with the laws of the Republic of South Africa. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.", "Les présentes conditions sont régies et interprétées conformément aux lois de la République d’Afrique du Sud. Tout litige découlant de ces conditions relève de la compétence exclusive des tribunaux d’Afrique du Sud.")}</p>

      <h2>{legalHeading("21. ", "Dispute Resolution")}</h2>
      <p>{legalUi("Before commencing litigation, parties agree to attempt good-faith resolution through written notice of dispute, negotiation between authorized representatives, and mediation where appropriate. Nothing prevents either party from seeking urgent injunctive or equitable relief where necessary.", "Avant d’engager une procédure judiciaire, les parties conviennent de tenter de résoudre le litige de bonne foi par une notification écrite du différend, une négociation entre représentants autorisés et, le cas échéant, une médiation. Rien n’empêche l’une ou l’autre partie de solliciter en urgence une mesure injonctive ou un recours en équité lorsque cela est nécessaire.")}</p>

      <h2>{legalHeading("22. ", "Severability")}</h2>
      <p>{legalUi("If any provision is deemed invalid, unlawful, or unenforceable, the remaining provisions shall remain in full force and effect.", "Si une disposition est jugée invalide, illégale ou inapplicable, les autres dispositions resteront pleinement en vigueur.")}</p>

      <h2>{legalHeading("23. ", "Amendments")}</h2>
      <p>{legalUi("The Company reserves the right to amend these Terms at any time. Material changes will be communicated through appropriate channels. Continued use of the Services following publication of amended Terms constitutes acceptance of such changes.", "La Société se réserve le droit de modifier les présentes conditions à tout moment. Les modifications importantes seront communiquées par les canaux appropriés. La poursuite de l’utilisation des Services après la publication des conditions modifiées vaut acceptation de ces changements.")}</p>

      <h2>{legalHeading("24. ", "Contact Information")}</h2>
      <p>
        {legalUi("For legal notices, compliance inquiries, or questions relating to these Terms:", "Pour les notifications juridiques, les demandes relatives à la conformité ou les questions concernant ces conditions :")}<br /><br />
        <strong>{legalUi("Legal Department / Compliance Office", "Service juridique / Bureau de la conformité")}</strong><br />
        Lexigenz Trading<br />
        {legalUi("Email: ", "E-mail : ")}<a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a><br /><br />
        {legalUi("All legal notices must be submitted in writing and directed to the designated contact details above.", "Toutes les notifications juridiques doivent être soumises par écrit et adressées aux coordonnées désignées ci-dessus.")}
      </p>
    </LegalLayout>
  );
}
