import { http } from "../http";

export const getRecentAlarm = async (shopId?: number) => {
  try {
    const res = await http.get(`/notifications/${shopId}/latest`);
    if (res.status === 200) {
      return res.data.message;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
