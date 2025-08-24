import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import NextButton from "@/components/NextButton";
import { router } from "expo-router";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import checkNickname from "@/util/api/customer/checkNickname";
import { createUser } from "@/util/api/customer/createUser";

const WriteNameBody = () => {
  const [active, setActive] = useState(false);
  const [nickname, setNickName] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<null | boolean>(null);

  const isValidLength = (text: string) =>
    text.trim().length >= 2 && text.trim().length <= 10;

  const handleChange = (text: string) => {
    setNickName(text);
    setError(null);
    setActive(false);
  };

  const handleDuplicateCheck = async () => {
    if (!isValidLength(nickname)) {
      setError(null);
      setActive(false);
      return;
    }
    setIsChecking(true);
    try {
      const available = await checkNickname(nickname.trim());
      setError(!available);
      setActive(available && isValidLength(nickname));
    } catch (e) {
      setError(true);
      setActive(false);
    }
    setIsChecking(false);
  };

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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TextInput
              className="border-b pb-1 border-[#CCCCCC] flex-1"
              placeholder="한글, 영어 혼돈 사용 가능(2~10글자 내외)"
              placeholderTextColor="#BFBFBF"
              onChangeText={handleChange}
              maxLength={10}
              value={nickname}
              editable={!isChecking}
            />
            <TouchableOpacity
              style={{
                marginLeft: 8,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 12,
                backgroundColor: "#eee",
              }}
              onPress={handleDuplicateCheck}
              disabled={isChecking || !isValidLength(nickname)}
            >
              {isChecking ? (
                <ActivityIndicator size="small" color="#888" />
              ) : (
                <Text style={{ color: "#333", fontSize: 13 }}>중복확인</Text>
              )}
            </TouchableOpacity>
          </View>
          {error === true && (
            <Text style={{ color: "#D92D20", fontSize: 12, marginTop: 4 }}>
              이미 사용중인 닉네임입니다.
            </Text>
          )}
          {error === false && (
            <Text style={{ color: "#2E7D32", fontSize: 12, marginTop: 4 }}>
              사용 가능한 닉네임입니다.
            </Text>
          )}
        </View>
      </View>
      <NextButton
        active={active}
        onPress={async () => {
          await createUser(nickname);
          useUserInfoStore.getState().setUser({
            nickname: nickname,
          });
          router.replace("/(home)/(kakaomap)/map");
        }}
      />
    </View>
  );
};

export default WriteNameBody;
