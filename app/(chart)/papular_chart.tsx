import { View, Text } from "react-native";
import React from "react";
import BottomTaps from "@/components/shop/homepage/BottomTaps";
import HeaderShop from "@/components/shop/homepage/HeaderShop";

const papular_chart = () => {
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

export default papular_chart;
