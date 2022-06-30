//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';
import i18next from "../../language/i18n"; 
import { useTranslation } from "react-i18next";
import AuthContext from '../../store/AuthContext';
// create a component
const GroupContact = () => {
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
                        placeholder={t("Screen_GroupContact_Placeholder_Search")}
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <TouchableOpacity>
                        <Image source={iconPath.icClose} style={styles.container_sectionStyle_icClose} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_title}>
                    <Text style={styles.container_title_label}>{t("Screen_GroupContact_Text_Container_Label_Title")}</Text>
                </View>
                <View style={styles.container_listGroup}>
                    <ScrollView>
                        <TouchableOpacity>
                            <View style={styles.container_listGroup_item}>
                                <Text style={styles.container_listGroup_item_label}>Yêu thích (0)</Text>
                                <Image source={iconPath.icRight} />
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalVisible(!modalVisible);
                        }}>
                        <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalVisible(!modalVisible)}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalView}>
                                    <Text>Tên nhóm</Text>
                                    <View>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nhập tên nhóm"
                                            value={textGroup}
                                            onChangeText={(value) => setTextGroup(value)}
                                        />
                                        <TouchableOpacity>
                                            <Image source={iconPath.icClose} style={styles.container_sectionStyle_icClose} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                    <TouchableOpacity style={styles.container_footer} onPress={() => setModalVisible(true)}>
                        <Image source={iconPath.icPlus} />
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default GroupContact;
