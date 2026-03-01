import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FAMILY_INGREDIENTS = [
  {
    id: "1",
    name: "Ralph Edwards",
    image: "https://i.pravatar.cc/150?u=ralph",
    rows: [
      { ingredient: "Fish", safe: true, replacement: "Soy" },
      { ingredient: "Fish", safe: false, replacement: "Soy" },
    ],
  },
  {
    id: "2",
    name: "Kristin Watson",
    image: "https://i.pravatar.cc/150?u=kristin",
    rows: [
      { ingredient: "Fish", safe: false, replacement: "Soy" },
      { ingredient: "Fish", safe: false, replacement: "Soy" },
    ],
  },
  {
    id: "3",
    name: "Jane Cooper",
    image: "https://i.pravatar.cc/150?u=jane",
    rows: [
      { ingredient: "Fish", safe: false, replacement: "Soy" },
      { ingredient: "Fish", safe: false, replacement: "Soy" },
    ],
  },
  {
    id: "4",
    name: "Jenny Wilson",
    image: "https://i.pravatar.cc/150?u=jenny",
    rows: [
      { ingredient: "Fish", safe: false, replacement: "Soy" },
      { ingredient: "Fish", safe: false, replacement: "Soy" },
    ],
  },
];

function MenuIngredientsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E2732" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu Ingredients</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <View style={styles.sectionAccent} />
          <Text style={styles.sectionText}>CHECKED ALLERGENS MY FAMILY</Text>
        </View>

        {FAMILY_INGREDIENTS.map((member) => (
          <View key={member.id} style={styles.memberCard}>
            <View style={styles.memberTop}>
              <Image source={{ uri: member.image }} style={styles.avatar} />
              <Text style={styles.memberName}>{member.name}</Text>
            </View>

            <View style={styles.rowsContainer}>
              {member.rows.map((row, index) => (
                <View key={index} style={styles.ingredientRow}>
                  {/* Left Side: Original Ingredient */}
                  <View style={styles.rowLeft}>
                    <Text style={styles.ingredientName}>{row.ingredient}</Text>
                    <View style={styles.statusRow}>
                      <MaterialCommunityIcons
                        name={row.safe ? "check" : "triangle-outline"}
                        size={12}
                        color={row.safe ? "#43AF77" : "#F87171"}
                      />
                      <Text style={[styles.statusText, row.safe ? styles.safeText : styles.dangerText]}>
                        {row.safe ? "Safe for You" : "Allergen"}
                      </Text>
                    </View>
                  </View>

                  {/* Center: Swap Icon */}
                  <MaterialCommunityIcons name="swap-horizontal" size={40} color="#FEE2E2" />

                  {/* Right Side: Replacement Dropdown */}
                  <TouchableOpacity style={styles.replaceChip}>
                    <Text style={styles.replaceText}>{row.replacement}</Text>
                    <Ionicons name="chevron-down" size={14} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F2F5F0", // Off-white background from image
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F5F0",
  },
  headerTitle: {
    color: "#1B2531",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: { width: 40 },
  headerSpacer: { width: 40 },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  sectionAccent: {
    width: 4,
    height: 18,
    borderRadius: 2,
    backgroundColor: "#43AF77",
    marginRight: 8,
  },
  sectionText: {
    color: "#1B2531",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  memberCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  memberTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  memberName: {
    color: "#1E293B",
    fontSize: 18,
    fontWeight: "700",
  },
  rowsContainer: {
    backgroundColor: "#FFF9F9", // Slight pinkish tint for the row area
    borderRadius: 12,
    padding: 8,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  rowLeft: {
    width:70
  },
  ingredientName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 4,
  },
  safeText: { color: "#43AF77" },
  dangerText: { color: "#F87171" },
  replaceChip: {
    backgroundColor: "#43AF77",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 60,
    justifyContent: "center",
  },
  replaceText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    marginRight: 4,
  },
});

export default MenuIngredientsScreen;