import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors } from "@/constants/colors";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  variant?: "primary" | "secondary";
};

export function CustomButton({
  title,
  onPress,
  disabled = false,
  style,
  variant = "primary",
}: CustomButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === "secondary" && styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.text, variant === "secondary" && styles.secondaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 60,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.45,
  },
  secondary: {
    backgroundColor: colors.inputBackground,
    shadowOpacity: 0,
    elevation: 0,
  },
  secondaryText: {
    color: colors.textPrimary,
  },
});

