import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_ForgotPassword from "../../asset/image/forgotPassword.png";
import styles from "./styles";
import i18next from "../../language/i18n";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { Searchbar, Appbar, Provider, Button } from "react-native-paper";
const ChangePassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  i18n.changeLanguage(authCtx.locale);
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  // const handleChange = (name) => {
  //   return (text) => {
  //     setUser({
  //       ...user,
  //       [name]: text,
  //     });
  //   };
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header
        statusBarHeight={1}
        theme={{ colors: { primary: "transparent" } }}
      >
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Change Password" />
      </Appbar.Header>
      <View style={styles.section}>
        <CustomInputs
          value={user.email}
          // setValue={handleChange("email")}

          label={"Mật khẩu hiện tại"}
          // onpress={onClearEmailPressed}
          secureTextEntry={isSecureEntry}
          icon={isSecureEntry ? "eye" : "eye-off"}
          onpress={onVisibilityPasswordPressed}
        />

        <CustomInputs
          value={user.email}
          // setValue={handleChange("email")}

          label={"Mật khẩu mới"}
          // onpress={onClearEmailPressed}
          secureTextEntry={isSecureEntry}
          icon={isSecureEntry ? "eye" : "eye-off"}
          onpress={onVisibilityPasswordPressed}
        />
        <CustomInputs
          value={user.email}
          // setValue={handleChange("email")}

          label={"Nhập lại mật khẩu mới"}
          secureTextEntry={isSecureEntry}
          icon={isSecureEntry ? "eye" : "eye-off"}
          onpress={onVisibilityPasswordPressed}
        />
        <View style={styles.bottomButtonContainer}>
          <Button
            style={styles.bottomButtonEnable}
            labelStyle={{ color: "white" }}
            disabled={true}
            // onPress={() => {
            //   setConfirmDialogVisible(true);
            // }}
          >
            Đặt lại mật khẩu
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
