//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';
import i18next from "../../language/i18n"; 
import { useTranslation } from "react-i18next";
import AuthContext from '../../store/AuthContext';
// create a component
const Team = () => {
    const [text, setText] = useState('')
    const [textGroup, setTextGroup] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation();   
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container_sectionStyle}>
            <Image source={iconPath.icSearch} style={styles.container_sectionStyle_icSearch} />
            <TextInput
                style={styles.input}
                placeholder="Tìm kiếm nhóm"
                value={text}
                onChangeText={(value) => setText(value)}
            />
            <TouchableOpacity>
                <Image source={iconPath.icClose} style={styles.container_sectionStyle_icClose} />
            </TouchableOpacity>
        </View>
        <View style={styles.container_title}>
            <Text style={styles.container_title_label}>Nhóm của tôi</Text>
        </View>
</SafeAreaView>
    );
};

export default Team;
