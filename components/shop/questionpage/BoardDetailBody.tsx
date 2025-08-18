import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { timeAgo } from "@/util/calculate/time";
import { useLocalSearchParams } from "expo-router";
import { useQuestionInfoStore } from "@/store/question/useQuestionInfoStore";

const BoardDetailBody = () => {
  const { boardid } = useLocalSearchParams();
  const { questions, updateAnswer } = useQuestionInfoStore();
  let boardData = questions.find((data) => data.id === Number(boardid));
  const [answerText, setAnswerText] = useState("");

  if (!boardData) {
    return (
      <View>
        <Text>no data</Text>
      </View>
    );
  }
  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-2.5 p-4 pb-8">
        <View className="w-[41px] h-[41px] bg-gray-400 rounded-full" />
        <Text className="text-[15px] text-[#1F1F1F]">
          {boardData.writer} | {timeAgo(boardData.timestamp)}
        </Text>
      </View>
      <View className="gap-4 p-4 pb-8">
        <Text className="text-[18px] font-semibold">{boardData.title}</Text>
        <Text className="text-[#999999] text-[16px] w-72">
          {boardData.contents}
        </Text>
      </View>
      {boardData.answer !== null ? (
        <View className="flex-1 bg-[#F9F9F9] p-4 pt-8 gap-4">
          <Text className="text-[#515151] text-[16px] font-semibold">
            나의 답변
          </Text>
          <Text className="text-[#999999] text-[16px]">{boardData.answer}</Text>
        </View>
      ) : (
        <View className="flex-1 bg-[#F9F9F9] p-4 pt-8 gap-4">
          <Text className="text-[#515151] text-[16px] font-semibold">
            나의 답변
          </Text>

          <View className="bg-white rounded-xl border border-[#EDEDED]">
            <TextInput
              className="p-3 h-32 text-[16px]"
              placeholder="답변을 입력해주세요..."
              multiline
              value={answerText}
              onChangeText={setAnswerText}
              textAlignVertical="top"
            />
          </View>

          <View className="mt-1">
            <Pressable
              className="h-12 rounded-xl items-center justify-center bg-main disabled:bg-[#E0E0E0]"
              disabled={!answerText.trim()}
              onPress={() => {
                updateAnswer(Number(boardid), answerText.trim());
                setAnswerText("");
              }}
              //todo: 백엔드 로직 추가해야함
            >
              <Text className="text-white text-[16px] font-semibold">
                답변 제출
              </Text>
            </Pressable>
            <Text className="text-[#9E9E9E] text-[12px] mt-2">
              200자 이내로 작성해주세요.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default BoardDetailBody;
