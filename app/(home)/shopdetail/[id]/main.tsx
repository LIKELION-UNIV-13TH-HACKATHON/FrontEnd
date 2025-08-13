import { View, Text } from "react-native";
import React from "react";
import DetailBody from "@/components/customer/shopdetail/DetailBody";
import DetailHeader from "@/components/customer/shopdetail/DetailHeader";

const Main = () => {
  return (
    <View>
      <DetailHeader />
      <DetailBody />
    </View>
  );
};

export default Main;
