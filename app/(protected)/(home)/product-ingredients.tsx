import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Base palette from your images
const UI_COLORS = {
  bg: "#F4F9F4", // Light mint background
  text: "#1A1C1E",
  subtext: "#64748B",
  white: "#FFFFFF",
  severe: "#DC2626",
  severeBg: "#FEE2E2",
  moderate: "#EA580C",
  moderateBg: "#FFEDD5",
  safe: "#22A06B",
};

const severeConcerns = [
  {
    name: "Methylparaben",
    note: "Commonly used preservative linked to endocrine disruption and allergic skin reactions.",
  },
  {
    name: "Synthetic Fragrance",
    note: "Complex mixture of chemicals that often causes respiratory irritation and contact dermatitis.",
  },
];

const moderateConcerns = [
  {
    name: "Phenoxyethanol",
    note: "Can be irritating to skin and eyes. Usage restricted in some regions.",
  },
  {
    name: "Linalool",
    note: "A naturally occurring terpene that becomes a strong allergen when oxidized.",
  },
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

export default function ProductIngredientsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color={UI_COLORS.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Product Ingredients</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Severe Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="alert-outline" size={18} color={UI_COLORS.severe} />
          <Text style={styles.sectionTitle}>Severe Concerns</Text>
        </View>
        {severeConcerns.map((item) => (
          <ConcernCard
            key={item.name}
            title={item.name}
            level="HIGH RISK"
            note={item.note}
            type="severe"
          />
        ))}

        {/* Moderate Section */}
        <View style={styles.sectionHeader}>
          <Ionicons name="alert-circle-outline" size={18} color={UI_COLORS.moderate} />
          <Text style={styles.sectionTitle}>Moderate Concerns</Text>
        </View>
        {moderateConcerns.map((item) => (
          <ConcernCard
            key={item.name}
            title={item.name}
            level="MODERATE"
            note={item.note}
            type="moderate"
          />
        ))}

        {/* Other Ingredients Section */}
        <Text style={styles.othersTitle}>Other Ingredients</Text>
        <View style={styles.listCard}>
          {others.map((item, index) => (
            <View 
              key={item} 
              style={[
                styles.itemRow, 
                index === others.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <Text style={styles.itemText}>{item}</Text>
              <MaterialCommunityIcons
                name="check-circle-outline"
                size={16}
                color={UI_COLORS.safe}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ConcernCard({ title, level, note, type }: any) {
  const isSevere = type === "severe";
  return (
    <View style={styles.concernCard}>
      <View style={styles.concernHead}>
        <Text style={styles.concernTitle}>{title}</Text>
        <View style={[
          styles.badge, 
          { backgroundColor: isSevere ? UI_COLORS.severeBg : UI_COLORS.moderateBg }
        ]}>
          <Text style={[
            styles.badgeText, 
            { color: isSevere ? UI_COLORS.severe : UI_COLORS.moderate }
          ]}>{level}</Text>
        </View>
      </View>
      <Text style={styles.concernNote}>{note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: UI_COLORS.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 4 },
  headerTitle: { 
    color: UI_COLORS.text, 
    fontSize: 17, 
    fontWeight: "800",
    textAlign: 'center' 
  },
  content: { paddingHorizontal: 16, paddingBottom: 30 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    gap: 6,
  },
  sectionTitle: {
    color: UI_COLORS.text,
    fontSize: 16,
    fontWeight: "800",
  },
  concernCard: { 
    backgroundColor: UI_COLORS.white, 
    borderRadius: 16, 
    padding: 16,
    marginBottom: 12,
    // Subtle shadow for iOS/Android
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  concernHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  concernTitle: { color: UI_COLORS.text, fontSize: 15, fontWeight: "800" },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { fontSize: 10, fontWeight: "900" },
  concernNote: { color: UI_COLORS.subtext, fontSize: 13, lineHeight: 18 },
  
  othersTitle: {
    color: UI_COLORS.text,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 24,
    marginBottom: 12,
  },
  listCard: {
    backgroundColor: UI_COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  itemText: { color: "#475569", fontSize: 14, fontWeight: "500" },
});