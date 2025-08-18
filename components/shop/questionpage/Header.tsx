import { View, Text, Pressable } from "react-native";
import React from "react";
import BackArrow from "@/assets/images/backarrow.svg";
import { router } from "expo-router";

const Header = () => {
  return (
    <Pressable onPress={() => router.back()} className="p-4">
      <BackArrow />
    </Pressable>
  );
};

export default Header;
