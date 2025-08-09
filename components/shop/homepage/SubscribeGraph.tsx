import { View, Text } from "react-native";
import React from "react";
import DropArrow from "../../../assets/images/droparrow.svg";

const SubscribeGraph = () => {
  return (
    <View className="p-4">
      <View className=" flex-row items-center space-x-1">
        <Text className="font-bold text-base">전체 구독자 수</Text>
        <DropArrow />
      </View>
      <View className="h-28 bg-gray-100 my-2"></View>
    </View>
  );
};

export default SubscribeGraph;
