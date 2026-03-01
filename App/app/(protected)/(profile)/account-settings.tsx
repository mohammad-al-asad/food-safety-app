import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Assuming CustomButton is your orange action button
import { CustomButton } from "@/components/ui/CustomButton";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

const SETTINGS_ITEMS = [
  "Change Password",
  "Terms of condition",
  "Privacy Policy",
  "About Us",
] as const;
type SettingsItem = (typeof SETTINGS_ITEMS)[number];

const SETTINGS_ROUTES: Record<
  SettingsItem,
  "/change-password" | "/terms-of-condition" | "/privacy-policy" | "/about-us"
> = {
  "Change Password": "/change-password",
  "Terms of condition": "/terms-of-condition",
  "Privacy Policy": "/privacy-policy",
  "About Us": "/about-us",
};

export default function AccountSettingsScreen() {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.card}>
          {SETTINGS_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.row, 
                index !== SETTINGS_ITEMS.length - 1 && styles.rowDivider
              ]}
              activeOpacity={0.7}
              onPress={() => router.push(SETTINGS_ROUTES[item])}
            >
              <Text style={styles.rowLabel}>{item}</Text>
              <Ionicons name="chevron-forward" size={14} color="#8E9BAE" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton 
          onPress={() => setShowDeleteModal(true)} 
          title="Delete Account" 
          style={styles.deleteButton}
        />
      </View>

      <ConfirmModal
        visible={showDeleteModal}
        title="Confirm deleting your account?"
        onConfirm={() => setShowDeleteModal(false)}
        onCancel={() => setShowDeleteModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E9ECEA", // Pale sage background from image
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    height: 56, // Slightly taller rows for better tap targets
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9F8", // Very light divider
  },
  rowLabel: {
    color: "#2D3748", // Darker, cleaner text color
    fontSize: 15,
    fontWeight: "500",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // Spacing from bottom of screen
  },
  deleteButton: {
    backgroundColor: "#F1591B", // Specific orange from image
    borderRadius: 16,
    height: 60,
  },
});
