import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export const RestaurantCarousel = ({ images }: { images: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} contentFit="cover" />
        ))}
      </ScrollView>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {activeIndex + 1}/{images.length} Photos
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', borderRadius: 20, overflow: 'hidden', marginVertical: 10 },
  image: { width: width - 20, height: 220 },
  badge: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  badgeText: { color: 'white', fontSize: 12, fontWeight: '700' },
});