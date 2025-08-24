import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SimpleHeader from "@/components/SimpleHeader";

import { writeQuestion } from "@/util/api/customer/writeQuestion";

const MAX_TITLE = 30;
const MAX_BODY = 300;

const WriteQuestion: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getShopDetail } = useShopInfoStore();
  const info = getShopDetail(Number(id));

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const titleLen = title.length;
  const bodyLen = body.length;

  const disabled = useMemo(() => {
    return (
      titleLen === 0 ||
      bodyLen === 0 ||
      titleLen > MAX_TITLE ||
      bodyLen > MAX_BODY
    );
  }, [titleLen, bodyLen]);

  const submit = async () => {
    if (disabled) return;
    try {
      await writeQuestion({
        shopId: Number(id),
        title,
        question: body,
      });
      Alert.alert("등록 완료", "문의가 등록되었습니다.");
      router.back();
    } catch (e) {
      console.error(e);
      Alert.alert("오류", "문의 등록에 실패했습니다.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={insets.top + 48}
    >
      <SimpleHeader title={"문의"} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="p-4 border-b border-[#EDEDED] pb-4">
          <View className="flex-row gap-4 items-center">
            {info?.mainImage ? (
              <Image
                source={{ uri: info.mainImage }}
                className="w-12 h-12 rounded-full"
                resizeMode="cover"
              />
            ) : (
              <View className="rounded-full bg-[#D9D9D9] w-12 h-12" />
            )}
            <View className="flex-1">
              <Text className="font-semibold text-base" numberOfLines={1}>
                {info!.name}
              </Text>
              <Text className="text-[#999999]" numberOfLines={1}>
                {info!.address}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-[#999999] mb-2">제목</Text>
          <View className="border-b border-[#EDEDED] pb-2">
            <TextInput
              value={title}
              onChangeText={(t) => setTitle(t.slice(0, MAX_TITLE))}
              placeholder={`30자 이내로 입력해주세요.`}
              className="text-base"
              returnKeyType="next"
            />
            <Text
              className={`self-end text-xs ${
                titleLen > MAX_TITLE ? "text-red-500" : "text-[#BDBDBD]"
              }`}
            >
              {titleLen}/{MAX_TITLE}
            </Text>
          </View>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-[#999999] mb-2">내용</Text>
          <View className="border-b border-[#EDEDED] pb-2">
            <TextInput
              value={body}
              onChangeText={(t) => setBody(t.slice(0, MAX_BODY))}
              placeholder={`300자 이내로 입력해주세요.`}
              className="text-base min-h-[120px]"
              multiline
              textAlignVertical="top"
            />
            <Text
              className={`self-end text-xs ${
                bodyLen > MAX_BODY ? "text-red-500" : "text-[#BDBDBD]"
              }`}
            >
              {bodyLen}/{MAX_BODY}
            </Text>
          </View>
        </View>

        <View className="px-4 pt-6">
          <Text className="text-[#BDBDBD]">
            욕설, 비방, 거래 글 등 부적절한 게시글은 금지합니다.{"\n"}
            되불어 문의 시 사실에 근거하여 작성해 주세요.
          </Text>
        </View>
      </ScrollView>

      <View
        className="absolute left-0 right-0 bg-white"
        style={{
          bottom: 0,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 12,
          paddingTop: 12,
          paddingHorizontal: 16,
        }}
      >
        <Pressable
          disabled={disabled}
          onPress={submit}
          className={`h-12 rounded-2xl items-center justify-center ${
            disabled ? "bg-gray-200 opacity-50" : "bg-[#F18A00]"
          }`}
        >
          <Text className="text-white font-semibold">등록하기</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default WriteQuestion;
