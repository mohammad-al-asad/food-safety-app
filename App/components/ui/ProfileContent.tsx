import { ScrollView, StyleSheet, Text, View } from "react-native";

type ProfileContentProps = {
  items: string[];
  numbered?: boolean;
};

export function ProfileContent({ items, numbered = true }: ProfileContentProps) {
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {items.map((item, index) => (
        <View key={`${index}-${item.slice(0, 14)}`} style={styles.row}>
          {numbered ? <Text style={styles.number}>{index + 1}.</Text> : null}
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  number: {
    color: "#1E2732",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 18,
    minWidth: 14,
  },
  text: {
    color: "#1E2732",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 18,
    flex: 1,
  },
});
