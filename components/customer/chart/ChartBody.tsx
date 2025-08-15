import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import ChartItem from "./ChartItemList";

const TABS = ["최신순", "거리순", "구독순"] as const;
type Tab = (typeof TABS)[number];
const ChartBody = () => {
  const [tab, setTab] = useState<Tab>("최신순");
  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: 40 }}
      stickyHeaderIndices={[1]}
    >
      <View className="px-4 pt-2 mb-4 w-full bg-white" style={{ zIndex: 1 }}>
        <View className="flex-row gap-x-1.5">
          {TABS.map((t) => (
            <Pressable key={t} onPress={() => setTab(t)} hitSlop={8}>
              <Text
                className={
                  t === tab
                    ? "text-[#FF8A0D] border-[#FFB668] bg-[#FFECD9] border rounded-xl py-1.5 px-2.5 text-xs"
                    : "text-[#999999] border-[#DDDDDD] border rounded-xl py-1.5 px-2.5 text-xs"
                }
              >
                {t}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View className="px-4">
        {tab === "최신순" && <ChartItem tab={"latest"} />}
        {tab === "구독순" && <ChartItem tab={"popular"} />}
        {tab === "거리순" && <ChartItem tab={"near"} />}
      </View>
    </ScrollView>
  );
};

export default ChartBody;
