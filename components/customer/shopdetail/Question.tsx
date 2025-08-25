import React, { useMemo, useState } from "react";
import { Svg, Path } from "react-native-svg";
import {
  View,
  Text,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { getQuestion } from "@/util/api/customer/getShopDetail";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type QA = { id: string; question: string; answer?: string };

type Props = {
  data?: QA[]; // API 붙이면 여기로 주입
};

const defaultData: QA[] = [
  {
    id: "1",
    question: "바나나는 싱싱한가요?",
    answer: "네, 당일 입고된 신선한 상품만 판매합니다.",
  },
  {
    id: "2",
    question: "과일의 유통기한은 얼마나 되나요?",
    answer: "과일별로 상이하며 보관법에 따라 달라집니다.",
  },
  {
    id: "3",
    question: "특정 과일(체리, 블루베리) 입고 시기와 주문은?",
  }, // 답변 없음 케이스
  {
    id: "4",
    question: "택배나 배달 서비스가 가능한가요?",
    answer: "근거리 배달 가능하며 택배는 준비 중입니다.",
  },
  {
    id: "5",
    question: "택배나 배달 서비스가 가능한가요?",
    answer: "근거리 배달 가능하며 택배는 준비 중입니다.",
  },
  {
    id: "6",
    question: "택배나 배달 서비스가 가능한가요?",
    answer: "근거리 배달 가능하며 택배는 준비 중입니다.",
  },
  {
    id: "7",
    question: "택배나 배달 서비스가 가능한가요?",
    answer: "근거리 배달 가능하며 택배는 준비 중입니다.",
  },
];

const Question: React.FC<Props> = ({ data }) => {
  const insets = useSafeAreaInsets();
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [qas, setQas] = useState<QA[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggle = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const { id } = useLocalSearchParams() as { id?: string };

  React.useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        if (!id || data) return;
        setLoading(true);
        setError(null);
        const arr = await getQuestion(Number(id));
        if (!cancelled) {
          const list = Array.isArray(arr) ? arr : arr?.responses;
          const mapped: QA[] = (Array.isArray(list) ? list : []).map(
            (it: any) => ({
              id: String(it?.inquiryId ?? it?.id ?? it?.qaId ?? Math.random()),
              question: String(it?.question ?? it?.title ?? ""),
              answer: it?.answer ?? undefined,
            })
          );
          setQas(mapped);
        }
      } catch (e: any) {
        if (!cancelled)
          setError(e?.message ?? "문의 목록을 불러오지 못했습니다");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [id, data]);

  const list = useMemo(() => {
    if (data && data.length) return data;
    if (qas && qas.length) return qas;
    return []; // fallback
  }, [data, qas]);

  return (
    <View className="w-full flex-1">
      {loading && (
        <Text className="text-gray-500 px-2 py-2">
          문의 목록을 불러오는 중…
        </Text>
      )}
      {!!error && <Text className="text-red-500 px-2 py-2">{error}</Text>}
      {list.map((item) => {
        const opened = openIds.has(item.id);
        return (
          <View key={String(item.id)} className="border-b border-[#EDEDED]">
            <Pressable
              onPress={() => toggle(item.id)}
              className="px-2 pt-5 pb-2 flex-row items-center justify-between"
            >
              <Text
                className="font-semibold text-base text-gray-900 max-w-[240px] flex-wrap"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                Q. {item.question}
              </Text>
              {
                <Svg
                  width={13}
                  height={7}
                  viewBox="0 0 13 7"
                  fill="none"
                  style={{
                    transform: [{ rotate: opened ? "180deg" : "0deg" }],
                  }}
                >
                  <Path
                    d="M12 0.5L6.5 6.5L0.999999 0.500001"
                    stroke="#8E8E8E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              }
            </Pressable>

            {opened && (
              <View className="px-8 pb-5">
                {item.answer ? (
                  <Text className="text-gray-700 leading-6">
                    A. {item.answer}
                  </Text>
                ) : (
                  <Text className="text-gray-400">아직 답변이 없어요 👀</Text>
                )}
              </View>
            )}
          </View>
        );
      })}
      <View style={{ height: insets.bottom + 72 }} />

      <Pressable
        className="absolute left-2 right-2 items-center justify-center rounded-lg border border-[#CCCCCC] py-3.5 "
        style={{ bottom: insets.bottom }}
        onPress={() =>
          router.push({
            pathname: "/(home)/shopdetail/[id]/writequestion",
            params: { id: String(id) },
          })
        }
      >
        <Text className="text-black font-semibold text-base">
          상품 문의하기
        </Text>
      </Pressable>
    </View>
  );
};

export default Question;
