//import liraries
import React, { useContext } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import AuthContext from '../../store/AuthContext';
import styles from './styles'
import { useTranslation } from "react-i18next";
import { StackActions } from '@react-navigation/native';
// create a component
const Setting = ({ navigation }) => {
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation();

    //i18n.changeLanguage("en")
    const onChangePasswordPressed = () => {
        navigation.navigate('ChangePassword')
    }
    const onLogoutPressed = () => {
        authCtx.onLogout();
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t("Screen_Setting_Button_Title")}</Text>
            <TouchableOpacity style={[styles.button, styles.mb20]} onPress={onChangePasswordPressed}>
                <Text style={styles.label}>{t("Screen_Setting_Button_ChangePassword")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogoutPressed}>
                <Text style={styles.label}>{t("Screen_Setting_Button_Logout")}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// define your styles


//make this component available to the app
export default Setting;
