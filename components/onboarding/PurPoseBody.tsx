import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import CustomerIcon from "@/assets/images/customericon.svg";
import ShopIcon from "@/assets/images/shopicon.svg";
import NextButton from "../NextButton";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import FilledCircle from "@/assets/images/filledCircle.svg";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PurPoseBody = () => {
  const [selected, setSelected] = useState<"판매자" | "소비자" | null>(null);
  const [active, setActive] = useState(false);
  const { userid } = useLocalSearchParams<{ userid: string }>();

  const [localFlags, setLocalFlags] = useState<{
    hasConsumer: boolean;
    hasSeller: boolean;
  }>({
    hasConsumer: false,
    hasSeller: false,
  });

  useEffect(() => {
    let cancelled = false;
    const loadFlags = async () => {
      try {
        if (!userid) return;
        const raw = await AsyncStorage.getItem(`roleFlags:${userid}`);
        const parsed = raw ? JSON.parse(raw) : null;
        if (!cancelled && parsed && typeof parsed === "object") {
          setLocalFlags({
            hasConsumer: !!parsed.hasConsumer,
            hasSeller: !!parsed.hasSeller,
          });
        }
      } catch (e) {}
    };
    loadFlags();
    return () => {
      cancelled = true;
    };
  }, [userid]);

  const storeUser = useUserInfoStore.getState().user;
  const hasConsumer =
    (storeUser?.hasConsumer ?? false) || localFlags.hasConsumer;
  // const hasSeller = (storeUser?.hasSeller ?? false) || localFlags.hasSeller;
  const hasSeller = true; // 바꿔야댐

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
            {hasSeller && (
              <Text className="text-[11px] mt-1 text-[#FF8A0D]">
                이미 판매자 계정 보유
              </Text>
            )}
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
            {hasConsumer && (
              <Text className="text-[11px] mt-1 text-[#FF8A0D]">
                이미 소비자 계정 보유
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      <NextButton
        active={active}
        onPress={() => {
          if (!selected) return;
          // 역할 보유 여부 기준으로 분기: 보유 → 해당 메인 / 미보유 → 해당 온보딩
          const finalPath =
            selected === "소비자"
              ? hasConsumer
                ? "/(home)/(kakaomap)/map"
                : "/[userid]/onboarding/(customer)/writename"
              : hasSeller
              ? "/(home)/home_shop"
              : "/[userid]/onboarding/(shop)/writeinfo";

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
