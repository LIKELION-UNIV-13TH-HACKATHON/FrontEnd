import { View, Text } from "react-native";
import React from "react";
import ColorBell from "@/assets/images/colorbell.svg";
const list = ["1", "2", "3", "4", "5", "6", "7"] as const;

const Sale = () => {
  return (
    <View>
      {list.map((item) => (
        <View
          key={item}
          className="flex-row w-full h-28 border-b justify-center p-6 gap-2 border-[#EDEDED]"
        >
          <ColorBell />
          <View className="flex-col items-start space-y-2">
            <Text className=" overflow-hidden text-gray2">
              오늘만! 싱그러운 제철 자두, 30% 할인 중 🍑 방문하시면 특별
              서비스까지 드려요!
            </Text>
            <Text className="text-gray1 text-[13px]">23분전</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Sale;
