import { View, Text, Pressable } from "react-native";
import React from "react";
import BackArrow from "@/assets/images/backarrow.svg";
import { router } from "expo-router";

const SimpleHeader = ({ title }: { title: string }) => {
  return (
    <View className="flex-row p-4 items-center">
      <Pressable onPress={() => router.back()} hitSlop={8}>
        <BackArrow />
      </Pressable>
      <View className="flex-1 justify-center items-center">
        <Text className="text-xl font-semibold">{title}</Text>
      </View>
      <View style={{ width: 24 }} />
    </View>
  );
};

export default SimpleHeader;
