import { LegalLayout } from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 June 2025">
      <p>
        Lexigen Trading ("Lexigen", "we", "our", or "us") is committed to protecting your personal information. This Privacy Policy explains what data we collect, why we collect it, how we use it, and your rights regarding that data, in accordance with the Protection of Personal Information Act, 4 of 2013 (POPIA) and other applicable data protection laws.
      </p>

      <h2>1. Who We Are</h2>
      <p>
        Lexigen Trading is the responsible party (controller) for personal information collected through the Lexigen platform. We are registered in South Africa. Our data contact is <a href="mailto:privacy@lexigen.app" className="text-primary hover:underline">privacy@lexigen.app</a>.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We collect the following categories of personal information:</p>
      <ul>
        <li><strong>Account data:</strong> Username, email address (where provided), and language preference.</li>
        <li><strong>Profile data:</strong> Birth date (used solely to calculate your vocabulary archetype).</li>
        <li><strong>Usage data:</strong> Streak records, badges earned, words learned, game scores, and journal entries you create.</li>
        <li><strong>Technical data:</strong> IP address, browser type, device type, and referring URLs — collected automatically for security and performance monitoring.</li>
        <li><strong>Payment data:</strong> If you subscribe to Premium, payment is processed by our third-party payment provider. We do not store your full card details.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To deliver and personalise your daily vocabulary experience.</li>
        <li>To calculate and display your birth archetype profile.</li>
        <li>To track your learning progress, streaks, and badges.</li>
        <li>To process Premium subscription payments.</li>
        <li>To send service-related communications (e.g., streak reminders, updates).</li>
        <li>To improve the Service through anonymised analytics.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>4. Legal Basis for Processing</h2>
      <p>We process your personal information on the following lawful bases:</p>
      <ul>
        <li><strong>Contract performance:</strong> To deliver the Service you have signed up for.</li>
        <li><strong>Legitimate interests:</strong> To improve and secure the Service, and to prevent fraud.</li>
        <li><strong>Consent:</strong> For optional communications and non-essential cookies.</li>
        <li><strong>Legal obligation:</strong> To comply with applicable South African and international law.</li>
      </ul>

      <h2>5. Data Sharing</h2>
      <p>
        We do not sell your personal information. We may share data with trusted service providers (such as our cloud hosting, payment processor, and analytics provider) who process data on our behalf under confidentiality agreements. We may also disclose data when required by law or to protect the rights and safety of Lexigen and its users.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your personal information for as long as your account is active or as needed to provide the Service. You may request deletion of your account and associated data at any time by contacting <a href="mailto:privacy@lexigen.app" className="text-primary hover:underline">privacy@lexigen.app</a>.
      </p>

      <h2>7. Your Rights</h2>
      <p>Under POPIA and applicable law, you have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Correct inaccurate or incomplete information.</li>
        <li>Request deletion of your data ("right to be forgotten").</li>
        <li>Object to certain processing activities.</li>
        <li>Lodge a complaint with the Information Regulator of South Africa.</li>
      </ul>

      <h2>8. Cookies</h2>
      <p>
        We use cookies and similar technologies to operate the Service. See our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a> for full details.
      </p>

      <h2>9. Children's Privacy</h2>
      <p>
        Lexigen is not directed at children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such data, we will delete it promptly.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of material changes via the Service or by email. Continued use of the Service after updates constitutes acceptance of the revised policy.
      </p>

      <h2>11. Contact</h2>
      <p>
        For privacy-related enquiries, contact our Information Officer at <a href="mailto:privacy@lexigen.app" className="text-primary hover:underline">privacy@lexigen.app</a>.
      </p>
    </LegalLayout>
  );
}
