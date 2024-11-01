import { Image, View } from "react-native";
import React from "react";
import { images } from "@/constants";

export const Logo = ({ imageClassName = "w-40 h-40" }) => {
  return (
    <View className="w-full flex justify-center text-center items-center">
      <Image source={images.logo} className={imageClassName} resizeMode="contain" />
    </View>
  );
};
