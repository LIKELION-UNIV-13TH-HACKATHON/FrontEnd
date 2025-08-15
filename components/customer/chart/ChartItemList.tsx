import { View, Text } from "react-native";
import React from "react";
import { Shop, useShopInfoStore } from "@/store/shop/useShopInfoStore";
import ChartItem from "./ChartItem";

const dummyShops = [
  {
    id: 1,
    name: "현씨네 과일 가게",
    location: "충청남도 천안시 동남구 사직동",
    subs: 23,
    distance: 1.4,
  },
  {
    id: 2,
    name: "달콤 베이커리",
    location: "서울특별시 강남구 삼성동",
    subs: 50,
    distance: 3.2,
  },
  {
    id: 3,
    name: "우리 동네 카페",
    location: "부산광역시 해운대구",
    subs: 12,
    distance: 0.8,
  },
  {
    id: 4,
    name: "참좋은 정육점",
    location: "대전광역시 서구 둔산동",
    subs: 40,
    distance: 2.5,
  },
];

const ChartItemList = ({ tab }: { tab: string }) => {
  //   const { shops } = useShopInfoStore(); 연결 후 적용

  let sortedShops = [...dummyShops];
  if (tab === "latest") {
    sortedShops.sort((a, b) => b.id - a.id);
  } else if (tab === "popular") {
    sortedShops.sort((a, b) => b.subs - a.subs);
  } else if (tab === "near") {
    sortedShops.sort((a, b) => a.distance - b.distance);
  }

  return (
    <View>
      {sortedShops.map((shop) => (
        <ChartItem
          key={shop.id}
          id={shop.id}
          name={shop.name}
          location={shop.location}
          subs={shop.subs}
          distance={shop.distance}
        />
      ))}
    </View>
  );
};

export default ChartItemList;
