import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import RecommendTextBody from "@/components/shop/setalarmpage/RecommendTextBody";

const RecommendText = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="alarm"/>
      <RecommendTextBody />
    </View>
  );
};

export default RecommendText;
