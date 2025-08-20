import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import { router } from "expo-router";
import TimePickerSheet from "./TimePickerSheet";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";

const TimeSetBody = () => {
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const { updateAlarm, sendAlarm } = useAlarmStore();
  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1">
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <FilledCircle />
        <EmptyCircle />
      </View>
      <View className="flex-1">
        <Text className="font-bold text-[26px] py-10">
          언제 알림을{"\n"}발송할까요?
        </Text>
        <Pressable
          className={` border rounded-lg py-5 px-4 mb-2 ${
            selected === "now"
              ? "border-[#FFB668] bg-[#FFECD9]"
              : " border-[#EDEDED]"
          }`}
          onPress={() => {
            setSelected("now");
            setActive(true);
          }}
        >
          <Text className="font-semibold text-[16px]">즉시 발송</Text>
          <Text className="text-[15px] text-[#999999]">
            지금 바로 손님에게 알림을 발송해요.
          </Text>
        </Pressable>
        <Pressable
          className={` border rounded-lg py-5 px-4 ${
            selected === "later"
              ? "border-[#FFB668] bg-[#FFECD9]"
              : " border-[#EDEDED]"
          }`}
          onPress={() => {
            setSelected("later");
            setActive(true);
          }}
        >
          <Text className="font-semibold text-[16px]">예약 발송</Text>
          <Text className="text-[15px] text-[#999999]">
            00 : 00 시에 손님에게 알림을 발송해요.{" "}
          </Text>
        </Pressable>
      </View>
      <NextButton
        active={active}
        onPress={() => {
          if (selected === "now") {
            const date = new Date(Date.now() + 30 * 1000);
            updateAlarm({ time: date });
            sendAlarm();
            router.replace("/(home)/shop/writealarm/guide");
          } else if (selected === "later") {
            setSheetOpen(true);
          }
        }}
      />
      <TimePickerSheet
        visible={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={(date) => {
          // TODO: save to store here later
          updateAlarm({ time: date });
          sendAlarm();
          setSheetOpen(false);
          router.replace("/(home)/shop/writealarm/guide");
        }}
      />
    </View>
  );
};

export default TimeSetBody;
