import { ShopListItem } from "@/util/api/transform";
import { create } from "zustand";
export const industryMap: Record<string, string> = {
  AGRI_FISH_LIVESTOCK: "농수축산물",
  FOOD: "식료품",
  DAILY_SUPPLIES: "생활잡화",
  FASHION: "의류/패션",
  HEALTH_BEAUTY: "건강/미용",
  ETC: "기타",
};
export const getIndustryLabel = (key?: string) => {
  if (!key) return undefined;
  return industryMap[key] ?? key;
};

type ShopExtra = {
  tel?: string;
  mainImage?: string;
  isSubscribe?: boolean;
  hours?: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
  images?: string[];
};

export type Shop = ShopListItem & ShopExtra;

type StoreState = {
  shops: Shop[];
  setShop: (shops: Shop[]) => void;
  getShopDetail: (id?: number) => Shop | undefined;
  updateShop: (id: number, updated: Partial<Shop>) => void;
};

export const useShopInfoStore = create<StoreState>((set, get) => ({
  shops: [],
  setShop: (shops) => set({ shops }),
  getShopDetail: (id) => get().shops.find((s) => s.id === id),
  updateShop: (id, updated) =>
    set((state) => ({
      shops: state.shops.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    })),
}));
