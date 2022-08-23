import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    height: '100%',
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1
  },
  section: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "white",
  },
  logo: {
    width: 300,
    maxWidth: 300,
    alignItems: "center",
    paddingHorizontal: "50%",
    marginBottom: 10,
  },

  text_PRIMARY: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2F80ED",
    textAlign: "center",
    marginBottom: "10%",
    alignItems: "center",
  },
  headline: {
    width: "100%",
  },
});

export default styles;
