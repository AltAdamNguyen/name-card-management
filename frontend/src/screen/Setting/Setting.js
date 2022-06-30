//import liraries
import React, { useContext, useState, useEffect} from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import AuthContext from '../../store/AuthContext';
import styles from './styles'
import ChangePassword from '../ChangePassword/ChangePassword';
import i18next from "../../language/i18n"; 
import { useTranslation } from "react-i18next";
// create a component
const Setting = ({navigation}) => {
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation();
     
    //i18n.changeLanguage("en")
    const onChangePasswordPressed = () => {
        navigation.navigate('ChangePassword')
    }
    const onLogoutPressed = () => {
        navigation.dispatch(StackActions.popToTop());
        authCtx.onLogout();     
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{t("Screen_Setting_Button_Title")}</Text>
            <TouchableOpacity style={[styles.button,styles.mb20]} onPress={onChangePasswordPressed}>
                <Text style={styles.label}>{t("Screen_Setting_Button_ChangePassword")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={authCtx.onLogout}>
                <Text style={styles.label}>{t("Screen_Setting_Button_Logout")}</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

// define your styles


//make this component available to the app
export default Setting;
