import { COLORS, FONT, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    maxWidth: 500,
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    top: 10,
    right: 20,
    height: SIZES.medium,
    width: SIZES.medium,
    tintColor: COLORS.primary,
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    gap: SIZES.medium,
    position: "relative",
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 1000,
  },
  rightContainer: {
    gap: 5,
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    fontWeight: "bold",
  },
  headingText: {
    fontSize: SIZES.medium,
  },
  bottomContainer: { gap: SIZES.xSmall },
});

export default styles;
