import { View, Text, Image } from "react-native";
import React from "react";

const SubscribeItem = ({
  shopId,
  shopName,
  mainImage,
}: {
  shopId: number;
  shopName: string;
  mainImage: string | undefined;
}) => {
  return (
    <View className="border-b border-[#EDEDED] py-4 flex-row items-center gap-2">
      {mainImage ? (
        <Image
          source={{ uri: mainImage }}
          className="w-[51px] h-[51px] rounded-full"
          resizeMode="cover"
        />
      ) : (
        <View className="bg-gray-400 rounded-full w-[51px] h-[51px]" />
      )}
      <Text className=" font-semibold text-[16px] pl-2">{shopName}</Text>
    </View>
  );
};

export default SubscribeItem;
