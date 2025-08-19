import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import PencilIcon from "@/assets/images/pencilicon.svg";
import MicIcon from "@/assets/images/micicon.svg";
import { router } from "expo-router";

const SelectBody = () => {
  const [selected, setSelected] = useState<"음성인식" | "직접입력" | null>(
    null
  );
  const [active, setActive] = useState(false);

  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1">
        <FilledCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
      </View>
      <View className="flex-1 pt-10">
        <Text className="font-bold text-[26px]">
          어떤 방식으로{"\n"}알림을 작성할까요?
        </Text>
        <Pressable
          className={`p-4 flex-row items-center border space-x-4 rounded-[10px] mt-10 ${
            selected === "음성인식"
              ? "border-[#FFB668] bg-[#FFECD9] "
              : "border-[#EDEDED]"
          }`}
          onPress={() => {
            setSelected("음성인식");
            setActive(true);
          }}
        >
          <MicIcon />
          <View className=" space-y-1">
            <Text className="font-semibold text-base">음성 인식</Text>
            <Text className="text-[#999999]">음성으로 알림을 작성해요.</Text>
          </View>
        </Pressable>
        <Pressable
          className={`p-4 flex-row items-center border space-x-4  rounded-[10px] mt-4 ${
            selected === "직접입력"
              ? "border-[#FFB668] bg-[#FFECD9] "
              : "border-[#EDEDED]"
          }`}
          onPress={() => {
            setSelected("직접입력");
            setActive(true);
          }}
        >
          <PencilIcon />
          <View className=" space-y-1">
            <Text className="font-semibold text-base">직접 입력</Text>
            <Text className="text-[#999999]">타자로 입력하고 싶어요.</Text>
          </View>
        </Pressable>
      </View>
      <NextButton
        active={active}
        onPress={() =>
          selected === "음성인식"
            ? router.push("/shop/writealarm/stt")
            : router.push("/shop/writealarm/selftext")
        }
      />
    </View>
  );
};

export default SelectBody;
