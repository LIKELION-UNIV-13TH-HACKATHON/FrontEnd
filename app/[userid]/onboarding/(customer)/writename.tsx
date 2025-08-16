import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import WriteNameBody from "@/components/onboarding/customer/WriteNameBody";

const WriteName = () => {
  return (
    <View className="flex-1">
      <ReturnHeader />
      <WriteNameBody />
    </View>
  );
};

export default WriteName;
