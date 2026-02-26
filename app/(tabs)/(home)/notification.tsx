import { router } from "expo-router";
import {
  ArrowLeft,
  FileText,
  Smartphone,
  TriangleAlert,
  UtensilsCrossed,
} from "lucide-react-native";
import React from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DATA = [
  {
    title: "Today",
    data: [
      {
        id: "1",
        type: "alert",
        title: "Allergen Detected",
        time: "12m ago",
        desc: 'Hidden peanuts found in your recent scan of "Organic Granola Bars". Do not consume.',
        icon: <TriangleAlert size={20} color="#E74C3C" />,
        bgColor: "#FDEBD0",
      },
      {
        id: "2",
        type: "menu",
        title: "Menu Update: Bistro 22",
        time: "2h ago",
        desc: "Your favorite local bistro added 3 new gluten-free options to their seasonal menu.",
        icon: <UtensilsCrossed size={20} color="#E67E22" />,
        bgColor: "#FBEEE6",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "3",
        type: "billing",
        title: "Billing Reminder",
        time: "1d ago",
        desc: "Your Premium subscription will renew on Oct 24th. Manage settings in your profile.",
        icon: <FileText size={20} color="#34495E" />,
        bgColor: "#EBF5FB",
      },
      {
        id: "4",
        type: "database",
        title: "Database Updated",
        time: "1d ago",
        desc: "Global allergen database synced. 150+ new brands verified for dairy-free compliance.",
        icon: <Smartphone size={20} color="#E74C3C" />,
        bgColor: "#FDEDEC",
      },
    ],
  },
];

const NotificationScreen = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        {item.icon}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.cardDesc}>{item.desc}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: 24 }} /> {/* Spacer for centering */}
      </View>

      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listPadding}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F8F5" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#2C3E50" },
  listPadding: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionHeader: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
    // Subtle shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { flex: 1, marginLeft: 15 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#1A1A1A" },
  timeText: { fontSize: 11, color: "#95A5A6" },
  cardDesc: { fontSize: 13, color: "#7F8C8D", lineHeight: 18 },
});

export default NotificationScreen;
