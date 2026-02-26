import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { colors } from "@/constants/colors";
import SquareIcon from "@/components/SquareIcon";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <SquareIcon>
          <Ionicons name="lock-closed" size={30} color={colors.primary} />
        </SquareIcon>
        <Text style={styles.heading}>Set new Password</Text>
        <Text style={styles.subHeading}>Protect your SELECTSAFE app with a high-Quality password.</Text>

        <View style={styles.form}>
          <CustomInput
            label="NEW PASSWORD"
            placeholder="Securepass!014"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <CustomInput
            label="CONFIRM PASSWORD"
            placeholder="Securepass!014"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <CustomButton title="Update Password" onPress={() => router.replace("/login")} />
        </View>

        <Text style={styles.back} onPress={() => router.replace("/login")}>
          Back to Log In
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
    marginTop: 8,
    textAlign: "center",
    color: colors.textMuted,
    fontSize: 14,
  },
  form: {
    marginTop: 30,
    gap: 14,
  },
  back: {
    marginTop: 20,
    textAlign: "center",
    color: colors.textMuted,
    textDecorationLine: "underline",
  },
});
