import i18n from "./index";

/**
 * Legal copy is intentionally kept outside the product locale files.  Those
 * files are generated, while this small set is maintained with the legal UI.
 */
export const isFrench = () => i18n.language.split("-")[0] === "fr";
export const isSpanish = () => i18n.language.split("-")[0] === "es";

export const legalUi = (english: string, french: string) =>
  isFrench() ? french : english;

export const legalTitles = {
  terms: ["Terms and Conditions", "Conditions générales"],
  privacy: ["Privacy Policy", "Politique de confidentialité"],
  termsOfUse: ["Terms of Use", "Conditions d'utilisation"],
  cookies: ["Cookie Policy", "Politique relative aux cookies"],
  disclaimer: ["Legal Disclaimer", "Avertissement juridique"],
} as const;

const frenchHeadings: Record<string, string> = {
  Contents: "Sommaire",
  "Acceptance of Terms": "Acceptation des conditions",
  "Use of the Service": "Utilisation du service",
  "Intellectual Property": "Propriété intellectuelle",
  "No Professional Advice": "Absence de conseil professionnel",
  "Disclaimer of Warranties": "Exclusion de garanties",
  "Limitation of Liability": "Limitation de responsabilité",
  "Third-Party Advertising": "Publicité de tiers",
  "Links to Third-Party Sites": "Liens vers des sites tiers",
  "Changes to Terms": "Modifications des conditions",
  "Governing Law": "Droit applicable",
  Contact: "Contact",
  "Information We Collect": "Informations que nous collectons",
  "How We Use Information": "Utilisation des informations",
  "Google AdSense & Cookies": "Google AdSense et cookies",
  Analytics: "Analyses",
  "Data Storage & Security": "Stockage et sécurité des données",
  "Children's Privacy": "Protection de la vie privée des enfants",
  "Your Rights": "Vos droits",
  "Changes to This Policy": "Modifications de cette politique",
  "Contact Us": "Nous contacter",
  Eligibility: "Admissibilité",
  "Business Purpose of the Services": "Objet commercial des services",
  "Account Registration": "Création de compte",
  "User Responsibilities": "Responsabilités de l'utilisateur",
  "Prohibited Conduct": "Conduite interdite",
  "Intellectual Property Rights": "Droits de propriété intellectuelle",
  "User-Generated Content": "Contenu généré par l'utilisateur",
  "Privacy and Data Protection": "Confidentialité et protection des données",
  "Information Security": "Sécurité de l'information",
  "Third-Party Services": "Services tiers",
  "Fees, Payments, and Billing": "Frais, paiements et facturation",
  "Service Availability": "Disponibilité du service",
  Disclaimers: "Exclusions de responsabilité",
  Indemnification: "Indemnisation",
  "Compliance with Laws": "Respect des lois",
  "Force Majeure": "Force majeure",
  "Suspension and Termination": "Suspension et résiliation",
  "Dispute Resolution": "Règlement des litiges",
  Severability: "Divisibilité",
  Amendments: "Modifications",
  "Contact Information": "Coordonnées",
  Introduction: "Introduction",
  "What Are Cookies?": "Que sont les cookies ?",
  "Types of Cookies We Use": "Types de cookies que nous utilisons",
  "Strictly Necessary Cookies": "Cookies strictement nécessaires",
  "Functional Cookies": "Cookies fonctionnels",
  "Performance and Analytics Cookies": "Cookies de performance et d'analyse",
  "Advertising and Marketing Cookies": "Cookies publicitaires et marketing",
  "Social Media Cookies": "Cookies de réseaux sociaux",
  "Security Cookies": "Cookies de sécurité",
  "First-Party and Third-Party Cookies": "Cookies internes et tiers",
  "Similar Tracking Technologies": "Technologies de suivi similaires",
  "Information Collected Through Cookies": "Informations collectées par les cookies",
  "Legal Basis for Cookie Processing": "Base juridique du traitement des cookies",
  "Consent Management": "Gestion du consentement",
  "How to Control Cookies": "Comment contrôler les cookies",
  "Data Retention": "Conservation des données",
  "International Data Transfers": "Transferts internationaux de données",
  "Data Security": "Sécurité des données",
  "User Rights": "Droits des utilisateurs",
  "Regulatory Compliance": "Conformité réglementaire",
  "Changes to This Cookie Policy": "Modifications de cette politique relative aux cookies",
  "Important Notice": "Avis important",
  "Information Purposes Only": "À titre informatif uniquement",
  "No Recommendation": "Absence de recommandation",
  "No Guarantee of Accuracy": "Aucune garantie d'exactitude",
  "Content and Data Disclaimer": "Avertissement concernant le contenu et les données",
  "Generator and Analytics Disclaimer": "Avertissement concernant les générateurs et analyses",
  "Third-Party Content": "Contenu tiers",
  "No Fiduciary Relationship": "Absence de relation fiduciaire",
  "User Responsibility": "Responsabilité de l'utilisateur",
  "No Warranty": "Absence de garantie",
  "Changes to This Disclaimer": "Modifications du présent avertissement",
};

export const legalHeading = (number: string, english: string) =>
  `${number}${legalUi(english, frenchHeadings[english] ?? english)}`;