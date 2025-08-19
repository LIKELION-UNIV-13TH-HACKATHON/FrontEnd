import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { View } from "react-native";
import { usePathname } from "expo-router";

// import { useColorScheme } from "@/components/useColorScheme";

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
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isIndex = pathname === "/"; // expo-router index

  const paddingStyle = isIndex
    ? { paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0 }
    : {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      };

  return (
    <View className="flex-1 bg-white" style={paddingStyle}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "#ffffff" } }}>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="(kakaologin)/login"
          options={{ headerShown: false }}
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
          name="[userid]/(mypage)/mypage_customer"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/(kakaomap)/map"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shopdetail/[id]/main"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shopdetail/[id]/writequestion"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="[userid]/(notification)/notification"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="[userid]/onboarding/purpose"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="[userid]/onboarding/(customer)/writename"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="[userid]/onboarding/(shop)/writeinfo"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="[userid]/onboarding/(shop)/finalcheck"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/mypage"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/product"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/question"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/question/[boardid]"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/guide"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/inputimg"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/recommendtext"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/select"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/selftext"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/stt"
          options={{ headerShown: false, animation: "none" }}
        />
        <Stack.Screen
          name="(home)/shop/writealarm/timeset"
          options={{ headerShown: false, animation: "none" }}
        />
      </Stack>
    </View>
  );
}
