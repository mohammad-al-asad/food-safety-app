import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Local Mock Data to match image exactly
const FAMILY_CHECKS = [
  {
    id: "1",
    name: "Courtney Henry",
    safe: false,
    tags: ["Peanuts", "Shrimp", "Milk", "Soy"],
    image: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Eleanor Pena",
    safe: true,
    tags: ["Peanuts", "Shrimp", "Milk", "Soy"],
    image: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "Devon Lane",
    safe: false,
    tags: ["Peanuts", "Shrimp", "Milk", "Soy"],
    image: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "Jane Cooper",
    safe: true,
    tags: ["Peanuts", "Shrimp", "Milk", "Soy"],
    image: "https://i.pravatar.cc/150?u=4",
  },
];

const CHECKED_ALLERGENS = ["Peanuts", "Tree Nuts", "Gluten", "Soy"];

export default function MenuDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.hero}>
          <View style={styles.headerTop}>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Menu Details</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.heroCenter}>
            <MaterialCommunityIcons
              name="shield-check"
              size={32}
              color="#FFF"
            />
            <Text style={styles.heroMessage}>Safe for You</Text>
          </View>
        </View>

        {/* Menu Item Card */}
        <View style={styles.whiteCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200",
            }}
            style={styles.menuImage}
          />
          <Text style={styles.menuTitle}>Quinoa Power Bowl</Text>
        </View>

        {/* Ingredients Section */}
        <Text style={styles.sectionLargeTitle}>Full Ingredients Breakdown</Text>
        <View style={styles.whiteCardIngredients}>
          <Text style={styles.ingredientsText}>
            Grade A Organic <Text style={styles.textRed}>Pasteurized Milk</Text>
            .<Text style={styles.textBlue}> Vitamin D3</Text>,
            <View style={styles.highlightYellow}>
              <Text style={styles.textBrown}> Natural Stabilizers</Text>
            </View>{" "}
            (Pectin, Locust Bean Gum), Live Active Cultures (L. Bulgaricus, S.
            Thermophilus, L. Acidophilus, Bifidus, L. Casei).
          </Text>

          <View style={styles.legendRow}>
            <LegendChip label="High Risk" color="#E04E47" dot />
            <LegendChip label="Additive" color="#D9B028" dot />
            <LegendChip label="Fortified" color="#3BA9DF" dot />
          </View>
        </View>

        {/* Checked Allergens */}
        <SectionLabel label="CHECKED ALLERGENS" />
        {CHECKED_ALLERGENS.map((item) => (
          <View style={styles.allergenRow} key={item}>
            <View style={styles.allergenLeft}>
              <Text style={styles.asterisk}>✱</Text>
              <Text style={styles.allergenName}>{item}</Text>
            </View>
            <Badge text="SAFE" type="safe" />
          </View>
        ))}

        {/* Family Section */}
        <SectionLabel label="CHECKED ALLERGENS MY FAMILY" />
        {FAMILY_CHECKS.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberHeader}>
              <Image source={{ uri: member.image }} style={styles.avatar} />
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <View style={styles.tagRow}>
                  {member.tags.map((tag) => (
                    <View
                      key={tag}
                      style={[
                        styles.tag,
                        {
                          backgroundColor: member.safe ? "#43AF77" : "#EF4444",
                        },
                      ]}
                    >
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Badge
                text={member.safe ? "SAFE" : "Allergen Detected"}
                type={member.safe ? "safe" : "danger"}
              />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.swapButton}
          onPress={() => router.push("/menu-swap")}
        >
          <MaterialCommunityIcons
            name="format-list-bulleted"
            size={20}
            color="#FFF"
          />
          <Text style={styles.swapButtonText}>Swap Ingredients</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Reusable Components
const SectionLabel = ({ label }: { label: string }) => (
  <View style={styles.sectionLabelContainer}>
    <View style={styles.accentBar} />
    <Text style={styles.sectionLabelText}>{label}</Text>
  </View>
);

const LegendChip = ({ label, color, dot }: any) => (
  <View style={[styles.legendChip, { borderColor: color }]}>
    {dot && <View style={[styles.dot, { backgroundColor: color }]} />}
    <Text style={[styles.legendText, { color }]}>{label}</Text>
  </View>
);

const Badge = ({ text, type }: { text: string; type: "safe" | "danger" }) => (
  <View
    style={[
      styles.badge,
      type === "safe" ? styles.badgeSafe : styles.badgeDanger,
    ]}
  >
    <Text
      style={[
        styles.badgeText,
        type === "safe" ? styles.badgeTextSafe : styles.badgeTextDanger,
      ]}
    >
      {text}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingBottom: 100 },
  hero: {
    backgroundColor: "#43AF77",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  heroCenter: { alignItems: "center", marginTop: 15 },
  heroMessage: { color: "#FFF", fontSize: 32, fontWeight: "800", marginTop: 4 },

  whiteCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginTop: -20, // Overlap effect
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
  },
  menuImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#006B5E",
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 15,
    color: "#1F2937",
  },

  sectionLargeTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 16,
    marginTop: 25,
    color: "#111827",
  },
  whiteCardIngredients: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  ingredientsText: { fontSize: 14, color: "#4B5563", lineHeight: 22 },
  textRed: {
    color: "#EF4444",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  textBlue: { color: "#3BA9DF" },
  textBrown: { color: "#92400E" },
  highlightYellow: { backgroundColor: "#FEF3C7" },

  legendRow: { flexDirection: "row", gap: 8, marginTop: 15 },
  legendChip: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  legendText: { fontSize: 12, fontWeight: "600" },

  sectionLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 10,
  },
  accentBar: {
    width: 4,
    height: 16,
    backgroundColor: "#43AF77",
    borderRadius: 2,
    marginRight: 8,
  },
  sectionLabelText: { fontSize: 14, fontWeight: "800", color: "#1F2937" },

  allergenRow: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  allergenLeft: { flexDirection: "row", alignItems: "center" },
  asterisk: { color: "#94A3B8", marginRight: 10, fontSize: 18 },
  allergenName: { fontSize: 15, fontWeight: "600", color: "#334155" },

  memberCard: {
    backgroundColor: "#FFF",
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
  },
  memberHeader: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 45, height: 45, borderRadius: 22.5 },
  memberInfo: { flex: 1, marginLeft: 12 },
  memberName: { fontSize: 15, fontWeight: "700", color: "#1F2937" },
  tagRow: { flexDirection: "row", gap: 4, marginTop: 4 },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tagText: { color: "#FFF", fontSize: 10, fontWeight: "600" },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
    maxWidth: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeSafe: { backgroundColor: "#D1FAE5" },
  badgeDanger: { backgroundColor: "#FEE2E2" },
  badgeText: { fontSize: 11, fontWeight: "800" },
  badgeTextSafe: { color: "#059669" },
  badgeTextDanger: { color: "#DC2626" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#F4F7F5",
  },
  swapButton: {
    backgroundColor: "#F97316",
    height: 56,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  swapButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
