//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import styles from '../../screen/ViewContact/styles';
import { useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { useTranslation } from "react-i18next";
import { Formik } from 'formik';
import TransferSchema from '../../validate/ValidateFormTransfer';
// create a component
const ModalTransfer = ({ visible, onPressVisable, onPressSubmit }) => {
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
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Chuyển tới</Text>
                        <Text>Chuyển đổi người sở hữu liên lạc sẽ làm bạn mất quyền truy cập liên lạc đó</Text>
                        <Formik
                            initialValues={{email: ''}}
                            onSubmit={onPressSubmit}
                            validationSchema={TransferSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                                return (
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            mode="outlined"
                                            label='Người nhận'
                                            placeholder='Nhập email người nhận'
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: '100%' }}
                                            theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                        />
                                        {errors['email'] && touched['email'] ? (
                                            <Text style={{ color: '#B22D1D', fontSize: 12, }}>{errors['email']}</Text>
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
                    </Card>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};


//make this component available to the app
export default ModalTransfer;
