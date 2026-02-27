import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SquareIcon from "@/components/SquareIcon";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import GoogleButton from "@/components/ui/GoogleButton";
import { colors } from "@/constants/colors";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <SquareIcon>
          <Ionicons name="briefcase-outline" size={30} color={colors.primary} />
        </SquareIcon>
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Login to your SELECTSAFE Account</Text>

        <View style={styles.form}>
          <CustomInput
            label="Email / Phone"
            placeholder="name@company.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Text
            style={styles.forgot}
            onPress={() => router.push("/forgot-password")}
          >
            Forgot Password?
          </Text>
          <CustomButton
            title="Login"
            onPress={() => router.replace("/slide-1")}
          />
        </View>

        <Text style={styles.or}>OR</Text>
        <GoogleButton />

        <Text style={styles.footerText}>
          Don&apos;t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push("/signup")}>
            Sign Up
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingTop: 50,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heading: {
    marginTop: 16,
    color: colors.textPrimary,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
  },
  subHeading: {
    marginTop: 8,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
  },
  form: {
    marginTop: 28,
    gap: 12,
  },
  forgot: {
    color: colors.primary,
    alignSelf: "flex-end",
    fontSize: 13,
    fontWeight: "600",
  },
  or: {
    marginVertical: 16,
    textAlign: "center",
    color: colors.textMuted,
    fontWeight: "600",
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    color: colors.textMuted,
  },
  link: {
    color: colors.primary,
    fontWeight: "700",
  },
});
