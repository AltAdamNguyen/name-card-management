import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Text,
  Alert,
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

const ChangePassword = ({ navigation }) => {
  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  };
  const { height } = useWindowDimensions();
  const [isSecureEntry, setIsSecureEntry] = useState(true);
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
        "",
        "Password mới và password nhập lại không giống nhau, hãy nhập lại"
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
      Alert.alert("", "New password must be different from old password");
    } else if (data.message == "U0007") {
      Alert.alert("", "Old password is incorrect");
    } else if (data.message == "U0006") {
      Alert.alert(
        "",
        "New password must be at least 8 characters, contain at least 1 uppercase letter, 1 number and 1 speacial character"
      );
    } else if (data.message == "Change password success") {
      navigation.goBack();
    }
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
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
            <Text style={styles.text_PRIMARY}>Đổi mật khẩu</Text>
          </View>
        </View>
        <View style={styles.section}>
          <CustomInputs
            value={currentPassword}
            setValue={(text) => handleChangeCurrentPassword(text)}
            label={"Mật khẩu hiện tại"}
            secureTextEntry={isSecureEntry}
            icon={isSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityPasswordPressed}
          />

          <CustomInputs
            value={newPassword}
            setValue={(text) => handleChangeNewPassword(text)}
            label={"Mật khẩu mới"}
            secureTextEntry={isSecureEntry}
            icon={isSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityPasswordPressed}
          />
          <CustomInputs
            value={reEnterNewPassword}
            setValue={(text) => handleReEnterNewPassword(text)}
            label={"Nhập lại mật khẩu mới"}
            secureTextEntry={isSecureEntry}
            icon={isSecureEntry ? "eye" : "eye-off"}
            onpress={onVisibilityPasswordPressed}
          />
          <View style={styles.bottomButtonContainer}>
            <Button
              style={styles.bottomButtonEnable}
              labelStyle={{ color: "white" }}
              onPress={() => {
                setDialogChangePasswordConfirmVisible(true);
              }}
            >
              Đặt lại mật khẩu
            </Button>
          </View>
        </View>
        <ConfirmDialogg
          visible={dialogChangePasswordConfirmVisible}
          title={"Bạn có chắc chắn muốn thay đổi mật khẩu không?"}
          leftButtonTitle={"Hủy"}
          rightButtonTitle={"Có"}
          onPressVisable={() => {
            setDialogChangePasswordConfirmVisible(false);
          }}
          onPressConfirm={() => {
            setIsLoading(true);
            handleOnPressResetPassword();
          }}
        />
        <LoadingDialog onVisible ={isLoading}/>
      </SafeAreaView>
    </Provider>
  );
};

export default ChangePassword;
