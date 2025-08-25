import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import { getDashBoard } from "@/util/api/shop/getDashBoard";

const ShopDashBoard = () => {
  const { user } = useUserInfoStore();
  const [data, setData] = useState<any | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      if (user.shopId !== 0) {
        const m = await getDashBoard(user.shopId);
        if (mounted) {
          setMsg(m);
          setLoading(false);
        }
      } else {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user.shopId]);
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
            <Text className=" text-lg font-bold pt-4">
              {data?.todayNotificationSentCount ?? 0}건
            </Text>
          </View>
          <View className="h-24 w-[167px] bg-[#F9F9F9] rounded p-4 px-2.5 ">
            <View className="flex-row items-center justify-between">
              <Text className="text-[15px] font-semibold">매장 조회수 </Text>
              <SideArrow />
            </View>
            <Text className=" text-lg font-bold pt-4">
              {data?.shopViewCount ?? 0}건
            </Text>
          </View>
          <View className="h-24 w-[167px] bg-[#F9F9F9] rounded p-4 px-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-[15px] font-semibold">신규 구독자수 </Text>
              <SideArrow />
            </View>
            <Text className=" text-lg font-bold pt-4">
              {data?.todaySubscribedCount ?? 0}건
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShopDashBoard;
