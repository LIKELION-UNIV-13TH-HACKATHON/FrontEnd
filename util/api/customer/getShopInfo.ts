import { http } from "../http";
import { mapDetail, ShopDetail } from "../transform";

export const getShopInfo = async (id: number): Promise<ShopDetail> => {
  const res = await http.get(`/shops/${id}`);
  return mapDetail(res.data);
};
