import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: "#E9ECEA" },
        headerTitleStyle: {
          fontWeight: "700",
        },
        headerTintColor: "#1E2732",
        contentStyle: { backgroundColor: "#E9ECEA" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="account-settings"
        options={{ title: "Account Settings" }}
      />
      <Stack.Screen
        name="change-password"
        options={{ title: "Change Password" }}
      />
      <Stack.Screen
        name="terms-of-condition"
        options={{ title: "Terms of Condition" }}
      />
      <Stack.Screen
        name="privacy-policy"
        options={{ title: "Privacy Policy" }}
      />
      <Stack.Screen name="about-us" options={{ title: "About Us" }} />
      <Stack.Screen
        name="subscription-plan"
        options={{ title: "Subscription Plan" }}
      />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="family-profile"
        options={{ title: "Family Profile" }}
      />
    </Stack>
  );
}
