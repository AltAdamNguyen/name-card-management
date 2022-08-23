import { View, Text, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_Login from "../../asset/image/login.png";
import { FetchApiAuth } from "../../service/api/FetchAPI";
import SwitchSelector from "react-native-switch-selector";
import { AuthAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { Provider, Button } from "react-native-paper";
const options = [
  { label: "VN", value: "vn" },
  { label: "EN", value: "en" },
];

const SignIn = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorLoginText, setErrorLoginText] = useState({
    errorText: "",
    errorKey: "",
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [localeDefault, setLocaleDefault] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

  useEffect(() => {
    setLocaleDefault(i18n.language === "en" ? 1 : 0);
  }, [i18n.language])

  const onSignInPressed = () => {
    setLoading(true);
    FetchApiAuth(
      AuthAPI.Login,
      Method.POST,
      ContentType.JSON,
      user,
      getMessage
    );
  };

  const getMessage = (status, data) => {
    setLoading(false);
    if (status && data) {
      authCtx.onLogin(data.data.access_token, data.data.refresh_token)
      return
    }
    if(!status) {
      if(data){
        if(data.message === "U0003"){
          Alert.alert("",t("Screen_Login_Text_Error_U0003"))
          return
        }
        if(data.message === "U0002"){
          Alert.alert("",t("Screen_Login_Text_Error_U0002"))
          return
        }       
      }
      if(!data){
        Alert.alert("", t("Something_Wrong"))
        return
      }
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
      email: "",
    });
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.root}>
          <LoadingDialog onVisible={isLoading} />
          <View>
            <CustemHeaders
              text_PRIMARY="Name Card Management"
              Logo={Logo_Login}
            />
          </View>
          <View style={styles.input}>
            <CustomInputs
              value={user.email}
              setValue={handleChange("email")}
              icon={"close-circle"}
              label={t("Screen_Login_Placeholder_Username")}
              onpress={onClearUsernamePressed}
              type={"email-address"}
            />
            <CustomInputs
              value={user.password}
              setValue={handleChange("password")}
              label={t("Screen_Login_Placeholder_Password")}
              secureTextEntry={isSecureEntry}
              icon={isSecureEntry ? "eye" : "eye-off"}
              onpress={onVisibilityPasswordPressed}
            />
          </View>
          <View style={{width: '85%', alignItems: 'flex-end'}}>
            <Button uppercase={false} color='#1890FF' onPress={onForgotPasswordPressed} labelStyle={[styles.text, styles.text_TERTIARY]}>
              {t("Screen_Login_Button_ForgotPassword")}
            </Button>
          </View>


          <View style={styles.button_login}>
            <CustomButtons
              text={t("Screen_Login_Button_Login")}
              onPress={onSignInPressed}
            />
          </View>
          <SwitchSelector
            style={styles.language}
            options={options}
            initial={localeDefault}
            value={localeDefault}
            hasPadding
            buttonColor="#2F80ED"
            disableValueChangeOnPress={true}
            onPress={(language) => {
              i18n.changeLanguage(language);
              authCtx.language(language);
              setErrorLoginText({
                errorText: t(errorLoginText.errorKey),
                errorKey: errorLoginText.errorKey,
              });
            }}
          />
          <View style={styles.title}>
            <Text style={styles.title_label}>{t("Screen_Login_Text_Signature")}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

export default SignIn;
