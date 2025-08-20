import { View, Text } from "react-native";
import React from "react";
import SimpleHeader from "@/components/SimpleHeader";
import SubscribeBody from "@/components/customer/mypage/SubscribeBody";

const Subscribe = () => {
  return (
    <View className="flex-1">
      <SimpleHeader title={"구독한 가게"} />
      <SubscribeBody />
    </View>
  );
};

export default Subscribe;
