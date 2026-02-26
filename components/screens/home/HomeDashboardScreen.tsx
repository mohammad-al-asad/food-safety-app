import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

const recentItems = [
  { id: "milk", name: "Organic Milk", risk: "Unsafe", image: require("@/assets/images/icon.png") },
  { id: "bar", name: "Oat Bar", risk: "Review", image: require("@/assets/images/icon.png") },
];

const nearby = [
  { id: "1", name: "The Green Bistro", distance: "2.1 mi away", score: "98% Safe" },
  { id: "2", name: "Patio Burger Co.", distance: "4.3 mi away", score: "96% Safe" },
];

export function HomeDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.name}>Ar Raihan</Text>
          </View>
          <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
        </View>

        <Pressable style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#9AA4B5" />
          <Text style={styles.searchText}>Search allergens or ingredients</Text>
        </Pressable>

        <Pressable style={styles.scanCard} onPress={() => router.push("/(tabs)/(home)/scanner")}>
          <View>
            <Text style={styles.scanLabel}>INSTANT ANALYZER</Text>
            <Text style={styles.scanTitle}>Scan Product</Text>
            <Text style={styles.scanSub}>Check ingredients instantly for your saved allergies.</Text>
          </View>
          <View style={styles.scanIconWrap}>
            <Ionicons name="barcode-outline" size={22} color={colors.white} />
          </View>
        </Pressable>

        <SectionTitle title="Recent Product Scanning" action="View all" />
        <View style={styles.recentRow}>
          {recentItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.recentCard}
              onPress={() => router.push("/(tabs)/(home)/product-details")}
            >
              <Image source={item.image} style={styles.recentImage} contentFit="cover" />
              <Text style={styles.recentName}>{item.name}</Text>
              <Text style={[styles.recentRisk, item.risk === "Unsafe" && styles.riskUnsafe]}>{item.risk}</Text>
            </Pressable>
          ))}
        </View>

        <SectionTitle title="Nearby Safe-Restaurant" action="View all" />
        <View style={styles.nearbyList}>
          {nearby.map((item) => (
            <Pressable key={item.id} style={styles.nearbyCard}>
              <Image source={require("@/assets/images/icon.png")} style={styles.nearbyImage} contentFit="cover" />
              <View style={styles.nearbyMeta}>
                <Text style={styles.nearbyName}>{item.name}</Text>
                <Text style={styles.nearbyDistance}>{item.distance}</Text>
              </View>
              <Text style={styles.nearbyScore}>{item.score}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ title, action }: { title: string; action: string }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionAction}>{action}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.appBackground },
  content: { paddingHorizontal: 14, paddingTop: 10, paddingBottom: 22 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { color: "#94A3B8", fontSize: 12 },
  name: { color: colors.textPrimary, fontSize: 20, fontWeight: "700", marginTop: 2 },
  searchBar: {
    marginTop: 14,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#E7ECF3",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchText: { color: "#9AA4B5", fontSize: 13 },
  scanCard: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: "#141F30",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scanLabel: { color: "#E5A448", fontSize: 10, fontWeight: "700" },
  scanTitle: { color: colors.white, fontSize: 22, fontWeight: "700", marginTop: 4 },
  scanSub: { color: "#C3CDD8", fontSize: 12, maxWidth: 220, marginTop: 6, lineHeight: 16 },
  scanIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHead: {
    marginTop: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: "700" },
  sectionAction: { color: colors.primary, fontSize: 11, fontWeight: "600" },
  recentRow: { flexDirection: "row", gap: 10 },
  recentCard: { flex: 1, backgroundColor: colors.white, borderRadius: 12, padding: 10 },
  recentImage: { width: "100%", height: 65, borderRadius: 10, marginBottom: 6 },
  recentName: { color: colors.textPrimary, fontSize: 12, fontWeight: "600" },
  recentRisk: { color: "#A0A7B5", fontSize: 11, marginTop: 4 },
  riskUnsafe: { color: "#E84C3D", fontWeight: "700" },
  nearbyList: { gap: 10 },
  nearbyCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  nearbyImage: { width: 46, height: 46, borderRadius: 8 },
  nearbyMeta: { flex: 1 },
  nearbyName: { color: colors.textPrimary, fontSize: 13, fontWeight: "700" },
  nearbyDistance: { color: "#97A3B5", fontSize: 11, marginTop: 2 },
  nearbyScore: { color: "#22A06B", fontSize: 11, fontWeight: "700" },
});

