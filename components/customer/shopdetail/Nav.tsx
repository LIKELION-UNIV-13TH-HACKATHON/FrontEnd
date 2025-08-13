import React from "react";
import { View, Text, Pressable, Linking, Alert, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";

const Nav: React.FC = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { getShopDetail } = useShopInfoStore();
  const shop = id ? getShopDetail(Number(id)) : undefined;

  const lat =
    (shop as any)?.lat ?? (shop as any)?.latitude ?? (shop as any)?.y ?? null;
  const lng =
    (shop as any)?.lng ?? (shop as any)?.longitude ?? (shop as any)?.x ?? null;
  const name = (shop as any)?.name ?? "목적지";

  const openNaverMap = async () => {
    if (lat == null || lng == null) {
      Alert.alert("안내", "매장 좌표가 없어 길찾기를 열 수 없습니다.");
      return;
    }

    const appUrl = `nmap://route/walk?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(
      name
    )}`;

    const webUrl = `https://map.naver.com/v5/?lng=${lng}&lat=${lat}&level=18&pinType=site`;

    try {
      const canOpen = await Linking.canOpenURL(appUrl);
      if (canOpen) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (e) {
      try {
        await Linking.openURL(webUrl);
      } catch {
        Alert.alert("오류", "네이버 지도를 열 수 없습니다.");
      }
    }
  };

  if (lat == null || lng == null) {
    return (
      <View className="p-4">
        <Text className="text-gray-500">
          이 매장의 위치 정보를 찾을 수 없어요.
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <Pressable
        onPress={openNaverMap}
        className="h-12 rounded-2xl bg-[#03C75A] items-center justify-center"
      >
        <Text className="text-white font-bold">네이버 지도에서 길찾기</Text>
      </Pressable>
    </View>
  );
};

export default Nav;
