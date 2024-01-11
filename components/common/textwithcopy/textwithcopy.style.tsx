import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightWhite,
    // marginTop: SIZES.small,
  },
  text: {
    alignSelf: "flex-end",
  },
  image: {
    height: SIZES.small,
    width: SIZES.small,
    alignSelf: "center",
    tintColor: COLORS.primary,
  },
  //   imageContainer: {
  //     height: 25,
  //     width: 25,
  //     alignContent: "center",
  //     justifyContent: "center",
  //     borderRadius: 1000,
  //     backgroundColor: COLORS.gray2,
  //   },
});

export default styles;
