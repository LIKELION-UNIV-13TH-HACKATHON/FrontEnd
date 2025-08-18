import { View, Text } from "react-native";
import React from "react";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import BoardDetailBody from "@/components/shop/questionpage/BoardDetailBody";
import BottomTaps from "@/components/shop/homepage/BottomTaps";
import Header from "@/components/shop/questionpage/Header";

const BoardId = () => {
  return (
    <View className="flex-1">
      <Header />
      <BoardDetailBody />
      <BottomTaps />
    </View>
  );
};

export default BoardId;
