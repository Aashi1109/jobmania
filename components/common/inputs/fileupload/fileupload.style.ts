import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 15,
  },
  fileUploadContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.inputBgColor,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    height: 44,
    borderRadius: 5,
  },
  fileUploadText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  fileUploadImageContainer: {
    width: 16,
    height: 16,
  },
  fileUploadImage: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
