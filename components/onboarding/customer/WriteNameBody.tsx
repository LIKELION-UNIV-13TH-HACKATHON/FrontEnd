import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import NextButton from "@/components/NextButton";
import { router } from "expo-router";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const WriteNameBody = () => {
  const [active, setActive] = useState(false);
  const [nickname, setNickName] = useState("");

  return (
    <View className="flex-1 px-4  justify-between">
      <View className=" space-y-9">
        <View className="flex-row gap-1">
          <EmptyCircle />
          <FilledCircle />
        </View>
        <Text className="font-bold text-2xl">
          회원님의{"\n"}닉네임을 알려주세요.
        </Text>
        <View className=" space-y-4">
          <Text className="text-[#999999]">닉네임</Text>
          <TextInput
            className="border-b pb-1 border-[#CCCCCC]"
            placeholder="한글, 영어 혼돈 사용 가능(2~10글자 내외)"
            placeholderTextColor="#BFBFBF"
            onChangeText={(text) => {
              setNickName(text);
              setActive(text.trim().length >= 2 && text.trim().length <= 10);
            }}
            maxLength={10}
            value={nickname}
          />
        </View>
      </View>
      {/* 중복체크 넣어야함 */}
      <NextButton
        active={active}
        onPress={() => {
          useUserInfoStore.getState().setUser({
            nickname: nickname,
            customerMember: true,
          });
          router.replace("/(home)/(kakaomap)/map");
        }}
      />
    </View>
  );
};

export default WriteNameBody;
