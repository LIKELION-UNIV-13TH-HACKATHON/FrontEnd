import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { http } from "../http";

export const createUser = async (nickname: string, userId?: string) => {
  try {
    const res = await http.post("/members/customers", {
      nickname: nickname,
      isTermAgreed: true,
    });
    if (res.status === 200) {
      Alert.alert("회원 생성 성공!");
      if (userId) {
        try {
          await AsyncStorage.mergeItem(
            `roleFlags:${userId}`,
            JSON.stringify({ hasConsumer: true })
          );
        } catch (e) {
          console.warn("Failed to persist local role flag", e);
        }
      }
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
