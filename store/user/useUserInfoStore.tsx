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
  hasSeller: boolean;
  hasConsumer: boolean;
  agree: boolean;
  avatar: SvgAvatarComponent;
  mainImage: string;
  isNewMember: boolean;
  address: string;
  shopId: number;
  shoplat: number;
  shoplong: number;
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
    hasSeller: false,
    hasConsumer: false,
    agree: false,
    avatar: UserIcon,
    mainImage: "",
    isNewMember: false,
    address: "",
    shopId: 0,
    shoplat: 0,
    shoplong: 0,
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
  getUserInfo: () => get().user,
}));
