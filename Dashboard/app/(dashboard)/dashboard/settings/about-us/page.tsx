"use client"
import RichTextSettingsEditor from "@/components/ui/RichTextSettingsEditor";

const initialAboutHtml = `
  <p>We help food businesses maintain high standards of safety and compliance through simple, practical digital tools.</p>
  <p><br /></p>
  <p>Our dashboard is built for teams that need real-time visibility into daily checks, incident reports, staff activity, and operational risks.</p>
  <p><br /></p>
  <ul>
    <li>Track hygiene and compliance tasks across branches.</li>
    <li>Manage users, roles, and verification workflows.</li>
    <li>Review earnings, reports, and subscriptions in one place.</li>
    <li>Respond faster with centralized alerts and communication tools.</li>
  </ul>
  <p><br /></p>
  <p>Our goal is to make food safety management straightforward, reliable, and easy to scale.</p>
`;

export default function AboutUsPage() {
  return (
    <RichTextSettingsEditor
      title="About Us"
      initialHtml={initialAboutHtml}
      onSave={(content) => {
        console.log("About Us saved:", content);
      }}
    />
  );
}
