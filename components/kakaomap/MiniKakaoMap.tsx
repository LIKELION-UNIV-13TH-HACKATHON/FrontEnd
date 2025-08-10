import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

type KakaoMapProps = {
  latitude?: number;
  longitude?: number;
};

/**
 * URI-loading Kakao Map
 * - Loads an actual URL so Kakao JS SDK's allowed-domain check passes on iOS.
 * - Serve `public/kakao-map.html` from a local web server and register BASE_HOST in Kakao Developers (플랫폼 > 웹).
 */
export default function MiniKakaoMap({ latitude, longitude }: KakaoMapProps) {
  const KAKAO_MAP_JS_KEY = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY; // JavaScript 키
  const BASE_HOST = "http://192.168.219.115:8082";

  // Fallbacks (Seoul City Hall)
  const lat = typeof latitude === "number" ? latitude : 37.5665;
  const lng = typeof longitude === "number" ? longitude : 126.978;

  const url = useMemo(() => {
    const u = `${BASE_HOST}/kakao-map.html?appkey=${encodeURIComponent(
      KAKAO_MAP_JS_KEY
    )}&lat=${lat}&lng=${lng}`;
    console.log("[KakaoMap] (sim-uri) url:", u);
    return u;
  }, [lat, lng]);

  return (
    <View className="flex-1 h-28">
      <WebView
        originWhitelist={["*"]}
        source={{ uri: url }}
        className="flex-1"
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        allowsLinkPreview={false}
        dataDetectorTypes="none"
        onLoad={() => console.log("[KakaoMap] WebView loaded (uri)")}
        onHttpError={(e) =>
          console.error("[KakaoMap] HTTP error", e.nativeEvent)
        }
        onError={(e) =>
          console.error("[KakaoMap] WebView error", e.nativeEvent)
        }
      />
    </View>
  );
}
