//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';
import styles from '../../screen/ViewContact/styles';
import { Formik } from 'formik';
import TransferSchema from '../../validate/ValidateFormTransfer';
import { t } from "i18next";
// create a component
const ModalTransfer = ({ visible, onPressVisable, onPressSubmit }) => {
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
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{t("ModalTransfer_Title")}</Text>
                        <Text>{t("ModalTransfer_Message_Transfer")}</Text>
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
                                            label={t("ModalTransfer_Input_Title_Receiver")}
                                            placeholder={t("ModalTransfer_Input_Placeholder_Receiver")}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            style={{ width: '100%' }}
                                            theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                        />
                                        {errors['email'] && touched['email'] ? (
                                            <Text style={{ color: '#B22D1D', fontSize: 12, }}>{t(errors['email'])}</Text>
                                        ) : null}
                                        <View style={styles.info_status_modalItem_button}>
                                            <Button
                                                mode='contained'
                                                color="#F3F3F3"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={onPressVisable}
                                                uppercase={false}
                                            >
                                                {t("ModalTransfer_Button_Cancel")}
                                            </Button>
                                            <Button
                                                mode='contained'
                                                color="#1890FF"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={handleSubmit}
                                                uppercase={false}
                                            >
                                                {t("ModalTransfer_Button_Confirm")}
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
