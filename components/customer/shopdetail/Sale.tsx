import { View, Text } from "react-native";
import React from "react";

const list = ["1", "2", "3", "4", "5", "6", "7"] as const;

const Sale = () => {
  return (
    <View>
      {list.map((item) => (
        <View
          key={item}
          className="w-full h-28 border-b justify-center border-[#EDEDED]"
        >
          <Text className="w-5/6 overflow-hidden">
            오늘만! 싱그러운 제철 자두, 30% 할인 중 🍑 방문하시면 특별
            서비스까지 드려요!
          </Text>
        </View>
      ))}
    </View>
  );
};

export default Sale;
