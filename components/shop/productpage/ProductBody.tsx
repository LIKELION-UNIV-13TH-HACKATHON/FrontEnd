import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import DotButton from "@/assets/images/dotbutton.svg";
import Popover, { PopoverPlacement } from "react-native-popover-view";
import { useProductStore } from "@/store/user/useProductStore";

const data = [
  {
    id: 1,
    name: "상품 1",
    price: 10000,
    description: "첫 번째 상품 설명입니다.",
    image: require("../../../assets/images/fruit1.png"),
  },
  {
    id: 2,
    name: "상품 2",
    price: 20000,
    description: "두 번째 상품 설명입니다.",
    image: require("../../../assets/images/fruit2.png"),
  },
  {
    id: 3,
    name: "상품 3",
    price: 30000,
    description: "세 번째 상품 설명입니다.",
    image: require("../../../assets/images/fruit2.png"),
  },
  {
    id: 4,
    name: "상품 4",
    price: 40000,
    description: "네 번째 상품 설명입니다.",
    image: require("../../../assets/images/fruit1.png"),
  },
  {
    id: 5,
    name: "상품 5",
    price: 50000,
    description: "다섯 번째 상품 설명입니다.",
    image: require("../../../assets/images/fruit1.png"),
  },
];

const ProductBody = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setActive(active === id ? null : id);
  };
  const { products, setProduct, removeProduct } = useProductStore();
  useEffect(() => {
    if (!products || products.length === 0) {
      setProduct(data);
    }
  }, [products?.length, setProduct]);
  return (
    <ScrollView className="flex-1 p-4">
      {products.map((product) => (
        <View
          key={product.id}
          className=" relative flex-row pb-4 mb-4 items-center border-b border-[#F9F9F9]"
        >
          <Popover
            isVisible={active === product.id}
            onRequestClose={() => setActive(null)}
            placement={PopoverPlacement.BOTTOM}
            popoverStyle={{
              borderRadius: 10,
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
            }}
            backgroundStyle={{ backgroundColor: "transparent" }}
            from={
              <Pressable
                onPress={() => toggleMenu(product.id)}
                className="absolute top-1 right-1"
                hitSlop={20}
              >
                <DotButton />
              </Pressable>
            }
          >
            <Pressable
              onPress={() => {
                removeProduct(product.id);
                setActive(null);

                //todo: 백엔드 삭제 로직 추가
              }}
              className="px-4 py-2"
            >
              <Text className="text-red-500 font-semibold">삭제하기</Text>
            </Pressable>
          </Popover>
          <Image
            source={product.image}
            className="w-[120px] h-[120px] overflow-hidden mr-4"
          />
          <View className="flex-1 flex-col gap-2">
            <View className="pb-4">
              <Text className="text-[16px] font-bold">{product.name}</Text>
              <Text className="text-sm text-gray2">{product.description}</Text>
            </View>
            <Text className="text-[15px] font-semibold text-gray-700">
              {product.price.toLocaleString()}원
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ProductBody;
