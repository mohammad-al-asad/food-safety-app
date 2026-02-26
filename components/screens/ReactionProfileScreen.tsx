import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { colors } from "@/constants/colors";

const LEVELS = ["MILD", "MODERATE", "SEVERE", "CRITICAL"] as const;
const ICONS: Record<string, string> = {
  dairy: "🧃",
  eggs: "🍳",
  garlic: "🧄",
  corn: "🌽",
  onion: "🧅",
  peanuts: "🥜",
  shrimp: "🦐",
  treenuts: "🌰",
};

const FALLBACK = ["dairy", "eggs", "garlic", "corn", "onion", "peanuts"];

export function ReactionProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ items?: string }>();
  const items = useMemo(() => {
    const raw = params.items?.split(",").filter(Boolean) ?? [];
    return raw.length ? raw : FALLBACK;
  }, [params.items]);

  const [intensities, setIntensities] = useState<Record<string, number>>(
    Object.fromEntries(items.map((item) => [item, 1])),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Reaction Profile</Text>

        {items.map((item) => {
          const current = intensities[item] ?? 1;
          const normalized = current / (LEVELS.length - 1);
          return (
            <View style={styles.card} key={item}>
              <View style={styles.row}>
                <View style={styles.iconBadge}>
                  <Text style={styles.iconText}>{ICONS[item] ?? "➕"}</Text>
                </View>
                <Text style={styles.label}>{formatLabel(item)}</Text>
              </View>

              <Text style={styles.intensityTitle}>Intensity Level</Text>
              <View style={styles.track}>
                <View style={[styles.fill, { width: `${normalized * 100}%` }]}>
                  <LinearGradient
                    colors={["#D4AF3780", "#EC5B13"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    style={styles.fillGradient}
                  />
                </View>
                <View style={[styles.knob, { left: `${normalized * 100}%` }]} />
              </View>
              <View style={styles.levelRow}>
                {LEVELS.map((level, index) => (
                  <Pressable
                    key={level}
                    onPress={() =>
                      setIntensities((prev) => ({ ...prev, [item]: index }))
                    }
                  >
                    <Text
                      style={[
                        styles.levelText,
                        index === current && styles.levelTextActive,
                      ]}
                    >
                      {level}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          );
        })}

        <CustomButton title="SAVE" onPress={() => router.replace("/(tabs)")} />
      </ScrollView>
    </SafeAreaView>
  );
}

function formatLabel(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 10,
  },
  title: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    paddingBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 19,
    fontWeight: "700",
  },
  intensityTitle: {
    marginTop: 10,
    color: colors.textPrimary,
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
  },
  track: {
    marginTop: 8,
    height: 4,
    borderRadius: 3,
    backgroundColor: "#CFD7E9",
    position: "relative",
    justifyContent: "center",
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 3,
    overflow: "hidden",
  },
  fillGradient: {
    flex: 1,
  },
  knob: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: colors.primary,
    position: "absolute",
    marginLeft: -6,
    borderWidth:4,
    borderColor:colors.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  levelRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  levelText: {
    color: "#94A1B7",
    fontSize: 10,
    fontFamily: "Montserrat_700Bold",
  },
  levelTextActive: {
    color: colors.primary,
  },
});
