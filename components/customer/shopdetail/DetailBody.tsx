import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useShopInfoStore, getIndustryLabel } from "@/store/shop/useShopInfoStore";
import ImageSwiper from "./ImageSwiper";
import Info from "./Info";
import Sale from "./Sale";
import Menu from "./Menu";
import Question from "./Question";
import Nav from "./Nav";

const TABS = ["영업정보", "특가 알림", "메뉴", "문의", "길찾기"] as const;
type Tab = (typeof TABS)[number];

const DetailBody: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getShopDetail } = useShopInfoStore();
  const shop = getShopDetail(Number(id));
  const [tab, setTab] = useState<Tab>("영업정보");

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      stickyHeaderIndices={[2]}
    >
      <View className="p-4">
        <Text className="text-xl font-bold">{shop?.name}</Text>
        <Text className="text-sm text-[#9E9E9E] pb-2">
          {getIndustryLabel(shop?.industry) ?? ""} · {shop?.address}
        </Text>
      </View>

      <View className="px-4">
        <ImageSwiper
          images={shop?.images ?? (shop?.mainImage ? [shop.mainImage] : [])}
        />
      </View>

      <View
        className="px-4 pt-4 border-b border-[#EDEDED] w-full bg-white"
        style={{ zIndex: 1 }}
      >
        <View className="flex-row gap-x-6">
          {TABS.map((t) => (
            <Pressable key={t} onPress={() => setTab(t)} hitSlop={8}>
              <Text
                className={
                  t === tab
                    ? "font-semibold text-base border-b border-black pb-2 text-black"
                    : "font-semibold text-base text-[#BFBFBF] pb-2 border-b border-transparent"
                }
              >
                {t}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="bg-[#F9F9F9] w-full h-[10px]" />

      <View className="px-4">
        {tab === "영업정보" && <Info />}
        {tab === "특가 알림" && <Sale />}
        {tab === "메뉴" && <Menu />}
        {tab === "문의" && <Question />}
        {tab === "길찾기" && <Nav />}
      </View>
    </ScrollView>
  );
};

export default DetailBody;
