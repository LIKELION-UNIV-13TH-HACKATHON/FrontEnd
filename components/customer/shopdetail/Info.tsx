import { View, Text } from "react-native";
import React from "react";

const Info = () => {
  return (
    <View className="gap-y-5">
      <View className="flex-row items-baseline gap-x-10 mb-4">
        <Text className="font-semibold text-gray-900 text-base w-1/6 ">
          운영시간
        </Text>
        <View className="gap-y-2">
          <Text className="text-[#575757]">평일 9:00~22:00</Text>
          <Text className="text-[#575757]">주말 10:00~20:00</Text>
        </View>
      </View>

      <View className="flex-row items-baseline gap-x-10">
        <Text className="font-semibold text-gray-900 text-base w-1/6">
          휴무일
        </Text>
        <Text className="text-[#575757]">매주 월요일</Text>
      </View>

      <View className="flex-row items-baseline gap-x-10">
        <Text className="font-semibold text-gray-900 text-base w-1/6">
          주소
        </Text>
        <Text className="text-[#575757]">주소</Text>
      </View>

      <View className="flex-row items-baseline gap-x-10">
        <Text className="font-semibold text-gray-900 text-base w-1/6">
          연락처
        </Text>
        <Text className="text-[#575757]">041-1111-1111</Text>
      </View>
    </View>
  );
};

export default Info;
