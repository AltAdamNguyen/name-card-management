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

const ResetPasswordCode = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const { height } = useWindowDimensions();
  const { t, i18n } = useTranslation();
  const { email } = route.params;
  const [isLoading, setIsLoading] = useState(false)

  const onClearCodePressed = () => {
    setCode("");
  };

  const handleChange = (name) => {
    return (text) => {
      setCode(text);
    };
  };

  const onForgotPasswordPressed = () => {
    setIsLoading(true)
    FetchApi(
      UserAPI.ForgetPasswordCode,
      Method.POST,
      ContentType.JSON,
      {
        email: email,
        code: code,
      },
      InputPasswordCodeAPICallback
    );
    
  };

  const InputPasswordCodeAPICallback = (data) => {
    if (data.message == "Internet Error") {
      Alert.alert('',t("Loading_InternetError"))
    }
    else if (data.message == 'User not found or code is incorrect') {
      Alert.alert('',t("Screen_ResetPasswordCode_Alert_IncorrectCode"))
    }
    else {
      navigation.navigate("ResetPassword", {
        email: email,
        code: code,
      });
    }
    setIsLoading(false)
  };

  return (
    <Provider>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

   
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
              {t("Screen_ResetPasswordCode_Label_ResetPassword")}
            </Text>
          </View>
        </View>
        <View style={styles.section}>
        <CustomInputs
          value={code}
          setValue={handleChange("code")}
          icon={"close-circle"}
          label={t("Screen_ResetPasswordCode_PlaceHolder")}
          onpress={onClearCodePressed}
        />
        <CustomButtons
          text={t("Screen_ForgotPassword_Button_ResetPassword")}
          onPress={onForgotPasswordPressed}
        />
        </View>
       
      </SafeAreaView>
      </TouchableWithoutFeedback>
      <LoadingDialog onVisible = {isLoading}/>
    </Provider>
  );
};

export default ResetPasswordCode;
