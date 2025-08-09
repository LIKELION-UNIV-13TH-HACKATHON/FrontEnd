import { View, Image, Button } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SplashIcon from "../../assets/images/mainicon_white.svg";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-main">
      <SplashIcon />
    </View>
  );
};

export default SplashScreen;
