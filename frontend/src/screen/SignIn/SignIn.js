import {
  View,
  Text
} from "react-native";
import React, { useState, useContext, createContext } from "react";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import styles from "./styles";
import i18next from "../../language/i18n";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import CustemHeaders from "../../components/CustomHeaders/CustemHeaders";
import Logo_Login from "../../asset/image/login.png";
import { FetchApiAuth } from "../../service/api/FetchAPI";
import SwitchSelector from "react-native-switch-selector";
import { AuthAPI, ContentType, Method } from "../../constants/ListAPI";
import LoginSchema from "../../validate/ValidateFormLogin";
import { object } from "yup";
import { StackActions } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog"
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput
} from "react-native-paper";
const options = [
  { label: "VN", value: "vn"} ,
   {label: "EN", value: "en" },
];

const SignIn = ({ navigation }) => {
  
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({
    email: "anhnche141236@gmail.com",
    password: "Trung123@",
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
    setLoading(true)
    FetchApiAuth(
      AuthAPI.Login,
      Method.POST,
      ContentType.JSON,
      user,
      getMessage
    );
  };

  const getMessage = (data) => {
    if (data.message === "U0001") {
      authCtx.onLogin(data.data.access_token, data.data.refresh_token);
      setLoading(true)
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

  const handleSubmit = (values) => {
    // FetchApi(API.AddContact, Method.POST, ContentType.JSON, value, getMessage)
  };
  const onClearUsernamePressed = () => {
    setUser({
      ...user,
      email: "",
    });
  };
 
  return (  
    <Provider>
       <View style= {styles.root}>
      <LoadingDialog onVisible={isLoading ? true : false }/>
      <View>
        <CustemHeaders text_PRIMARY="Name Card Management" Logo={Logo_Login} />
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
      <View style={styles.button_forgotPassword}>
        <CustomButtons
          text={t("Screen_Login_Button_ForgotPassword")}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
      </View>
      <View style={styles.button_login}>
        <CustomButtons text={t("Screen_Login_Button_Login")} onPress={onSignInPressed} />
      </View>
      <SwitchSelector
        style={styles.language}
        options={options}
        initial={authCtx.locale === 'vn' ? 0 : 1}
        hasPadding
        buttonColor="#2F80ED"
        disableValueChangeOnPress={true}
        value={1}
        onPress={(language) => {
          i18n.changeLanguage(language)
          authCtx.language(language)
          }}
        
      />
      <View style={styles.title}>
        <Text>{t("Screen_Login_Text_Signature")}</Text>
      </View>
    </View>
    </Provider>
   
  );
};

export default SignIn;
