export type ShopListItem = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address?: string;
  industry?: string;
  images?: string[];
  tel?: string;
  mainImage?: string;
  isSubscribe?: boolean;
  hours?: Array<{
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
};

export type ShopDetail = ShopListItem & {};

export const mapNearbyItem = (dto: any): ShopListItem => ({
  id: dto?.shopId ?? dto?.id,
  name: dto?.shopName ?? dto?.name ?? "",
  latitude: Number(dto?.latitude ?? dto?.lat ?? 0),
  longitude: Number(dto?.longitude ?? dto?.lng ?? 0),
  address: dto?.address,
  industry: dto?.shopType ?? dto?.industry,
  tel: dto?.shopTellNumber ?? dto?.tel,
  mainImage: dto?.mainImage,
  isSubscribe: dto?.isSubscribe,
  hours: dto?.operationTimeResponses,
  images: dto?.shopImages,
});

export const mapDetail = (dto: any): ShopDetail => ({
  id: dto?.shopId ?? dto?.id,
  name: dto?.shopName ?? dto?.name ?? "",
  latitude: Number(dto?.latitude ?? dto?.lat ?? 0),
  longitude: Number(dto?.longitude ?? dto?.lng ?? 0),
  address: dto?.address,
  industry: dto?.shopType ?? dto?.industry,
  tel: dto?.shopTellNumber ?? dto?.tel,
  mainImage: dto?.mainImage,
  isSubscribe: dto?.isSubscribe,
  hours: dto?.operationTimeResponses,
  images: dto?.shopImages,
});
