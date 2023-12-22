import { SIZES } from "@/constants";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "5%",
    left: "50%",
    zIndex: 1000,
    transform: "translateX(-50%)",
    maxHeight: 500,
    width: "100%",
    overflow: "hidden",
    justifyContent: "center",
  },
  popup: {
    backgroundColor: "rgba(0,0,0,.7)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "rgba(0,0,0,.5)",
    shadowRadius: 5,
    maxWidth: 300,
    marginBottom: SIZES.medium,
    marginHorizontal: "auto",
  },
  popupText: {
    fontSize: 16,
    color: "white",
  },
  popupStrip: {
    width: 5,
    borderRadius: 100,
    height: 80,
  },
  popupIcon: {
    width: 48,
    height: 48,
  },
  popupContent: {},
  popupHead: {
    fontWeight: "bold",
  },
  popupMessage: {
    fontSize: 16,
  },
  popupCancel: {
    fontSize: 24,
    lineHeight: 0.8,
    marginLeft: "auto",
    marginRight: 5,
    cursor: "pointer",
    opacity: 0.8,
  },
  error: {
    backgroundColor: "red",
  },
  info: {
    backgroundColor: "blue", // Change with the actual color
  },
  success: {
    backgroundColor: "green",
  },
});

export default styles;
