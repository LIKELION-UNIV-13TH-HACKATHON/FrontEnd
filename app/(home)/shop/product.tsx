import { View, Text } from "react-native";
import React from "react";
import Header from "@/components/shop/questionpage/Header";
import ProductBody from "@/components/shop/productpage/ProductBody";
import BottomTaps from "@/components/shop/homepage/BottomTaps";
import RegisterProduct from "@/components/shop/productpage/RegisterProduct";

const Product = () => {
  return (
    <View className="flex-1 relative">
      <Header />
      <ProductBody />
      <RegisterProduct />
      <BottomTaps />
    </View>
  );
};

export default Product;
