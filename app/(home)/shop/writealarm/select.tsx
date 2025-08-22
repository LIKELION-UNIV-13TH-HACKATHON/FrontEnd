import { View, Text } from "react-native";
import React from "react";
import ReturnHeader from "@/components/onboarding/ReturnHeader";
import SelectBody from "@/components/shop/setalarmpage/SelectBody";
import NextButton from "@/components/NextButton";

const Select = () => {
  return (
    <View className="flex-1">
      <ReturnHeader kind="alarm"/>
      <SelectBody />
    </View>
  );
};

export default Select;
