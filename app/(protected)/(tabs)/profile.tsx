import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/ui/CustomButton";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { colors } from "@/constants/colors";

const ACCOUNT_ROWS = [
  {
    id: "family",
    label: "Family member Manage\nallergy profiles",
    icon: "add-outline" as const,
  },
  {
    id: "edit",
    label: "Edit Profile",
    icon: "person-outline" as const,
  },
  {
    id: "subscription",
    label: "Subscription Plan",
    icon: "card-outline" as const,
    tag: "Premium",
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: "lock-closed-outline" as const,
  },
];

const ACCOUNT_ROW_ROUTE: Record<
  string,
  "/edit-profile" | "/subscription-plan" | "/account-settings" | "/family-profile"
> = {
  family: "/family-profile",
  edit: "/edit-profile",
  subscription: "/subscription-plan",
  settings: "/account-settings",
};

export default function ProfileTab() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          <View style={styles.avatarBlock}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://i.pravatar.cc/240?img=12" }}
                style={styles.avatar}
                contentFit="cover"
              />
              <View style={styles.avatarEdit}>
                <Ionicons name="pencil" size={11} color={colors.white} />
              </View>
            </View>
            <Text style={styles.name}>Raihan</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MY ALLERGY PROFILE</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/edit-profile")}
            >
              <Text style={styles.sectionAction}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.allergyCard}>
            <View style={styles.allergyHead}>
              <View>
                <Text style={styles.mutedLabel}>Active Allergens</Text>
                <Text style={styles.detectedText}>3 Allergens detected</Text>
              </View>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color="#4CA7B8"
              />
            </View>

            <View style={styles.chipRow}>
              <View style={[styles.chip, styles.chipDanger]}>
                <Text style={[styles.chipText, styles.chipTextLight]}>
                  - Peanuts
                </Text>
              </View>
              <View style={[styles.chip, styles.chipWarn]}>
                <Text style={[styles.chipText, styles.chipTextDark]}>
                  - Shellfish
                </Text>
              </View>
              <View style={[styles.chip, styles.chipInfo]}>
                <Text style={[styles.chipText, styles.chipTextLight]}>
                  - Soy
                </Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <View style={styles.accountCard}>
            {ACCOUNT_ROWS.map((row, index) => (
              <Pressable
                key={row.id}
                style={[
                  styles.accountRow,
                  index !== ACCOUNT_ROWS.length - 1 && styles.rowDivider,
                ]}
                onPress={() => {
                  const route = ACCOUNT_ROW_ROUTE[row.id];
                  if (route) {
                    router.push(route);
                  }
                }}
              >
                <View style={styles.rowLeft}>
                  <View style={styles.rowIconBox}>
                    <Ionicons name={row.icon} size={16} color="#7A8699" />
                  </View>
                  <Text style={styles.rowLabel}>{row.label}</Text>
                </View>

                <View style={styles.rowRight}>
                  {row.tag ? (
                    <View style={styles.premiumTag}>
                      <Text style={styles.premiumTagText}>{row.tag}</Text>
                    </View>
                  ) : null}
                  <Ionicons name="chevron-forward" size={16} color="#A0A8B5" />
                </View>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <CustomButton
          style={styles.logoutButton}
          onPress={() => setShowLogoutModal(true)}
          title="Logout"
        />
      </View>

      <ConfirmModal
        visible={showLogoutModal}
        title="Do you want to Log out?"
        onConfirm={() => setShowLogoutModal(false)}
        onCancel={() => setShowLogoutModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E9ECEA",
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 4,
    paddingBottom:100
  },
  content: {
    paddingBottom: 18,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  headerIcon: {
    width: 24,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#1E2732",
    fontSize: 19,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 24,
  },
  avatarBlock: {
    alignItems: "center",
    marginBottom: 12,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: "#E7EAE6",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F3F5F3",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
  },
  avatarEdit: {
    position: "absolute",
    right: 0,
    bottom: 5,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#ED6A58",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E9ECEA",
  },
  name: {
    marginTop: 8,
    color: "#1E2732",
    fontSize: 42,
    fontWeight: "700",
    lineHeight: 46,
  },
  sectionHeader: {
    marginTop: 4,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#4B5E73",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  sectionAction: {
    color: "#EF6A5B",
    fontSize: 14,
    fontWeight: "700",
  },
  allergyCard: {
    backgroundColor: "#F3F3F3",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  allergyHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  mutedLabel: {
    color: "#8A95A5",
    fontSize: 15,
    fontWeight: "500",
  },
  detectedText: {
    marginTop: 4,
    color: "#1F2A3A",
    fontSize: 20,
    lineHeight: 38,
    fontWeight: "800",
  },
  chipRow: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chipDanger: {
    backgroundColor: "#DE4E4C",
  },
  chipWarn: {
    backgroundColor: "#D9CB74",
  },
  chipInfo: {
    backgroundColor: "#5AAAB2",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "700",
  },
  chipTextLight: {
    color: colors.white,
  },
  chipTextDark: {
    color: "#374151",
  },
  accountCard: {
    marginTop: 8,
    backgroundColor: "#F3F3F3",
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  accountRow: {
    minHeight: 58,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8EBE8",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rowIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#ECEFF1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  rowLabel: {
    color: "#1F2A3A",
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    flex: 1,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  premiumTag: {
    backgroundColor: "#FFE9E4",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  premiumTagText: {
    color: "#F16A59",
    fontSize: 12,
    fontWeight: "700",
  },
  logoutButton: {
    marginBottom: 10,
  },
});
