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
    const authCtx = useContext(AuthContext)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPressVisable}>
                <TouchableWithoutFeedback>
                    <Card elevation={3} style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Khôi phục lại liên hệ</Text>
                        <View style={styles.info_status_modalItem_button}>
                            <Button
                                mode='contained'
                                color="#F3F3F3"
                                style={{ borderRadius: 10, width: '40%' }}
                                onPress={onPressVisable}
                            >
                                {t("ModalStatus_Button_Cancel")}
                            </Button>
                            <Button
                                mode='contained'
                                color="#1890FF"
                                style={{ borderRadius: 10, width: '40%' }}
                                onPress={onPressSubmit}
                            >
                                {t("ModalStatus_Button_Complete")}
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
