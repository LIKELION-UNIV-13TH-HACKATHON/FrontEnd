import { View, Text } from "react-native";
import React from "react";
import MiniBell from "@/assets/images/minibell.svg";

const NotificationItem = () => {
  return (
    <View className="p-4 pb-8 border-b border-[#CCCCCC]">
      <View className="flex-row items-center gap-4 mb-2">
        <MiniBell />
        <Text
          className="text-base font-bold flex-shrink"
          numberOfLines={0}
          ellipsizeMode="tail"
        >
          과일 가게에서 특가 판매를 시작해요!
        </Text>
      </View>
      <Text
        className="pl-8 text-[#BFBFBF] flex-shrink w-72"
        numberOfLines={0}
        ellipsizeMode="tail"
      >
        회원님이 평소에 눈 여겨보던 가게에서 특가 판매를 시작해요. 더 자세히
        알아볼까요?
      </Text>
    </View>
  );
};

export default NotificationItem;
