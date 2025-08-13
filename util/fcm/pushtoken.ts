import { useCallback } from "react";
import { Platform } from "react-native";
import messaging from "@react-native-firebase/messaging";

const requestUserPermission = useCallback(async () => {
  if (Platform.OS === "ios") {
    const authStatus = await messaging().requestPermission();
    const enable =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enable;
  }
  return true;
}, []);

export const getFCMToken = useCallback(async () => {
  try {
    const hasPermission = await requestUserPermission();
    if (!hasPermission) {
      throw new Error("No Permission");
    }
    const pushToken = await messaging().getToken();
    await sendTokenToSever(pushToken);
    return pushToken;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
}, []);

const sendTokenToSever = (pushToken: string) => {
  return pushToken;
};
