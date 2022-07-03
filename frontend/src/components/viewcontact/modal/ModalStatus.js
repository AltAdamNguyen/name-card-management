//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../../../screen/ViewContact/styles';
import { Formik } from 'formik';
import StatusSchema from '../../../validate/ValidateFormStatus';
import { useContext } from 'react';
import i18next from "../../../language/i18n";
import AuthContext from "../../../store/AuthContext";
import { useTranslation } from "react-i18next";
// create a component
const ModalStatus = ({ listStatus, visible, onPressVisable, status, onPressSubmit }) => {
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback>
                    <View style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{t("ModalStatus_Text_Label_Status")}</Text>
                        <Formik
                            initialValues={status}
                            onSubmit={onPressSubmit}
                            validationSchema={StatusSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                                return (
                                    <View style={{ width: '100%' }}>

                                        <Picker
                                            selectedValue={values.status}
                                            onValueChange={handleChange('status')}
                                            mode={Platform.OS === 'android' && 'dropdown'}
                                        // style={{Platform.OS === 'android'?{ width: 1, alignItems: 'center' }:null}}
                                        >
                                            {listStatus.map((item, index) => {
                                                return (
                                                    <Picker.Item key={index} label={item.title} value={item.value} />
                                                )
                                            })}
                                        </Picker>


                                        <TextInput
                                            mode="outlined"
                                            label={t("ModalStatus_Label_Reason")}
                                            placeholder={t("ModalStatus_PlaceHolder_Reason")}
                                            value={values.reason_status}
                                            onChangeText={handleChange('reason_status')}
                                            onBlur={handleBlur('reason_status')}
                                            style={{ width: '100%' }}
                                            theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                        />
                                        {errors['reason_status'] && touched['reason_status'] ? (
                                            <Text style={{ color: '#B22D1D', fontSize: 12, }}>{errors['reason_status']}</Text>
                                        ) : null}
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
                                                onPress={handleSubmit}
                                            >
                                                {t("ModalStatus_Button_Complete")}
                                            </Button>
                                        </View>

                                    </View>
                                )
                            }}

                        </Formik>

                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};


//make this component available to the app
export default ModalStatus;
