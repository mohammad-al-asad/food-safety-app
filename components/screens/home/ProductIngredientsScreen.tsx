import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

const severeConcerns = [
  { name: "Methylparaben", note: "Commonly used preservative linked to endocrine disruption." },
  { name: "Synthetic Fragrance", note: "May include hidden compounds, many of which can trigger irritation." },
];

const moderateConcerns = [
  { name: "Phenoxyethanol", note: "Can irritate skin and eyes, especially in sensitive users." },
  { name: "Linalool", note: "A naturally occurring ingredient that can become allergenic." },
];

const others = [
  "Aqua (Water)",
  "Glycerin",
  "Caprylic/Capric Triglyceride",
  "Butyrospermum Parkii (Shea) Butter",
  "Cetearyl Alcohol",
  "Glyceryl Stearate",
  "Tocopheryl Acetate",
  "Sodium Hyaluronate",
  "Xanthan Gum",
  "Ethylhexylglycerin",
];

export function ProductIngredientsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={18} color={colors.textPrimary} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Product Ingredients</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SectionTitle title="Severe Concerns" />
        {severeConcerns.map((item) => (
          <ConcernCard key={item.name} title={item.name} level="HIGH RISK" note={item.note} color="#DC2626" />
        ))}

        <SectionTitle title="Moderate Concerns" />
        {moderateConcerns.map((item) => (
          <ConcernCard key={item.name} title={item.name} level="MODERATE" note={item.note} color="#EA580C" />
        ))}

        <SectionTitle title="Other Ingredients" />
        <View style={styles.listCard}>
          {others.map((item) => (
            <View key={item} style={styles.itemRow}>
              <Text style={styles.itemText}>{item}</Text>
              <Ionicons name="checkmark-circle-outline" size={14} color="#22A06B" />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text style={styles.sectionTitle}>
      <Ionicons name="alert-circle-outline" size={12} color={colors.textPrimary} /> {title}
    </Text>
  );
}

function ConcernCard({
  title,
  level,
  note,
  color,
}: {
  title: string;
  level: string;
  note: string;
  color: string;
}) {
  return (
    <View style={styles.concernCard}>
      <View style={styles.concernHead}>
        <Text style={styles.concernTitle}>{title}</Text>
        <Text style={[styles.levelBadge, { color }]}>{level}</Text>
      </View>
      <Text style={styles.concernNote}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.appBackground },
  header: {
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerTitle: { color: colors.textPrimary, fontSize: 12, fontWeight: "700" },
  headerSpacer: { width: 18 },
  content: { paddingHorizontal: 10, paddingBottom: 22, gap: 8 },
  sectionTitle: { marginTop: 6, color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  concernCard: { backgroundColor: colors.white, borderRadius: 10, padding: 10 },
  concernHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  concernTitle: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  levelBadge: { fontSize: 10, fontWeight: "700" },
  concernNote: { marginTop: 6, color: "#64748B", fontSize: 11, lineHeight: 15 },
  listCard: { backgroundColor: colors.white, borderRadius: 10, paddingVertical: 2, paddingHorizontal: 10 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },
  itemText: { color: "#334155", fontSize: 12 },
});

