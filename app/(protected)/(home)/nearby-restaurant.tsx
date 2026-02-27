import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Filter options matching the pill labels in the image
type FilterOption = "All" | "Italian" | "Vegan" | "Top Rated";

type RestaurantSummary = {
  id: string;
  name: string;
  distanceLabel: string;
  cuisine: string;
  rating: number; // 0-5 for star rendering
  reviewCount: number;
  safetyScore: number;
  filters: FilterOption[];
  image: string;
};

const FILTERS: FilterOption[] = ["All", "Italian", "Vegan", "Top Rated"];
const TOP_RATED_MIN = 4.5;

const RESTAURANTS: RestaurantSummary[] = [
  {
    id: "1",
    name: "The Green Pantry",
    distanceLabel: "1.2 miles away",
    cuisine: "Brunch",
    rating: 4.9,
    reviewCount: 120,
    safetyScore: 98,
    filters: ["All", "Vegan"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  },
  {
    id: "2",
    name: "Linen & Lime",
    distanceLabel: "1.5 miles away",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 20,
    safetyScore: 95,
    filters: ["All", "Italian"],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400",
  },
  {
    id: "3",
    name: "Patio Burger Co.",
    distanceLabel: "2.1 miles away",
    cuisine: "Bakery",
    rating: 4.6,
    reviewCount: 85,
    safetyScore: 98,
    filters: ["All"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
  },
  {
    id: "4",
    name: "Patio Burger Co.",
    distanceLabel: "1.2 miles away",
    cuisine: "American Classics",
    rating: 4.3,
    reviewCount: 85,
    safetyScore: 81,
    filters: ["All"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400",
  },
  {
    id: "5",
    name: "Patio Burger Co.",
    distanceLabel: "1.2 miles away",
    cuisine: "American Classics",
    rating: 4.5,
    reviewCount: 85,
    safetyScore: 98,
    filters: ["All"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400",
  },
];

export default function NearbyRestaurantScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");

  const visibleRestaurants = useMemo(() => {
    if (activeFilter === "Top Rated") {
      const ranked = [...RESTAURANTS].sort(
        (a, b) =>
          b.rating - a.rating ||
          b.reviewCount - a.reviewCount ||
          b.safetyScore - a.safetyScore,
      );
      const topRated = ranked.filter((item) => item.rating >= TOP_RATED_MIN);
      return topRated.length > 0 ? topRated : ranked.slice(0, 3);
    }

    if (activeFilter === "All") return RESTAURANTS;
    return RESTAURANTS.filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </Pressable>
        <Text style={styles.headerTitle}>Nearby Restaurant</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={22}
          color="#10B981"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search restaurants, cuisines..."
          placeholderTextColor="#9CA3AF"
          style={styles.searchInput}
        />
      </View>

      {/* Filters Row */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {FILTERS.map((filter) => {
            const active = filter === activeFilter;
            return (
              <Pressable
                key={filter}
                style={[styles.filterChip, active && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                {filter === "Italian" && (
                  <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={16}
                    color={active ? "white" : "#4B5563"}
                    style={{ marginRight: 6 }}
                  />
                )}
                {filter === "Vegan" && (
                  <Ionicons
                    name="leaf-outline"
                    size={16}
                    color={active ? "white" : "#4B5563"}
                    style={{ marginRight: 6 }}
                  />
                )}
                {/* <Ionicons name="star-outline" size={18} color="#1F2937" /> */}
                {filter === "Top Rated" && (
                  <Ionicons
                    name="star-outline"
                    size={16}
                    color={active ? "white" : "#4B5563"}
                    style={{ marginRight: 6 }}
                  />
                )}
                <Text
                  style={[
                    styles.filterChipText,
                    active && styles.filterChipTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleRestaurants.map((item) => (
          <Pressable
            key={item.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/restaurant-details",
                params: { id: item.id },
              })
            }
          >
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              contentFit="cover"
            />

            <View style={styles.cardBody}>
              <View style={styles.titleRow}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <View style={styles.safeBadge}>
                  <Text style={styles.safeBadgeText}>
                    {item.safetyScore}% Safe
                  </Text>
                </View>
              </View>

              <Text style={styles.cardMeta}>
                {item.distanceLabel} • {item.cuisine}
              </Text>

              <View style={styles.ratingRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= item.rating ? "star" : "star-outline"}
                    size={14}
                    color={star <= item.rating ? "#F97316" : "#D1D5DB"}
                    style={{ marginRight: 2 }}
                  />
                ))}
                <Text style={styles.reviewText}>
                  [{item.reviewCount} reviews]
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F4F7F2", // The light sage/off-white background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "#1F2937",
    fontSize: 18,
    fontWeight: "800",
  },
  searchContainer: {
    marginHorizontal: 16,
    backgroundColor: "white",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    fontSize: 16,
    color: "#1F2937",
    flex: 1,
  },
  filtersWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  filtersRow: {
    paddingRight: 10,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "white",
    marginRight: 12,
  },
  filterChipActive: {
    backgroundColor: "#F97316", // Orange theme color
  },
  filterChipText: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "700",
  },
  filterChipTextActive: {
    color: "white",
  },
  starCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  cardBody: {
    flex: 1,
    marginLeft: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "800",
  },
  cardMeta: {
    color: "#6B7280",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  ratingRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  reviewText: {
    marginLeft: 4,
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
  },
  safeBadge: {
    backgroundColor: "#D1FAE5", // Light green badge
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  safeBadgeText: {
    color: "#10B981",
    fontSize: 11,
    fontWeight: "800",
  },
});
