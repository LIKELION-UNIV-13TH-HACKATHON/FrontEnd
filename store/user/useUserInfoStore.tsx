import { create } from "zustand";
import { Shop } from "../shop/useShopInfoStore";
import UserIcon from "@/assets/images/profile.svg";

type SvgAvatarComponent = React.FC<React.ComponentProps<typeof UserIcon>>;

export type User = {
  id: number;
  name: string;
  shopName: string | null;
  nickname: string | null;
  bookMark: Shop[] | null;
  shopMember: boolean;
  customerMember: boolean;
  agree: boolean;
  avatar: SvgAvatarComponent;
  mainImage: string;
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
    shopName: null,
    nickname: null,
    bookMark: null,
    shopMember: false,
    customerMember: false,
    agree: false,
    avatar: UserIcon,
    mainImage: "",
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  getUserInfo: () => get().user,
}));
