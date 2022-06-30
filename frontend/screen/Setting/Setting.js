//import liraries
import React, { useContext } from 'react';
import { Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import AuthContext from '../../store/AuthContext';
import styles from './styles'
// create a component
const Setting = ({navigation}) => {
    const authCtx = useContext(AuthContext);
    const onChangePasswordPressed = () => {
        navigation.navigate('ChangePassword')
    }
    const onLogoutPressed = () => {
        navigation.dispatch(StackActions.popToTop());
        authCtx.onLogout();     
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Cài đặt</Text>
            <TouchableOpacity style={[styles.button,styles.mb20]} onPress={onChangePasswordPressed}>
                <Text style={styles.label}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogoutPressed}>
                <Text style={styles.label}>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

// define your styles


//make this component available to the app
export default Setting;
