import { View, Text, Pressable } from "react-native";
import React from "react";
import { timeAgo } from "@/util/calculate/time";
import SideArrow from "@/assets/images/sidearrow.svg";
import { router } from "expo-router";

type QuestionItemProps = {
  id: number;
  title: string;
  contents?: string;
  writer: string;
  timestamp: number;
};
const QuestionItem: React.FC<QuestionItemProps> = ({
  id,
  title,
  contents,
  writer,
  timestamp,
}) => {
  return (
    <Pressable
      className="gap-2 py-4 border-b border-[#EDEDED]"
      onPress={() =>
        router.push({
          pathname: "/(home)/shop/question/[boardid]",
          params: { boardid: String(id) },
        })
      }
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold" numberOfLines={1}>
          {title}
        </Text>
        <SideArrow />
      </View>
      <Text className="text-[#999999] text-sm w-72" numberOfLines={1}>
        {contents}
      </Text>
      <Text className="pt-2 text-[#CCCCCC]">
        {writer} | {timeAgo(timestamp)}
      </Text>
    </Pressable>
  );
};

export default QuestionItem;
