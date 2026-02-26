import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/slide-1");
    }, 1400);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.logo} contentFit="contain" />
      <Text style={styles.tagline}>Eating safely.</Text>
      <Text style={styles.tagline}>Simplified.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.appBackground,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 26,
    borderRadius: 18,
  },
  tagline: {
    color: colors.textPrimary,
    fontSize: 36,
    fontStyle: "italic",
    lineHeight: 41,
    fontFamily: "serif",
  },
});
