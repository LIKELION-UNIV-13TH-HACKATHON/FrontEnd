import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import STTBody from "@/components/shop/setalarmpage/STTBody";

const STT = () => {
  return (
    <View className="flex-1">
      <ReturnHeader />
      <STTBody />
    </View>
  );
};

export default STT;
