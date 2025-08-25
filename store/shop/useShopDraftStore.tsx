import { create } from "zustand";
import type { FileLike } from "@/util/api/shop/sendShopInfo";

export type OperationTimeDraft = {
  dayOfWeek: string; // "MONDAY" ~ "SUNDAY"
  openTime: string; // "HH:MM"
  closeTime: string; // "HH:MM"
  isClosed: boolean;
};

export type ShopFormDraft = {
  request: {
    businessNumber: string;
    ownerName: string;
    shopName: string;
    shopType: string; // 서버 enum 문자열 ("FOOD" 등)
    shopPhoneNumber: string;
    address: string;
    isTermAgreed: boolean;
    operationTimes: OperationTimeDraft[]; // 항상 7개로 관리 권장
  };
  mainImage?: FileLike; // 첫 번째 이미지
  imageFiles?: FileLike[]; // 나머지 이미지들
};

// ---- 내부 유틸 ----
const API_DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
] as const;

const CLOSED_SLOT: Pick<
  OperationTimeDraft,
  "openTime" | "closeTime" | "isClosed"
> = {
  openTime: "00:00",
  closeTime: "00:00",
  isClosed: true,
};

const ensureSevenDays = (
  ops: OperationTimeDraft[] = []
): OperationTimeDraft[] => {
  const map = new Map<string, OperationTimeDraft>();
  ops.forEach((o) => map.set(o.dayOfWeek, o));

  return API_DAYS.map((d) => {
    const found = map.get(d);
    if (found) return found;
    return { dayOfWeek: d, ...CLOSED_SLOT };
  });
};

// ---- 초기값 ----
const initialDraft: ShopFormDraft = {
  request: {
    businessNumber: "",
    ownerName: "",
    shopName: "",
    shopType: "",
    shopPhoneNumber: "",
    address: "",
    isTermAgreed: true,
    operationTimes: ensureSevenDays([]),
  },
  mainImage: undefined,
  imageFiles: [],
};

type DraftState = {
  draft: ShopFormDraft | null;
  setDraft: (d: ShopFormDraft) => void;
  clearDraft: () => void;

  // 필드 단위 업데이트
  updateRequest: (partial: Partial<ShopFormDraft["request"]>) => void;

  // 요일 단위로 운영시간 설정
  setOperationTime: (
    dayOfWeek: string,
    partial: Partial<Omit<OperationTimeDraft, "dayOfWeek">>
  ) => void;
  fillMissingDays: () => void; // 7일 보정

  // 이미지 구성: 배열로 받아서 첫 장은 mainImage, 나머지는 imageFiles
  setImagesFromList: (list: FileLike[]) => void;
  setMainImage: (file?: FileLike) => void;
  addImageFile: (file: FileLike) => void;
  removeImageFileAt: (index: number) => void;
};

export const useShopDraftStore = create<DraftState>((set, get) => ({
  draft: null,

  setDraft: (d) => {
    // 드래프트 세팅 시에도 7일 보정
    const fixed = {
      ...d,
      request: {
        ...d.request,
        operationTimes: ensureSevenDays(d.request?.operationTimes ?? []),
      },
    };
    set({ draft: fixed });
  },

  clearDraft: () => set({ draft: null }),

  updateRequest: (partial) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      return {
        draft: {
          ...base,
          request: {
            ...base.request,
            ...partial,
          },
        },
      };
    }),

  setOperationTime: (dayOfWeek, partial) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      const ops = ensureSevenDays(base.request.operationTimes);
      const idx = ops.findIndex((o) => o.dayOfWeek === dayOfWeek);
      if (idx >= 0) {
        ops[idx] = { ...ops[idx], ...partial, dayOfWeek };
      }
      return {
        draft: {
          ...base,
          request: { ...base.request, operationTimes: ops },
        },
      };
    }),

  fillMissingDays: () =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      return {
        draft: {
          ...base,
          request: {
            ...base.request,
            operationTimes: ensureSevenDays(base.request.operationTimes),
          },
        },
      };
    }),

  setImagesFromList: (list) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      const [first, ...rest] = list ?? [];
      return {
        draft: {
          ...base,
          mainImage: first,
          imageFiles: rest,
        },
      };
    }),

  setMainImage: (file) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      return {
        draft: {
          ...base,
          mainImage: file,
        },
      };
    }),

  addImageFile: (file) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      const cur = Array.isArray(base.imageFiles) ? base.imageFiles : [];
      return {
        draft: {
          ...base,
          imageFiles: [...cur, file],
        },
      };
    }),

  removeImageFileAt: (index) =>
    set((state) => {
      const base = state.draft ?? initialDraft;
      const cur = Array.isArray(base.imageFiles) ? [...base.imageFiles] : [];
      if (index >= 0 && index < cur.length) cur.splice(index, 1);
      return {
        draft: {
          ...base,
          imageFiles: cur,
        },
      };
    }),
}));
