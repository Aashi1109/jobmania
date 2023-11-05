import { COLORS } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  inputContainer: {
    gap: 14,
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },
  input: {
    height: 45,
    borderRadius: 5,
    backgroundColor: COLORS.inputBgColor,
    placeholderTextColor: COLORS.inputPlaceHolderColor,
    paddingVertical: 13,
    paddingHorizontal: 18,
  },
});

export default styles;
