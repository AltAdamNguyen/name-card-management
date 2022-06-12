//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

// create a component
const Setting = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.label}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity >
                <Text>Đăng xuất</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    button: {
        width: '40%',
        borderRadius: 10,
        backgroundColor: '#1890FF'
    }
});

//make this component available to the app
export default Setting;
