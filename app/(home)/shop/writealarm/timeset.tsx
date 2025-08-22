import { View, Text } from "react-native";
import React from "react";
import TimeSetBody from "@/components/shop/setalarmpage/TimeSetBody";
import ReturnHeader from "@/components/onboarding/ReturnHeader";

const TimeSet = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="alarm"/>
      <TimeSetBody />
    </View>
  );
};

export default TimeSet;
