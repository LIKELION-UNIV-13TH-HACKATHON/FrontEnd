import { View, Text } from "react-native";
import React from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";

const ShopDashBoard = () => {
  return (
    <View className="px-4">
      <View className="flex-row items-center space-x-1">
        <Text className="font-bold text-base">매장 요약 대시보드</Text>
        <SideArrow />
      </View>
      <View className="h-28 bg-gray-100 my-2 rounded"></View>
    </View>
  );
};

export default ShopDashBoard;
