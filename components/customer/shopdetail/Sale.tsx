import { View, Text } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import ColorBell from "@/assets/images/colorbell.svg";
import { getSale } from "@/util/api/customer/getShopDetail";
import { useLocalSearchParams } from "expo-router";
import { timeAgo } from "@/util/calculate/time";

type ResType = {
  shopId: number;
  shopName: string;
  message: string;
  sentAt: number;
};

const Sale = () => {
  const { id } = useLocalSearchParams();
  const [list, setList] = useState<ResType[]>([]);

  const fetchSale = useCallback(async () => {
    try {
      if (!id) return;
      const res = await getSale(Number(id));
      setList(res.responses as ResType[]);
    } catch (error) {
      console.error("getSale 실패", error);
      setList([]);
    }
  }, [id]);

  useEffect(() => {
    // fetchSale();
  }, [fetchSale]);

  return (
    <View>
      {list.map((item, idx) => (
        <View
          key={`${item.shopId}
          }`}
          className="flex-row w-full h-28 border-b justify-center p-6 gap-2 border-[#EDEDED]"
        >
          <ColorBell />
          <View className="flex-col items-start space-y-2 flex-1">
            <Text numberOfLines={2} className="overflow-hidden text-gray2">
              {item.message}
            </Text>
            <Text className="text-gray1 text-[13px]">
              {timeAgo(item.sentAt)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Sale;
