import { View, Text, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState, useContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import i18next from "../../language/i18n";
import styles from "./styles";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_Login from "../../asset/image/login.png";
import { FetchApiAuth } from "../../service/api/FetchAPI";
import SwitchSelector from "react-native-switch-selector";
import { AuthAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { Provider } from "react-native-paper";
const options = [
  { label: "VN", value: "vn" },
  { label: "EN", value: "en" },
];

const SignIn = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    // email: "anhnche141236@gmail.com",
    // password: "Trung123@",
    // email: "conganhnguyen33@gmail.com",
    // password: "Trung123@"
    // email: "person2@gmail.com",
    // password: "Trung123@",
  });
  const [errorLoginText, setErrorLoginText] = useState({
    errorText: "",
    errorKey: "",
  });

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  const onForgotPasswordPressed = () => {
    navigation.navigate("ForgotPassword");
  };

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

  const getMessage = (data) => {
    setLoading(false);
    if (data.message == "Internet Error") {
      Alert.alert("", "Internet Error")
    }
    else if (user.email == "" || user.password == "") {
      Alert.alert(t("Screen_Login_Text_Error_Empty"))
      return;
    }
    data.message === "U0001" &&
      authCtx.onLogin(data.data.access_token, data.data.refresh_token)
    data.message === "U0003" &&
      Alert.alert(t("Screen_Login_Text_Error_U0003"))
    data.message === "U0002" &&
      Alert.alert(errorLoginText.errorText)

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
              icon={"close-circle-outline"}
              label={t("Screen_Login_Placeholder_Username")}
              onpress={onClearUsernamePressed}
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

          <CustomButtons
            text={t("Screen_Login_Button_ForgotPassword")}
            onPress={onForgotPasswordPressed}
            type="TERTIARY"
          />

          <View style={styles.button_login}>
            <CustomButtons
              text={t("Screen_Login_Button_Login")}
              onPress={onSignInPressed}
            />
          </View>
          <SwitchSelector
            style={styles.language}
            options={options}
            initial={authCtx.locale === "vn" ? 0 : 1}
            hasPadding
            buttonColor="#2F80ED"
            disableValueChangeOnPress={true}
            value={1}
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
