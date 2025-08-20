import { View, Text } from "react-native";
import React from "react";
import GuideBody from "@/components/shop/setalarmpage/GuideBody";
import ReturnHeader from "@/components/onboarding/ReturnHeader";

const Guide = () => {
  return (
    <View className="flex-1">
      <ReturnHeader />
      <GuideBody />
    </View>
  );
};

export default Guide;
