import { colors } from "@/constants/colors";
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

const SquareIcon = ({ children }: { children: ReactNode }) => {
  return <View style={styles.iconCircle}>{children}</View>;
};

export default SquareIcon;

const styles = StyleSheet.create({
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#EC5C141A",
  },
});
