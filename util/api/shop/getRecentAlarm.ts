import { http } from "../http";

export const getRecentAlarm = async (shopId?: number) => {
  try {
    const url =
      typeof shopId === "number"
        ? `/notifications/${shopId}/latest`
        : "/notifications/latest";
    const res = await http.get(url);
    if (res.status === 200) {
      return res.data?.request?.message ?? null;
    }
    return null;
  } catch (error) {
    console.log("getRecentAlarm error", error);
    return null;
  }
};
