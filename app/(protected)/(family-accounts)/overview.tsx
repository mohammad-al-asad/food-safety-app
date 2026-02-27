import { Pencil } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ConfirmModal } from "@/components/ui/ConfirmModal";

const ALLERGIES = ["Peanuts", "Shrimp", "Milk", "soy"];

export default function ProfileOverviewScreen() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile Overview</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=hasan" }} // Placeholder for Hasan
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Pencil color="#FFF" size={14} fill="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Hasan</Text>

          {/* Info Chips */}
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Age: 8</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Soon</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>ID: #12345</Text>
            </View>
          </View>
        </View>

        {/* Allergy Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL ALLERGIES</Text>
          <Text style={styles.summaryCount}>8</Text>
        </View>

        {/* Severity Breakdown Section */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Allergy Severity Breakdown</Text>
          <View style={styles.tagContainer}>
            {ALLERGIES.map((allergy) => (
              <View key={allergy} style={styles.allergyTag}>
                <Text style={styles.tagText}>{allergy}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.actionButton, styles.editButton]}>
            <Text style={styles.editButtonText}>Edit Allergies</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => setShowDeleteModal(true)}
          >
            <Text style={styles.deleteButtonText}>Delete Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmModal
        visible={showDeleteModal}
        title="Confirm deleting this profile?"
        onConfirm={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC",
  },
  header: {
    paddingVertical: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A2E35",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 25,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFF",
  },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#EF6820",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1A2E35",
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    gap: 8,
  },
  chip: {
    backgroundColor: "#F0F4F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    color: "#5B7083",
    fontSize: 14,
    fontWeight: "500",
  },
  summaryCard: {
    width: "100%",
    backgroundColor: "#F7E8DB",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EBD5C1",
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5B7083",
    letterSpacing: 1,
    marginBottom: 5,
  },
  summaryCount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#EF6820",
  },
  breakdownCard: {
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A2E35",
    marginBottom: 15,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  allergyTag: {
    backgroundColor: "#FF5252",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tagText: {
    color: "#FFF",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  actionButton: {
    width: "48%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: "#F0F4F8",
    borderWidth: 1,
    borderColor: "#D1D9E0",
  },
  editButtonText: {
    color: "#1A2E35",
    fontWeight: "700",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FBCBCB",
    borderWidth: 1,
    borderColor: "#F5AFAF",
  },
  deleteButtonText: {
    color: "#D32F2F",
    fontWeight: "700",
    fontSize: 16,
  },
});
