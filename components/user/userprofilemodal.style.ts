import { COLORS } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: COLORS.modalColor,
    width: 290,
    padding: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  headerPicture: {
    width: 132,
    height: 132,
    borderRadius: 10,
    marginTop: "-35%",
  },
  headerInfo: {
    color: COLORS.white,
    marginVertical: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  lightText: {
    color: COLORS.gray,
  },
  description: {
    color: COLORS.white,
    marginBottom: 14,
    textAlign: "center",
  },
  footerLogos: {
    flexDirection: "row",
    gap: 35,
  },
  footerLogoItem: {
    width: 25,
    height: 25,
    objectFit: "contain",
    tintColor: COLORS.gray,
  },
});

export default styles;
