import { View, Text } from "react-native";
import React from "react";
import QuestionBody from "@/components/shop/questionpage/QuestionBody";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import BottomTaps from "@/components/shop/homepage/BottomTaps";

const Question = () => {
  return (
    <View className="flex-1">
      <HeaderShop />
      <QuestionBody />
      <BottomTaps />
    </View>
  );
};

export default Question;
