import HomeCarousal from "@/components/ui/HomeCarousel";
import { router } from "expo-router";
import { Bell, Search, Star } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Good morning,</Text>
            <Text style={styles.userName}>Ar Raihan</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBtn}
            onPress={() => router.push("/notification")}
          >
            <Bell size={24} color="#333" />
            <View style={styles.notifBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#999" />
          <TextInput
            placeholder="Search allergens or ingredients"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>

        {/* Banner Carousel */}
        <HomeCarousal />

        {/* Recent Product Scanning */}
        <SectionHeader
          title="Recent Product Scanning"
          onPress={() => router.push("/recent-product")}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.recentScroll}
        >
          <ProductCard
            img={require("@/assets/images/restaurant1.jpg")}
            name="Organic Milk"
            status="UNSAFE"
            isSafe={false}
          />
          <ProductCard
            img={require("@/assets/images/restaurant2.jpg")}
            name="Oat Bar"
            status="SAFE"
            isSafe={true}
          />
        </ScrollView>

        {/* Nearby Safe-Restaurant */}
        <SectionHeader
          title="Nearby Safe-Resturent"
          onPress={() => router.push("/nearby-restaurant")}
        />
        <RestaurantCard
          name="The Green Bistro"
          dist="0.4 miles"
          tags="Healthy & Vegan"
          safety="98% Safe"
          rating={5}
          img={require("@/assets/images/restaurant1.jpg")}
          onPress={() =>
            router.push({
              pathname: "/restaurant-details",
              params: { id: "gathering-table" },
            })
          }
        />
        <RestaurantCard
          name="Patio Burger Co."
          dist="1.2 miles"
          tags="American Classics"
          safety="98% Safe"
          rating={4}
          img={require("@/assets/images/restaurant2.jpg")}
          onPress={() =>
            router.push({
              pathname: "/restaurant-details",
              params: { id: "patio-burger" },
            })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-Components ---

const SectionHeader = ({ title, onPress }: any) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.viewAll}>View all</Text>
    </TouchableOpacity>
  </View>
);

const ProductCard = ({ name, status, isSafe, img }: any) => (
  <View style={styles.productCard}>
    <View style={styles.productImgContainer}>
      <Image style={styles.productImg} source={img} resizeMode="cover" />
    </View>
    <Text style={styles.productName}>{name}</Text>
    <Text
      style={[styles.statusText, { color: isSafe ? "#2ECC71" : "#E74C3C" }]}
    >
      {isSafe ? "✓ SAFE" : "ⓧ UNSAFE"}
    </Text>
  </View>
);

const RestaurantCard = ({
  name,
  dist,
  tags,
  safety,
  rating,
  img,
  onPress,
}: any) => (
  <TouchableOpacity
    style={styles.restCard}
    onPress={onPress}
    activeOpacity={0.9}
  >
    <Image source={img} style={styles.restImg} />
    <View style={styles.restInfo}>
      <View style={styles.restHeaderRow}>
        <Text style={styles.restName}>{name}</Text>
        <View style={styles.safetyBadge}>
          <Text style={styles.safetyText}>{safety}</Text>
        </View>
      </View>
      <Text style={styles.restSub}>
        {dist} • {tags}
      </Text>
      <View style={styles.ratingRow}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < rating ? "#FF6B00" : "none"}
            color="#FF6B00"
          />
        ))}
        <Text style={styles.reviewsText}>(120 reviews)</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// --- Styles ---

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F9F8" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: { color: "#777", fontSize: 16 },
  userName: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A" },
  notificationBtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    elevation: 2,
  },
  notifBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: "#FF6B00",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 15,
    height: 55,
    elevation: 2,
    marginBottom: 25,
  },
  searchInput: { flex: 1, fontSize: 16, marginLeft: 10 },
  bannerCarousel: {
    marginBottom: 30,
    marginHorizontal: -20, // Offsets the parent container padding to allow edge-to-edge swiping
  },
  banner: {
    borderRadius: 20,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    marginHorizontal: 20,
  },
  bannerTagline: {
    color: "#FF6B00",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 8,
  },
  bannerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bannerSub: { color: "#AAA", fontSize: 13, lineHeight: 18 },
  paginationDots: { flexDirection: "row", marginTop: 15 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 5,
  },
  activeDot: { backgroundColor: "#FF6B00", width: 16 },
  scanIconContainer: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  scannerGraphic: { backgroundColor: "#3D3129", padding: 15, borderRadius: 15 },
  arrowBtn: { backgroundColor: "#FF6B00", padding: 10, borderRadius: 50 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  viewAll: { color: "#FF6B00", fontWeight: "bold" },
  recentScroll: { marginBottom: 30 },
  productCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    width: 160,
    marginRight: 15,
  },
  productImgContainer: {
    backgroundColor: "#FDEBD0",
    height: 110,
    borderRadius: 15,
    marginBottom: 10,
  },
  productImg: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
  productName: { fontWeight: "bold", fontSize: 15, marginBottom: 4 },
  statusText: { fontSize: 11, fontWeight: "800" },
  restCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    marginBottom: 15,
  },
  restImg: { width: 80, height: 80, borderRadius: 15 },
  restInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  restHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restName: { fontSize: 16, fontWeight: "bold" },
  safetyBadge: {
    backgroundColor: "#D5F5E3",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  safetyText: { color: "#27AE60", fontSize: 10, fontWeight: "bold" },
  restSub: { color: "#777", fontSize: 12, marginVertical: 4 },
  ratingRow: { flexDirection: "row", alignItems: "center" },
  reviewsText: { color: "#AAA", fontSize: 10, marginLeft: 5 },
});

export default Home;
