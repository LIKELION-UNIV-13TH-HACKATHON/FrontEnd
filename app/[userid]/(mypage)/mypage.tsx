import { View, Text } from "react-native";
import React from "react";
import MypageBody from "@/components/customer/mypage/MypageBody";
import HeaderCustomer from "@/components/customer/HeaderCustomer";
import BottomTaps from "@/components/customer/BottomTaps";

const Mypage = () => {
  return (
    <View className="flex-1">
      <HeaderCustomer />
      <MypageBody />
      <BottomTaps />
    </View>
  );
};

export default Mypage;
