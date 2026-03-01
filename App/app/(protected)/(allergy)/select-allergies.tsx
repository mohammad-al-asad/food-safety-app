import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/ui/CustomButton";
import { colors } from "@/constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";

type AllergyItem = {
  id: string;
  label: string;
  icon: string;
};

const ALLERGIES: AllergyItem[] = [
  { id: "shrimp", label: "Shrimp", icon: "🦐" },
  { id: "peanuts", label: "Peanuts", icon: "🥜" },
  { id: "treenuts", label: "Tree Nuts", icon: "🌰" },
  { id: "dairy", label: "Dairy", icon: "🧃" },
  { id: "eggs", label: "Eggs", icon: "🍳" },
  { id: "garlic", label: "Garlic", icon: "🧄" },
  { id: "corn", label: "Corn", icon: "🌽" },
  { id: "onion", label: "Onion", icon: "🧅" },
];

 function SelectAllergiesScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(["shrimp"]);
  const [customAllergy, setCustomAllergy] = useState("");
  const [customAllergies, setCustomAllergies] = useState<AllergyItem[]>([]);

  const allItems = useMemo(
    () => [...ALLERGIES, ...customAllergies],
    [customAllergies],
  );

  const toggleItem = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const addCustomAllergy = () => {
    const value = customAllergy.trim();
    if (!value) {
      return;
    }

    const id = value.toLowerCase().replace(/\s+/g, "-");
    if (allItems.some((item) => item.id === id)) {
      setCustomAllergy("");
      return;
    }

    setCustomAllergies((prev) => [...prev, { id, label: value, icon: "➕" }]);
    setSelected((prev) => [...prev, id]);
    setCustomAllergy("");
  };

  const handleContinue = () => {
    router.push({
      pathname: "/reaction-profile",
      params: { items: selected.join(",") },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Select your Allergies</Text>

        <View style={styles.grid}>
          {allItems.map((item) => {
            const active = selected.includes(item.id);
            return (
              <Pressable
                key={item.id}
                style={[styles.card, active && styles.cardActive]}
                onPress={() => toggleItem(item.id)}
              >
                <View
                  style={[
                    styles.iconBadge,
                    active && { backgroundColor: "#EC5B131A" },
                  ]}
                >
                  <Text style={styles.iconText}>{item.icon}</Text>
                </View>
                {active ? (
                  <View style={styles.check}>
                    <FontAwesome5
                      name="check-circle"
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                ) : null}
                <Text style={styles.cardLabel}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.customCard}>
          <Text style={styles.customTitle}>Add Your Own Allergy</Text>
          <View style={styles.customInputRow}>
            <TextInput
              style={styles.customInput}
              value={customAllergy}
              onChangeText={setCustomAllergy}
              placeholder="Type ingredient name..."
              placeholderTextColor="#A5AFBF"
            />
            <Pressable style={styles.plusBtn} onPress={addCustomAllergy}>
              <Text style={styles.plusText}>+</Text>
            </Pressable>
          </View>
        </View>

        <CustomButton title="CONTINUE TO DETAILS" onPress={handleContinue} />
      </ScrollView>
    </SafeAreaView>
  );
}
export default SelectAllergiesScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    textAlign: "center",
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 14,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  card: {
    width: "48%",
    // height: 130,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderWidth: 1.5,
    borderColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  iconBadge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#E9EBEF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: 18,
  },
  check: {
    position: "absolute",
    right: 10,
    top: 8,
    color: colors.primary,
    fontWeight: "700",
  },
  cardLabel: {
    marginBottom: 12,
    marginTop: 12,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  customCard: {
    marginTop: 12,
    borderRadius: 14,
    backgroundColor: "#fff",
    padding: 14,
    paddingVertical: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  customTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 5,
  },
  customInputRow: {
    marginTop: 12,
    height: 50,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 12,
    paddingRight: 8,
  },
  customInput: {
    flex: 1,
    fontSize: 13,
  },
  plusBtn: {
    width: 50,
    height: "100%",
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  plusText: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 21,
  },
});
