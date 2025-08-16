import { View, Text, Pressable } from "react-native";
import React from "react";
import BackArrow from "@/assets/images/backarrow.svg";
import { router } from "expo-router";

const ReturnHeader = () => {
  return (
    <View className="flex-row justify-between p-4 items-center">
      <Pressable onPress={() => router.back()}>
        <BackArrow />
      </Pressable>
      <Pressable>
        <Text className="text-[#B0B0B0]">다시하기</Text>
      </Pressable>
    </View>
  );
};

export default ReturnHeader;
