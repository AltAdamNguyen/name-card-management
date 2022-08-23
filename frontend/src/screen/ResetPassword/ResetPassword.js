import {
  View,
  Alert,
  Image,
  useWindowDimensions,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import CustomInputs from "../../components/CustomInputs";
import CustomButtons from "../../components/CustomButtons";
import Logo_ForgotPassword from "../../asset/image/forgotPassword.png";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Appbar, Provider } from "react-native-paper";
import { UserAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { FetchApi } from "../../service/api/FetchAPI";

const ResetPassword = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordReEnter, setNewPasswordReEnter] = useState("");
  const { height } = useWindowDimensions();
  const { email, code } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [newPasswordIsSecureEntry, setNewPasswordIsSecureEntry] = useState(true);
  const [reEnterNewPasswordIsSecureEntry, setReEnterNewPasswordIsSecureEntry] = useState(true);
  const { t, i18n } = useTranslation();
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

  const InputPasswordCodeAPICallback = (status, data) => {
    setIsLoading(false);
    if(!status){
      if (data){
        if ( data.message == "U0006" ) {
          Alert.alert("",t("Screen_ResetPassword_Alert_PasswordFormat"));
          return
        }
        if ( data.message == "U0008" ) {
          Alert.alert("",t("Screen_RestPassword_Alert_CodeExpired"));
          return
        }
      }
      if(!data){
        Alert.alert("", t("Something_Wrong"))
        return
      }
    }
    if (status && data){
      navigation.navigate("SignIn");
    }
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
              label={t("Screen_ResetPassword_PlaceHolder_NewPassword")}
              secureTextEntry={newPasswordIsSecureEntry}
              icon={newPasswordIsSecureEntry ? "eye" : "eye-off"}
              onpress={() => setNewPasswordIsSecureEntry(!newPasswordIsSecureEntry)}
            />
            <CustomInputs
              value={newPasswordReEnter}
              setValue={(text) => handleChangeReEnter(text)}
              label={t("Screen_ResetPassword_PlaceHolder_CreateNewPassword")}
              secureTextEntry={reEnterNewPasswordIsSecureEntry}
              icon={reEnterNewPasswordIsSecureEntry ? "eye" : "eye-off"}
              onpress={() => setReEnterNewPasswordIsSecureEntry(!reEnterNewPasswordIsSecureEntry)}
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
