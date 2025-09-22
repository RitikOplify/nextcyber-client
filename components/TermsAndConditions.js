import React from "react";
import Section from "./Section";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#0F1115] rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-6">Terms & Conditions</h1>

      <Section title="1. Acceptance of Terms">
        By accessing or using NextCybr, you agree to follow these Terms. If you
        do not agree, please do not use the platform.
      </Section>

      <Section title="2. Eligibility">
        You must be at least 16 years old to use NextCybr. You are responsible
        for ensuring that your use of the platform complies with applicable
        laws.
      </Section>

      <Section title="3. User Accounts">
        You must provide accurate information when creating an account and keep
        your credentials secure. You are responsible for all activities under
        your account.
      </Section>

      <Section title="4. User Conduct">
        Do not post false or harmful content, harass others, upload viruses, or
        use the platform for illegal purposes.
      </Section>

      <Section title="5. Content Ownership">
        You own the content you post but grant NextCybr a license to display it
        on the platform. We may remove content that violates these Terms.
      </Section>

      <Section title="6. Privacy">
        Your use of NextCybr is also governed by our Privacy Policy.
      </Section>

      <Section title="7. Termination">
        We may suspend or terminate your account if you violate these Terms.
      </Section>

      <Section title="8. Limitation of Liability">
        NextCybr is provided “as is.” We are not responsible for any damages or
        losses from using the platform.
      </Section>

      <Section title="9. Changes to Terms">
        We may update these Terms. Continued use means you accept the changes.
      </Section>

      <Section title="10. Contact Us">Email: support@nextcybr.com</Section>
    </div>
  );
};

export default TermsAndConditions;
