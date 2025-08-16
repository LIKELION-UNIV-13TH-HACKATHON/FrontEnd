import { router } from "expo-router";
import { getProfile, login } from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";
import { saveToken } from "./token";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const DumpyUser = {
  name: "강대훈",
  id: 1,
  email: "crol0101@naver.com",
};

export const handleLogin = async () => {
  try {
    const result = await login();
    const profile = await getProfile();
    console.log("로그인 성공 ✅", result);
    console.log("프로필 로딩 성공 ✅", profile);
    saveToken(result.accessToken);
    //서버에서 유저 데이터 받는 로직 추가해야함, 이미 회원 정보가 있으면 메인으로 ㄱ 판매자, 소비자 둘 다 가지고 있으면 판매자 페이지가 먼저
    Alert.alert("카카오 로그인 성공", JSON.stringify(result));

    useUserInfoStore.getState().setUser(DumpyUser);
    if (useUserInfoStore.getState().user.shopMember) {
      //바로 메인
    } else if (useUserInfoStore.getState().user.customerMember) {
      router.push("/(home)/(kakaomap)/map");
    } else {
      router.push({
        pathname: "/[userid]/onboarding/purpose",
        params: { userid: String(DumpyUser.id) },
      });
    }
  } catch (error) {
    console.error("로그인 실패 ❌", error);
    Alert.alert("카카오 로그인 실패", String(error));
  }
};
