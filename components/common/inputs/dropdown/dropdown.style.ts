import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
    position: "relative",
  },
  input: {
    height: 45,
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#F5F5F5",
    paddingVertical: 13,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 15,
    marginBottom: 7,
  },

  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: 200,
    // position: "absolute",
    // top: 0,
    // left: 0,
    // width: "100%",
    // zIndex: 100,
  },
});

export default styles;
