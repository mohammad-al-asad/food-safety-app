import { Ionicons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { colors } from "@/constants/colors";

type CustomInputProps = {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad" | "number-pad";
  leftIcon?: ReactNode;
};

export function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  leftIcon,
}: CustomInputProps) {
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputShell}>
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((prev) => !prev)} hitSlop={10}>
            <Ionicons
              name={hidden ? "eye-outline" : "eye-off-outline"}
              size={24}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },
  inputShell: {
    height: 58,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  leftIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
});
