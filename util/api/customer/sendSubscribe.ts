import { http } from "../http";

export const sendSubscribe = async (shopId: number) => {
  try {
    const res = await http.post(`/shops/${shopId}/subscriptions`);
    if (res.status === 200) {
      console.log("구동성공");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteSubscribe = async (shopId: number) => {
  try {
    const res = await http.delete(`/shops/${shopId}/subscriptions`);
    if (res.status === 200) {
      console.log("구동해제 성공");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
