import { View, Text } from "react-native";
import React from "react";
import BottomTaps from "@/components/customer/BottomTaps";
import HeaderCustomer from "@/components/customer/HeaderCustomer";
import ChartBody from "@/components/customer/chart/ChartBody";

const PapularChart = () => {
  return (
    <View className="flex-1">
      <HeaderCustomer />
      <ChartBody />
      <BottomTaps />
    </View>
  );
};

export default PapularChart;
