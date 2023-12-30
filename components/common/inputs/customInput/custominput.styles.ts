import { COLORS } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  input: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.inputBgColor,

    paddingVertical: 13,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 15,
    textTransform: "capitalize",
  },
  error: {
    color: COLORS.error,
  },
});

export default styles;
