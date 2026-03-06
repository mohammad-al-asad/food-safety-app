"use client"

import RichTextSettingsEditor from "@/components/ui/RichTextSettingsEditor";

const initialTermsHtml = `
  <p>By accessing and using this platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using the service.</p>
  <p><br /></p>
  <ol>
    <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
    <li>You agree to provide accurate information and keep your profile updated.</li>
    <li>Any misuse of the platform, including fraudulent activity, may lead to suspension or termination.</li>
    <li>Subscription fees, if applicable, are non-refundable unless stated otherwise.</li>
  </ol>
  <p><br /></p>
  <p>We reserve the right to update these terms at any time. Continued use of the platform after updates means you accept the revised terms.</p>
`;

export default function TermsConditionsPage() {
  return (
    <RichTextSettingsEditor
      title="Terms & Conditions"
      initialHtml={initialTermsHtml}
      onSave={(content) => {
        console.log("Terms & Conditions saved:", content);
      }}
    />
  );
}
