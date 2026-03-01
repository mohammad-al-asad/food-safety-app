import { ProfileContent } from "@/components/ui/ProfileContent";

const PRIVACY_ITEMS = [
  "We collect account details, allergy preferences and usage analytics to personalize your safety recommendations.",
  "Your personal data is encrypted in transit and at rest, and access is limited to authorized services only.",
  "We do not sell your personal information to third parties. Data sharing is only for essential platform features.",
  "You can request data correction or deletion from account settings, subject to legal and security retention requirements.",
  "Policy updates are published in app and take effect on the listed date. Continued use indicates acceptance.",
];

export default function PrivacyPolicyScreen() {
  return <ProfileContent items={PRIVACY_ITEMS} />;
}
