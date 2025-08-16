import KakaoLoginButton from "@/components/KakaoLoginButton";
import { Link } from "expo-router";
import { View } from "react-native";

const LoginScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <KakaoLoginButton />
    </View>
  );
};

export default LoginScreen;
