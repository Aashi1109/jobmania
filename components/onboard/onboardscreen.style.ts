import { COLORS } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  bgContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  bgBottom: {
    height: "45%",
    width: "100%",
    backgroundColor: COLORS.gray2,
  },
  bgTop: {
    height: "55%",
    width: "100%",
    backgroundColor: COLORS.tertiary,
  },
  bgText: {
    marginTop: 88,
    fontSize: 82,
    fontWeight: "bold",
    color: "rgba(255,255,255,0.1)",
  },
  bgHeadContainer: {
    position: "absolute",
    top: 136,
    left: "50%",
    transform: "translateX(-50%)",
  },
  bgHeadContainerShifted: {
    position: "absolute",
    top: 36,
    left: 36,
  },

  content: {
    marginTop: 253,
    gap: 12,
    paddingHorizontal: 32,
  },
});

export default styles;
