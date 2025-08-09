import { View, Text } from "react-native";
import React from "react";
import VectorIcon from "../../../assets/images/vectoricon.svg";
import Arrow from "../../../assets/images/droparrow.svg";
const ShopInfo = () => {
  return (
    <View className=" flex-row p-4 space-x-4">
      <View className=" rounded-full h-12 w-12 bg-[#D9D9D9]" />
      <View className=" flex-1 justify-center">
        <View className="flex-row items-center space-x-2">
          <Text className=" font-bold text-lg">현씨네 과일가게</Text>
          <Arrow />
        </View>
        <View className=" flex-row space-x-1 items-center">
          <VectorIcon />
          <Text className=" text-xs text-[#9E9E9E]">
            충청남도 천안시 동남구 사직동
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShopInfo;
