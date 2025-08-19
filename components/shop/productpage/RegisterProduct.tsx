import * as ImagePicker from "expo-image-picker";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ImageSourcePropType,
} from "react-native";
import CameraIcon from "@/assets/images/cameraicon.svg";
import { useProductStore } from "@/store/user/useProductStore";

const RegisterProduct: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<ImageSourcePropType | null>(null);
  const { addProduct } = useProductStore();

  const canSubmit = useMemo(
    () => name.trim().length >= 1 && price.trim().length >= 1,
    [name, price]
  );

  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const submit = () => {
    // TODO: 이미지/검증/스토어 연동
    const newItem = {
      id: Date.now(),
      name,
      description,
      price: Number(price.replace(/[^0-9]/g, "")),
      image: image ?? { uri: "" },
    };
    addProduct(newItem);
    console.log("REGISTER_PRODUCT", newItem);
    close();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  return (
    <View>
      <Pressable
        onPress={open}
        className="absolute bottom-20 self-center w-[165px] h-[52px] rounded-xl bg-main py-3 items-center justify-center"
      >
        <Text className="text-white font-bold text-[18px] ">상품 등록하기</Text>
      </Pressable>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        onRequestClose={close}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <Pressable className="flex-1 bg-black/40" onPress={close} />

          <View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 max-h-[80%] pb-8">
            <View className="h-[4px] w-14 self-center rounded-full bg-[#CCCCCC] -mt-2 mb-4" />
            <Text className="text-2xl font-semibold my-4">새상품 등록</Text>

            <ScrollView
              className="max-h-[70%]"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text className="text-[#999999] mb-4 text-[15px]">상품명</Text>
              <TextInput
                placeholder="상품명을 입력해주세요. (1~10자)"
                value={name}
                onChangeText={setName}
                className="border-b border-gray-200 pb-2 mb-4"
                maxLength={20}
              />

              <Text className="text-[#999999] mb-4 text-[15px]">
                상품 상세 설명
              </Text>
              <TextInput
                placeholder="상세 설명을 입력해주세요."
                value={description}
                onChangeText={setDesc}
                className="border-b border-gray-200 pb-2 mb-4"
              />

              <Text className="text-[#999999] mb-4 text-[15px]">가격</Text>
              <TextInput
                placeholder="가격을 입력해주세요."
                value={price}
                onChangeText={setPrice}
                keyboardType="number-pad"
                className="border-b border-gray-200 pb-2 mb-4"
              />

              <Text className="text-[#999999] mb-4 text-[15px]">
                대표 이미지
              </Text>
              <Pressable
                className="h-32 aspect-square bg-[#F9F9F9] rounded-xl items-center justify-center mb-6 overflow-hidden"
                onPress={pickImage}
              >
                {image ? (
                  <Image source={image} className="w-full h-full rounded-xl" />
                ) : (
                  <CameraIcon />
                )}
              </Pressable>
            </ScrollView>

            <View className="flex-row gap-3 mt-2">
              <Pressable
                onPress={close}
                className="flex-1 rounded-xl bg-gray-100 py-4 items-center h-[55px]"
              >
                <Text className="text-[#BFBFBF] text-semibold text-[18px]">
                  취소
                </Text>
              </Pressable>
              <Pressable
                onPress={submit}
                disabled={!canSubmit}
                className={`flex-1 rounded-xl py-4 items-center h-[55px] ${
                  canSubmit ? "bg-[#F28A15]" : "bg-gray-300"
                }`}
              >
                <Text className="text-white font-bold text-[18px]">확인</Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default RegisterProduct;
