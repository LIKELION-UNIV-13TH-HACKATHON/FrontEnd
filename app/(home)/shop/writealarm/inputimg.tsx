import { View, Text } from "react-native";
import React from "react";
import InputImgBody from "@/components/shop/setalarmpage/InputImgBody";
import ReturnHeader from "@/components/onboarding/ReturnHeader";

const InputImg = () => {
  return (
    <View className="flex-1">
      <ReturnHeader />
      <InputImgBody />
    </View>
  );
};

export default InputImg;
