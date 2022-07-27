import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    justifyContent: "center",
    width: "100%",
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  section: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff',
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    paddingBottom: "20%",
  },

  // Bottom Button Region
  bottomButtonContainer: {
    flexDirection: "column",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
  },
  bottomButtonEnable: {
    width: "95%",
    backgroundColor: "#1890FF",
  },
  bottomButtonDisable: {
    width: "95%",
    backgroundColor: "grey",
  },
  // End Bottom Buttom Region

  logo: {
    width: 300,
    maxWidth: 300,
    alignItems: "center",
    paddingHorizontal: "50%",
    marginBottom: 25
  },

  text_PRIMARY: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2F80ED",
    textAlign: "center",
  },
});

export default styles;
