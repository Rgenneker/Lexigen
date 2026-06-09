import { LegalLayout } from "./LegalLayout";

export default function TermsOfUse() {
  return (
    <LegalLayout title="Terms of Use" updated="1 June 2025">
      <p>
        These Terms of Use supplement our full <a href="/terms" className="text-primary hover:underline">Terms and Conditions</a> and set out the specific rules for how you may interact with Lexigen's content, games, and community features.
      </p>

      <h2>1. Acceptable Use of the Platform</h2>
      <p>When using Lexigen, you agree to:</p>
      <ul>
        <li>Use the platform for personal vocabulary learning and development only.</li>
        <li>Engage respectfully in any community or challenge features.</li>
        <li>Not attempt to manipulate leaderboards, streaks, or scores through automated means.</li>
        <li>Not use the platform to copy, redistribute, or commercially exploit Lexigen's word content, archetype profiles, or generated material without prior written consent.</li>
      </ul>

      <h2>2. Word Content and Educational Material</h2>
      <p>
        All daily words, definitions, example sentences, archetype descriptions, and related educational content on Lexigen are created or curated by Lexigen Trading. This content is provided for personal educational use only.
      </p>
      <p>
        You may not reproduce, publish, or distribute Lexigen's word content or educational material in any medium without our express written permission.
      </p>

      <h2>3. Games and Competitive Features</h2>
      <p>
        Lexigen's word games — including Wordle (Lexigen Edition), Lexigen Game, Scrabble vs Computer, Crossword, Spelling Bee, and Word Grid — are provided for personal entertainment and educational purposes. Use of bots, scripts, or any automated tools to play games or inflate scores is strictly prohibited and will result in account suspension.
      </p>

      <h2>4. Invite and Challenge Features</h2>
      <p>
        When using Lexigen's Invite and Challenge features, you agree not to send unsolicited challenge invitations to individuals who have not consented to receive them. Repeated unsolicited invitations may result in account suspension.
      </p>

      <h2>5. User-Generated Content Standards</h2>
      <p>Journal entries and sentences you create using the Sentence Builder must not:</p>
      <ul>
        <li>Contain hate speech, harassment, discrimination, or threats.</li>
        <li>Include personally identifiable information about third parties.</li>
        <li>Promote illegal activities.</li>
        <li>Infringe any third-party intellectual property rights.</li>
      </ul>

      <h2>6. API and Technical Access</h2>
      <p>
        Lexigen does not offer a public API. Any programmatic access to our platform without prior written authorisation is prohibited. Violations may result in legal action.
      </p>

      <h2>7. Account Suspension and Termination</h2>
      <p>
        We reserve the right to suspend or terminate your account at our sole discretion if we determine that you have violated these Terms of Use or our full Terms and Conditions. Where possible, we will notify you of the reason for suspension.
      </p>

      <h2>8. Feedback and Suggestions</h2>
      <p>
        If you submit feedback, ideas, or suggestions about Lexigen, you grant us a perpetual, irrevocable, worldwide, royalty-free licence to use that feedback for any purpose, including improving the Service. You waive any moral rights in such feedback to the extent permitted by law.
      </p>

      <h2>9. Contact</h2>
      <p>
        For questions about these Terms of Use, contact <a href="mailto:legal@lexigen.app" className="text-primary hover:underline">legal@lexigen.app</a> or visit our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
      </p>
    </LegalLayout>
  );
}
