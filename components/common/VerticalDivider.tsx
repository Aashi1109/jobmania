import { COLORS } from "@/constants";
import { StyleSheet, View } from "react-native";

const VerticalDivider = ({
  height = 3,
  backgroundColor,
}: {
  height?: number;
  width?: string | number;
  backgroundColor?: string;
}) => (
  <View
    style={{
      height: height,
      backgroundColor: backgroundColor ?? COLORS.gray,
      borderRadius: 1000,
      flex: 1,
    }}
  />
);

export default VerticalDivider;
