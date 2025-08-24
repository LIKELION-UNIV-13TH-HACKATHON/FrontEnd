import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import ColorAlarm from "@/assets/images/coloralarmicon.svg";
import TimeIcon from "@/assets/images/timeicon.svg";
import VectorIcon from "@/assets/images/garyvectoricon2.svg";
import PhoneIcon from "@/assets/images/phonenumbericon.svg";
import Sale from "./Sale";
import { getRecentAlarm } from "@/util/api/shop/getRecentAlarm";
import { useLocalSearchParams } from "expo-router";

const dayMap: Record<string, string> = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
};

const Info = () => {
  const { id } = useLocalSearchParams();
  const [alarm, setAlarm] = useState<any | null>(null);

  const shop = useShopInfoStore((state) => state.getShopDetail(Number(id)));

  const fetchAlarm = async () => {
    try {
      const res = await getRecentAlarm(Number(id));
      setAlarm(res);
    } catch (e) {
      console.error("getRecentAlarm 실패", e);
    }
  };

  useEffect(() => {
    fetchAlarm();
  }, [id]);

  return (
    <View>
      <View className="gap-y-5 py-4">
        <View className="flex-row space-x-2 p-4 bg-[#F9F9F9] rounded-lg">
          <ColorAlarm />
          <Text>{alarm?.message ?? "알람이 없어요"}</Text>
        </View>
        <View className="flex-row items-start gap-x-10 mb-4">
          <TimeIcon />
          <View className="gap-y-2">
            {shop?.hours?.map((h, idx) => (
              <Text key={idx} className="text-[#575757] font-semibold">
                {dayMap[h.dayOfWeek] ?? h.dayOfWeek}:{" "}
                {h.isClosed
                  ? "휴무"
                  : `${h.openTime?.slice(0, 5)}~${h.closeTime?.slice(0, 5)}`}
              </Text>
            ))}
          </View>
        </View>

        <View className="flex-row items-center gap-x-10">
          <VectorIcon />
          <Text className="text-[#575757]">{shop?.address ?? "주소 없음"}</Text>
        </View>

        <View className="flex-row gap-x-10 items-center">
          <PhoneIcon />
          <Text className="text-[#575757]">{shop?.tel ?? "전화번호 없음"}</Text>
        </View>
      </View>
      <View className="bg-[#F9F9F9] w-[100vw] h-[10px] -mx-4" />
      <Text className="text-[18px] font-semibold py-6">특가 알림</Text>
      <Sale />
    </View>
  );
};

export default Info;
