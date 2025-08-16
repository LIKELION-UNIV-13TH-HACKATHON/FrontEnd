import React from "react";
import { View, Text, Pressable } from "react-native";
import VectorMark from "@/assets/images/grayvectormark.svg";

type ChartItemProps = {
  id: number;
  name: string;
  location: string;
  subs: number; // 구독/찜 인원 수
  distance: number; // km
  onPress?: (id: number) => void;
  onToggleBookmark?: (id: number) => void;
  bookmarked?: boolean;
};

const ChartItem: React.FC<ChartItemProps> = ({
  id,
  name,
  location,
  subs,
  distance,
  onPress,
  onToggleBookmark,
  bookmarked = false,
}) => {
  return (
    <Pressable onPress={() => onPress?.(id)} className="bg-white py-4">
      <View className="flex-row items-center">
        <View className="w-20 h-20 rounded-full bg-[#E5E5E5]" />

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
              <VectorMark /> {distance}km
            </Text>
          </View>
        </View>

        <Pressable
          hitSlop={8}
          onPress={() => onToggleBookmark?.(id)}
          className="ml-3 flex-col items-start justify-start h-full"
        >
          <Text
            className={
              bookmarked ? "text-[#F18A00] text-xl" : "text-[#CFCFCF] text-xl"
            }
          >
            ★
          </Text>
        </Pressable>
      </View>

      <View className="mt-4 h-[1px] bg-[#EFEFEF]" />
    </Pressable>
  );
};

export default ChartItem;
