import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useState } from "react";
import QuestionItemList from "./QuestionItemList";
const TABS = ["전체보기", "완료", "미완료"] as const;
type Tab = (typeof TABS)[number];
const QuestionBody = () => {
  const [tab, setTab] = useState<Tab>("전체보기");
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
        {tab === "전체보기" && <QuestionItemList tab={"전체보기"}/>}
        {tab === "완료" && <QuestionItemList tab={"완료"}/>}
        {tab === "미완료" && <QuestionItemList tab={"미완료"}/>}
      </View>
    </ScrollView>
  );
};

export default QuestionBody;
