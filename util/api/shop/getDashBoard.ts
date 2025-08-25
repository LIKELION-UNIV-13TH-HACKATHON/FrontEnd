import { http } from "../http";

export const getDashBoard = async (shopId: number) => {
  try {
    const res = await http.get(`/shops/${shopId}/dashboard`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
