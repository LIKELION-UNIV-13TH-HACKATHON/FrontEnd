import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import React, {
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { View, Animated, Easing, Pressable } from "react-native";
import { WebView } from "react-native-webview";
import { HostDomain } from "@/util/HostDomain";
import BottomSheet from "./BottomSheet";
import { useShopInfoStore } from "@/store/shop/useShopInfoStore";
import { getNearShop } from "@/util/api/customer/getNearShop";
import { getShopInfo } from "@/util/api/customer/getShopInfo";
import LocationIcon from "@/assets/images/locationicon.svg";

type MarkerPayload = {
  id?: number;
  name?: string;
  lat?: number;
  lng?: number;
  address?: string;
  industry?: string;
};
type Props = {
  latitude?: number;
  longitude?: number;
  onMarkerClick?: (payload: MarkerPayload) => void;
};

const KakaoMap: React.FC<Props> = ({ latitude, longitude, onMarkerClick }) => {
  const { shops, setShop, updateShop } = useShopInfoStore();
  const { coords } = useCurrentLocation();

  // 주변 매장 가져오기 (현재 좌표 우선, 없으면 props 좌표)
  const fetchData = useCallback(async () => {
    try {
      const lon = coords?.longitude ?? longitude;
      const lat = coords?.latitude ?? latitude;
      if (typeof lon !== "number" || typeof lat !== "number") return;
      const data = await getNearShop(lon, lat, 500);
      if (data?.responses) setShop(data.responses);
    } catch (e) {
      console.error("getNearShop failed", e);
    }
  }, [coords?.latitude, coords?.longitude, latitude, longitude, setShop]);

  const key = process.env.EXPO_PUBLIC_KAKAO_JAVASCRIPT_KEY!;
  const host = HostDomain;
  const uri = useMemo(() => {
    const lat = latitude ?? 37.5665;
    const lng = longitude ?? 126.978;
    return `${host}/kakao-map.html?appkey=${key}&lat=${lat}&lng=${lng}&mode=current&level=2`;
  }, [host, key, latitude, longitude]);

  const ref = useRef<WebView>(null);

  const [isReady, setIsReady] = useState(false);
  const hasCenteredRef = useRef(false);

  const updateCenter = useCallback((lat: number, lng: number) => {
    ref.current?.postMessage(
      JSON.stringify({ type: "setCenter", lat, lng, opts: { center: true } })
    );
  }, []);

  useEffect(() => {
    if (latitude != null && longitude != null)
      updateCenter(latitude, longitude);
  }, [latitude, longitude, updateCenter]);

  useEffect(() => {
    if (!isReady || !coords) return;
    const { latitude: lat, longitude: lng } = coords;
    const first = !hasCenteredRef.current;
    ref.current?.postMessage(
      JSON.stringify({
        type: "setCurrent",
        payload: { lat, lng, accuracy: 0, headingDeg: null, center: first },
      })
    );
    if (first) hasCenteredRef.current = true;
  }, [isReady, coords]);

  const hasFetchedRef = useRef(false);
  useEffect(() => {
    if (!isReady || !coords || hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    fetchData();
  }, [isReady, coords, fetchData]);

  // shops 변경 시마다 WebView에 마커(POIs) 갱신
  useEffect(() => {
    if (!isReady) return;
    ref.current?.postMessage(
      JSON.stringify({
        type: "setPOIs",
        payload: {
          items: shops.map((d) => ({
            id: d.id,
            lat: d.latitude,
            lng: d.longitude,
            name: d.name,
            address: d.address,
            industry: d.industry,
          })),
          fit: false,
          showLabels: false,
        },
      })
    );
  }, [isReady, shops]);

  const [sheetData, setSheetData] = useState<any | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetY = useRef(new Animated.Value(300)).current;
  const [sheetLoading, setSheetLoading] = useState(false);

  const openSheet = useCallback(
    (data: any) => {
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

  return (
    <View className="flex-1 overflow-hidden relative">
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
        onMessage={async (e) => {
          try {
            const data = JSON.parse(e.nativeEvent.data);
            if (data?.type === "ready") setIsReady(true);
            else if (data?.type === "markerClick") {
              const id = data?.payload?.id as number | undefined;
              const base =
                typeof id === "number"
                  ? shops.find((s) => s.id === id)
                  : undefined;
              const payload = {
                id,
                name: data?.payload?.name ?? base?.name,
                lat: data?.payload?.lat ?? base?.latitude,
                lng: data?.payload?.lng ?? base?.longitude,
                address: data?.payload?.address ?? base?.address,
                industry: data?.payload?.industry ?? base?.industry,
                images:
                  base?.images && base.images.length > 0
                    ? base.images
                    : base?.mainImage
                    ? [base.mainImage]
                    : [],
              } as any;
              openSheet(payload);

              // 시트가 열린 뒤 상세 API로 추가 정보 병합
              if (typeof id === "number") {
                try {
                  setSheetLoading(true);
                  const detail = await getShopInfo(id); // 표준 키로 반환
                  // 바텀시트 상태 업데이트
                  setSheetData((prev: any) => ({ ...prev, ...detail }));
                  // 전역 스토어에 상세 병합 (캐싱)
                  updateShop(id, detail);
                } finally {
                  setSheetLoading(false);
                }
              }
            } else if (data?.type === "mapClick") {
              closeSheet();
            }
          } catch {}
        }}
      />

      {/* 위치 갱신 버튼 */}
      <Pressable
        className="z-20 absolute left-4 bottom-20"
        onPress={fetchData}
        accessibilityRole="button"
        accessibilityLabel="현재 위치 주변 매장 갱신"
      >
        <LocationIcon />
      </Pressable>

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
