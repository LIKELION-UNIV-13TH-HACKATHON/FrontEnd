import { View, Image, Button } from "react-native";
import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import SplashIcon from "../../assets/images/mainicon_white.svg";
import MainCharacter from "@/assets/images/maincharacter.svg";
import LinearGradient from "react-native-linear-gradient";
const SplashScreen = () => {
  const router = useRouter();
  const linearColors = ["#FFB566", "#FF8400"];

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      colors={linearColors}
      style={{
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "column",
        alignItems: "center",
        gap: "40",
      }}
    >
      <SplashIcon />
      <MainCharacter />
    </LinearGradient>
  );
};

export default SplashScreen;
