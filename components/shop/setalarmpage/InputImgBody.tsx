import { View, Text } from "react-native";
import React from "react";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";

const InputImgBody = () => {
  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1">
        <FilledCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
      </View>
      <NextButton active={false} onPress={() => console.log("click")} />
    </View>
  );
};

export default InputImgBody;
