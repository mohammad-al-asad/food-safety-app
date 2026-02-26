import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function AlertsTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alerts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.appBackground,
  },
  text: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
  },
});

