import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 16,
    right: 16,
    alignItems: "stretch",
    flexDirection: "column",
  },
  popup: {
    padding: 8,
    minWidth: 240,
    borderRadius: 5,
    justifyContent: "flex-start",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    backgroundColor: "white",
    marginBottom: 16,
    flexDirection: "row",
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
