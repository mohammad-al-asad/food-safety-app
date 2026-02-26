import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";

export default function SlideTwo() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <Text onPress={() => router.replace("/login")} style={styles.skip}>
            Skip
          </Text>
        </View>
        <View style={styles.center}>
          <Image
            source={require("@/assets/images/onboarding/onboarding2.svg")}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.title}>Personalized Allergy</Text>
          <Text style={styles.title}>Detection</Text>
          <Text style={styles.subtitle}>
            We&apos;ll scan every ingredient to keep you safe and smiling.
          </Text>
        </View>
        <View style={styles.footer}>
          <CustomButton title="NEXT" onPress={() => router.push("/slide-3")} />
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
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
  header: {
    height: 28,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  skip: {
    color: colors.textMuted,
    fontSize: 13,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 331,
    height: 272,
    marginBottom: 22,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 36,
    lineHeight: 40,
    fontWeight: "800",
    textAlign: "center",
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
    marginBottom:50
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
