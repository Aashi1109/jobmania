import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  progress: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 1000,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default styles;
