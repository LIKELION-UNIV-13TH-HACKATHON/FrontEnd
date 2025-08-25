import { View, Text } from "react-native";
import React, { useState } from "react";
import SubscribeItem from "./SubscribeItem";
import { getSubList } from "@/util/api/customer/getSubList";

const SubscribeBody = () => {
  const [subList, setSubList] = useState<any[]>([]);
  const [totalSubscribeCount, setTotalSubscribeCount] = useState<number>(0);
  React.useEffect(() => {
    const get = async () => {
      try {
        const res = await getSubList();
        if (res?.responses) {
          setSubList(res.responses);
          setTotalSubscribeCount(res.totalSubscribeCount ?? 0);
        }
      } catch (error) {
        console.error("구독 리스트 fail ", error);
      }
    };
    get();
  }, []);
  return (
    <View className="flex-1 px-4">
      <Text className="text-[#BFBFBF] pb-6">
        총 {totalSubscribeCount}개 구독
      </Text>
      {subList.length === 0 ? (
        <View className="items-center py-8">
          <Text className="text-gray-500">구독한 매장이 없습니다</Text>
        </View>
      ) : (
        subList.map((item) => (
          <SubscribeItem
            key={item.subscriptionId}
            shopId={item.shopId}
            shopName={item.shopName}
            mainImage={item.mainImage}
          />
        ))
      )}
    </View>
  );
};

export default SubscribeBody;
