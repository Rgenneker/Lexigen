import { motion } from "framer-motion";
import { LegalLayout } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout title="Terms & Conditions" updated="1 June 2025">
      <p>
        These Terms and Conditions ("Terms") govern your use of the Lexigen platform, including the website, mobile application, and all related services (collectively, the "Service"), operated by Lexigen Trading ("Lexigen", "we", "our", or "us"), a company registered in South Africa.
      </p>
      <p>
        By accessing or using Lexigen, you agree to be bound by these Terms. If you do not agree, you may not use the Service.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use Lexigen. If you are under 18, you confirm that you have the consent of a parent or legal guardian. By using the Service, you represent that you meet these requirements.
      </p>

      <h2>2. Account Registration</h2>
      <p>
        You may use certain features of Lexigen without registering an account. Where registration is required, you agree to provide accurate, current, and complete information. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.
      </p>

      <h2>3. Permitted Use</h2>
      <p>You agree to use Lexigen only for lawful, personal, and non-commercial purposes. You must not:</p>
      <ul>
        <li>Copy, reproduce, or resell any content from the Service without prior written permission.</li>
        <li>Attempt to reverse-engineer, scrape, or extract data from the platform.</li>
        <li>Use the Service to transmit spam, malware, or any harmful content.</li>
        <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
        <li>Interfere with or disrupt the integrity or performance of the Service.</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        All content on Lexigen — including but not limited to word content, definitions, example sentences, archetype profiles, design elements, logos, and branding — is the exclusive property of Lexigen Trading or its licensors and is protected by applicable intellectual property laws. "Lexigen" is a registered trademark of Lexigen Trading.
      </p>
      <p>
        You are granted a limited, non-exclusive, non-transferable licence to access and use the Service for personal, non-commercial purposes only. This licence does not include any right to sublicense, modify, adapt, translate, or create derivative works of any content.
      </p>

      <h2>5. User-Generated Content</h2>
      <p>
        Lexigen allows you to create journal entries, practice sentences, and other user content ("User Content"). You retain ownership of your User Content. By submitting User Content, you grant Lexigen a worldwide, royalty-free, non-exclusive licence to use, store, display, and reproduce your User Content solely for the purpose of operating and improving the Service.
      </p>
      <p>
        You are solely responsible for your User Content and represent that it does not violate any third-party rights or applicable laws.
      </p>

      <h2>6. Premium Subscriptions</h2>
      <p>
        Lexigen offers optional paid subscription plans ("Premium"). By subscribing, you authorise recurring charges to your payment method at the interval selected (monthly, annual, or lifetime). Subscriptions automatically renew unless cancelled before the renewal date. Refunds are handled in accordance with our Refund Policy, available on request.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        The Service is provided "as is" and "as available" without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement. Lexigen does not guarantee that the Service will be uninterrupted, error-free, or completely secure.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by applicable law, Lexigen Trading and its officers, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service, even if we have been advised of the possibility of such damages.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the South African courts.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms at any time. Material changes will be communicated via the Service or by email. Continued use of the Service after changes take effect constitutes your acceptance of the revised Terms.
      </p>

      <h2>11. Contact</h2>
      <p>
        For questions about these Terms, contact us at <a href="mailto:legal@lexigen.app" className="text-primary hover:underline">legal@lexigen.app</a>.
      </p>
    </LegalLayout>
  );
}
