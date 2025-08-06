import { View, Image, Button } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

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
      <Image source={require("../../assets/images/mainicon.png")} />
    </View>
  );
};

export default SplashScreen;
