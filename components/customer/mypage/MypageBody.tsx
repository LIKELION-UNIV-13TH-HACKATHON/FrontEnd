import { View, Text, Pressable } from "react-native";
import React from "react";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import SideArrow from "@/assets/images/sidearrow.svg";
import { router, useLocalSearchParams } from "expo-router";

const MypageBody = () => {
  const { user } = useUserInfoStore();
  const Avatar = user.avatar;
  const { userid } = useLocalSearchParams();
  return (
    <View className="flex-1 p-4">
      <View className="flex-row items-center gap-4">
        <Pressable>
          <Avatar width={65} />
        </Pressable>
        <Text className="text-[20px] font-bold">{user.name}</Text>
      </View>
      <Text className="text-[#BFBFBF] text-[15px] py-4">구독</Text>
      <Pressable
        className="flex-row justify-between items-center border-b pb-2 border-[#EDEDED]"
        onPress={() =>
          router.push({
            pathname: "/[userid]/(mypage)/subscribe",
            params: { userid: String(userid) },
          })
        }
      >
        <Text className="text-[16px] text-[#515151]">구독 내역 보러가기</Text>
        <SideArrow />
      </Pressable>
    </View>
  );
};

export default MypageBody;
