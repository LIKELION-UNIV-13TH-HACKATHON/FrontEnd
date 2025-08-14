import { View, Text } from "react-native";
import React from "react";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import BottomTaps from "@/components/customer/BottomTaps";

const PapularChart = () => {
  return (
    <View className="flex-1">
      <HeaderShop />
      <View className="flex-1">
        <Text>인기 차트</Text>
      </View>
      <BottomTaps />
    </View>
  );
};

export default PapularChart;
