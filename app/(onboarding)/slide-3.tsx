import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";

export default function SlideThree() {
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
            source={require("@/assets/images/onboarding/onboarding3.png")}
            style={styles.image}
            contentFit="contain"
          />
          <Text style={styles.title}>Find Allergy-Friendly</Text>
          <Text style={styles.title}>Restaurants</Text>
          <Text style={styles.subtitle}>
            Discover top-rated spots nearby that cater specifically to your dietary needs and
            safety.
          </Text>
        </View>
        <View style={styles.footer}>
          <CustomButton title="NEXT" onPress={() => router.replace("/login")} />
          <View style={styles.dots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={[styles.dot, styles.activeDot]} />
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
    width: 343,
    height: 312,
    marginBottom: 24,
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
