//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button, Card } from 'react-native-paper';
import styles from '../../screen/ViewContact/styles';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { useTranslation } from "react-i18next";
// create a component
const ModalActivate = ({ visible, onPressVisable, onPressSubmit }) => {
    const { t, i18n } = useTranslation();
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onPressVisable()
            }}
        >
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPressVisable}>
                <TouchableWithoutFeedback>
                    <Card elevation={3} style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{t("ModalActive_Title")}</Text>
                        <View style={styles.info_status_modalItem_button}>
                            <Button
                                mode='contained'
                                color="#F3F3F3"
                                style={{ borderRadius: 10, width: '40%' }}
                                onPress={onPressVisable}
                                uppercase={false}
                            >
                                {t("ModalActive_Label_Cancel")}
                            </Button>
                            <Button
                                mode='contained'
                                color="#1890FF"
                                style={{ borderRadius: 10, width: '40%' }}
                                onPress={onPressSubmit}
                                uppercase={false}
                            >
                                {t("ModalActive_Label_Confirm")}
                            </Button>
                        </View>
                    </Card>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};


//make this component available to the app
export default ModalActivate;
