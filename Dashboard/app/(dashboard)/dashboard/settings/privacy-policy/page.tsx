"use client"
import RichTextSettingsEditor from "@/components/ui/RichTextSettingsEditor";

const initialPrivacyPolicyHtml = `
  <p>Iacus nulla eu netus pretium. Pellentesque scelerisque tellus nisl eu nisl sed senectus nunc. Porta sollicitudin vel elit varius nulla sit diam sed. Bibendum elit facilisi nulla viverra augue pellentesque gravida morbi.</p>
  <p><br /></p>
  <p>Diam pellentesque orci eget gravida cursus. Ut ut nulla sapien eget vitae at eget pretium. Tristique nibh ipsum iaculis quam. Vestibulum magna cursus facilisis adipiscing cras dui. Risus auctor faucibus orci tortor tristique elit. Sit tincidunt id felis malesuada placerat ultricies enim. Purus ut congue ornare id sed. Enim libero tincidunt facilisis non facilisis mattis praesent. Magna volutpat at cras urna adipiscing vitae velit enim volutpat. Ac tincidunt et sed dolor ipsum. Purus nunc turpis scelerisque pellentesque lectus mauris imperdiet. Turpis orci consectetur enim posuere faucibus praesent.</p>
  <p><br /></p>
  <p>Ut suscipit cursus id mauris. Accumsan egestas sit arcu sed. Feugiat tortor pharetra id ipsum elit diam viverra tortor. Mattis tincidunt eget ut nunc in. Mauris ipsum ut purus laoreet nisi eu viverra velit adipiscing. Diam sit cursus id semper sit. Urna morbi nisl est vel tincidunt. Egestas.</p>
`;

export default function PrivacyPolicyPage() {
  return (
    <RichTextSettingsEditor
      title="Privacy Policy"
      initialHtml={initialPrivacyPolicyHtml}
      onSave={(content) => {
        console.log("Privacy policy saved:", content);
      }}
    />
  );
}
