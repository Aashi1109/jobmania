import { COLORS } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  input: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: COLORS.inputBgColor,
    placeholderTextColor: COLORS.inputPlaceHolderColor,
    paddingVertical: 13,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },
  //   inputGroup: {
  //     marginBottom: 14,
  //   },
  forgotPassword: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: -5,
    // marginBottom: 14,
  },
  continueDivider: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  continueWith: {
    gap: 7,
  },
  authAsk: {
    flexDirection: "row",
  },
  authAskText: {
    color: COLORS.gray,
  },
  authAskClickableText: {
    color: COLORS.tertiary,
  },
});

export default styles;
