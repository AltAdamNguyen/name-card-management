import { View, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_ForgotPassword from "../../asset/image/forgotPassword.png";
import styles from "./styles";
import i18next from "../../language/i18n"; 
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const onForgotPasswordPressed = () => {
    console.warn("onForgotPasswordPressed");
  };
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext)
  i18n.changeLanguage(authCtx.locale)
  const onClearEmailPressed = () => {
    setUser({
      ...user,
      email: "",
    });
  };

  const handleChange = (name) => {
    return (text) => {
      setUser({
        ...user,
        [name]: text,
      });
    };
  };
  return (
    <View style={styles.root}>
      <CustemHeaders Logo={Logo_ForgotPassword} />
      <CustomInputs
        value={user.email}
        setValue={handleChange("email")}
        icon={"close-circle-outline"}
        label={'Email'}
        onpress={onClearEmailPressed}
      />
      <CustomButtons
        text={t("Screen_ForgotPassword_Button_ResetPassword")}
        onPress={onForgotPasswordPressed}
      />
    </View>
  );
};

export default ForgotPassword;
