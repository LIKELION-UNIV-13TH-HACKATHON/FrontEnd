import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import KakaoMap from "@/components/kakaomap/KakaoMap";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import HeaderCustomer from "@/components/customer/HeaderCustomer";
import BottomTaps from "@/components/customer/BottomTaps";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const DumpyUser = {
  name: "강대훈",
  id: 1,
  email: "crol0101@naver.com",
};

const Map = () => {
  const { status, coords, error, request } = useCurrentLocation({
    accuracy: Location.Accuracy.Balanced,
    timeoutMs: 8000,
    useLastKnownFallback: true,
  });
  const { setUser } = useUserInfoStore();
  useEffect(() => {
    setUser(DumpyUser);
  }, []);
  return (
    <View className="flex-1">
      <HeaderCustomer />
      {status !== "ready" && !error && (
        <View className="items-center justify-center py-5">
          <ActivityIndicator />
          <Text className="mt-2 text-base text-gray-800">
            {status === "nostervice"
              ? "위치 서비스를 켜주세요…"
              : status === "denied"
              ? "권한을 허용해주세요…"
              : "위치를 가져오는 중입니다…"}
          </Text>
        </View>
      )}

      {!!error && status !== "ready" && (
        <View className="items-center justify-center py-5">
          <Text className="mt-2 text-base text-red-500">{error}</Text>
          <Text onPress={request} className="mt-2 text-base text-gray-800">
            다시 시도
          </Text>
        </View>
      )}

      {status === "ready" && coords && (
        <View className="flex-1 self-stretch border border-gray-200 rounded-xl overflow-hidden">
          <KakaoMap latitude={coords.latitude} longitude={coords.longitude} />
        </View>
      )}
      <BottomTaps />
    </View>
  );
};

export default Map;
