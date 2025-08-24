import { http } from "../http";

export const getSale = async (id: number) => {
  try {
    const res = await http.get(`/notifications/${id}`);
    if (res.status === 200) {
      return res.data.responses;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMenu = async (shopId: number) => {
  try {
    const res = await http.get(`/shops/${shopId}/menus`);
    if (res.status === 200) {
      return res.data.responses;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getQuestion = async (shopId: number) => {
  try {
    const res = await http.get(`/shops/${shopId}/inquiries/customers`);
    if (res.status === 200) {
      return res.data.responses;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
