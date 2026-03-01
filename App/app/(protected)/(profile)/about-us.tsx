import { ProfileContent } from "@/components/ui/ProfileContent";

const ABOUT_ITEMS = [
  "SelectSafe helps people with food allergies make safer decisions when buying products and choosing restaurants.",
  "Our platform combines ingredient scanning, risk alerts and family profile tools in one practical daily workflow.",
  "We work with nutrition and food safety references to improve data quality and reduce avoidable allergen exposure.",
  "Our mission is simple: make safe eating easier, faster and more reliable for every household.",
];

export default function AboutUsScreen() {
  return <ProfileContent items={ABOUT_ITEMS} />;
}
