import { LegalLayout } from "./LegalLayout";

export default function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" updated="1 June 2025">
      <p>
        This Cookie Policy explains how Lexigen Trading ("Lexigen", "we", "our") uses cookies and similar technologies on the Lexigen platform. By continuing to use our Service, you consent to our use of cookies as described in this policy.
      </p>

      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website or use a web application. They allow the site to remember your preferences, session state, and behaviour across visits. Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (which remain on your device for a set period).
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>Lexigen uses cookies for the following purposes:</p>

      <h2>2.1 Strictly Necessary Cookies</h2>
      <p>
        These cookies are essential for the platform to function and cannot be switched off. They include session cookies that keep you logged in during a visit and security cookies that protect against cross-site request forgery (CSRF).
      </p>

      <h2>2.2 Preference Cookies</h2>
      <p>
        These cookies remember your choices — such as your selected language, theme preference, and whether you've completed the daily check-in. Without these, you would need to reset your preferences on every visit.
      </p>

      <h2>2.3 Analytics Cookies</h2>
      <p>
        We use anonymised analytics cookies to understand how users interact with Lexigen — which pages are visited most, how long users spend on each feature, and where users encounter issues. This data is aggregated and cannot identify you individually.
      </p>

      <h2>2.4 Performance Cookies</h2>
      <p>
        Performance cookies help us identify slow-loading pages and technical errors, allowing us to improve the Service experience. These cookies collect only technical performance data.
      </p>

      <h2>3. Local Storage</h2>
      <p>
        In addition to cookies, Lexigen uses browser local storage to save your language preference and session state on your device. Local storage data does not expire automatically and is not transmitted to our servers unless explicitly requested.
      </p>

      <h2>4. Third-Party Cookies</h2>
      <p>
        Where we use third-party services (such as payment processors or analytics platforms), those providers may set their own cookies on your device. We do not control third-party cookies. Please review the privacy and cookie policies of those providers directly.
      </p>

      <h2>5. Managing Cookies</h2>
      <p>
        You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling certain cookies may affect the functionality of Lexigen — for example, your language preference may not be saved between sessions.
      </p>
      <p>Browser cookie settings are available at:</p>
      <ul>
        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
        <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
        <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
      </ul>

      <h2>6. Changes to This Policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes in technology or regulation. Material changes will be communicated via the Service.
      </p>

      <h2>7. Contact</h2>
      <p>
        For questions about our use of cookies, contact <a href="mailto:privacy@lexigen.app" className="text-primary hover:underline">privacy@lexigen.app</a>.
      </p>
    </LegalLayout>
  );
}
