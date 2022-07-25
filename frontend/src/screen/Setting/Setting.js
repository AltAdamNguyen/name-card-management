//import liraries
import React, { useContext, useState } from "react";
import { Text, SafeAreaView, TouchableOpacity } from "react-native";
import AuthContext from "../../store/AuthContext";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { StackActions } from "@react-navigation/native";
// import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput,
} from "react-native-paper";
// create a component
const Setting = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  //i18n.changeLanguage("en")
  const onChangePasswordPressed = () => {
    navigation.navigate("SettingSwap", {
      screen: "ChangePassword",
    });
  };
  const onLogoutPressed = () => {
    authCtx.onLogout();
    setLoading(true);
  };
  return (
    <Provider>
      {/* <LoadingDialog onVisible={isLoading ? true : false} /> */}
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>{t("Screen_Setting_Button_Title")}</Text>
        <TouchableOpacity
          style={[styles.button, styles.mb20]}
          onPress={onChangePasswordPressed}
        >
          <Text style={styles.label}>
            {t("Screen_Setting_Button_ChangePassword")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogoutPressed}>
          <Text style={styles.label}>{t("Screen_Setting_Button_Logout")}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Provider>
  );
};

// define your styles

//make this component available to the app
export default Setting;
