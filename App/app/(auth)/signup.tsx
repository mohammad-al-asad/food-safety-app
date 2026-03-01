import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import GoogleButton from "@/components/ui/GoogleButton";
import { colors } from "@/constants/colors";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.subHeading}>Join SELECTSAFE Apps.</Text>

        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <CustomInput
            label="Email"
            placeholder="Email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <CustomInput
            label="Phone"
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <CustomInput
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Pressable
            style={styles.checkboxRow}
            onPress={() => setAccepted((prev) => !prev)}
          >
            <View style={[styles.checkbox, accepted && styles.checkboxActive]}>
              {accepted ? (
                <Ionicons name="checkmark" size={14} color={colors.white} />
              ) : null}
            </View>
            <Text style={styles.checkboxText}>
              I agree to the <Text style={styles.link}>Terms & Conditions</Text>
            </Text>
          </Pressable>
          <CustomButton
            title="Sign Up"
            onPress={() => router.push("/select-allergies")}
          />
        </View>

        <Text style={styles.or}>OR CONTINUE WITH</Text>
        <GoogleButton />

        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.link} onPress={() => router.replace("/login")}>
            Log In
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
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 28,
    paddingBottom: 28,
  },
  heading: {
    color: colors.textPrimary,
    fontSize: 36,
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
    marginTop: 24,
    gap: 12,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginVertical: 15,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 5,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EBD4D4",
  },
  checkboxActive: {
    backgroundColor: colors.primary,
  },
  checkboxText: {
    color: colors.textMuted,
    fontSize: 13,
    flex: 1,
  },
  or: {
    marginVertical: 20,
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
    fontWeight: "400",
  },
});
