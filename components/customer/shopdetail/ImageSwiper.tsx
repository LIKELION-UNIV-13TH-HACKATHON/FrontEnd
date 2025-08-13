import React from "react";
import { View, Image, ScrollView } from "react-native";

const images = [
  require("@/assets/images/fruit1.png"),
  require("@/assets/images/fruit2.png"),
  require("@/assets/images/fruit3.png"),
];

const ImageSwiper = () => {
  return (
    <View className="h-36">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-x-4">
          {images.map((uri, idx) => (
            <Image
              key={idx}
              source={uri}
              className="h-36 w-36"
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageSwiper;
