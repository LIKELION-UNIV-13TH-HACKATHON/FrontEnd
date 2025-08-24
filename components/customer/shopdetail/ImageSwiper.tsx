import React from "react";
import { View, Image, ScrollView } from "react-native";

const ImageSwiper = ({ images }: { images: string[] }) => {
  return (
    <View className="">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-x-1">
          {images.map((url, idx) => (
            <Image
              key={idx}
              source={{ uri: url }}
              className="h-[160px] w-[160px] rounded-lg"
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageSwiper;
