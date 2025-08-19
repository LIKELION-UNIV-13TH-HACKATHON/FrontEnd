import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import SelfTextBody from "@/components/shop/setalarmpage/SelfTextBody";

const SelfText = () => {
  return (
    <View className="flex-1">
      <ReturnHeader />
      <SelfTextBody />
    </View>
  );
};

export default SelfText;
