import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";
import { router } from "expo-router";

const SelfTextBody = () => {
  const [text, setText] = useState("");
  const [active, setActive] = useState(false);
  const { updateAlarm } = useAlarmStore();
  useEffect(() => {
    if (text.length) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [text]);
  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1">
        <EmptyCircle />
        <FilledCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
      </View>
      <View className="flex-1">
        <Text className="py-10 text-[26px] font-bold">
          알림에 대해{"\n"}작성해주세요.
        </Text>
        <Text className="text-[#999999] text-base mb-4">알림 내용 작성</Text>
        <TextInput
          placeholder="사용자들에게 알리고 싶은 내용을 작성하세요."
          className="border-b pb-2 border-gray1"
          value={text}
          onChangeText={setText}
        />
      </View>
      <NextButton
        active={active}
        onPress={() => {
          updateAlarm({contents:text})
          router.push("/(home)/shop/writealarm/recommendtext");
        }}
      />
    </View>
  );
};

export default SelfTextBody;
