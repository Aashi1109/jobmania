import { StyleSheet } from "react-native";
import { COLORS } from "@/constants";

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: 29,
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
  },
  clear: {
    color: COLORS.white,
    fontSize: 20,
    marginLeft: 9,
  },
});

export default styles;
