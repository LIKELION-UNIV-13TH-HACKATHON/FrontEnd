import { View, Text, ScrollView } from "react-native";
import React from "react";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import ShopInfo from "@/components/shop/homepage/ShopInfo";
import SetAlarmGrid from "@/components/shop/homepage/SetAlarmGrid";
import ShopDashBoard from "@/components/shop/homepage/ShopDashBoard";
import SubscribeGraph from "@/components/shop/homepage/SubscribeGraph";
import BottomTaps from "@/components/shop/homepage/BottomTaps";

const HomeShop = () => {
  return (
    <View className=" flex-1">
      <HeaderShop />
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <ShopInfo />
        {/*카카오맵 추가 예정*/}
        <View className="h-28 bg-gray-100" />
        <SetAlarmGrid />
        <ShopDashBoard />
        <SubscribeGraph />
      </ScrollView>
      <BottomTaps />
    </View>
  );
};

export default HomeShop;
