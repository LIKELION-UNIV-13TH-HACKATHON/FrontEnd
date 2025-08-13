import { create } from "zustand";

type Shop = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  industry: string;
};

type StoreState = {
  shops: Shop[];
  setShop: (shop: Shop[]) => void;
  getShopDetail: (id: number) => Shop;
  //   clearShop: () => void;
};
export const useShopInfoStore = create<StoreState>((set, get) => ({
  shops: [],
  setShop: (shops) => set({ shops }),
  getShopDetail: (id) => {
    return get().shops.find((shop) => shop.id === id) as Shop;
  },
  //   clearShop: () => set({ shops: [] }),
}));
