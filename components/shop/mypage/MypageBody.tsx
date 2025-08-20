import { View, Text } from "react-native";
import React from "react";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const MypageBody = () => {
  const { user } = useUserInfoStore();
  return (
    <View className="flex-1 items-center">
      <Text className="font-bold text-2xl">
        {user.shopName || "멋쟁이 사자"}
      </Text>
    </View>
  );
};

export default MypageBody;
