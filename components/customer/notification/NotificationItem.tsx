import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import { getShopInfo } from "@/util/api/customer/getShopInfo";
import MiniBell from "@/assets/images/minibell.svg";
import { timeAgo } from "@/util/calculate/time";

interface NotificationItemProps {
  shopId: number;
  shopName: string;
  message: string;
  sentAt: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  shopId,
  shopName,
  message,
  sentAt,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateShop = useShopInfoStore((s) => s.updateShop);

  const handlePress = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const detail: any = await getShopInfo(shopId);
      const normalized = {
        id: detail?.id ?? detail?.shopId ?? shopId,
        name: detail?.name ?? detail?.shopName ?? shopName,
        address: detail?.address,
        industry: detail?.industry ?? detail?.shopType,
        tel: detail?.tel ?? detail?.shopTellNumber,
        mainImage: detail?.mainImage,
        isSubscribe: detail?.isSubscribe,
        hours: detail?.hours ?? detail?.operationTimeResponses,
        images: detail?.images ?? detail?.shopImages,
      };
      updateShop(shopId, normalized);
      router.push({ pathname: "/(home)/shopdetail/[id]/main", params: { id: String(shopId) } });
    } catch (e) {
      console.error("getShopInfo failed", e);
      router.push({ pathname: "/(home)/shopdetail/[id]/main", params: { id: String(shopId) } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable onPress={handlePress} className="p-4 pb-8 border-b border-[#CCCCCC] relative" accessibilityRole="button">
      <View className="flex-row items-center gap-4 mb-2">
        <MiniBell />
        <Text
          className="text-base font-bold flex-shrink"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {shopName}
        </Text>
      </View>
      <Text
        className="pl-8 text-[#BFBFBF] flex-shrink w-72"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {message}
      </Text>
      <Text className=" absolute top-1 right-2 text-[#BFBFBF]">
        {timeAgo(sentAt)}
      </Text>
    </Pressable>
  );
};

export default NotificationItem;
