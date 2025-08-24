import React, { useState, useEffect } from "react";
import { getIndustryLabel } from "@/store/shop/useShopInfoStore";
import { View, Text, Pressable, Animated } from "react-native";
import BannerIcon from "../../assets/images/bannericon.svg";
import { router } from "expo-router";
import ImageSwiper from "../customer/shopdetail/ImageSwiper";
import SubscribeButton from "../common/SubscribeButton";
import { getRecentAlarm } from "@/util/api/shop/getRecentAlarm";

type MarkerPayload = {
  id?: number;
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
  industry?: string;
  images?: string[]; // added for ImageSwiper
};

interface BottomSheetProps {
  open: boolean;
  y: Animated.Value;
  data: MarkerPayload | null;
  onClose: () => void;
  height?: number;
}

function BottomSheet(props: BottomSheetProps) {
  const open = props.open;
  const y = props.y;
  const data = props.data;
  const onClose = props.onClose;
  const height = props.height ?? 370;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alarm, setAlarm] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (!open || !data?.id) return;
        const res = await getRecentAlarm(data.id);
        if (!cancelled) setAlarm(res ?? null);
      } catch (e) {
        if (!cancelled) setAlarm(null);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [open, data?.id]);
  return open ? (
    <>
      <Animated.View
        style={{ transform: [{ translateY: y }], height }}
        className="absolute left-0 right-0 bottom-0 space-y-2"
      >
        <View className=" flex-row bg-main px-4 py-2 rounded-lg mx-4 h-11 items-center space-x-2">
          <BannerIcon />
          <Text className="text-white font-semibold" numberOfLines={1}>
            {alarm?.message ?? "알람이 없어요"}
          </Text>
        </View>
        <View className="bg-white px-4 pt-2 pb-6 rounded-t-2xl">
          <View className="self-center w-12 h-1 rounded-full bg-gray-300 mb-2" />
          <View className="pt-2 space-y-1">
            <View className="flex-row items-center justify-between">
              <Pressable
                onPress={() => {
                  if (data?.id == null) return;
                  router.push({
                    pathname: "/(home)/shopdetail/[id]/main",
                    params: { id: String(data.id) },
                  });
                }}
              >
                <Text className="text-xl font-semibold">
                  {data?.name ?? "상세 정보"}
                </Text>
              </Pressable>
              <SubscribeButton
                isSubscribed={isSubscribed}
                onToggle={() => setIsSubscribed((prev) => !prev)}
              />
            </View>

            <Text className="  text-[#9E9E9E]">
              {getIndustryLabel(data?.industry) ?? "식료품"} ·{" "}
              {data?.address ?? "충청남도 천안시 사직동"}
            </Text>
          </View>
          <View className="mt-4 flex-row space-x-1">
            <ImageSwiper images={data?.images ?? []} />
          </View>
        </View>
      </Animated.View>
    </>
  ) : null;
}

export default BottomSheet;
