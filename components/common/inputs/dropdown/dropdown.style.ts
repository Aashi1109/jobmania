import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 10,
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    maxHeight: 100,
  },
});

export default styles;
