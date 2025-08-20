import { View, Text } from "react-native";
import React from "react";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import BottomTaps from "@/components/shop/homepage/BottomTaps";
import MypageBody from "@/components/shop/mypage/MypageBody";

const mypage = () => {
  return (
    <View className="flex-1">
      <HeaderShop />
      <MypageBody />
      <BottomTaps />
    </View>
  );
};

export default mypage;
