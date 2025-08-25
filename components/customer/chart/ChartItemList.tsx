import * as Location from "expo-location";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import ChartItem from "./ChartItem";
import { getChart, ChartResponse } from "@/util/api/customer/getChart";

export type ShopListItem = {
  shopId: number;
  shopName: string;
  mainImage?: string;
  address: string;
  subscribeCount: number;
  isSubscribe: boolean;
  distance: number;
};

const sortClient = (arr: ShopListItem[], tab: string) => {
  const list = [...arr];
  if (tab === "latest") list.sort((a, b) => b.shopId - a.shopId);
  else if (tab === "popular") list.sort((a, b) => b.subscribeCount - a.subscribeCount);
  else if (tab === "near") list.sort((a, b) => a.distance - b.distance);
  return list;
};

const ChartItemList = ({ tab }: { tab: string }) => {
  const { status, coords, error } = useCurrentLocation({
    accuracy: Location.Accuracy.Balanced,
    timeoutMs: 8000,
    useLastKnownFallback: true,
  });

  const [items, setItems] = React.useState<ShopListItem[]>([]);
  const [cursor, setCursor] = React.useState<{
    lastShopId?: number | null;
    lastSubscribeCount?: number | null;
    lastDistance?: number | null;
  } | null>(null);
  const [hasNext, setHasNext] = React.useState<boolean>(false);
  const [initialLoading, setInitialLoading] = React.useState<boolean>(false);
  const [loadingMore, setLoadingMore] = React.useState<boolean>(false);

  const dedupeAppend = React.useCallback((prev: ShopListItem[], next: ShopListItem[]) => {
    const map = new Map<number, ShopListItem>();
    for (const it of prev) map.set(it.shopId, it);
    for (const it of next) map.set(it.shopId, it);
    return Array.from(map.values());
  }, []);

  const loadPage = React.useCallback(
    async (mode: "initial" | "more") => {
      if (!coords) return;
      if (mode === "more") {
        if (loadingMore || !hasNext) return;
        setLoadingMore(true);
      } else {
        setInitialLoading(true);
      }

      try {
        const res: ChartResponse | null = await getChart({
          latitude: coords.latitude,
          longitude: coords.longitude,
          cursor: mode === "more" ? cursor ?? null : null,
        });
        const list: ShopListItem[] = Array.isArray(res?.responses) ? (res!.responses as ShopListItem[]) : [];
        setItems((prev) => (mode === "more" ? dedupeAppend(prev, list) : list));

        const last = list[list.length - 1];
        if (last) {
          setCursor({
            lastShopId: last.shopId,
            lastSubscribeCount: last.subscribeCount,
            lastDistance: last.distance,
          });
        } else if (mode !== "more") {
          setCursor(null);
        }
        setHasNext(Boolean(res?.hasNext));
      } catch (e) {
        console.error("loadPage failed", e);
      } finally {
        if (mode === "more") setLoadingMore(false);
        else setInitialLoading(false);
      }
    },
    [coords, cursor, hasNext, loadingMore, tab, dedupeAppend]
  );

  React.useEffect(() => {
    if (!coords) return;
    setItems([]);
    setCursor(null);
    setHasNext(false);
    loadPage("initial");
  }, [coords, tab]);

  const onEndReached = React.useCallback(() => {
    if (!hasNext || loadingMore) return;
    loadPage("more");
  }, [hasNext, loadingMore, loadPage]);

  if (status !== "ready" && !error) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-600">현재 위치를 가져오는 중…</Text>
      </View>
    );
  }

  if (!!error && status !== "ready") {
    return (
      <View className="py-4 items-center">
        <Text className="text-red-500">위치 권한을 허용해주세요</Text>
      </View>
    );
  }

  if (initialLoading && items.length === 0) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-600">매장 목록을 불러오는 중…</Text>
      </View>
    );
  }

  const data = sortClient(items, tab);

  if (!data.length) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-600">주변에 표시할 매장이 없습니다</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.shopId)}
      renderItem={({ item }) => (
        <ChartItem
          id={item.shopId}
          name={item.shopName}
          location={item.address}
          subs={item.subscribeCount}
          distance={item.distance}
          mainImage={item.mainImage}
          isSubscribe={item.isSubscribe}
        />
      )}
      onEndReachedThreshold={0.6}
      onEndReached={onEndReached}
      ListFooterComponent={
        loadingMore ? (
          <View className="py-3 items-center">
            <ActivityIndicator />
          </View>
        ) : null
      }
    />
  );
};

export default ChartItemList;
