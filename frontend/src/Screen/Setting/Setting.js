//import liraries
import React, { useContext, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, Image, StyleSheet, useWindowDimensions } from 'react-native';
import AuthContext from '../../store/AuthContext';
import styles from './styles'
import ChangePassword from '../ChangePassword/ChangePassword';
// create a component
const Setting = ({navigation}) => {
    const authCtx = useContext(AuthContext);
    const onChangePasswordPressed = () => {
        navigation.navigate('ChangePassword')
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cài đặt</Text>
            <TouchableOpacity style={[styles.button,styles.mb20]} onPress={onChangePasswordPressed}>
                <Text style={styles.label}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={authCtx.onLogout}>
                <Text style={styles.label}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

// define your styles


//make this component available to the app
export default Setting;
