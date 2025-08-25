import { http } from "../http";

export const getSubList = async () => {
  try {
    const res = await http.get("/shops/subscriptions");
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
