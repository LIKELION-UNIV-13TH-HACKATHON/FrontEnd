import type { ImageSourcePropType } from "react-native";
import { create } from "zustand";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
};

export type ProductState = {
  products: Product[];
  setProduct: (items: Product[]) => void;
  addProduct: (item: Product) => void;
  updateProduct: (item: Product) => void;
  removeProduct: (id: number) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProduct: (items) => set({ products: items }),
  addProduct: (item) =>
    set((state) => ({ products: [item, ...state.products] })),
  updateProduct: (item) =>
    set((state) => {
      const idx = state.products.findIndex((p) => p.id === item.id);
      if (idx === -1) {
        return { products: [item, ...state.products] };
      }
      const next = state.products.slice();
      next[idx] = { ...next[idx], ...item };
      return { products: next };
    }),
  removeProduct: (id) =>
    set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
}));
