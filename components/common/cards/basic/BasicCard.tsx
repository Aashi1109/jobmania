import { StyleSheet, View, ViewStyle } from "react-native";
import styles from "./basiccard.style";
import React from "react";

const BasicCard = ({
  children,
  height,
  paddingVertical = 30,
}: {
  children: React.ReactNode;
  height?: string | number;
  paddingVertical?: number;
}) => {
  return (
    <View style={[styles.container, { paddingVertical, height }]}>
      {children}
    </View>
  );
};

export default BasicCard;
