import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import PurPoseBody from "@/components/onboarding/PurPoseBody";

const Purpose = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="onboarding"/>
      <PurPoseBody />
    </View>
  );
};

export default Purpose;
