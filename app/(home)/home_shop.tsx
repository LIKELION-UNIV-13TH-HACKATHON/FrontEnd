import { View, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderShop from "@/components/shop/homepage/HeaderShop";
import ShopInfo from "@/components/shop/homepage/ShopInfo";
import SetAlarmGrid from "@/components/shop/homepage/SetAlarmGrid";
import ShopDashBoard from "@/components/shop/homepage/ShopDashBoard";
import SubscribeGraph from "@/components/shop/homepage/SubscribeGraph";
import BottomTaps from "@/components/shop/homepage/BottomTaps";
import MiniKakaoMap from "@/components/kakaomap/MiniKakaoMap";
import { router } from "expo-router";
import { getCoordinates } from "@/util/kakaomap/address";
import ServiceAgreeModal from "@/components/onboarding/customer/ServiceAgreeModal";
import { useUserInfoStore } from "@/store/user/useUserInfoStore";

const ADDRESS = "충남 천안시 동남구 영성로 35 1층 북촌손만두"; // 매장에 위치에 따라 달라짐
const FALLBACK = { latitude: 37.5665, longitude: 126.978 }; // 서울 시청

const HomeShop = () => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUserInfoStore();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const result = await getCoordinates(ADDRESS);
        if (result && result.x != null && result.y != null) {
          const lat =
            typeof result.y === "string" ? parseFloat(result.y) : result.y;
          const lng =
            typeof result.x === "string" ? parseFloat(result.x) : result.x;
          if (mounted) setCoords({ latitude: lat, longitude: lng });
        }
      } catch (e) {
        console.warn("주소→좌표 변환 실패:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const mapLat = (coords ?? FALLBACK).latitude;
  const mapLng = (coords ?? FALLBACK).longitude;

  return (
    <View className="flex-1">
      <HeaderShop />
      <ScrollView contentContainerStyle={{ paddingBottom: 96 }}>
        <ShopInfo />

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/map",
              params: { mode: "current" },
            })
          }
        >
          {loading && !coords ? (
            <View className="h-24">
              <ActivityIndicator />
            </View>
          ) : (
            <MiniKakaoMap latitude={mapLat} longitude={mapLng} />
          )}
        </Pressable>

        <SetAlarmGrid />
        <ShopDashBoard />
        <SubscribeGraph />
      </ScrollView>
      <BottomTaps />
      {user.agree === false ? <ServiceAgreeModal /> : null}
    </View>
  );
};

export default HomeShop;
