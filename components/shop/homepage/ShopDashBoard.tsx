import { View, Text, ScrollView } from "react-native";
import React from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";

const ShopDashBoard = () => {
  return (
    <View className="px-4">
      <Text className="font-bold text-base">매장 요약 대시보드</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="my-2"
      >
        <View className="flex-row space-x-2">
          <View className="h-24 w-[167px] bg-[#F9F9F9] rounded p-4 px-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-[15px] font-semibold">
                오늘 알림 발송 수
              </Text>
              <SideArrow />
            </View>
            <Text className=" text-lg font-bold pt-4">3건</Text>
          </View>
          <View className="h-24 w-[167px] bg-[#F9F9F9] rounded p-4 px-2.5 ">
            <View className="flex-row items-center justify-between">
              <Text className="text-[15px] font-semibold">매장 조회수 </Text>
              <SideArrow />
            </View>
            <Text className=" text-lg font-bold pt-4">3건</Text>
          </View>
          <View className="h-24 w-[167px] bg-[#F9F9F9] rounded p-4 px-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-[15px] font-semibold">신규 구독자수 </Text>
              <SideArrow />
            </View>
            <Text className=" text-lg font-bold pt-4">3건</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDashBoard;
