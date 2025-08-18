import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, Pressable, Image, Modal } from "react-native";
import { useShopDraftStore } from "@/store/shop/useShopDraftStore";
import { router } from "expo-router";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import Vector from "@/assets/images/Vector.svg";
import Phone from "@/assets/images/phonenumbericon.svg";
import Time from "@/assets/images/timeicon.svg";
import DropIcon from "@/assets/images/minidroparrow.svg";
import UpIcon from "@/assets/images/uparrowicon.svg";

const DAYS: Array<"월" | "화" | "수" | "목" | "금" | "토" | "일"> = [
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
  "일",
];

const INDUSTRY_ORDER = [
  "농수축산물",
  "식료품",
  "생활잡화",
  "의류/패션",
  "건강/미용",
  "기타",
] as const;

type IndustryKorean = (typeof INDUSTRY_ORDER)[number];

const industryToLabel = (v?: string): IndustryKorean | string => {
  if (!v) return "기타";
  const codeMap: Record<string, IndustryKorean> = {
    agri: "농수축산물",
    food: "식료품",
    daily: "생활잡화",
    fashion: "의류/패션",
    health: "건강/미용",
    etc: "기타",
  };
  if (v in codeMap) return codeMap[v as keyof typeof codeMap];
  if (INDUSTRY_ORDER.includes(v as IndustryKorean)) return v as IndustryKorean;
  return "기타";
};

const FinalCheckBody: React.FC = () => {
  const { draft, clearDraft } = useShopDraftStore();
  const [visible, setVisible] = useState(true);
  const [hoursExpanded, setHoursExpanded] = useState(false);

  const noDraft = !draft;

  const hoursMap = useMemo(() => {
    const m = new Map<string, { open: string; close: string }>();
    draft?.hours.forEach((h) => m.set(h.day, { open: h.open, close: h.close }));
    return m;
  }, [draft?.hours]);

  const monday = hoursMap.get("월");

  return (
    <View className="flex-1 px-4 bg-white">
      {/* progress dots */}
      <View className="flex-row gap-1 mb-10 mt-2">
        <EmptyCircle />
        <EmptyCircle />
        <FilledCircle />
      </View>

      <Text className="text-2xl font-bold mb-4">
        마지막으로{"\n"}확인해볼까요?
      </Text>

      {noDraft ? (
        <View className="flex-1 items-center justify-center p-6">
          <Text className="text-base text-gray-500 mb-4">
            검토할 데이터가 없습니다.
          </Text>
          <Pressable
            onPress={() => router.back()}
            className="px-4 py-3 bg-main rounded-xl"
          >
            <Text className="text-white font-semibold">이전으로</Text>
          </Pressable>
        </View>
      ) : (
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <View className="flex-1 bg-black/40">
            <Pressable className="flex-1" onPress={() => setVisible(false)} />
            <View
              className="bg-white rounded-t-3xl pt-3 pb-5"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 10,
                elevation: 3,
              }}
            >
              <View className="mx-auto w-12 h-1.5 rounded-full bg-gray-300 mb-2" />

              <View className="bg-white px-5 py-4">
                {/* 제목/부제 */}
                <Text className="text-xl font-bold" numberOfLines={1}>
                  {draft?.shopName}
                </Text>
                <Text className="mt-1 text-gray-400" numberOfLines={1}>
                  {industryToLabel(draft?.industry)} · {draft?.address}
                </Text>

                {/* 이미지 가로 스와이프 */}
                <View className="mt-4">
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingRight: 8 }}
                  >
                    {draft?.images.map((u, i) => (
                      <Image
                        key={`img-${i}`}
                        source={{ uri: u }}
                        resizeMode="cover"
                        style={{
                          width: 160,
                          height: 160,
                          borderRadius: 12,
                          marginRight: 12,
                        }}
                      />
                    ))}
                  </ScrollView>
                </View>

                {/* 운영시간 (접힘/펼침) */}
                <View className="mt-4 flex-row items-start space-x-2">
                  <View className="pt-1">
                    <Time />
                  </View>

                  <View className="w-36">
                    {hoursExpanded ? (
                      DAYS.map((d) => {
                        const h = hoursMap.get(d);
                        return (
                          <View
                            key={`day-${d}`}
                            className="flex-row items-center py-1"
                          >
                            <Text className="w-16 text-gray-500">{d}요일</Text>
                            <Text className="text-gray-800">
                              {h ? `${h.open}~${h.close}` : "휴무"}
                            </Text>
                          </View>
                        );
                      })
                    ) : (
                      <View className="flex-row items-center py-1">
                        <Text className="w-16 text-gray-500">월요일</Text>
                        <Text className="text-gray-800">
                          {monday ? `${monday.open}~${monday.close}` : "휴무"}
                        </Text>
                      </View>
                    )}
                  </View>

                  {hoursExpanded ? (
                    <Pressable
                      className="pt-2"
                      onPress={() => setHoursExpanded(false)}
                      hitSlop={8}
                    >
                      <DropIcon />
                    </Pressable>
                  ) : (
                    <Pressable
                      className="pt-2"
                      onPress={() => setHoursExpanded(true)}
                      hitSlop={8}
                    >
                      <UpIcon />
                    </Pressable>
                  )}
                </View>

                {/* 주소/연락처 */}
                <View className="flex-col mt-3 pt-2 space-y-2">
                  <View className="flex-row gap-2 items-center">
                    <Vector />
                    <Text className="text-[#9E9E9E]" numberOfLines={1}>
                      {draft?.address}
                    </Text>
                  </View>
                  {!!draft?.phone && (
                    <View className="flex-row gap-2 items-center">
                      <Phone />
                      <Text className="text-[#7D7D7D]" numberOfLines={1}>
                        {draft?.phone}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View className="flex-row gap-3 px-4 pb-2">
                <Pressable
                  onPress={() => {
                    setVisible(false);
                    router.back();
                  }}
                  className="flex-1 h-12 rounded-xl bg-gray-100 items-center justify-center"
                >
                  <Text className="text-gray-600 font-semibold">취소</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    // TODO: 서버 전송 로직 연결
                    setVisible(false);
                    router.replace("/(home)/home_shop");
                    setTimeout(() => clearDraft(), 0);
                  }}
                  className="flex-1 h-12 rounded-xl bg-main items-center justify-center"
                >
                  <Text className="text-white font-semibold">확인</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default FinalCheckBody;
