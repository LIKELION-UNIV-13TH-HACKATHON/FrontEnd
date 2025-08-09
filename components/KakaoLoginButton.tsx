import { handleLogin } from "@/util/kakaologin/loginapi";
import { Image, Pressable } from "react-native";

const KakaoLoginButton = () => {
  return (
    <Pressable onPress={handleLogin}>
      <Image source={require("../assets/images/kakao_login.png")} />
    </Pressable>
  );
};

export default KakaoLoginButton;
