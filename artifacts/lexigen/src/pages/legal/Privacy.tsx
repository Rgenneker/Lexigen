import { LegalLayout } from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 June 2026">
      <p>
        Lexigenz Trading ("we", "us", "our") operates Lexigenz.com. This Privacy Policy explains how we handle information when you use our word generation and word-of-the-day tools. We are committed to protecting your privacy and being transparent about our practices.
      </p>

      <h2>Contents</h2>
      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
        <li>Information We Collect</li>
        <li>How We Use Information</li>
        <li>Google AdSense & Cookies</li>
        <li>Analytics</li>
        <li>Data Storage & Security</li>
        <li>Children's Privacy</li>
        <li>Your Rights</li>
        <li>Changes to This Policy</li>
        <li>Contact Us</li>
      </ol>

      <h2>1. Information We Collect</h2>
      <p>
        <strong>Word generation data:</strong> None. All word generation inputs and outputs are processed locally in your browser using JavaScript. No words, phrases, or user entries are transmitted to our servers or stored outside your device unless you choose to create an account.
      </p>
      <p>
        <strong>Automatically collected data:</strong> Like most websites, our hosting infrastructure may automatically log standard server access data, including your IP address (truncated), browser type, referring URL, pages visited, and timestamps. This data is used solely for security monitoring and aggregate traffic analysis.
      </p>
      <p>
        <strong>Contact form:</strong> If you use our contact form, it opens your email client with pre-filled content. No data passes through our servers via the form itself.
      </p>

      <h2>2. How We Use Information</h2>
      <p>We use automatically collected technical data to:</p>
      <ul>
        <li>Monitor the security and performance of the Site</li>
        <li>Understand aggregate usage patterns to improve our word generation tools</li>
        <li>Detect and prevent abuse or unauthorised access</li>
      </ul>
      <p>We do not sell, rent, or share your data with third parties for marketing purposes.</p>

      <h2>3. Google AdSense & Cookies</h2>
      <p>
        Lexigenz.com may use Google AdSense to display advertisements. Google AdSense uses cookies and similar tracking technologies to serve ads based on your prior visits to our Site and other sites on the internet.
      </p>
      <p>Cookies used by Google AdSense may include:</p>
      <ul>
        <li><strong>__ga, __gads</strong> - Google advertising and analytics cookies</li>
        <li><strong>IDE</strong> - DoubleClick cookie used by Google for targeting advertisements</li>
        <li><strong>DSID, FLC</strong> - frequency capping and ad personalisation</li>
      </ul>
      <p>You can opt out of personalised advertising at any time via Google Ads Settings, the Digital Advertising Alliance opt-out, or your browser's cookie settings.</p>
      <p>
        We also store a single theme key in your browser's localStorage to remember your light/dark mode preference. This data never leaves your device.
      </p>

      <h2>4. Analytics</h2>
      <p>
        We may use Google Analytics to understand aggregate usage of the Site. If enabled, Google Analytics collects anonymised data about pages visited, session duration, and device type. IP addresses are anonymised. You can opt out using the Google Analytics opt-out browser add-on.
      </p>

      <h2>5. Data Storage & Security</h2>
      <p>
        We implement reasonable technical measures to protect the Site from unauthorised access. Because word generation data is processed exclusively client-side and no personal word inputs are transmitted to us, the risk of a data breach affecting your generator inputs is zero by design.
      </p>
      <p>
        We cannot guarantee absolute security of data transmitted over the internet. Use the Site at your own risk in accordance with our Terms of Service.
      </p>

      <h2>6. Children's Privacy</h2>
      <p>
        Lexigenz.com is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will take steps to delete it.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have rights under applicable data protection law (including POPIA in South Africa and GDPR in the EU), including the right to access, correct, or delete personal data held about you.
      </p>
      <p>
        Because we collect minimal identifiable data, most requests can be addressed simply by clearing your browser's cookies and localStorage. For other requests, contact us at <a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a>.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Site after any changes constitutes acceptance of the revised Policy.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For privacy-related questions or requests, contact us at <a href="mailto:hello@lexigenz.com">hello@lexigenz.com</a> or visit our <a href="/contact">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
