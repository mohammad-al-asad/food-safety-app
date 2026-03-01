import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RestaurantCarousel } from "@/components/ui/RestaurantCarousel";

type DetailTab = "reviews" | "menu" | "location";

const RESTAURANTS: Record<string, any> = {
  "gathering-table": {
    id: "gathering-table",
    name: "The Gathering Table",
    rating: 4.9,
    reviewCount: 128,
    safePercent: 98,
    description: "A community-first dining sanctuary dedicated to inclusive culinary experiences. We specialize in cross contamination prevention without compromising on the soul of the meal.",
    address: "123 Harmony Lane, Portland, OR",
    addressNote: "Free parking in rear. ADA Accessible entrance.",
    images: [
      require("@/assets/images/restaurant1.jpg"),
      require("@/assets/images/restaurant2.jpg"),
      require("@/assets/images/restaurant1.jpg"),
      require("@/assets/images/restaurant2.jpg"),
      require("@/assets/images/restaurant1.jpg"),
    ],
    reviews: [
      { id: "r1", name: "Sarah J.", allergyTag: "GLUTEN & DAIRY FREE", text: "First time I felt truly safe eating out! The staff didn't roll their eyes when I mentioned my allergies. They walked me through the kitchen's protocol. The GF lasagna was incredible.", rating: 5, date: "2 DAYS AGO" },
      { id: "r2", name: "Marcus L.", allergyTag: "SEVERE PEANUT ALLERGY", text: "Their 'The Gathering' protocol is the gold standard. I usually carry two EpiPens but I actually relaxed for once. Knowledgeable staff.", rating: 5, date: "1 WEEK AGO" },
    ],
    menu: [
      { id: "m1", name: "Nitrogen Sushi Roll", description: "Flash-frozen salmon, neon roe, tec..", price: 24, safe: true, image: require("@/assets/images/restaurant2.jpg") },
      { id: "m2", name: "Circuit Burger", description: "A5 Wagyu, digital-aged cheddar, soy-", price: 28, safe: false, image: require("@/assets/images/restaurant1.jpg") },
      { id: "m3", name: "Cyber Cube Cake", description: "Matcha geometry, binary-drizzled hon", price: 18, safe: true, image: require("@/assets/images/menuBanner.png") },
    ],
  },
};

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; tab?: string }>();
  const [activeTab, setActiveTab] = useState<DetailTab>("reviews");

  const restaurant = useMemo(() => RESTAURANTS[params.id ?? "gathering-table"], [params.id]);
  const carouselImages = restaurant.images?.length
    ? restaurant.images
    : [require("@/assets/images/restaurant1.jpg")];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}><Ionicons name="arrow-back" size={24} color="#374151" /></Pressable>
          <Text style={styles.headerTitle}>Restaurant Details</Text>
          <Pressable><Ionicons name="heart-outline" size={24} color="#132333" /></Pressable>
        </View>

        <RestaurantCarousel images={carouselImages} />

        {/* Title & Safe Badge */}
        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <View style={styles.safeBadge}>
              <View style={styles.shieldIcon}>
                 <Ionicons name="shield-checkmark-outline" size={20} color="#24A867" />
              </View>
              <Text style={styles.safeBadgeText}>{restaurant.safePercent}% SAFE</Text>
            </View>
          </View>
          
          <View style={styles.ratingRow}>
            <Ionicons name="medical" size={14} color="#F46811" />
            <Text style={styles.ratingText}>{restaurant.rating} <Text style={styles.reviewCountText}>({restaurant.reviewCount} community reviews)</Text></Text>
          </View>
          
          <Text style={styles.descriptionText}>{restaurant.description}</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["reviews", "menu", "location"].map((tab) => (
            <Pressable 
              key={tab} 
              onPress={() => setActiveTab(tab as DetailTab)}
              style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Content Area */}
        {activeTab === "reviews" && (
          <View style={styles.listContainer}>
            {restaurant.reviews.map((review: any) => (
              <View key={review.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{getInitials(review.name)}</Text></View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.userName}>{review.name}</Text>
                    <Text style={styles.userAllergy}>{review.allergyTag}</Text>
                  </View>
                  <View style={styles.stars}>
                    {[...Array(5)].map((_, i) => <Ionicons key={i} name="star" size={14} color="#F46811" />)}
                  </View>
                </View>
                <Text style={styles.cardBody}>{review.text}</Text>
                <View style={styles.cardFooter}>
                  <Ionicons name="calendar-outline" size={12} color="#9CA3AF" />
                  <Text style={styles.dateText}>{review.date}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "menu" && (
          <View style={styles.listContainer}>
            {restaurant.menu.map((item: any) => (
              <View key={item.id} style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                  <Image source={item.image} style={styles.menuThumb} />
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <View style={styles.menuHeader}>
                      <Text style={styles.menuTitle}>{item.name}</Text>
                      <Text style={styles.menuPrice}>${item.price}</Text>
                    </View>
                    <Text style={styles.menuDesc} numberOfLines={1}>{item.description}</Text>
                    <View style={[styles.badge, item.safe ? styles.badgeSafe : styles.badgeWarn]}>
                      <Text style={[styles.badgeText, item.safe ? styles.badgeTextSafe : styles.badgeTextWarn]}>
                        {item.safe ? "✓ SAFE" : "⚠ CONTAINS SOY"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === "location" && (
          <View style={styles.locationContainer}>
             <View style={styles.mapView}>
               {/* Simplified UI Map placeholder as seen in image */}
               <View style={styles.mapGrid} />
             </View>
             <View style={styles.addressSection}>
                <View style={styles.addressRow}>
                  <Ionicons name="location-outline" size={18} color="#F46811" />
                  <Text style={styles.addressMain}>{restaurant.address}</Text>
                </View>
                <Text style={styles.addressSub}>{restaurant.addressNote}</Text>
             </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('');
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F5F2" },
  content: { padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937' },
  carouselContainer: { borderRadius: 16, overflow: 'hidden', position: 'relative' },
  heroImage: { width: '100%', height: 200 },
  photoCountBadge: { position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  photoCountText: { color: 'white', fontSize: 10, fontWeight: '600' },
  titleSection: { marginTop: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  restaurantName: { fontSize: 28, fontWeight: '800', color: '#111827', flex: 1 },
  safeBadge: { backgroundColor: '#DFF7EC', padding: 10, borderRadius: 12, alignItems: 'center' },
  shieldIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ECFDF3",
    alignItems: "center",
    justifyContent: "center",
  },
  safeBadgeText: { color: '#24A867', fontSize: 10, fontWeight: '900', marginTop: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { color: '#F46811', fontWeight: '700', marginLeft: 4 },
  reviewCountText: { color: '#6B7280', fontWeight: '400' },
  descriptionText: { color: '#6B7280', marginTop: 12, lineHeight: 18 },
  tabContainer: { flexDirection: 'row', marginTop: 20, gap: 8 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#F3F4F6' },
  tabButtonActive: { backgroundColor: '#F46811' },
  tabText: { color: '#4B5563', fontWeight: '600' },
  tabTextActive: { color: 'white' },
  listContainer: { marginTop: 16, gap: 12 },
  card: { backgroundColor: 'white', padding: 16, borderRadius: 16 },
  cardHeader: { flexDirection: "row", alignItems: "center" },
  stars: { flexDirection: "row", gap: 1 },
  userName: { fontWeight: '700', color: '#111827' },
  userAllergy: { color: '#F46811', fontSize: 10, fontWeight: '800', marginTop: 2 },
  cardBody: { color: '#4B5563', marginTop: 12, lineHeight: 18 },
  dateText: { color: '#9CA3AF', fontSize: 10, marginLeft: 4 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFEDD5', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#C2410C', fontWeight: '700' },
  menuThumb: { width: 70, height: 70, borderRadius: 12 },
  menuHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  menuTitle: { fontWeight: '700', fontSize: 15 },
  menuPrice: { color: '#F46811', fontWeight: '800' },
  menuDesc: { color: '#9CA3AF', fontSize: 12, marginVertical: 4 },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeSafe: { backgroundColor: '#DFF7EC' },
  badgeWarn: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 9, fontWeight: '800' },
  badgeTextSafe: { color: '#24A867' },
  badgeTextWarn: { color: '#EF4444' },
  locationContainer: { marginTop: 16, borderRadius: 16, overflow: 'hidden', backgroundColor: 'white' },
  mapView: { height: 180, backgroundColor: '#A3C9AD' },
  mapGrid: {
    flex: 1,
    margin: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  addressSection: { padding: 16 },
  addressMain: { fontWeight: '600', color: '#1F2937', marginLeft: 8 },
  addressSub: { color: '#9CA3AF', fontSize: 12, marginTop: 4, marginLeft: 26 },
  addressRow: { flexDirection: 'row', alignItems: 'center' }
});
