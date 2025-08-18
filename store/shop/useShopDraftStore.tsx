import { create } from "zustand";

export type HoursItem = { day: string; open: string; close: string };
export type ShopFormDraft = {
  shopName: string;
  ownerName: string;
  businessNo: string;
  phone: string;
  industry: string;
  address: string;
  images: string[]; // uri list (upload later)
  hours: HoursItem[];
};

type DraftState = {
  draft: ShopFormDraft | null;
  setDraft: (d: ShopFormDraft) => void;
  clearDraft: () => void;
};

export const useShopDraftStore = create<DraftState>((set) => ({
  draft: null,
  setDraft: (d) => set({ draft: d }),
  clearDraft: () => set({ draft: null }),
}));
