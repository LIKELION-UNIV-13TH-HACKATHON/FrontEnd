import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  email: string;
};

export type StoreState = {
  user: User;
  setUser: (user: User) => void;
  getUserInfo: () => User;
};

export const useUserInfoStore = create<StoreState>((set, get) => ({
  user: {
    id: 0,
    name: "",
    email: "",
  },
  setUser: (user) => set({ user }),
  getUserInfo: () => get().user,
}));
