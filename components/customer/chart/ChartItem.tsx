import React, { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import VectorMark from "@/assets/images/grayvectormark.svg";
import SubscribeButton from "@/components/common/SubscribeButton";
import { router } from "expo-router";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import { getShopInfo } from "@/util/api/customer/getShopInfo";

type ChartItemProps = {
  id: number;
  name: string;
  location: string;
  subs: number; // 구독/찜 인원 수
  distance: number; // m
  onPress?: (id: number) => void;
  isSubscribe: boolean;
  mainImage: string | undefined;
};

const ChartItem: React.FC<ChartItemProps> = ({
  id,
  name,
  location,
  subs,
  distance,
  mainImage,
  isSubscribe,
}) => {
  const [isSubscribed, setIsSubscribed] = useState(isSubscribe);
  const [isLoading, setIsLoading] = useState(false);
  const updateShop = useShopInfoStore((s) => s.updateShop);

  const handlePress = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const detail: any = await getShopInfo(id);

      const normalized = {
        id: detail?.id ?? detail?.shopId ?? id,
        name: detail?.name ?? detail?.shopName ?? name,
        address: detail?.address ?? location,
        industry: detail?.industry ?? detail?.shopType,
        tel: detail?.tel ?? detail?.shopTellNumber,
        mainImage: detail?.mainImage ?? mainImage,
        isSubscribe: detail?.isSubscribe ?? isSubscribe,
        hours: detail?.hours ?? detail?.operationTimeResponses,
        images: detail?.images ?? detail?.shopImages,
      };

      updateShop(id, normalized);

      router.push({
        pathname: "/(home)/shopdetail/[id]/main",
        params: { id: String(id) },
      });
    } catch (e) {
      console.error("getShopInfo failed", e);
      router.push({
        pathname: "/(home)/shopdetail/[id]/main",
        params: { id: String(id) },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable onPress={handlePress} className="bg-white py-4">
      <View className="flex-row items-center">
        {mainImage ? (
          <Image
            source={{ uri: mainImage }}
            className="w-20 h-20 rounded-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-20 h-20 rounded-full bg-[#E5E5E5]" />
        )}

        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-black" numberOfLines={1}>
            {name}
          </Text>
          <Text className="text-[#9E9E9E] mt-1" numberOfLines={1}>
            {location}
          </Text>

          <View className="mt-2 flex-row items-center">
            <Text className="text-[#DDDDDD]">★</Text>
            <Text className="mx-1 text-[#BFBFBF]">{subs}명</Text>
            <Text className="text-[#D8D8D8]">•</Text>
            <Text className="flex-row items-center ml-1 text-[#BFBFBF]">
              <VectorMark /> {distance.toFixed(1)}m
            </Text>
          </View>
        </View>

        <View className="h-full">
          <SubscribeButton
            isSubscribed={isSubscribed}
            onToggle={() => setIsSubscribed((prev) => !prev)}
            size={19}
            id={id}
          />
        </View>
      </View>

      <View className="mt-4 h-[1px] bg-[#EFEFEF]" />
    </Pressable>
  );
};

export default ChartItem;
