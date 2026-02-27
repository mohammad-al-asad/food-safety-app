import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <CustomInput
          label="Current Password"
          placeholder="***********"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />

        <CustomInput
          label="New Password"
          placeholder="***********"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />

        <CustomInput
          label="Confirm Password"
          placeholder="***********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.footer}>
        <CustomButton title="Update Password" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E9ECEA",
  },
  content: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 8,
    gap: 12,
  },
  footer: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});
