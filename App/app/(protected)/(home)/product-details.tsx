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
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductDetailsScreen = () => {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Header Area */}
        <View style={styles.hero}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
          <Text style={styles.heroTitle}>Product Details</Text>

          <View style={styles.alertContainer}>
            <Ionicons name="warning" size={32} color="white" />
            <Text style={styles.alertText}>Allergen Detected</Text>
          </View>
        </View>

        {/* 2. Product Card */}
        <View style={styles.productCard}>
          <Image
            source={require("@/assets/images/scanBottle.png")} // Use your specific milk image
            style={styles.productImg}
            contentFit="cover"
          />
          <View style={styles.productInfo}>
            <Text style={styles.upcText}>UPC: 0123456789012</Text>
            <Text style={styles.productName}>Organic Whole Milk</Text>
          </View>
        </View>

        <View style={styles.body}>
          {/* 3. Ingredients Section */}
          <Text style={styles.sectionTitle}>Full Ingredients Breakdown</Text>
          <View style={styles.ingredientBox}>
            <Text style={styles.paragraph}>
              Grade A Organic{" "}
              <Text style={styles.highlightDanger}>Pasteurized Milk</Text>,
              <Text style={styles.highlightInfo}> Vitamin D3</Text>,
              <Text style={styles.highlightWarn}> Natural Stabilizers</Text>{" "}
              (Pectin, Locust Bean Gum), Live Active Cultures (L. Bulgaricus, S.
              Thermophilus, L. Acidophilus, Bifidus, L. Casei).
            </Text>

            <View style={styles.legendRow}>
              <LegendTag label="High Risk" color="#D7473A" dot />
              <LegendTag label="Additive" color="#EAB308" dot />
              <LegendTag label="Fortified" color="#0EA5E9" dot />
            </View>
          </View>

          {/* 4. High Risk Allergens */}
          <View style={styles.sectionHeaderRow}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color="#D7473A"
            />
            <Text style={styles.sectionTitleInline}>High Risk Allergens</Text>
          </View>
          <View style={styles.tagContainer}>
            <Tag label="DAIRY / MILK" type="danger" />
            <Tag label="LACTOSE" type="danger" />
          </View>

          {/* 5. May Contain */}
          <View style={styles.sectionHeaderRow}>
            <MaterialCommunityIcons
              name="information"
              size={20}
              color="#EAB308"
            />
            <Text style={styles.sectionTitleInline}>May Contain</Text>
          </View>
          <View style={styles.tagContainer}>
            <Tag label="TRACES OF SOY" type="warn" />
            <Tag label="TREE NUTS" type="warn" />
          </View>

          {/* 6. Medical Note */}
          <View style={styles.noteBox}>
            <Text style={styles.noteText}>
              <Text style={{ fontWeight: "bold", color: "#333" }}>
                Medical Note:
              </Text>{" "}
              This product contains ingredients that may cause an allergic
              reaction.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push("/(protected)/(home)/product-ingredients")
            }
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="format-list-checks"
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>View more Ingredients</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// --- Sub-components ---

const LegendTag = ({ label, color, dot }: any) => (
  <View style={[styles.legendTag, { borderColor: color }]}>
    {dot && <View style={[styles.dot, { backgroundColor: color }]} />}
    <Text style={[styles.legendText, { color }]}>{label}</Text>
  </View>
);

const Tag = ({ label, type }: { label: string; type: "danger" | "warn" }) => (
  <View
    style={[
      styles.mainTag,
      type === "danger" ? styles.tagDanger : styles.tagWarn,
    ]}
  >
    <Text
      style={[
        styles.mainTagText,
        type === "danger" ? styles.textDanger : styles.textWarn,
      ]}
    >
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F4F7F4" },
  content: { paddingBottom: 40 },
  hero: {
    paddingTop: 50,
    backgroundColor: "#D7473A",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 40,
    alignItems: "center",
  },
  back: { position: "absolute", left: 20, top: 10 },
  heroTitle: { color: "white", fontSize: 16, fontWeight: "600" },
  alertContainer: { alignItems: "center", marginTop: 20 },
  alertText: { color: "white", fontSize: 28, fontWeight: "800", marginTop: 5 },

  productCard: {
    backgroundColor: "white",
    marginHorizontal: 20,
    marginTop: -30,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  productImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
  },
  productInfo: { marginLeft: 15 },
  upcText: { color: "#888", fontSize: 12 },
  productName: { fontSize: 18, fontWeight: "bold", color: "#1A1C1E" },

  body: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1C1E",
    marginBottom: 15,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },
  sectionTitleInline: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1A1C1E",
    marginLeft: 8,
  },

  ingredientBox: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  paragraph: { fontSize: 14, color: "#555", lineHeight: 22 },
  highlightDanger: {
    color: "#D7473A",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  highlightWarn: { backgroundColor: "#FEF9C3", color: "#854D0E" },
  highlightInfo: { color: "#0EA5E9" },

  legendRow: { flexDirection: "row", gap: 10, marginTop: 15 },
  legendTag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  legendText: { fontSize: 11, fontWeight: "700" },

  tagContainer: { flexDirection: "row", gap: 10 },
  mainTag: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    alignItems: "center",
  },
  tagDanger: { backgroundColor: "#FEE2E2", borderColor: "#FCA5A5" },
  tagWarn: { backgroundColor: "#FEF9C3", borderColor: "#FDE047" },
  mainTagText: { fontWeight: "800", fontSize: 13 },
  textDanger: { color: "#B91C1C" },
  textWarn: { color: "#854D0E" },

  noteBox: {
    backgroundColor: "#F3F4F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  noteText: { fontSize: 12, color: "#666", lineHeight: 18 },
  button: {
    backgroundColor: "#F97316", // The exact orange from your image
    height: 56,
    borderRadius: 16, // Highly rounded corners
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // Shadow for better depth
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 10, // Spacing between icon and text
  },
});

export default ProductDetailsScreen;
