import "dotenv/config";

export default {
  expo: {
    name: "SELECTSAFE",
    slug: "select-safe",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/AppIcon.png",
    scheme: "foodsafetyapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      config: {
        googleMapsApiKey: process.env.EXPO_PUBLIC_MAP_API_KEY,
      },
      bundleIdentifier: "com.app.selectsafe",
    },
    android: {
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_MAP_API_KEY,
        },
      },
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/AppIcon.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.app.selectsafe",
    },
    web: {
      output: "static",
      favicon: "./assets/images/icon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash.png",
          backgroundColor: "#F4F6F3",
          dark: {
            image: "./assets/images/splash.png",
            backgroundColor: "#F4F6F3",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
