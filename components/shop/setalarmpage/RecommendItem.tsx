import { View, Text, Pressable } from "react-native";
import React from "react";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";

const RecommendItem = ({
  item,
}: {
  item: { id: number; text: string; type: string };
}) => {
  const { updateAlarm } = useAlarmStore();
  return (
    <Pressable
      className="rounded-lg bg-[#F9F9F9] py-6 px-4 my-1.5"
      onPress={() => updateAlarm({ contents: item.text })}
    >
      <Text className="text-[16px] w-[90%] text-[#222]" numberOfLines={3}>
        {item.text}
      </Text>
    </Pressable>
  );
};

export default RecommendItem;
