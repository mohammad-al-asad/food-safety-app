import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { colors } from "@/constants/colors";
import { CustomButton } from "@/components/ui/CustomButton";

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>

      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrap}>
            <Image
              source={require("@/assets/images/restaurant1.jpg")}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.avatarEdit}>
              <Ionicons name="camera" size={12} color={colors.white} />
            </View>
          </View>
          <Text style={styles.photoHint}>Tap to change photo</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder="John smith" 
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput 
              style={styles.input} 
              placeholder="28/11/1997" 
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Country</Text>
            <TextInput 
              style={styles.input} 
              placeholder="United States" 
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+1234567890" 
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.footer}>
          <CustomButton 
            onPress={() => {}} 
            title="Save" 
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#E9ECEA", // Sage background
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  avatarSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    position: "relative",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  avatarEdit: {
    position: "absolute",
    right: 2,
    bottom: 5,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#ED6A58",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#E9ECEA",
  },
  photoHint: {
    marginTop: 10,
    color: "#374151",
    fontSize: 12,
    fontWeight: "500",
  },
  form: {
    gap: 16,
  },
  formGroup: {
    width: "100%",
  },
  label: {
    color: "#1F2A3A",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#FFFFFF", // White inputs like the image
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    color: "#1F2A3A",
    fontSize: 14,
  },
  footer: {
    marginTop: "auto",
    paddingBottom: 20,
  },
});