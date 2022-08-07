import {
  View,
  StyleSheet,
  Alert,
  Image,
  useWindowDimensions,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
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
import { UserAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { FetchApi } from "../../service/api/FetchAPI";

const ResetPassword = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordReEnter, setNewPasswordReEnter] = useState("");
  const { height } = useWindowDimensions();
  const { email, code } = route.params;
  const [isLoading, setIsLoading] = useState(false);

  const onResetPassword = () => {
    setIsLoading(true);
    if (newPassword !== newPasswordReEnter) {
      Alert.alert("", t("Screen_ResetPassword_Alert_PasswordAndRePasswordMatch"));
      setIsLoading(false);
    } else {
      FetchApi(
        UserAPI.SubmitPasswordForgot,
        Method.POST,
        ContentType.JSON,
        {
          email: email,
          code: code,
          password: newPassword,
        },
        InputPasswordCodeAPICallback
      );
    }
  };

  const InputPasswordCodeAPICallback = (data) => {
    if (data.message == "Internet Error") {
      Alert.alert("", t("Loading_InternetError"));
    } else if ( data.message == "U0006" ) {
      Alert.alert(
        "",
        t("Screen_ResetPassword_Alert_PasswordFormat")
      );
    } else if (data.message == "U0008") {
      // TODO
    } else {
      navigation.navigate("SignIn");
    }
    setIsLoading(false);
  };

  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);

  const onClearCodePressed = () => {
    setNewPassword("");
  };

  const onClearCodePressedReEnter = () => {
    setNewPasswordReEnter("");
  };

  const handleChange = (name) => {
    setNewPassword(name);
  };

  const handleChangeReEnter = (name) => {
    setNewPasswordReEnter(name);
  };

  return (
    <Provider>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.root}>
          <Appbar.Header
            statusBarHeight={1}
            theme={{ colors: { primary: "transparent" } }}
          >
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          </Appbar.Header>
          <View style={styles.headline}>
            <Image
              source={Logo_ForgotPassword}
              style={[styles.logo, { height: height * 0.3 }]}
              resizeMode="contain"
            />
            <View style={styles.text}>
              <Text style={styles.text_PRIMARY}>
                {t("Screen_ResetPassword_Label_CreateNewPassword")}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <CustomInputs
              value={newPassword}
              setValue={(text) => handleChange(text)}
              icon={"close-circle"}
              label={t("Screen_ResetPassword_PlaceHolder_NewPassword")}
              onpress={onClearCodePressed}
            />
            <CustomInputs
              value={newPasswordReEnter}
              setValue={(text) => handleChangeReEnter(text)}
              icon={"close-circle"}
              label={t("Screen_ResetPassword_PlaceHolder_CreateNewPassword")}
              onpress={onClearCodePressedReEnter}
            />
            <CustomButtons
              text={t("Screen_ResetPassword_Button_label")}
              onPress={onResetPassword}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
      <LoadingDialog onVisible={isLoading} />
    </Provider>
  );
};

export default ResetPassword;
