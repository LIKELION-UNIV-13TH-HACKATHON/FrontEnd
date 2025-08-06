import { getProfile, login } from "@react-native-seoul/kakao-login";
import { Alert, Image, Pressable } from "react-native";

const KakaoLoginButton = () => {
  const handleLogin = async () => {
    try {
      const result = await login();
      const profile = await getProfile();
      console.log("로그인 성공 ✅", result);
      console.log("프로필 로딩 성공 ✅", profile);
      Alert.alert("카카오 로그인 성공", JSON.stringify(result));
    } catch (error) {
      console.error("로그인 실패 ❌", error);
      Alert.alert("카카오 로그인 실패", String(error));
    }
  };

  return (
    <Pressable onPress={handleLogin}>
      <Image source={require("../assets/images/kakao_login.png")} />
    </Pressable>
  );
};

export default KakaoLoginButton;
