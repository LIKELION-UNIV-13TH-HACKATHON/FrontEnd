import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import { HostDomain } from "@/util/HostDomain";
import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type Props = {
  latitude: number;
  longitude: number;
};

const HOST = HostDomain;

export default function MiniKakaoMap({ latitude, longitude }: Props) {
  const appkey = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY!;
  const { user } = useUserInfoStore();

  const uri = useMemo(() => {
    const params = new URLSearchParams({
      appkey,
      lat: String(user.shoplat),
      lng: String(user.shoplong),
    });
    return `${HOST}/kakao-map.html?${params.toString()}`;
  }, [appkey, latitude, longitude]);

  return (
    <View className="h-32 overflow-hidden">
      <WebView
        source={{ uri }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        incognito
        cacheEnabled={false}
        onError={(e) => {
          console.warn("[MiniKakaoMap] WebView error:", e.nativeEvent);
        }}
      />
    </View>
  );
}
