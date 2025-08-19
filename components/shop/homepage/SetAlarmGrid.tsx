import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";
import { router } from "expo-router";

const SetAlarmGrid = () => {
  const alarms = [1, 2, 3, 4];

  return (
    <View className="p-4">
      <View className="flex-row space-x-1 items-center ">
        <Text className="font-bold text-base">설정한 알림</Text>
      </View>
      <FlatList
        data={alarms}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        scrollEnabled={false}
        renderItem={() => (
          <View className="flex-1 p-1">
            <View className="h-28 bg-[#F7F7F7] rounded" />
            <Pressable onPress={() => router.push("/(home)/shop/writealarm/select")}>
              <Text>알림 설정하기</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

export default SetAlarmGrid;
