import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

export function ScannerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="close" size={20} color={colors.textPrimary} />
        </Pressable>
        <View style={styles.topActions}>
          <Ionicons name="flash-off-outline" size={18} color={colors.textPrimary} />
          <Ionicons name="sync-outline" size={18} color={colors.textPrimary} />
        </View>
      </View>

      <View style={styles.cameraStage}>
        <Image source={require("@/assets/images/icon.png")} style={styles.preview} contentFit="contain" />
        <View style={styles.scanFrame} />
        <Text style={styles.scanHint}>Align barcode inside this frame</Text>
      </View>

      <View style={styles.bottom}>
        <Pressable style={styles.scanButton} onPress={() => router.push("/(tabs)/(home)/product-details")}>
          <Ionicons name="scan-outline" size={24} color={colors.white} />
        </Pressable>
        <Text style={styles.gallery}>
          <Ionicons name="images-outline" size={16} color="#818A99" /> Gallery
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F2DCDD" },
  topBar: {
    paddingHorizontal: 16,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topActions: { flexDirection: "row", gap: 12 },
  cameraStage: { flex: 1, alignItems: "center", justifyContent: "center" },
  preview: { width: 210, height: 280, borderRadius: 12 },
  scanFrame: {
    position: "absolute",
    width: 138,
    height: 138,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 14,
  },
  scanHint: {
    position: "absolute",
    bottom: 100,
    color: colors.white,
    backgroundColor: "#111827",
    borderRadius: 9,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
  },
  bottom: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 28,
    gap: 14,
  },
  scanButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#F7C3A6",
  },
  gallery: { color: "#818A99", fontSize: 12, fontWeight: "600" },
});

