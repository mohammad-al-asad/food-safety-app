import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";

export default function SlideOne() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.skipRow} />
        <View style={styles.center}>
          <Image
            source={require("@/assets/images/onboarding/onboarding1.svg")}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.title}>Scan, Check,</Text>
          <Text style={styles.title}>Eat Safely.</Text>
          <Text style={styles.subtitle}>
            Scan food products and restaurant menus to instantly check what is
            safe for you to eat.
          </Text>
        </View>
        <View style={styles.footer}>
          <CustomButton
            title="GET STARTED"
            onPress={() => router.push("/slide-2")}
          />
          <View style={styles.dots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  root: {
    flex: 1,
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  skipRow: {
    height: 28,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 250,
    height: 220,
    marginBottom: 30
  },
  title: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 14,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 310,
  },
  footer: {
    gap: 16,
    marginBottom: 50,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: "#D4D7DC",
  },
  activeDot: {
    width: 25,
    backgroundColor: colors.primary,
  },
});
