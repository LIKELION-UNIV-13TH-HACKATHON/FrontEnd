import { View, Text } from "react-native";
import React from "react";
import SubscribeItem from "./SubscribeItem";

const dummy = [1, 2, 34, 5];

const SubscribeBody = () => {
  return (
    <View className="flex-1 px-4">
      <Text className="text-[#BFBFBF] pb-6">구독 94개</Text>
      {dummy.map((key) => (
        <SubscribeItem key={key} />
      ))}
    </View>
  );
};

export default SubscribeBody;
