import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import FinalCheckBody from "@/components/onboarding/shop/FinalCheckBody";

const FinalCheck = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="onboarding"/>
      <FinalCheckBody />
    </View>
  );
};

export default FinalCheck;
