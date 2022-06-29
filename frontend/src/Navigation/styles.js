import React from 'react';
import { StyleSheet } from 'react-native';

const styles = (focused) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        tintColor: focused ? '#1890FF' : '#828282'
    },
    label: {
        fontSize: 12,
        color: focused ? '#1890FF' : '#828282',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    containerScan: {
        width: '75%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1890FF',
        borderRadius: 1000,
    },
    labelScan: {
        fontSize: 12,
        color: '#ffff',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

export default styles;