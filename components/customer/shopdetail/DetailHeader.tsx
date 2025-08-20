import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import BackArrow from "../../../assets/images/backarrow.svg";
import { router } from "expo-router";
import SubscribeButton from "@/components/common/SubscribeButton";
const DetailHeader = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <View className="flex-row justify-between px-4 py-2">
      <Pressable onPress={() => router.back()}>
        <BackArrow />
      </Pressable>
      <SubscribeButton
        isSubscribed={isSubscribed}
        onToggle={() => setIsSubscribed((prev) => !prev)}
      />
    </View>
  );
};

export default DetailHeader;
