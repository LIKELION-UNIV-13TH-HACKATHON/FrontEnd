import { View, Text } from "react-native";
import React from "react";
import ColorAlarm from "@/assets/images/coloralarmicon.svg";
import TimeIcon from "@/assets/images/timeicon.svg";
import VectorIcon from "@/assets/images/garyvectoricon2.svg";
import PhoneIcon from "@/assets/images/phonenumbericon.svg";
import Sale from "./Sale";

const Info = () => {
  return (
    <View>
      <View className="gap-y-5 py-4">
        <View className="flex-row space-x-2 p-4 bg-[#F9F9F9] rounded-lg">
          <ColorAlarm />
          <Text>오늘 17시까지 복숭아 한 박스 만원에 판매!</Text>
        </View>
        <View className="flex-row items-start gap-x-10 mb-4">
          <TimeIcon />
          <View className="gap-y-2">
            <Text className="text-[#575757]">평일 9:00~22:00</Text>
            <Text className="text-[#575757]">주말 10:00~20:00</Text>
          </View>
        </View>

        <View className="flex-row items-center gap-x-10">
          <VectorIcon />
          <Text className="text-[#575757]">주소</Text>
        </View>

        <View className="flex-row gap-x-10 items-center">
          <PhoneIcon />
          <Text className="text-[#575757]">041-1111-1111</Text>
        </View>
      </View>
      <View className="bg-[#F9F9F9] w-[100vw] h-[10px] -mx-4" />
      <Text className="text-[18px] font-semibold py-6">특가 알림</Text>
      <Sale />
    </View>
  );
};

export default Info;
