import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useContext, useState } from "react";
import CustomInputs from "../../components/CustomInputs";
import Logo_ForgotPassword from "../../asset/image/forgotPassword.png";
import styles from "./styles";
import i18next from "../../language/i18n";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { Appbar, Button, Provider } from "react-native-paper";
import ConfirmDialogg from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import { FetchApi } from "../../service/api/FetchAPI";
import { UserAPI, ContentType, Method } from "../../constants/ListAPI";
import LoadingDialog from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { t } from "i18next";

const ChangePassword = ({ navigation }) => {
  const onVisibilityCurrentPasswordPressed = () => {
    setCurretPasswordIsSecureEntry((prev) => !prev);
  };

  const onVisibilityNewPasswordPressed = () => {
    setNewPasswordIsSecureEntry((prev) => !prev);
  };

  const onVisibilityReEnterPasswordPressed = () => {
    setReEnterNewPasswordIsSecureEntry((prev) => !prev);
  };
  const { height } = useWindowDimensions();
  const [curretPasswordIsSecureEntry, setCurretPasswordIsSecureEntry] = useState(true);
  const [newPasswordIsSecureEntry, setNewPasswordIsSecureEntry] = useState(true);
  const [reEnterNewPasswordIsSecureEntry, setReEnterNewPasswordIsSecureEntry] = useState(true);
  const [
    dialogChangePasswordConfirmVisible,
    setDialogChangePasswordConfirmVisible,
  ] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reEnterNewPassword, setReEnterNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeCurrentPassword = (currentPassword) => {
    setCurrentPassword(currentPassword);
  };

  const handleChangeNewPassword = (newPassword) => {
    setNewPassword(newPassword);
  };

  const handleReEnterNewPassword = (reEnterNewPassword) => {
    setReEnterNewPassword(reEnterNewPassword);
  };

  const handleOnPressResetPassword = () => {
    if (newPassword !== reEnterNewPassword) {
      Alert.alert(
        t("Screen_ChangePassword_Alert_Warning"),
        t("Screen_ChangePassword_Alert_PasswordAndRePasswordMatch")
      );
      setIsLoading(false);
    } else {
      FetchApi(
        UserAPI.ChangePassword,
        Method.POST,
        ContentType.JSON,
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        changePasswordAPICallBack
      );
    }
    setDialogChangePasswordConfirmVisible(false);
  };

  const changePasswordAPICallBack = (data) => {
    setIsLoading(false);
    if (data.message == "U0005") {
      Alert.alert(t("Screen_ChangePassword_Alert_Warning"), t("Screen_ChangePassword_Alert_U0005"));
    } else if (data.message == "U0007") {
      Alert.alert(t("Screen_ChangePassword_Alert_Warning"), t("Screen_ChangePassword_Alert_U0007"));
    } else if (data.message == "U0006") {
      Alert.alert(
        t("Screen_ChangePassword_Alert_Warning"),
        t("Screen_ChangePassword_Alert_U0006")
      );
    } else if (data.message == "Change password success") {
      navigation.goBack();
    }
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
      <SafeAreaView style={styles.container}>
        <Appbar.Header
          statusBarHeight={1}
          theme={{ colors: { primary: "transparent" } }}
        >
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>

        <View style={styles.section}>
          <View style={styles.text}>
            <Text style={styles.text_PRIMARY}>{t("Screen_ChangePassword_Label")}</Text>
          </View>
          <CustomInputs
            value={currentPassword}
            setValue={(text) => handleChangeCurrentPassword(text)}
            label={t("Screen_ChangePassword_Input_Title_CurrentPassword")}
            secureTextEntry={curretPasswordIsSecureEntry}
            icon={curretPasswordIsSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityCurrentPasswordPressed}
          />

          <CustomInputs
            value={newPassword}
            setValue={(text) => handleChangeNewPassword(text)}
            label={t("Screen_ChangePassword_Input_Title_NewPassword")}
            secureTextEntry={newPasswordIsSecureEntry}
            icon={newPasswordIsSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityNewPasswordPressed}
          />
          <CustomInputs
            value={reEnterNewPassword}
            setValue={(text) => handleReEnterNewPassword(text)}
            label={t("Screen_ChangePassword_Input_Title_ReEnterNewPassword")}
            secureTextEntry={reEnterNewPasswordIsSecureEntry}
            icon={reEnterNewPasswordIsSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityReEnterPasswordPressed}
          />
          <View style={styles.bottomButtonContainer}>
            <Button
              style={styles.bottomButtonEnable}
              labelStyle={{ color: "white" }}
              onPress={() => {
                setDialogChangePasswordConfirmVisible(true);
              }}
            >
             {t("Screen_ChangePassword_Button_Label")}
            </Button>
          </View>
        </View>
        <ConfirmDialogg
          visible={dialogChangePasswordConfirmVisible}
          title={t("Screen_ChangePassword_ConfirmDialog_Label")}
          leftButtonTitle={t("Screen_ChangePassword_ConfirmDialog_LeftButtonTitle")}
          rightButtonTitle={t("Screen_ChangePassword_ConfirmDialog_RightButtonTitle")}
          onPressVisable={() => {
            setDialogChangePasswordConfirmVisible(false);
          }}
          onPressConfirm={() => {
            setIsLoading(true);
            handleOnPressResetPassword();
          }}
        />
        <LoadingDialog onVisible={isLoading} />
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </Provider>
  );
};

export default ChangePassword;
