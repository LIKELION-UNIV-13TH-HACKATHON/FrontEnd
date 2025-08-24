import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import CustomerIcon from "@/assets/images/customericon.svg";
import ShopIcon from "@/assets/images/shopicon.svg";
import NextButton from "../NextButton";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import FilledCircle from "@/assets/images/filledCircle.svg";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const PurPoseBody = () => {
  const [selected, setSelected] = useState<"판매자" | "소비자" | null>(null);
  const [active, setActive] = useState(false);
  const { userid } = useLocalSearchParams<{ userid: string }>();
  return (
    <View className="flex-col px-4 justify-between flex-1">
      <View>
        <View className="flex-row gap-1 mb-10">
          <FilledCircle />
          <EmptyCircle />
        </View>
        <Text className="font-extrabold text-2xl w-5/12">
          어떤 목적으로 이용하시나요?
        </Text>
        <View className="flex-row py-8 gap-4">
          <Pressable
            onPress={() => {
              setSelected("판매자");
              setActive(true);
            }}
            className={`flex-col items-center space-y-4 border py-4 px-8 rounded-lg ${
              selected === "판매자"
                ? "border-[#FFB668] bg-[#FFECD9]"
                : "border-[#EDEDED]"
            }`}
          >
            <ShopIcon />
            <Text
              className={`font-bold text-base ${
                selected === "판매자" ? "text-[#F67F00]" : "text-black"
              }`}
            >
              판매자
            </Text>
            <Text
              className={`text-center ${
                selected === "판매자" ? "text-[#FFA443]" : "text-[#999999]"
              }`}
            >
              매장 소식을{"\n"}손님에게 알리기
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setSelected("소비자");
              setActive(true);
            }}
            className={`flex-col items-center space-y-4 border py-4 px-8 rounded-lg ${
              selected === "소비자"
                ? "border-[#FFB668] bg-[#FFECD9]"
                : "border-[#EDEDED]"
            }`}
          >
            <CustomerIcon />
            <Text
              className={`font-bold text-base ${
                selected === "소비자" ? "text-[#F67F00]" : "text-black"
              }`}
            >
              소비자
            </Text>
            <Text
              className={`text-center ${
                selected === "소비자" ? "text-[#FFA443]" : "text-[#999999]"
              }`}
            >
              가게 소식을{"\n"}빠르게 받아보기
            </Text>
          </Pressable>
        </View>
      </View>

      <NextButton
        active={active}
        onPress={() => {
          if (!selected) return;
          const pathnameNewMember =
            selected === "소비자"
              ? "/[userid]/onboarding/(customer)/writename"
              : "/[userid]/onboarding/(shop)/writeinfo";

          const pathnameOldMember =
            selected === "소비자"
              ? "/(home)/(kakaomap)/map"
              : "/(home)/home_shop";

          const finalPath = useUserInfoStore.getState().user.isNewMember
            ? pathnameNewMember
            : pathnameOldMember;

          router.push({
            pathname: finalPath,
            params: { userid: String(userid) },
          });
        }}
      />
    </View>
  );
};

export default PurPoseBody;
