import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import SideArrow from "../../../assets/images/sidearrow.svg";
import { router } from "expo-router";
import { getRecentAlarm } from "../../../util/api/shop/getRecentAlarm";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const SetAlarmGrid = () => {
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUserInfoStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      if (user.shopId !== 0) {
        const m = await getRecentAlarm(user.shopId);
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
    <View className="p-4">
      <View className="flex-row space-x-1 items-center ">
        <Text className="font-bold text-base">최근 설정한 알림</Text>
      </View>

      <View className="flex-1 p-1 rounded-lg">
        <View className="h-28 bg-[#F7F7F7] rounded p-4 px-2.5 justify-between">
          <View className="min-h-[24px]">
            {loading ? (
              <View className="flex-row items-center">
                <ActivityIndicator />
                <Text className="ml-2">불러오는 중…</Text>
              </View>
            ) : msg ? (
              <Text numberOfLines={2}>{msg}</Text>
            ) : (
              <Text className="text-gray-400">가장 최근 알림이 없습니다</Text>
            )}
          </View>

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
