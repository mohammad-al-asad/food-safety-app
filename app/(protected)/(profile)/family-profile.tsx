import { router } from "expo-router";
import { ChevronRight, Plus } from "lucide-react-native";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const profiles = [
  {
    id: "1",
    name: "Kristin Watson",
    role: "Mom",
    allergies: 6,
    image: "https://i.pravatar.cc/150?u=kristin", // Placeholder
  },
  {
    id: "2",
    name: "Jane Cooper",
    role: "Son",
    allergies: 3,
    image: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: "3",
    name: "Cameron Williamson",
    role: "Father",
    allergies: 0,
    image: "https://i.pravatar.cc/150?u=cameron",
  },
];

export default function FamilyProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Family Profile</Text>
        <View style={{ width: 24 }} />
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Cards */}
        {profiles.map((profile) => (
          <TouchableOpacity
            key={profile.id}
            style={styles.card}
            onPress={()=>router.push("/overview")}
          >
            <Image source={{ uri: profile.image }} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.nameText}>{profile.name}</Text>
              <Text style={styles.roleText}>
                {profile.role} -
                <Text
                  style={
                    profile.allergies > 0
                      ? styles.allergyHighlight
                      : styles.noAllergyText
                  }
                >
                  {profile.allergies > 0
                    ? ` ${profile.allergies} Allergies`
                    : " No Allergies"}
                </Text>
              </Text>
            </View>
            <ChevronRight color="#C7C7CC" size={20} />
          </TouchableOpacity>
        ))}

        {/* Add New Profile Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push("/(protected)/(family-accounts)");
          }}
        >
          <Plus color="#4A6572" size={20} />
          <Text style={styles.addButtonText}>Add New Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC", // The light sage background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A2E35",
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    // Soft shadow for iOS/Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F0F0",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },
  nameText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1A2E35",
    marginBottom: 4,
  },
  roleText: {
    fontSize: 14,
    color: "#7B8E95",
  },
  allergyHighlight: {
    color: "#FF7A45", // The orange color for allergies
    fontWeight: "600",
  },
  noAllergyText: {
    color: "#7B8E95",
  },
  addButton: {
    marginTop: 10,
    height: 70,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BDC7CC",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4A6572",
    fontWeight: "500",
  },
});
