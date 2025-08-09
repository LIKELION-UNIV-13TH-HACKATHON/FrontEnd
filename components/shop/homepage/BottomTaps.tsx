import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter, usePathname } from "expo-router";
import HomeIcon from "../../../assets/images/homeicon.svg";
import ChartIcon from "../../../assets/images/charticon.svg";
import MypageIcon from "../../../assets/images/mypageicon.svg";

const BottomTaps = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View>
      <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-200">
        <View className="flex-row items-center h-16">
          <Pressable
            onPress={() => router.push("/(home)/home_shop")}
            className="flex-1 items-center justify-center gap-1"
          >
            <HomeIcon
              width={24}
              height={24}
              fill={pathname.includes("home_shop") ? "#000000" : "#9CA3AF"}
            />
            <Text
              className={
                pathname.includes("home_shop") ? "text-black" : "text-gray-400"
              }
            >
              홈
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(chart)/papular_chart")}
            className="flex-1 items-center justify-center gap-1"
          >
            <ChartIcon
              width={24}
              height={24}
              fill={pathname.includes("papular_chart") ? "#000000" : "#9CA3AF"}
            />
            <Text
              className={
                pathname.includes("papular_chart")
                  ? "text-black"
                  : "text-gray-400"
              }
            >
              인기차트
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(mypage)/mypage_shop")}
            className="flex-1 items-center justify-center gap-1"
          >
            <MypageIcon
              width={24}
              height={24}
              fill={pathname.includes("mypage_shop") ? "#000000" : "#9CA3AF"}
            />
            <Text
              className={
                pathname.includes("mypage_shop")
                  ? "text-black"
                  : "text-gray-400"
              }
            >
              마이페이지
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BottomTaps;
