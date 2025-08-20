import { View, Text, Pressable } from "react-native";
import React from "react";

interface NextButtonProps {
  active: boolean;
  onPress: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ active, onPress }) => {
  return (
    <Pressable
      className={` py-5 rounded-xl  ${
        active ? "bg-[#F28715]" : "bg-[#EDEDED]"
      }`}
      onPress={onPress}
      disabled={!active}
    >
      <Text
        className={`text-center text-base ${
          active ? "text-white font-bold" : "text-[#BFBFBF] font-semibold"
        }`}
      >
        다음
      </Text>
    </Pressable>
  );
};

export default NextButton;
