import { http } from "../http";

export type ChartItem = {
  shopId: number;
  shopName: string;
  mainImage?: string;
  address: string;
  subscribeCount: number;
  isSubscribe: boolean;
  distance: number;
};

export type ChartResponse = {
  responses: ChartItem[];
  nextCursorId?: number | null;
  hasNext?: boolean;
};

export const getChart = async ({
  latitude,
  longitude,
  cursor,
}: {
  latitude: number;
  longitude: number;
  cursor?: {
    lastShopId?: number | null;
    lastSubscribeCount?: number | null;
    lastDistance?: number | null;
  } | null;
}): Promise<ChartResponse | null> => {
  try {
    const params: Record<string, any> = { longitude, latitude };
    if (cursor?.lastShopId != null) params.lastShopId = cursor.lastShopId;
    if (cursor?.lastSubscribeCount != null)
      params.lastSubscribeCount = cursor.lastSubscribeCount;
    if (cursor?.lastDistance != null) params.lastDistance = cursor.lastDistance;

    const res = await http.get(`/shops`, { params });
    if (res.status === 200) {
      return res.data as ChartResponse;
    }
    return null;
  } catch (error) {
    console.error("getChart failed", error);
    return null;
  }
};
