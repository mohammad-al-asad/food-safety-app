import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";
import { CustomButton } from "@/components/ui/CustomButton";

const FEATURES = [
  { name: "Featured Restaurant Listing", icon: "star-outline" },
  { name: "Priority Search Placement", icon: "trending-up" },
  { name: "Advanced Customer Analytics", icon: "magnify-scan" },
  { name: "Verified Merchant Badge", icon: "shield-check-outline" },
];

export default function SubscriptionPlanScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        {/* Trial Status Card */}
        <View style={styles.trialCard}>
          <View style={styles.trialHeader}>
            <Text style={styles.trialLabel}>7-Day Free Trial</Text>
            <View style={styles.remainingWrap}>
              <Text style={styles.remainingText}>REMAINING</Text>
              <View style={styles.daysRow}>
                <Text style={styles.remainingValue}>05</Text>
                <Text style={styles.daysLabel}>Days</Text>
              </View>
            </View>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.price}>$29</Text>
            <Text style={styles.priceSuffix}>/mo after</Text>
          </View>

          {/* Progress Bar Component */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: "70%" }]} />
            </View>
            <View style={styles.periodRow}>
              <Text style={styles.periodText}>STARTED OCT 12</Text>
              <Text style={styles.periodText}>ENDS OCT 19</Text>
            </View>
          </View>
        </View>

        {/* Pro Plan Details Card */}
        <View style={styles.planCard}>
          <View style={styles.planTopRow}>
            <View style={styles.planTag}>
              <Text style={styles.planTagText}>PRO PLAN</Text>
            </View>
            <Text style={styles.billingText}>Monthly Billing</Text>
          </View>

          <View style={styles.planPriceRow}>
            <Text style={styles.planPrice}>$29</Text>
            <Text style={styles.planPriceSuffix}>/mo</Text>
          </View>

          <View style={styles.featureList}>
            {FEATURES.map((feature, index) => (
              <View key={feature.name} style={styles.featureRow}>
                <View style={styles.iconContainer}>
                   {/* Using specific icons from the image */}
                   {index === 0 && <Ionicons name="star-outline" size={18} color="#F16A59" />}
                   {index === 1 && <Ionicons name="trending-up" size={18} color="#F16A59" />}
                   {index === 2 && <MaterialCommunityIcons name="magnify-scan" size={18} color="#F16A59" />}
                   {index === 3 && <Ionicons name="shield-checkmark-outline" size={18} color="#94A3B8" />}
                </View>
                <Text style={[styles.featureText, index === 3 && styles.disabledFeature]}>
                  {feature.name}
                </Text>
              </View>
            ))}
          </View>

          <CustomButton 
            onPress={() => {}} 
            title="Start 7-Day Free Trial" 
            style={styles.ctaButton}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.securityIcons}>
           <Ionicons name="shield-half" size={20} color="#374151" />
           <Ionicons name="card-outline" size={20} color="#374151" />
           <Ionicons name="checkmark-circle" size={20} color="#374151" />
        </View>
        <Text style={styles.noteText}>
          Payments are secure and encrypted. Cancel anytime from your App Store settings. Terms and conditions apply.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F3F5F2",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  trialCard: {
    borderRadius: 20,
    backgroundColor: "#F7F3EB",
    padding: 20,
  },
  trialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  trialLabel: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  remainingWrap: {
    alignItems: "center",
  },
  remainingText: {
    color: "#F46811",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  daysRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  remainingValue: {
    color: "#111827",
    fontSize: 32,
    fontWeight: "800",
  },
  daysLabel: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "700",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: -10,
  },
  price: {
    color: "#111827",
    fontSize: 48,
    fontWeight: "900",
  },
  priceSuffix: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#F46811", // Orange bar
    borderRadius: 4,
  },
  periodRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  periodText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
  },
  planCard: {
    borderRadius: 20,
    backgroundColor: "#F7F3EB",
    padding: 24,
    flex: 1,
    maxHeight: 480,
  },
  planTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTag: {
    backgroundColor: "#FFEDD5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  planTagText: {
    color: "#F46811",
    fontSize: 12,
    fontWeight: "900",
  },
  billingText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "500",
  },
  planPriceRow: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "baseline",
  },
  planPrice: {
    color: "#111827",
    fontSize: 64,
    fontWeight: "900",
  },
  planPriceSuffix: {
    color: "#6B7280",
    fontSize: 18,
    fontWeight: "600",
  },
  featureList: {
    marginTop: 30,
    gap: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 24,
    alignItems: "center",
  },
  featureText: {
    color: "#1F2937",
    fontSize: 15,
    fontWeight: "600",
  },
  disabledFeature: {
    color: "#9CA3AF",
  },
  ctaButton: {
    marginTop: 30,
    height: 60,
    borderRadius: 16,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
  securityIcons: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
  },
  noteText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
  },
});