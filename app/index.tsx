import SplashScreen from "@/components/splash/SplashScreen";
import { getFCMToken } from "@/util/fcm/pushtoken";
import { Platform } from "react-native";
import * as Device from "expo-device";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";

const Index = () => {
  useEffect(() => {
    (async () => {
      try {
        // iOS 시뮬레이터에서는 APNs/FCM 토큰 발급이 불가하므로 스킵
        if (Platform.OS === "ios" && !Device.isDevice) {
          await messaging().setAutoInitEnabled(false);
          console.log("Skip FCM on iOS Simulator");
          return;
        }
        const token = await getFCMToken();
        console.log("FCM Token:", token);
      } catch (error) {
        console.log("토큰 발급 실패:", error);
      }
    })();
  }, []);
  return <SplashScreen />;
};

export default Index;
