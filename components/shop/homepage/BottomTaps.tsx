import { View, Text, Pressable } from "react-native";
import React from "react";
import { useRouter, usePathname } from "expo-router";
import HomeIcon from "../../../assets/images/homeicon.svg";
import ChartIcon from "../../../assets/images/charticon.svg";
import MypageIcon from "../../../assets/images/mypageicon.svg";
import ProductIcon from "@/assets/images/producticon.svg";
import QAIcon from "@/assets/images/qaicon.svg";

const BottomTaps = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View>
      <View className="absolute left-0 right-0 bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <View className="flex-row items-center h-16">
          <Pressable
            onPress={() => router.push("/(home)/home_shop")}
            className="flex-1 items-center justify-center gap-1"
          >
            <HomeIcon
              width={24}
              height={24}
              fill={
                pathname.includes("home_shop") || pathname.includes("map")
                  ? "#000000"
                  : "#CCCCCC"
              }
            />
            <Text
              className={`text-[12px] ${
                pathname.includes("home_shop") ? "text-black" : "text-[#CCCCCC]"
              }`}
            >
              매장
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/shop/question")}
            className="flex-1 items-center justify-center gap-2"
          >
            <QAIcon
              width={19}
              height={19}
              fill={pathname.includes("question") ? "#000000" : "#CCCCCC"}
            />
            <Text
              className={
                pathname.includes("question")
                  ? "text-[12px] text-black"
                  : "text-[12px] text-[#CCCCCC]"
              }
            >
              문의
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/shop/product")}
            className="flex-1 items-center justify-center gap-2"
          >
            <ProductIcon
              width={19}
              height={19}
              fill={pathname.includes("product") ? "#000000" : "#CCCCCC"}
            />
            <Text
              className={
                pathname.includes("product")
                  ? "text-[12px] text-black"
                  : "text-[12px] text-[#CCCCCC]"
              }
            >
              재고
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/(home)/shop/mypage")}
            className="flex-1 items-center justify-center gap-1"
          >
            <MypageIcon
              width={24}
              height={24}
              fill={pathname.includes("mypage") ? "#000000" : "#CCCCCC"}
            />
            <Text
              className={
                pathname.includes("mypage")
                  ? "text-[12px] text-black"
                  : "text-[12px] text-[#CCCCCC]"
              }
            >
              마이
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BottomTaps;
