import { router } from "expo-router";
import { getProfile, login } from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";
import { getToken, saveToken } from "./token";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogin = async () => {
  const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
  try {
    const result = await login();
    const profile = await getProfile();
    try {
      const res = await axios.post(`${BASE_URL}/auth/sign-in`, {
        socialAccessToken: result.accessToken,
      });
      if (res.status === 200) {
        useUserInfoStore.getState().setUser({
          id: res.data.memberId,
          isNewMember: res.data.isNewMember,
        });
        await saveToken(res.data.response.accessToken);
        useUserInfoStore.getState().setUser({ name: profile.name });
      }
    } catch (err) {
      console.error(err);
    }
    Alert.alert("카카오 로그인 성공");

    router.push({
      pathname: "/[userid]/onboarding/purpose",
      params: { userid: String(useUserInfoStore.getState().user.id) },
    });
  } catch (error) {
    console.error("로그인 실패 ❌", error);
    Alert.alert("카카오 로그인 실패", String(error));
  }
};
