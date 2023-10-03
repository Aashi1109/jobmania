import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  progressRing: {
    width: 100,
    height: 100,
    borderWidth: 8,
    borderColor: "#ccc",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressIndicator: {
    width: 100,
    height: 100,
    borderWidth: 8,
    borderColor: "green", // You can change this color
    borderRadius: 50,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
  },
  avatarContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default styles;
