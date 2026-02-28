import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function ExploreScreen() {
  // Initial region centered on Austin, TX as per your image
  const initialRegion = {
    latitude: 30.2672,
    longitude: -97.7431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      {/* 1. The Map Layer */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        customMapStyle={mapStyle} // See mapStyle array below
      >
        <Marker coordinate={{ latitude: 30.3, longitude: -97.74 }}>
          <View style={styles.customMarker}>
            <View style={styles.markerLabelContainer}>
              <Text style={styles.markerLabel}>The Warm Hearth</Text>
            </View>
            <Ionicons name="location" size={40} color="#E65100" />
          </View>
        </Marker>
      </MapView>

      {/* 2. Top Search Bar Area */}
      <View style={styles.topContainer}>
        <View>
          <Image
            style={{
              width: 140,
              height: 38,
              resizeMode: "contain",
              marginBottom: 10,
            }}
            source={require("@/assets/images/mapIcon.png")}
          />
        </View>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color="#E65100"
            style={{ marginHorizontal: 10 }}
          />
          <TextInput
            placeholder="Search allergen-safe spots..."
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="#E65100" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Floating Action Buttons (Right) */}
      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={24} color="#E65100" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="remove" size={24} color="#E65100" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.fab, { marginTop: 15 }]}>
          <MaterialCommunityIcons name="target" size={24} color="#E65100" />
        </TouchableOpacity>
      </View>

      {/* 4. Bottom Info Card */}
      <View style={styles.bottomCardContainer}>
        <View style={styles.infoCard}>
          <Image
            source={require("@/assets/images/restaurant1.jpg")}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <Text style={styles.restaurantName}>The Warm Hearth</Text>
              <Ionicons name="heart-outline" size={20} color="#E65100" />
            </View>
            <Text style={styles.ratingText}>⭐ 4.8 (1.2k)</Text>
            <View style={styles.tagRow}>
              <View style={[styles.tag, { backgroundColor: "#E8F5E9" }]}>
                <Text style={[styles.tagText, { color: "#2E7D32" }]}>
                  NUT FREE
                </Text>
              </View>
              <View style={[styles.tag, { backgroundColor: "#E3F2FD" }]}>
                <Text style={[styles.tagText, { color: "#1565C0" }]}>
                  GLUTEN FREE
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  topContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  brandText: {
    fontSize: 18,
    color: "#E65100",
    marginBottom: 15,
    letterSpacing: 1,
  },
  searchBar: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 30,
    height: 50,
    alignItems: "center",
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  searchInput: { flex: 1, fontSize: 16 },
  micButton: {
    padding: 10,
    backgroundColor: "#FFF3E0",
    borderRadius: 20,
    marginRight: 5,
  },
  customMarker: { alignItems: "center" },
  markerLabelContainer: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E65100",
    marginBottom: 2,
  },
  markerLabel: { color: "#E65100", fontWeight: "bold", fontSize: 12 },
  fabContainer: { position: "absolute", right: 20, top: height * 0.5 },
  fab: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 3,
  },
  bottomCardContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    paddingHorizontal: 20,
  },
  infoCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    elevation: 10,
  },
  cardImage: { width: 80, height: 80, borderRadius: 15 },
  cardContent: { flex: 1, marginLeft: 15, justifyContent: "center" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between" },
  restaurantName: { fontSize: 18, fontWeight: "bold" },
  ratingText: { color: "#666", marginVertical: 4 },
  tagRow: { flexDirection: "row", marginTop: 5 },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  tagText: { fontSize: 10, fontWeight: "bold" },
});

// Minimalist map style to match the light UI
const mapStyle = [
  { featureType: "poi", stylers: [{ visibility: "off" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];
