import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// import { useColorScheme } from "@/components/useColorScheme";
import { SafeAreaView } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack screenOptions={{ contentStyle: { backgroundColor: "#ffffff" } }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: "fade",
          }}
        />
        <Stack.Screen
          name="(kakaologin)/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(home)/home_shop"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(chart)/papular_chart"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(mypage)/mypage_shop"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
    </SafeAreaView>
  );
}
