import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import VectorIcon from "../../../assets/images/vectoricon.svg";
import Arrow from "../../../assets/images/droparrow.svg";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import SwichModal from "@/components/common/SwichModal";
const ShopInfo = () => {
  const { user } = useUserInfoStore();
  const Avatar = user.avatar;
  const [visible, setVisible] = useState(false);
  return (
    <View className=" flex-row p-4 space-x-4">
      <Pressable onLongPress={() => setVisible(true)}>
        {user.mainImage === "" ? <Avatar width={54} height={54} /> : null}
      </Pressable>
      <View className=" flex-1 justify-center">
        <View className="flex-row items-center space-x-2">
          <Text className=" font-bold text-lg">현씨네 과일가게</Text>
          <Arrow />
        </View>
        <View className=" flex-row space-x-1 items-center">
          <VectorIcon />
          <Text className=" text-xs text-[#9E9E9E]">
            충청남도 천안시 동남구 사직동
          </Text>
        </View>
      </View>
      <SwichModal
        visible={visible}
        setVisible={setVisible}
        changeValue={"소비자"}
      />
    </View>
  );
};

export default ShopInfo;
