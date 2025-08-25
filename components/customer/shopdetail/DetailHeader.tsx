import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import BackArrow from "../../../assets/images/backarrow.svg";
import { router, useLocalSearchParams } from "expo-router";
import SubscribeButton from "@/components/common/SubscribeButton";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
const DetailHeader = () => {
  const { id } = useLocalSearchParams();
  const [isSubscribed, setIsSubscribed] = useState(
    useShopInfoStore.getState().getShopDetail(Number(id))?.isSubscribe
  );

  return (
    <View className="flex-row justify-between px-4 py-2">
      <Pressable onPress={() => router.back()}>
        <BackArrow />
      </Pressable>
      <SubscribeButton
        isSubscribed={isSubscribed}
        onToggle={() => setIsSubscribed((prev) => !prev)}
        id={Number(id)}
      />
    </View>
  );
};

export default DetailHeader;
