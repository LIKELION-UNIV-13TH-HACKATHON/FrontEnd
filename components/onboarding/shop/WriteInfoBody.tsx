import {
  View,
  Text,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import React, { useMemo, useState } from "react";
import FilledCircle from "@/assets/images/filledCircle.svg";
import EmptyCircle from "@/assets/images/emptyCircle.svg";
import Postcode from "@actbase/react-daum-postcode";
import { Dropdown } from "react-native-element-dropdown";
import { launchImageLibrary } from "react-native-image-picker";
import CameraIcon from "@/assets/images/cameraicon.svg";
import { Feather } from "@expo/vector-icons";

import HoursForm, { HoursValue, HoursDayKey } from "./HoursForm";
import NextButton from "@/components/NextButton";
import { router, useLocalSearchParams } from "expo-router";
import { useShopDraftStore } from "@/store/shop/useShopDraftStore";

const ListData = [
  { label: "농수축산물", value: "agricultural" },
  { label: "식료품", value: "food" },
  { label: "생활잡화", value: "grocery" },
  { label: "의류/패션", value: "fashion" },
  { label: "건강/미용", value: "healthy" },
  { label: "기타", value: "etc" },
];

const WriteInfoBody = () => {
  const [shopName, setShopName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [businessNo, setBusinessNo] = useState("");
  const [phone, setPhone] = useState("");

  const [showPostcode, setShowPostcode] = useState(false);
  const [address, setAddress] = useState("");
  const [industry, setIndustry] = useState("");

  // 이미지(최대 5)
  type LocalImage = { id: string; uri: string };
  const [images, setImages] = useState<LocalImage[]>([]);

  const [hours, setHours] = useState<HoursValue>({
    days: [],
    times: {} as any,
  });

  const { setDraft } = useShopDraftStore();

  const onSelectImage = () => {
    const left = Math.max(0, 5 - images.length);
    if (left <= 0) {
      Alert.alert("이미지", "최대 5장까지 업로드할 수 있어요.");
      return;
    }
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: left,
        includeBase64: true,
        quality: 0.9,
      },
      (res) => {
        if (!res || (res as any).didCancel || res.errorMessage) return;
        const assets = res.assets ?? [];
        const picked = assets.map((a) => ({
          id: `${Date.now()}-${
            a.fileName ?? (a.uri || Math.random().toString())
          }`,
          uri: a.uri!,
        }));
        setImages((prev) => [...prev, ...picked].slice(0, 5));
      }
    );
  };
  const onRemoveImage = (id: string) =>
    setImages((prev) => prev.filter((it) => it.id !== id));

  const isValid = useMemo(() => {
    const nameOk = shopName.trim().length >= 2 && shopName.trim().length <= 10;
    const hasHours =
      hours.days.length >= 1 &&
      hours.days.every((d) => {
        const t = hours.times[d as HoursDayKey];
        return !!(t && t.open && t.close);
      });
    return nameOk && !!industry && !!address && images.length >= 1 && hasHours;
  }, [shopName, industry, address, images.length, hours]);

  // 폼 객체 생성(서버엔 나중에 사용)
  const toHHmm = (d: Date) =>
    `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(
      2,
      "0"
    )}`;
  const buildFormData = () => {
    const hoursPayload = hours.days.map((day) => {
      const t = hours.times[day as HoursDayKey]!;
      return { day, open: toHHmm(t.open), close: toHHmm(t.close) };
    });
    return {
      shopName: shopName.trim(),
      ownerName: ownerName.trim(),
      businessNo: businessNo.trim(),
      phone: phone.trim(),
      industry,
      address: address.trim(),
      images: images.map((i) => i.uri),
      hours: hoursPayload,
    };
  };
  const { userid } = useLocalSearchParams<{ userid: string }>();

  const handleNext = () => {
    const form = buildFormData();
    setDraft(form);
    router.push({
      pathname: "/[userid]/onboarding/(shop)/finalcheck",
      params: { userid: String(userid) },
    });
  };

  return (
    <View className="flex-1 px-4">
      <View className="flex-row gap-1 pb-2">
        <EmptyCircle />
        <FilledCircle />
      </View>

      <ScrollView className="pt-8" showsVerticalScrollIndicator={false}>
        <Text className="text-[26px] font-semibold">
          매장 정보를{"\n"}입력해주세요.
        </Text>

        <View className=" flex-col space-y-4 py-10">
          <Text className="text-gray2">상호명</Text>
          <TextInput
            value={shopName}
            onChangeText={setShopName}
            placeholder="상호명을 입력해주세요. (2-10자)"
            className=" border-b pb-1 border-gray1"
          />

          <Text className="text-gray2">업종</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={ListData}
            labelField="label"
            valueField="value"
            placeholder="업종 선택"
            value={industry}
            onChange={(item) => setIndustry(item.value)}
          />

          <Text className="text-gray2">대표자 이름</Text>
          <TextInput
            value={ownerName}
            onChangeText={setOwnerName}
            className=" border-b pb-1 border-gray1"
          />

          <Text className="text-gray2">사업자 등록 번호</Text>
          <TextInput
            value={businessNo}
            onChangeText={setBusinessNo}
            className=" border-b pb-1 border-gray1"
          />

          <Text className="text-gray2">매장 연락처</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="010-"
            className=" border-b pb-1 border-gray1"
          />

          <Text className="text-gray2">매장 위치</Text>
          <View className="flex-row items-center gap-2">
            <TextInput
              value={address}
              placeholder="주소를 검색해 주세요"
              editable={false}
              className="flex-1 border-b pb-1 border-gray1 text-black"
            />
            <Pressable
              onPress={() => setShowPostcode(true)}
              className="px-2.5 py-1.5 rounded-md  bg-main"
            >
              <Text className="text-white text-[13px] font-semibold">
                주소 검색
              </Text>
            </Pressable>
          </View>

          <Text className="text-gray2">운영시간</Text>
          <HoursForm onChange={setHours} />

          <Text className="text-gray2">대표 이미지</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 8 }}
          >
            {images.length < 5 && (
              <Pressable onPress={onSelectImage}>
                <View className="w-[125px] h-[125px] mr-1 bg-[#F9F9F9] rounded-[10px] items-center justify-center">
                  <CameraIcon />
                  <Text className="text-[#BFBFBF] mt-1 text-xs">
                    {images.length}/5
                  </Text>
                </View>
              </Pressable>
            )}

            {images.map((img) => (
              <View
                key={img.id}
                className="w-[125px] h-[125px] mr-3 rounded-[10px] overflow-hidden"
              >
                <Image
                  source={{ uri: img.uri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
                <Pressable
                  onPress={() => onRemoveImage(img.id)}
                  className="absolute right-1 top-1 w-[20px] h-[20px] rounded-full bg-[#EDEDED] items-center justify-center"
                  hitSlop={8}
                >
                  <Feather name="x" size={16} color="#fff" />
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <Modal
        visible={showPostcode}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPostcode(false)}
      >
        <View className="flex-1 bg-black/50 items-center justify-center">
          <View className="bg-white w-11/12 h-[70%] rounded-2xl overflow-hidden">
            <Postcode
              style={{ width: "100%", height: "100%" }}
              jsOptions={{ animation: true }}
              onSelected={(data: any) => {
                setAddress(data.address);
                setShowPostcode(false);
              }}
              onError={(err: any) => {
                console.log("postcode error", err);
                setShowPostcode(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <NextButton active={isValid} onPress={handleNext} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 25,
    width: 120,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "black",
  },
});

export default WriteInfoBody;
