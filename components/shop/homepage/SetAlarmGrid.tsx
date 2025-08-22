import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";
import { router } from "expo-router";

const SetAlarmGrid = () => {
  const alarms = [1, 2, 3, 4];

  return (
    <View className="p-4">
      <View className="flex-row space-x-1 items-center ">
        <Text className="font-bold text-base">최근 설정한 알림</Text>
      </View>

      <View className="flex-1 p-1 rounded-lg">
        <View className="h-28 bg-[#F7F7F7] rounded p-4 px-2.5 justify-between">
          <Text>가장 최근 알림</Text>
          <Pressable
            onPress={() => router.push("/(home)/shop/writealarm/select")}
            className="flex-row items-center justify-between"
          >
            <Text className="text-[15px] font-semibold">알림 설정하기</Text>
            <SideArrow />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SetAlarmGrid;
