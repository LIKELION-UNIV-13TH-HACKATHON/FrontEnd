import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import WriteInfoBody from "@/components/onboarding/shop/WriteInfoBody";

const writeinfo = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="onboarding"/>
      <WriteInfoBody />
    </View>
  );
};

export default writeinfo;
