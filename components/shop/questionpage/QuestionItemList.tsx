import { View, Text } from "react-native";
import React, { useEffect } from "react";
import QuestionItem from "./QuestionItem";
import { useQuestionInfoStore } from "@/store/question/useQuestionInfoStore";

const dummyData = [
  {
    id: 1,
    title: "무슨 과일이 가장 당도가 높나요?",
    contents:
      "07.05일에 선물용으로 과일을 구매하려고 하는데 무슨 과일이 가장 당도가 높을까요?",
    writer: "홍길동",
    timestamp: Date.now() - 1000 * 60 * 23, // 23분 전
    answer: null,
  },
  {
    id: 2,
    title: "오늘 배송 가능한가요?",
    contents: "사과 10박스 주문하려고 하는데 오늘 바로 받을 수 있나요?",
    writer: "이영희",
    timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2시간 전
    answer: "답변입니다.",
  },
  {
    id: 3,
    title: "망고 입고일이 언제인가요?",
    contents: "지난번에 망고가 품절이던데 언제쯤 다시 들어올까요?",
    writer: "박철수",
    timestamp: Date.now() - 1000 * 60 * 60 * 24, // 하루 전
    answer: null,
  },
];

const QuestionItemList = ({ tab }: { tab: string }) => {
  //todo: 문의 내역 res받아야함
  const { setQuestion, questions } = useQuestionInfoStore();
  useEffect(() => {
    if (!questions || questions.length === 0) {
      setQuestion(dummyData);
    }
  }, [questions?.length, setQuestion]);
  let filterQuestion = [...(questions ?? [])];
  if (tab === "완료") {
    filterQuestion = filterQuestion.filter((data) => data.answer !== null);
  } else if (tab === "미완료") {
    filterQuestion = filterQuestion.filter((data) => data.answer === null);
  }
  return (
    <View className="">
      {filterQuestion.map((data) => (
        <QuestionItem
          key={data.id}
          id={data.id}
          title={data.title}
          contents={data.contents}
          writer={data.writer}
          timestamp={data.timestamp}
        />
      ))}
    </View>
  );
};

export default QuestionItemList;
