import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import RecommendItem from "./RecommendItem";

const dummyData = [
  // 친절
  {
    id: 1,
    type: "친절",
    text: "오늘 방문해 주시면 정성껏 준비한 혜택을 드릴게요 🍀",
  },
  {
    id: 2,
    type: "친절",
    text: "항상 찾아주셔서 감사합니다! 특별 할인을 준비했어요 😊",
  },
  {
    id: 3,
    type: "친절",
    text: "고객님을 위해 오늘만 드리는 특별 혜택을 확인해 보세요 ✨",
  },

  // 간결
  {
    id: 4,
    type: "간결",
    text: "오늘만 할인! 놓치지 마세요 🔥",
  },
  {
    id: 5,
    type: "간결",
    text: "특가 진행 중, 지금 바로 확인하세요 🛒",
  },
  {
    id: 6,
    type: "간결",
    text: "재고 한정 세일, 서두르세요 ⚡",
  },

  // 유머
  {
    id: 7,
    type: "유머",
    text: "오늘 과일이 너무 달아서 농담도 못하겠네요 🍎😂",
  },
  {
    id: 8,
    type: "유머",
    text: "가격이 미쳤다! 사장님 정신줄 잡아주세요 🤯",
  },
  {
    id: 9,
    type: "유머",
    text: "이거 안 사면 우리 가게 강아지가 슬퍼해요 🐶💔",
  },
];

const tabs = ["모두보기", "친절", "간결", "유머"];
const RecommendList = () => {
  const [selected, setSelected] = useState("모두보기");
  const sortedList = useMemo(() => {
    if (selected === "친절") return dummyData.filter((v) => v.type === "친절");
    if (selected === "간결") return dummyData.filter((v) => v.type === "간결");
    if (selected === "유머") return dummyData.filter((v) => v.type === "유머");
    return dummyData;
  }, [selected]);
  return (
    <View className="flex-1">
      <View className="flex-row gap-1 pt-6 pb-2">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            className={`border rounded-[10px] py-1.5 px-2.5 ${
              selected === tab
                ? " border-[#FFB668] bg-[#FFECD9]"
                : "border-[#DDDDDD]"
            }`}
            onPress={() => setSelected(tab)}
          >
            <Text
              className={`text-[15px] ${
                selected === tab ? "text-[#FF8A0D]" : " text-[#999999]"
              }`}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedList.map((item) => (
          <RecommendItem item={item} key={item.id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecommendList;
