import { router } from "expo-router";
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  Pencil,
  Phone,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateProfileScreen() {
  const [userType, setUserType] = useState("Adult");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="#1A2E35" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Avatar Uploader */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity style={styles.avatarCircle}>
              <Camera color="#FF7A45" size={40} strokeWidth={1.5} />
              <View style={styles.editBadge}>
                <Pencil color="#FFF" size={12} fill="#FFF" />
              </View>
            </TouchableOpacity>
            <Text style={styles.uploadText}>Upload Profile Photo</Text>
          </View>

          {/* Segmented Control */}
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              style={[
                styles.segment,
                userType === "Adult" && styles.activeSegment,
              ]}
              onPress={() => setUserType("Adult")}
            >
              <Text
                style={[
                  styles.segmentText,
                  userType === "Adult" && styles.activeSegmentText,
                ]}
              >
                Adult
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segment,
                userType === "Child" && styles.activeSegment,
              ]}
              onPress={() => setUserType("Child")}
            >
              <Text
                style={[
                  styles.segmentText,
                  userType === "Child" && styles.activeSegmentText,
                ]}
              >
                Child
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John Doe"
              placeholderTextColor="#A0A0A0"
            />

            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 10 }}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  keyboardType="numeric"
                  placeholderTextColor="#A0A0A0"
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.label}>Gender</Text>
                <TouchableOpacity style={[styles.input, styles.dropdown]}>
                  <Text style={styles.dropdownText}>Select</Text>
                  <ChevronDown color="#7B8E95" size={20} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.label}>Contact Number</Text>
            <View style={styles.phoneInputContainer}>
              <Phone color="#A0AEC0" size={20} style={styles.phoneIcon} />
              <TextInput
                style={styles.phoneInput}
                placeholder="+1 (555) 000-0000"
                keyboardType="phone-pad"
                placeholderTextColor="#A0AEC0"
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => router.push("/select-allergies")}
          >
            <Text style={styles.submitButtonText}>Add Allergies Food</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9EFEC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A2E35",
  },
  scrollContent: {
    padding: 24,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: "#FF7A45",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#FF7A45",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E9EFEC",
  },
  uploadText: {
    marginTop: 12,
    fontSize: 14,
    color: "#7B8E95",
  },
  segmentedControl: {
    flexDirection: "row",
    backgroundColor: "#E2DDD3",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  segment: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeSegment: {
    backgroundColor: "#EF6820",
  },
  segmentText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#7B8E95",
  },
  activeSegmentText: {
    color: "#FFF",
  },
  form: {
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A2E35",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1A2E35",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#1A2E35",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  phoneIcon: {
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1A2E35",
  },
  submitButton: {
    backgroundColor: "#EF6820",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#EF6820",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
