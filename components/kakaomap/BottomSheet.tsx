import React from "react";
import { View, Text, Pressable, Animated } from "react-native";
import FilledStar from "../../assets/images/filledstar.svg";
import BannerIcon from "../../assets/images/bannericon.svg";
type MarkerPayload = {
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
  industry?: string;
};

const BottomSheet: React.FC<{
  open: boolean;
  y: Animated.Value;
  data: MarkerPayload | null;
  onClose: () => void;
  height?: number;
}> = ({ open, y, data, height = 360 }) => {
  if (!open) return null;

  return (
    <>
      <Animated.View
        style={{ transform: [{ translateY: y }], height }}
        className="absolute left-0 right-0 bottom-0 space-y-2"
      >
        <View className=" flex-row bg-main px-4 py-2 rounded-lg mx-4 h-11 items-center space-x-2">
          <BannerIcon />
          <Text className="text-white font-semibold">
            오늘 17시까지 복숭아...
          </Text>
        </View>
        <View className="bg-white px-4 pt-2 pb-6 rounded-t-2xl">
          <View className="self-center w-12 h-1 rounded-full bg-gray-300 mb-2" />
          <View className="pt-2 space-y-1">
            <View className="flex-row items-center justify-between">
              <Text className="text-xl font-semibold">
                {data?.name ?? "상세 정보"}
              </Text>
              <FilledStar />
            </View>

            <Text className="  text-[#9E9E9E]">
              {data?.industry ?? "식료품"} ·{" "}
              {data?.address ?? "충청남도 천안시 사직동"}
            </Text>
          </View>
          <View className="mt-4 flex-row space-x-1">
            <View className="h-36 w-36 bg-gray-300 rounded-lg" />
            <View className="h-36 w-36 bg-gray-300 rounded-lg" />

            <View className="h-36 w-36 bg-gray-300 rounded-lg" />
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default BottomSheet;
