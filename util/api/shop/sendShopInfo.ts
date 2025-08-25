import { http } from "../http";

export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface OperationTime {
  dayOfWeek: DayOfWeek;
  openTime: string; // "HH:MM"
  closeTime: string; // "HH:MM"
  isClosed: boolean;
}

export interface ShopRegisterRequest {
  businessNumber: string;
  ownerName: string;
  shopName: string;
  shopType:
    | "AGRI_FISH_LIVESTOCK"
    | "FOOD"
    | "DAILY_SUPPLIES"
    | "FASHION"
    | "HEALTH_BEAUTY"
    | "ETC";
  shopPhoneNumber: string;
  address: string;
  isTermAgreed: boolean;
  operationTimes: OperationTime[]; // length 7
}

export type FileLike = string | { uri: string; name?: string; type?: string };

export interface ShopRegisterPayload {
  request: ShopRegisterRequest;
  mainImage?: FileLike;
  imageFiles?: FileLike[];
}

const IMAGE_ARRAY_WITH_BRACKETS = false;

const guessExt = (uri?: string): string => {
  if (!uri) return "jpg";
  const m = uri.match(/\.(\w+)(?:\?.*)?$/i);
  const ext = m?.[1]?.toLowerCase();
  if (!ext) return "jpg";
  return ext;
};

const mimeOf = (ext: string): string => {
  switch (ext) {
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "heic":
      return "image/heic";
    case "heif":
      return "image/heif";
    case "jpg":
    case "jpeg":
    default:
      return "image/jpeg";
  }
};

const toFormFile = (
  f: FileLike,
  idx: number,
  kind: "main" | "sub"
): { uri: string; name: string; type: string } => {
  const file = typeof f === "string" ? { uri: f } : f;
  const ext = guessExt(file.uri);
  return {
    uri: file.uri,
    name:
      file.name ?? (kind === "main" ? `main.${ext}` : `image_${idx}.${ext}`),
    type: file.type ?? mimeOf(ext),
  };
};

export const sendShopInfo = async (payload: ShopRegisterPayload) => {
  try {
    const fd = new FormData();

    // 🔥 React Native 전용: string 프로퍼티로 Content-Type 명시
    fd.append("request", {
      string: JSON.stringify(payload.request),
      type: "application/json",
    } as any);

    if (payload.mainImage) {
      const main = toFormFile(payload.mainImage, 0, "main");
      fd.append("mainImage", {
        uri: main.uri,
        name: main.name,
        type: main.type,
      } as any);
    }

    if (payload.imageFiles?.length) {
      payload.imageFiles.forEach((img, idx) => {
        const sub = toFormFile(img, idx, "sub");
        fd.append("imageFiles", {
          uri: sub.uri,
          name: sub.name,
          type: sub.type,
        } as any);
      });
    }

    const res = await http.post("/shops/register", fd, {
      timeout: 60000,
    });

    return res.data;
  } catch (error) {
    console.error("❌ Upload failed:", error);
    throw error;
  }
};

// 추가: 다른 shop 관련 API들
export const getShopList = async () => {
  try {
    const res = await http.get("/shops");
    return res.data;
  } catch (error) {
    console.error("❌ Get shop list failed:", error);
    throw error;
  }
};

export const getShopDetail = async (shopId: number) => {
  try {
    const res = await http.get(`/shops/${shopId}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Get shop detail failed for ID ${shopId}:`, error);
    throw error;
  }
};
