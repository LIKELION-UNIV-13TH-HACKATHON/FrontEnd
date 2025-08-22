import React from "react";
import { View, Text, Modal, Pressable } from "react-native";
import Icon from "@/assets/images/cunsumericon.svg";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import { router, useLocalSearchParams } from "expo-router";

const SwichModal = ({
  visible,
  setVisible,
  changeValue,
}: {
  visible: boolean;
  setVisible: (v: boolean) => void;
  changeValue: string;
}) => {
  const { userid } = useLocalSearchParams();
  const { user } = useUserInfoStore();
  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/40">
        <Pressable
          className="absolute inset-0"
          onPress={() => setVisible(false)}
        >
          <View />
        </Pressable>

        <View
          className="w-[78%] h-[45%] bg-white rounded-3xl p-4 py-8 z-50 flex-col"
          style={{ elevation: 12 }}
        >
          <View className=" items-center flex-1 space-y-6">
            <Icon />
            <Text className="font-semibold text-lg">{user.name}</Text>
          </View>

          <Pressable
            className="py-4 border-b border-[#EFEFEF]"
            onPress={() => {
              router.dismissAll();
              router.replace({
                pathname: "/[userid]/onboarding/purpose",
                params: { userid: String(userid) },
              });
            }}
          >
            <View className="bg-main h-12 rounded-2xl items-center justify-center ">
              <Text className="text-[16px] font-semibold text-white">
                {changeValue} 계정으로 전환하기
              </Text>
            </View>
          </Pressable>

          <Pressable
            className="mt-4 h-12 rounded-2xl bg-[#EDEDED] items-center justify-center"
            onPress={() => setVisible(false)}
          >
            <Text className="text-[#BFBFBF] text-[16px] font-bold">닫기</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default SwichModal;
