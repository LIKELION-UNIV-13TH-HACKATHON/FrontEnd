import { useUserInfoStore } from "@/store/user/useUserInfoStore";
import { http } from "../http";

export const getUserInfo = async () => {
  try {
    const res = await http.get("/members/customers/me");
    if (res.status == 200) {
      useUserInfoStore.getState().setUser({
        nickname: res.data.nickname,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
