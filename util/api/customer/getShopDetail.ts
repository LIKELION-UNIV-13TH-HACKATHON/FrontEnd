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

export const getMenu = async () => {};
export const getQuestion = async () => {};
