import { http } from "../http";

export const getAlarmList = async () => {
  try {
    const res = await http.get("/notifications");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
