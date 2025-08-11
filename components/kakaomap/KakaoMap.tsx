import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import React, {
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { WebView } from "react-native-webview";
import { HostDomain } from "../../util/HostDomain";
import BottomSheet from "./BottomSheet";

const dummyLocations = [
  {
    name: "천운축산물도매센터 정육점",
    latitude: 36.80147,
    longitude: 127.149563,
    address: "충청남도 천안시 사직동",
    industry: "식료품",
  },
  {
    name: "솔나무떡집",
    latitude: 36.80205,
    longitude: 127.149439,
    address: "충청남도 천안시 사직동",
    industry: "식료품",
  },
];

type MarkerPayload = {
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
  industry?: string;
};
type Props = {
  latitude?: number;
  longitude?: number;
  onMarkerClick?: (payload: MarkerPayload) => void; // 부모에서 추가 동작이 필요하면 사용 (선택)
};

const KakaoMap: React.FC<Props> = ({ latitude, longitude, onMarkerClick }) => {
  const key = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY!;
  const host = HostDomain;
  const uri = useMemo(() => {
    const lat = latitude ?? 37.5665;
    const lng = longitude ?? 126.978;
    return `${host}/kakao-map.html?appkey=${key}&lat=${lat}&lng=${lng}&mode=current&level=2`;
  }, []); // 최초 1회만 고정

  const ref = useRef<WebView>(null);
  const { coords } = useCurrentLocation();

  // WebView ready & 센터 제어
  const [isReady, setIsReady] = useState(false);
  const hasCenteredRef = useRef(false);
  const poisSentRef = useRef(false);

  // BottomSheet 상태
  const [sheetData, setSheetData] = useState<MarkerPayload | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetY = useRef(new Animated.Value(300)).current; // 숨김 위치

  const openSheet = useCallback(
    (data: MarkerPayload) => {
      setSheetData(data);
      setSheetOpen(true);
      Animated.timing(sheetY, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    },
    [sheetY]
  );

  const closeSheet = useCallback(() => {
    Animated.timing(sheetY, {
      toValue: 300,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setSheetOpen(false);
    });
  }, [sheetY]);

  // 위치가 바뀔 때마다 메시지로만 지도 갱신
  const updateCenter = useCallback((lat: number, lng: number) => {
    ref.current?.postMessage(
      JSON.stringify({ type: "setCenter", lat, lng, opts: { center: true } })
    );
  }, []);

  // 부모에서 latitude/longitude가 바뀌면 메시지 전송 (안전망)
  useEffect(() => {
    if (latitude != null && longitude != null)
      updateCenter(latitude, longitude);
  }, [latitude, longitude, updateCenter]);

  // ready 이후 현재 위치 반영
  useEffect(() => {
    if (!isReady || !coords) return;
    const { latitude: lat, longitude: lng } = coords;
    const shouldCenter = !hasCenteredRef.current; // 최초 1회만 센터 이동
    ref.current?.postMessage(
      JSON.stringify({
        type: "setCurrent",
        payload: {
          lat,
          lng,
          accuracy: 0,
          headingDeg: null,
          center: shouldCenter,
        },
      })
    );
    if (shouldCenter) hasCenteredRef.current = true;
  }, [isReady, coords]);

  // ready 이후 더미 POIs 1회 전송
  useEffect(() => {
    if (!isReady || poisSentRef.current) return;
    ref.current?.postMessage(
      JSON.stringify({
        type: "setPOIs",
        payload: {
          items: dummyLocations.map((d) => ({
            lat: d.latitude,
            lng: d.longitude,
            name: d.name,
          })),
          fit: false,
          showLabels: false,
        },
      })
    );
    poisSentRef.current = true;
  }, [isReady]);

  return (
    <View style={styles.box}>
      <WebView
        ref={ref}
        source={{ uri }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        cacheEnabled={false}
        incognito
        allowsBackForwardNavigationGestures={false}
        allowsLinkPreview={false}
        dataDetectorTypes="none"
        onMessage={(e) => {
          try {
            const data = JSON.parse(e.nativeEvent.data);
            if (data?.type === "ready") setIsReady(true);
            else if (data?.type === "markerClick") {
              const payload: MarkerPayload = {
                name: data?.payload?.name,
                lat: data?.payload?.lat,
                lng: data?.payload?.lng,
              };
              openSheet(payload);
              onMarkerClick?.(payload);
            } else if (data?.type === "mapClick") {
              // Close sheet when user taps the map area
              closeSheet();
            }
          } catch (err) {}
        }}
      />

      {/* 분리된 바텀시트 컴포넌트 */}
      <BottomSheet
        open={sheetOpen}
        y={sheetY}
        data={sheetData}
        onClose={closeSheet}
      />
    </View>
  );
};
export default KakaoMap;

const styles = StyleSheet.create({
  box: { flex: 1, borderRadius: 12, overflow: "hidden" },
});
