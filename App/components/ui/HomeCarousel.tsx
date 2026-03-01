import { Image } from "expo-image";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const SCREEN_WIDTH = Dimensions.get("window").width;

// Define your banner data
const BANNERS = [
  {
    id: "1",
    image: require("@/assets/images/productBanner.png"),
    path: "/product-details",
  },
  {
    id: "2",
    image: require("@/assets/images/menuBanner.png"),
    path: "/menu-details",
  },
];

const HomeCarousal = () => {
  const carouselRef = useRef<ICarouselInstance>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        ref={carouselRef}
        loop
        width={SCREEN_WIDTH - 40}
        height={200}
        autoPlay={true}
        autoPlayInterval={3000}
        data={BANNERS}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setActiveIdx(index)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.banner}
            onPress={() => {
              router.push({
                pathname: "/scan",
                params: { path: item.path },
              });
            }}
          >
            <Image
              source={item.image}
              style={styles.banner}
              contentFit="contain"
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.arrowBtn}
          onPress={() => carouselRef.current?.next()}
        >
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.paginationContainer}>
        {BANNERS.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, activeIdx === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};
export default HomeCarousal;

const styles = StyleSheet.create({
  carouselContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  banner: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden",
  },
  actionContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 10,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  arrowBtn: {
    backgroundColor: "#FF6B00",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  paginationContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 15,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: "#FF6B00",
    width: 18, // Long dot style like your image
  },
});
