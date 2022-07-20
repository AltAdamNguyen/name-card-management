//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../inputDialog/styles';
import { Formik } from 'formik';
import StatusSchema from '../../../../validate/ValidateFormStatus';
import { useContext ,useState} from 'react';
import i18next from "../../../../language/i18n";
import AuthContext from "../../../../store/AuthContext";
import { useTranslation } from "react-i18next";
// create a component
const ConfirmDialogg = ({ visible, onPressVisable, value, setValue, onPressSubmit, onPressConfirm, title, label,  rightButtonTitle, leftButtonTitle  }) => {
    const { t, i18n } = useTranslation();
    const authCtx = useContext(AuthContext)
    const [inputVal, setInputVal] = useState(value);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onPressVisable()
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback>
                    <Card elevation={3} style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{title}</Text>
                       
                                    <View style={{ width: '100%' }}>

                                        <View style={styles.info_status_modalItem_button}>
                                            <Button
                                                mode='contained'
                                                color="#F3F3F3"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={() => {onPressVisable()}}
                                            >
                                              {leftButtonTitle}
                                            </Button>
                                            <Button
                                                mode='contained'
                                                color="#1890FF"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={() => {onPressConfirm()} }
                                            >
                                                {rightButtonTitle}
                                            </Button>
                                        </View>

                                    </View>

                        
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};


//make this component available to the app
export default ConfirmDialogg;
