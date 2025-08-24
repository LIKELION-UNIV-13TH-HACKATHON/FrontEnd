import { Alert } from "react-native";
import { http } from "../http";

export const createUser = async (nickname: string) => {
  try {
    const res = await http.post("/members/customers", {
      nickname: nickname,
      isTermAgreed: true,
    });
    if (res.status === 200) {
      Alert.alert("회원 생성 성공!");
    }
  } catch (err) {
    console.error(err);
  }
};
