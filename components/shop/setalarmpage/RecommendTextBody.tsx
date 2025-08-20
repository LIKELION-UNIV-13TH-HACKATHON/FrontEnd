import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import MicIcon from "@/assets/images/ministticon.svg";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";
import { router } from "expo-router";
import RecommendList from "./RecommendList";
const RecommendTextBody = () => {
  const { alarmInfo, updateAlarm } = useAlarmStore();
  const [text, setText] = useState(alarmInfo.contents);
  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1">
        <EmptyCircle />
        <EmptyCircle />
        <FilledCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[26px] py-10">
          알림 문구를{"\n"}추천해드려요!
        </Text>
        <View className="flex-row space-x-2 items-center">
          <TextInput
            className="border flex-1 rounded-lg border-[#EDEDED] text-[16px] h-14 px-2"
            value={alarmInfo.contents}
            onChangeText={(v) => {
              setText(v);
              updateAlarm({ contents: v });
            }}
          />
          <Pressable onPress={() => router.push("/shop/writealarm/stt")}>
            <MicIcon />
          </Pressable>
        </View>
        <RecommendList />
      </View>
      <NextButton
        active={true}
        onPress={() => router.push("/(home)/shop/writealarm/inputimg")}
      />
    </View>
  );
};

export default RecommendTextBody;
