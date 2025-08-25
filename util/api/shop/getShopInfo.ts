import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import { http } from "../http";

export const getShopInfo = async () => {
  try {
    const res = await http.get("/members/merchants/me");
    if (res.status === 200) {
      console.log("성공");
      useUserInfoStore.getState().setUser({
        shopName: res.data.shopName,
        address: res.data.address,
        shopId: res.data.shopId,
        shoplat: res.data.latitude,
        shoplong: res.data.longitude,
      });
    }
  } catch (error) {
    console.error(error);

    throw error;
  }
};
