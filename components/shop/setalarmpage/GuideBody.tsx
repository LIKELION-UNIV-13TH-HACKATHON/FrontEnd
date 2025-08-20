import { View, Text, Pressable } from "react-native";
import React from "react";
import NextButton from "@/components/NextButton";
import { router } from "expo-router";
import CheckIcon from "@/assets/images/checkicon.svg";

const GuideBody = () => {
  return (
    <View className="flex-1 p-4">
      <View className="flex-1 justify-center items-center gap-4 pb-20">
        <CheckIcon />
        <Text className="font-bold text-[26px]">알림이 전송 됐어요!</Text>
        <Text className="text-[18px] text-[#999999]">
          작성해주신 알림이 고객에게 전달돼요.
        </Text>
      </View>
      <Pressable
        className={` py-4 rounded-xl  ${
          true ? "bg-[#F28715]" : "bg-[#EDEDED]"
        }`}
        onPress={() => router.replace("/(home)/home_shop")}
      >
        <Text
          className={`text-center text-base ${
            true ? "text-white font-bold" : "text-[#BFBFBF] font-semibold"
          }`}
        >
          다음
        </Text>
      </Pressable>
    </View>
  );
};

export default GuideBody;
