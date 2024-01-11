import { View } from "react-native";

import React from "react";
import { COLORS } from "@/constants";

const BasicCard = ({
  children,
  height,
  paddingVertical = 30,
  borderRadius = 15,
  width = 330,
  paddingHorizontal = 40,
  backgroundColor = COLORS.lightWhite,
}: {
  children: React.ReactNode;
  height?: number;
  paddingVertical?: number;
  width?: number | any;
  borderRadius?: number;
  paddingHorizontal?: number;
  backgroundColor?: string;
}) => {
  return (
    <View
      style={{
        paddingVertical,
        height,
        width,
        borderRadius,
        paddingHorizontal,
        backgroundColor,
        elevation: 5,
        // maxWidth: 400,
      }}
    >
      {children}
    </View>
  );
};

export default BasicCard;
