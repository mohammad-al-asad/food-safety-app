import { Ionicons } from "@expo/vector-icons";
import {
  type BarcodeScanningResult,
  type BarcodeType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

const SUPPORTED_BARCODE_TYPES: BarcodeType[] = [
  "qr",
  "ean13",
  "ean8",
  "upc_a",
  "upc_e",
  "code39",
  "code93",
  "code128",
  "pdf417",
  "datamatrix",
  "itf14",
  "codabar",
  "aztec",
];

function ScanProductScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanEnabled, setScanEnabled] = useState(true);
  const [torchEnabled, setTorchEnabled] = useState(false);

  const {path} = useLocalSearchParams()
  
  useFocusEffect(
    useCallback(() => {
      setScanEnabled(true);
      setTorchEnabled(false);
    }, []),
  );

  const handleBarcodeScanned = useCallback(
    (result: BarcodeScanningResult) => {
      if (!scanEnabled) {
        return;
      }

      setScanEnabled(false);
      router.push({
        pathname: path as any,
        params: {
          code: result.data,
          codeType: result.type,
        },
      });
    },
    [router, scanEnabled],
  );

  if (!permission) {
    return (
      <SafeAreaView style={styles.permissionSafe}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Preparing camera...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionSafe}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera access required</Text>
          <Text style={styles.permissionBody}>
            Allow camera permission to scan product barcodes and QR codes.
          </Text>

          <Pressable style={styles.allowButton} onPress={requestPermission}>
            <Text style={styles.allowButtonText}>Allow camera</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        enableTorch={torchEnabled}
        barcodeScannerSettings={{ barcodeTypes: SUPPORTED_BARCODE_TYPES }}
        onBarcodeScanned={scanEnabled ? handleBarcodeScanned : undefined}
      />

      <SafeAreaView style={styles.overlay} edges={["top", "bottom"]}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.iconButton}
            onPress={() => router.replace("/(protected)/(tabs)")}
          >
            <Ionicons name="close" size={22} color={colors.white} />
          </Pressable>

          <View style={styles.topRightActions}>
            <Pressable
              style={styles.iconButton}
              onPress={() => setTorchEnabled((current) => !current)}
            >
              <Ionicons
                name={torchEnabled ? "flash" : "flash-off"}
                size={18}
                color={colors.white}
              />
            </Pressable>

            <Pressable
              style={styles.iconButton}
              onPress={() => {
                setScanEnabled(true);
                router.push("/history");
              }}
            >
              <Ionicons name="refresh" size={18} color={colors.white} />
            </Pressable>
          </View>
        </View>

        <View style={styles.middleSection}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeftCorner]} />
            <View style={[styles.corner, styles.topRightCorner]} />
            <View style={[styles.corner, styles.bottomLeftCorner]} />
            <View style={[styles.corner, styles.bottomRightCorner]} />
          </View>

          <View style={styles.helperPill}>
            <Text style={styles.helperText}>
              Align barcode inside the frame
            </Text>
          </View>

          <Text style={styles.activeText}>
            {scanEnabled ? "SCANNING ACTIVE" : "SCAN COMPLETE"}
          </Text>
        </View>

        <View style={styles.bottomBar}>
          <Pressable
            style={styles.captureOuter}
            onPress={() => setScanEnabled(true)}
          >
            <View style={styles.captureInner}>
              <Ionicons name="scan" size={30} color={colors.white} />
            </View>
          </Pressable>

          <Pressable
            style={styles.galleryArea}
            onPress={() => setScanEnabled(true)}
          >
            <View style={styles.galleryButton}>
              <Ionicons name="image-outline" size={20} color={colors.white} />
            </View>
            <Text style={styles.galleryText}>GALLERY</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ScanProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8BCBB",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "rgba(24, 10, 10, 0.14)",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 5,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
  },
  topRightActions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(70, 55, 57, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  middleSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 64,
  },
  scanFrame: {
    width: 228,
    height: 228,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#5CA4A9",
    position: "relative",
  },
  corner: {
    width: 24,
    height: 24,
    borderColor: colors.primary,
    position: "absolute",
  },
  topLeftCorner: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 6,
  },
  topRightCorner: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 6,
  },
  bottomLeftCorner: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 6,
  },
  bottomRightCorner: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 6,
  },
  helperPill: {
    marginTop: 14,
    backgroundColor: "rgba(0, 0, 0, 0.88)",
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  helperText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: "Montserrat_600SemiBold",
  },
  activeText: {
    marginTop: 10,
    fontSize: 14,
    letterSpacing: 1.2,
    color: "#5CA4A9",
    fontFamily: "Montserrat_600SemiBold",
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  captureOuter: {
    width: 78,
    height: 78,
    borderRadius: 39,
    borderWidth: 4,
    borderColor: "#ec5b135b",
    alignItems: "center",
    justifyContent: "center",
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  galleryArea: {
    marginLeft: 48,
    alignItems: "center",
    marginBottom: 10,
  },
  galleryButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(70, 55, 57, 0.44)",
    alignItems: "center",
    justifyContent: "center",
  },
  galleryText: {
    marginTop: 6,
    fontSize: 11,
    color: "#EEE6E6",
    letterSpacing: 0.8,
    fontFamily: "Montserrat_600SemiBold",
  },
  permissionSafe: {
    flex: 1,
    backgroundColor: colors.appBackground,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  permissionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  permissionTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
  },
  permissionBody: {
    marginTop: 8,
    color: "#64748B",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
  },
  allowButton: {
    marginTop: 14,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  allowButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  backText: {
    marginTop: 10,
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
});
