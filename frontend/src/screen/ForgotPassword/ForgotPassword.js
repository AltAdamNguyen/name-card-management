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
import { FetchApi } from "../../service/api/FetchAPI";
import { UserAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";

const ForgotPassword = ({ navigation }) => {
  const [user, setUser] = useState({
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { height } = useWindowDimensions();
  const { t, i18n } = useTranslation();

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

  const onForgotPasswordPressed = () => {
    setIsLoading(true);
    FetchApi(
      UserAPI.ForgetPasswordEmail,
      Method.POST,
      ContentType.JSON,
      {
        email: user.email,
      },
      ForgotPasswordAPICallback
    );
  };

  const ForgotPasswordAPICallback = (status, data) => {
    setIsLoading(false);
    if(!status) {
      if(data){
        if (data.message == "U0004") {
          Alert.alert("", t("Screen_ForgotPassword_Alert_EmailEmpty"));
          return
        }
        if (data.message == "C0018") {
          Alert.alert("", t("Screen_ForgotPassword_Alert_UserNotFound"));
          return
        }
      }
      if(!data){
        Alert.alert("", t("Something_Wrong"))
        return
      }
    }
    if (status && data) {
        navigation.navigate("ResetPasswordCode", {
          email: user.email,
        });
    }
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.root}>
          <Appbar.Header
            style={{}}
            statusBarHeight={1}
            theme={{ colors: { primary: "transparent" } }}
          >
            <Appbar.BackAction onPress={() => navigation.goBack()} />
          </Appbar.Header>
          <View style={styles.headline}>
            <Image
              source={Logo_ForgotPassword}
              style={[styles.logo]}
              resizeMode="contain"
            />
            <View style={styles.text}>
              <Text style={styles.text_PRIMARY}>
                {t("Screen_ForgotPassword_Label_ResetPassword")}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <CustomInputs
              value={user.email}
              setValue={handleChange("email")}
              icon={"close-circle"}
              label={"Email"}
              onpress={onClearEmailPressed}
              type={"email-address"}
            />
            <CustomButtons
              text={t("Screen_ForgotPassword_Button_ResetPassword")}
              onPress={onForgotPasswordPressed}
            />
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
      <LoadingDialog onVisible={isLoading} />
    </Provider>
  );
};

export default ForgotPassword;
