import { Platform, StyleSheet } from "react-native";
import { COLORS, SIZES } from "@/constants";

const styles = StyleSheet.create({
  container: {
    paddingVertical: Platform.OS === "web" ? 6 : 4,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 29,
  },
  text: {
    color: COLORS.white,
    fontSize: SIZES.medium - 2,
  },
  clear: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 9,
  },
});

export default styles;
