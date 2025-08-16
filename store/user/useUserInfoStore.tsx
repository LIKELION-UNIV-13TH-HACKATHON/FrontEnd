import { create } from "zustand";
import { Shop } from "../shop/useShopInfoStore";

export type User = {
  id: number;
  name: string;
  email: string;
  nickname: string | null;
  bookMark: Shop[] | null;
  shopMember: boolean;
  customerMember: boolean;
  agree: boolean;
};

export type StoreState = {
  user: User;
  setUser: (user: Partial<User>) => void;
  getUserInfo: () => User;
};

export const useUserInfoStore = create<StoreState>((set, get) => ({
  user: {
    id: 0,
    name: "",
    email: "",
    nickname: null,
    bookMark: null,
    shopMember: false,
    customerMember: false,
    agree: false,
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  getUserInfo: () => get().user,
}));
