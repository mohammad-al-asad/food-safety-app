import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const SCANNED_PRODUCTS = [
  { id: '1', name: 'Organic Whole Milk', status: 'safe', image: 'https://placehold.co/100x100/png?text=Milk' },
  { id: '2', name: 'Chocolate Chip Cookies', status: 'danger', image: 'https://placehold.co/100x100/png?text=Cookies' },
  { id: '3', name: 'Gluten - free Bread', status: 'danger', image: 'https://placehold.co/100x100/png?text=Bread' },
  { id: '4', name: 'Greek Vanilla Yogurt', status: 'safe', image: 'https://placehold.co/100x100/png?text=Yogurt' },
  { id: '5', name: 'Brown Rice Ckae', status: 'safe', image: 'https://placehold.co/100x100/png?text=Rice+Cake' },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Statistics Card */}
        <View style={styles.statsCard}>
          <StatItem label="Total Scans" value="42" color="#1F2937" />
          <View style={styles.divider} />
          <StatItem label="Safe Products" value="30" color="#10B981" />
          <View style={styles.divider} />
          <StatItem label="Warnings" value="12" color="#EF4444" />
        </View>

        {/* Product List */}
        {SCANNED_PRODUCTS.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              
              <View style={[styles.badge, item.status === 'safe' ? styles.badgeSafe : styles.badgeDanger]}>
                <MaterialCommunityIcons 
                  name={item.status === 'safe' ? "check" : "alert-circle"} 
                  size={14} 
                  color={item.status === 'safe' ? "#10B981" : "#EF4444"} 
                />
                <Text style={[styles.badgeText, item.status === 'safe' ? styles.textSafe : styles.textDanger]}>
                  {item.status === 'safe' ? "Safe for You" : "Allergen Detected"}
                </Text>
              </View>

              <View style={styles.cardActions}>
                <View style={styles.leftIcons}>
                  <TouchableOpacity>
                    <Ionicons name="heart-outline" size={22} color="#4B5563" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ marginLeft: 12 }}>
                    <Ionicons name="trash-outline" size={22} color="#4B5563" />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.detailsBtn} onPress={()=>router.push("/menu-details")}>
                  <Text style={styles.detailsText}>Details</Text>
                  <Ionicons name="chevron-forward" size={16} color="#F97316" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const StatItem = ({ label, value, color }: any) => (
  <View style={styles.statBox}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F6F2' },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  scrollContent: { padding: 16 },
  
  statsCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 16,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  statBox: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800' },
  statLabel: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  divider: { width: 1, height: '60%', backgroundColor: '#E5E7EB', alignSelf: 'center' },

  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: { width: 90, height: 90, borderRadius: 12, backgroundColor: '#F9FAFB' },
  productInfo: { flex: 1, marginLeft: 16 },
  productName: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 6 },
  
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeSafe: { backgroundColor: '#D1FAE5' },
  badgeDanger: { backgroundColor: '#FEE2E2' },
  badgeText: { fontSize: 11, fontWeight: '700', marginLeft: 4 },
  textSafe: { color: '#10B981' },
  textDanger: { color: '#EF4444' },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIcons: { flexDirection: 'row' },
  detailsBtn: { flexDirection: 'row', alignItems: 'center' },
  detailsText: { color: '#F97316', fontSize: 14, fontWeight: '700', marginRight: 2 },
});