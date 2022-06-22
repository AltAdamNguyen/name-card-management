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
import i18next from '../../language/i18n'
import {useTranslation} from 'react-i18next'
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
  const {t, i18n} = useTranslation()
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    setUser(...user, { email: "" });
  };
  return (
    <View style={styles.root}>
      <CustemHeaders text_PRIMARY='Name Card Management' Logo={Logo_Login}   />
        <CustomInputs placeholder={t('placeholder_Username')} value={user.email} setValue={handleChange('email')} icon={iconPath.icCloseCircle} onpress={onClearUsernamePressed}/>
        <CustomInputs placeholder={t('placeholder_Password')} value={user.password} setValue={handleChange('password')} secureTextEntry={isSecureEntry} icon={isSecureEntry ? iconPath.icEye : iconPath.icEye_invisible} 
        onpress = {onVisibilityPasswordPressed}/>
        <CustomButtons text={t('button_ForgorPassword')} onPress={onForgotPasswordPressed} type="TERTIARY" />
        <CustomButtons text={t('button_Login')} onPress={onSignInPressed} />
      <SwitchSelector style={styles.language}
        options={options}
        initial={0}
        hasPadding
        buttonColor = "#2F80ED"
        onPress={(language) => i18n.changeLanguage(language)}
      />
      <View style={styles.title}>
          <Text>{t('signature_login')}</Text>
        </View>
    </View>
  );
};

export default SignIn;
