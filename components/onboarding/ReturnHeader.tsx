import { View, Text, Pressable } from "react-native";
import React from "react";
import BackArrow from "@/assets/images/backarrow.svg";
import { router, useLocalSearchParams } from "expo-router";

const ReturnHeader = ({ kind }: { kind: string }) => {
  const { userid } = useLocalSearchParams<{ userid: string }>();
  return (
    <View className="flex-row justify-between p-4 items-center">
      <Pressable
        onPress={() => {
          const navigation = router;
          if ((navigation as any).canGoBack?.()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        <BackArrow />
      </Pressable>
      <Pressable
        onPress={() =>
          kind === "onboarding"
            ? router.replace({
                pathname: "/[userid]/onboarding/purpose",
                params: { userid: String(userid) },
              })
            : router.replace("/shop/writealarm/select")
        }
      >
        <Text className="text-[#B0B0B0]">다시하기</Text>
      </Pressable>
    </View>
  );
};

export default ReturnHeader;
