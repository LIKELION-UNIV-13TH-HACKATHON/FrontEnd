import React, { useState } from "react";
import { View, Text, Image, Pressable, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import NextButton from "@/components/NextButton";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import CameraIcon from "@/assets/images/cameraicon.svg";
import { useAlarmStore } from "@/store/alarm/useAlarmStore";
import { router } from "expo-router";

const MAX = 2;

const InputImgBody = () => {
  const [images, setImages] = useState<string[]>([]);
  const { updateAlarm } = useAlarmStore();

  const pickImage = async () => {
    try {
      if (images.length >= MAX) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.9,
      });

      if (!result.canceled && result.assets?.length) {
        const uri = result.assets[0].uri;
        setImages((prev) => (prev.length < MAX ? [...prev, uri] : prev));
      }
    } catch (e) {
      console.log("pickImage error", e);
    }
  };

  const removeImage = (idx: number) => {
    Alert.alert("삭제하시겠어요?", "선택한 이미지를 삭제합니다.", [
      { text: "취소", style: "cancel" },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => setImages((prev) => prev.filter((_, i) => i !== idx)),
      },
    ]);
  };

  const renderSlot = (idx: number) => {
    const uri = images[idx];
    if (uri) {
      return (
        <Pressable
          key={idx}
          onLongPress={() => removeImage(idx)}
          className="bg-[#F7F7F7] w-[48%] h-44 rounded-2xl overflow-hidden"
        >
          <Image
            source={{ uri }}
            resizeMode="cover"
            className="w-full h-full"
          />
        </Pressable>
      );
    }
    return (
      <Pressable
        key={idx}
        onPress={pickImage}
        className="bg-[#F7F7F7] w-[48%] h-44 rounded-2xl items-center justify-center"
      >
        {idx === 0 && (
          <View className="items-center">
            <CameraIcon />
            <Text className=" text-[#C6C6C6] text-[16px]">{`${images.length}/${MAX}`}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  const onNext = () => {
    // TODO: 서버로 전송할 때 images 배열
    updateAlarm({ img: images });
    router.push("/shop/writealarm/timeset");
    console.log("SELECTED_IMAGES", images);
  };

  return (
    <View className="flex-1 px-6">
      <View className="flex-row gap-1">
        <EmptyCircle />
        <EmptyCircle />
        <EmptyCircle />
        <FilledCircle />
        <EmptyCircle />
        <EmptyCircle />
      </View>

      <View className="flex-1">
        <Text className="font-extrabold text-[28px] leading-tight mt-6 mb-8">
          알림과 함께할{"\n"}사진을 등록해주세요.
        </Text>

        <View className="flex-row justify-between mt-2">
          {Array.from({ length: MAX }).map((_, i) => renderSlot(i))}
        </View>

        {/* 힌트 */}
        <Text className="text-[12px] text-[#9E9E9E] mt-4">
          최대 {MAX}장까지 등록할 수 있어요. (길게 눌러 삭제)
        </Text>
      </View>

      <NextButton active={images.length > 0} onPress={onNext} />
    </View>
  );
};

export default InputImgBody;
