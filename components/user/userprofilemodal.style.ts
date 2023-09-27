import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: "#fff",
    width: 290,
    padding: 20,
    position: "relative",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  headerPicture: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  headerInfo: {
    marginLeft: 16,
    gap: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subInfo: {
    marginTop: 24,
    gap: 4,
  },
  horizontalRule: {
    width: "100%",
    backgroundColor: "#e6e4e6",
    marginVertical: 14,
    height: 2,
  },
  moreInfoLink: {
    textAlign: "center",
  },
  editIcon: {
    height: 20,
    width: 20,
  },
  editIconContainer: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});

export default styles;
