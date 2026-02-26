import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { colors } from "@/constants/colors";
import SquareIcon from "@/components/SquareIcon";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <SquareIcon>
          <Ionicons name="refresh-circle-outline" size={30} color={colors.primary} />
        </SquareIcon>
        <Text style={styles.heading}>Forgot Password?</Text>
        <Text style={styles.subHeading}>
          Enter your email address to receive a 4-digit verification code to reset your password.
        </Text>

        <View style={styles.form}>
          <CustomInput
            label="Email / Phone"
            placeholder="example@mail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CustomButton title="Send Verification Code" onPress={() => router.push("/verify-identity")} />
        </View>

        <Text style={styles.footerText}>
          Remember your password?{" "}
          <Text style={styles.link} onPress={() => router.replace("/login")}>
            Back to Log In
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingTop: 50
  },
  content: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 36,
    paddingBottom: 26,
  },
  heading: {
    marginTop: 16,
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 10,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  form: {
    marginTop: 30,
    gap: 16,
  },
  footerText: {
    marginTop: "auto",
    textAlign: "center",
    color: colors.textMuted,
  },
  link: {
    color: colors.primary,
    fontWeight: "700",
  },
});
