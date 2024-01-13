import { COLORS } from "@/constants";
import { StyleSheet, View } from "react-native";

const VerticalDivider = ({
  height = 2,
  backgroundColor,
  width,
  marginVertical,
}: {
  height?: number;
  width?: string | number;
  marginVertical?: number;
  backgroundColor?: string;
}) => {
  return (
    <View
      style={{
        height: height,
        marginVertical: marginVertical ?? 15,
        backgroundColor: backgroundColor ?? COLORS.gray,
        borderRadius: 1000,
        ...(width ? { width: width ?? "100%" } : { flex: 1 }),
      }}
    />
  );
};

export default VerticalDivider;
