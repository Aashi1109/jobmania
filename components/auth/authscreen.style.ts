import { COLORS, SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    alignItems: "center", // Center items horizontally
    justifyContent: "center",
  },
  bgBottom: {
    flex: 4.5,
    width: "100%",
    backgroundColor: COLORS.gray2,
  },
  bgTop: {
    flex: 5.5,
    width: "100%",
    backgroundColor: COLORS.tertiary,
  },
  bgText: {
    marginTop: 84,
    fontSize: 81,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.1)",
  },
  bgHeadContainer: {
    position: "absolute",
    top: 136,
    justifyContent: "center",
    flexDirection: "row",
  },
  bgHeadContainerShifted: {
    position: "absolute",
    top: 36,
    left: 36,
  },

  content: {
    marginTop: 253,
    // marginBottom: 60,
    gap: 12,
    paddingBottom: SIZES.medium,
    alignItems: "center",
    flexGrow: 1,
  },
});

export default styles;
