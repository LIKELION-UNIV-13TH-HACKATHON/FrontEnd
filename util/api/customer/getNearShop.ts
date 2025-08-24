// util/api/customer/getNearShop.ts
import { http } from "../http";
import { mapNearbyItem, ShopListItem } from "../transform";

export const getNearShop = async (
  longitude: number,
  latitude: number,
  radiusMeters: number
): Promise<{ responses: ShopListItem[] }> => {
  const res = await http.get("/shops/nearby", {
    params: { longitude, latitude, radiusMeters },
  });

  const mapped = Array.isArray(res?.data?.responses)
    ? res.data.responses.map((it: any) => mapNearbyItem(it))
    : [];

  return { responses: mapped };
};
