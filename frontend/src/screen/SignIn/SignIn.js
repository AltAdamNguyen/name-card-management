import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Content,
} from "react-native";
import React, { useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import iconPath from "../../constants/iconPath";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_Login from "../../asset/image/login.png";
import { FetchApiAuth } from "../../service/api/FetchAPI";
import SwitchSelector from "react-native-switch-selector";
import { AuthAPI, ContentType, Method } from "../../constants/ListAPI";
const SignIn = ({ navigation }) => {
  const options = [
    { label: "VN", value: "vn" },
    { label: "EN", value: "en" },
  ];
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    email: "anhnc@gmail.com",
    password: "trung123@",
  });
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const authCtx = useContext(AuthContext);
  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  const onSignInPressed = () => {
    FetchApiAuth(
      AuthAPI.Login,
      Method.POST,
      ContentType.JSON,
      user,
      getMessage
    );
  };

  const getMessage = (data) => {
    console.log(data);
    if (data.message === "Get token success") {
      authCtx.onLogin(data.data.access_token, data.data.refresh_token);
    }
  };

  const handleChange = (name) => {
    return (text) => {
      setUser({
        ...user,
        [name]: text,
      });
    };
  };

  const onClearUsernamePressed = () => {
    setUser({
      ...user,
     email: '',
    });
  };
  return (
    <View style={styles.root}>
      <View>
        <CustemHeaders text_PRIMARY="Name Card Management" Logo={Logo_Login} />
      </View>
      <View style={styles.input}>
        <CustomInputs
          value={user.email}
          setValue={handleChange("email")}
          icon={"close-circle-outline"}
          label={t("placeholder_Username")}
          onpress={onClearUsernamePressed}
        />
        <CustomInputs
          value={user.password}
          setValue={handleChange("password")}
          label={t("placeholder_Password")}
          secureTextEntry={isSecureEntry}
          icon={isSecureEntry ? "eye" : "eye-off"}
          onpress={onVisibilityPasswordPressed}
        />
      </View>
      <View style={styles.button_forgotPassword}>
        <CustomButtons
          text={t("button_ForgotPassword")}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>
      <View style={styles.button_login}>
      <CustomButtons text={t("button_Login")} onPress={onSignInPressed} />
      </View>
      <SwitchSelector
        style={styles.language}
        options={options}
        initial={0}
        hasPadding
        buttonColor="#2F80ED"
        onPress={(language) => i18n.changeLanguage(language)}
      />
      <View style={styles.title}>
        <Text>{t("signature_login")}</Text>
      </View>
    </View>
  );
};

export default SignIn;
