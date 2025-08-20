import { View, Text, Image } from "react-native";
import React from "react";

const list = ["바나나", "바나나", "바나나", "바나나", "바나나"];

const Menu = () => {
  return (
    <View>
      {list.map((item, idx) => (
        <View
          key={`menu-${idx}`}
          className="h-36 flex-row justify-between border-b border-[#F9F9F9] py-4 "
        >
          <View className=" justify-center gap-4">
            <View>
              <Text className="font-bold text-base">{item}</Text>
              <Text className="text-[#BFBFBF]">달고 맛있는 바나나</Text>
            </View>
            <Text>1,300원</Text>
          </View>
          <Image
            source={require("@/assets/images/banana.png")}
            className=" aspect-square overflow-hidden h-28"
          />
        </View>
      ))}
    </View>
  );
};

export default Menu;
