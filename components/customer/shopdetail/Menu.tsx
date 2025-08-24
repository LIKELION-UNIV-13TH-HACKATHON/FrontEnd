import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getMenu } from "@/util/api/customer/getShopDetail";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

const Menu = () => {
  const { id } = useLocalSearchParams();
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!id) {
          setMenus([]);
          return;
        }
        const res = await getMenu(Number(id));
        if (Array.isArray(res)) {
          setMenus(res as MenuItem[]);
        } else if (res?.responses && Array.isArray(res.responses)) {
          setMenus(res.responses as MenuItem[]);
        } else {
          setMenus([]);
        }
      } catch (e: any) {
        setError(e?.message ?? "메뉴를 불러오지 못했어요");
        setMenus([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  if (loading) {
    return (
      <View className="py-6 items-center">
        <Text className="text-gray-500">메뉴를 불러오는 중…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-6 items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  if (!menus.length) {
    return (
      <View className="py-6 items-center">
        <Text className="text-gray-500">등록된 메뉴가 없습니다</Text>
      </View>
    );
  }

  return (
    <View>
      {menus.map((item) => {
        const validUri =
          typeof item.image === "string" && item.image.startsWith("http");
        return (
          <View
            key={`menu-${item.id}`}
            className="h-36 flex-row justify-between border-b border-[#F9F9F9] py-4"
          >
            <View className="justify-center gap-4 flex-1 pr-2">
              <View>
                <Text className="font-bold text-base">{item.name}</Text>
                {!!item.description && (
                  <Text className="text-[#BFBFBF]" numberOfLines={2}>
                    {item.description}
                  </Text>
                )}
              </View>
              <Text>{Number(item.price).toLocaleString()}원</Text>
            </View>
            {validUri ? (
              <Image
                source={{ uri: item.image }}
                className="aspect-square overflow-hidden h-28 rounded"
              />
            ) : (
              <View className="h-28 aspect-square rounded bg-[#F2F2F2] items-center justify-center">
                <Text className="text-gray-400 text-xs">이미지 없음</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Menu;
