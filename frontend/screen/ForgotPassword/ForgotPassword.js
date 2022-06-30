import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_ForgotPassword from "../../asset/image/forgotPassword.png";
import styles from "./styles";

import iconPath from "../../constants/iconPath";
const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const onForgotPasswordPressed = () => {
    console.warn("onForgotPasswordPressed");
  };

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
        text="Đặt lại mật khẩu"
        onPress={onForgotPasswordPressed}
      />
    </View>
  );
};

export default ForgotPassword;
