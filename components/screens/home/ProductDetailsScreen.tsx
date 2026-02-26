import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";

export function ProductDetailsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Pressable style={styles.back} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={18} color={colors.white} />
          </Pressable>
          <Text style={styles.heroTitle}>Product Details</Text>
          <Text style={styles.alert}>Allergen Detected</Text>
        </View>

        <View style={styles.productCard}>
          <Image source={require("@/assets/images/icon.png")} style={styles.productImg} contentFit="cover" />
          <View>
            <Text style={styles.brand}>UPC: 01234567890</Text>
            <Text style={styles.productName}>Organi Whole Milk</Text>
          </View>
        </View>

        <Text style={styles.section}>Full Ingredients Breakdown</Text>
        <Text style={styles.paragraph}>
          Grade A Organic Pasteurized Milk, Vitamin D3, Natural Stabilizers, Pectin, Locust Bean Gum and
          Culture components.
        </Text>

        <View style={styles.badges}>
          <Tag label="High Risk" type="danger" />
          <Tag label="Additive" type="warn" />
          <Tag label="Fortified" type="info" />
        </View>

        <Text style={styles.sectionWithDot}>High Risk Allergens</Text>
        <View style={styles.badges}>
          <Tag label="DAIRY / MILK" type="dangerSolid" />
          <Tag label="LACTOSE" type="dangerSolid" />
        </View>

        <Text style={styles.sectionWithDot}>May Contain</Text>
        <View style={styles.badges}>
          <Tag label="TRACES OF SOY" type="warnSolid" />
          <Tag label="TREE NUTS" type="warnSolid" />
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            Medical Note: This product may contain ingredients that could trigger severe allergic reaction.
          </Text>
        </View>

        <CustomButton title="View more ingredients" onPress={() => router.push("/(tabs)/(home)/product-ingredients")} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Tag({ label, type }: { label: string; type: "danger" | "warn" | "info" | "dangerSolid" | "warnSolid" }) {
  const containerStyle =
    type === "danger"
      ? [styles.tag, styles.tagDanger]
      : type === "warn"
        ? [styles.tag, styles.tagWarn]
        : type === "info"
          ? [styles.tag, styles.tagInfo]
          : type === "dangerSolid"
            ? [styles.tag, styles.tagDangerSolid]
            : [styles.tag, styles.tagWarnSolid];

  const textStyle =
    type === "danger"
      ? styles.tagTextDanger
      : type === "warn"
        ? styles.tagTextWarn
        : type === "info"
          ? styles.tagTextInfo
          : type === "dangerSolid"
            ? styles.tagTextDangerSolid
            : styles.tagTextWarnSolid;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.appBackground },
  content: { paddingBottom: 20 },
  hero: { backgroundColor: "#D7473A", paddingHorizontal: 14, paddingTop: 8, paddingBottom: 18, alignItems: "center" },
  back: { position: "absolute", left: 12, top: 8, zIndex: 2 },
  heroTitle: { color: colors.white, fontSize: 12, fontWeight: "600" },
  alert: { color: colors.white, marginTop: 18, fontSize: 26, fontWeight: "800" },
  productCard: {
    marginHorizontal: 12,
    marginTop: -18,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  productImg: { width: 50, height: 50, borderRadius: 8 },
  brand: { color: "#97A3B7", fontSize: 10, fontWeight: "600" },
  productName: { color: colors.textPrimary, fontSize: 15, fontWeight: "700", marginTop: 2 },
  section: { marginTop: 14, marginHorizontal: 12, color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  paragraph: { marginTop: 8, marginHorizontal: 12, color: "#566273", fontSize: 12, lineHeight: 17 },
  badges: { marginTop: 10, marginHorizontal: 12, flexDirection: "row", flexWrap: "wrap", gap: 8 },
  sectionWithDot: { marginTop: 12, marginHorizontal: 12, color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  tag: { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6 },
  tagDanger: { backgroundColor: "#FCE7E6" },
  tagWarn: { backgroundColor: "#FFF2D8" },
  tagInfo: { backgroundColor: "#E6F0FF" },
  tagDangerSolid: { backgroundColor: "#FEE2E2" },
  tagWarnSolid: { backgroundColor: "#FEF3C7" },
  tagTextDanger: { color: "#D7483B", fontSize: 10, fontWeight: "700" },
  tagTextWarn: { color: "#B87911", fontSize: 10, fontWeight: "700" },
  tagTextInfo: { color: "#3861D0", fontSize: 10, fontWeight: "700" },
  tagTextDangerSolid: { color: "#C53030", fontSize: 10, fontWeight: "700" },
  tagTextWarnSolid: { color: "#A16207", fontSize: 10, fontWeight: "700" },
  note: { marginHorizontal: 12, marginTop: 14, borderRadius: 8, backgroundColor: "#F3F4F6", padding: 10 },
  noteText: { color: "#6B7280", fontSize: 11, lineHeight: 15 },
});
