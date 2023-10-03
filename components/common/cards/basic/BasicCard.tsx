import { View } from "react-native";
import styles from "./basiccard.style";
import React from "react";

const BasicCard = ({
  children,
  paddingVertical,
}: {
  children: React.ReactNode;
  paddingVertical?: number;
}) => {
  return (
    <View
      style={[styles.container, { paddingVertical: paddingVertical ?? 30 }]}
    >
      {children}
    </View>
  );
};

export default BasicCard;
