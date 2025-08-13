import { View, Text, Pressable } from "react-native";
import React from "react";
import BackArrow from "../../../assets/images/backarrow.svg";
import FilledStar from "../../../assets/images/filledstar.svg";
import { router } from "expo-router";
const DetailHeader = () => {
  return (
    <View className="flex-row justify-between px-4 py-2">
      <Pressable onPress={() => router.back()}>
        <BackArrow />
      </Pressable>
      <FilledStar />
    </View>
  );
};

export default DetailHeader;
