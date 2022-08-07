//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback} from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import styles from '../../../screen/ViewContact/styles';
import { Formik } from 'formik';
import StatusSchema from '../../../validate/ValidateFormStatus';
import { t } from "i18next";
// create a component
const ModalDeactivate = ({ visible, onPressVisable, reason, onPressSubmit }) => {
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
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> {t( "ModalDeactivate_Title")}</Text>
                        <Formik
                            initialValues={reason}
                            onSubmit={onPressSubmit}
                            validationSchema={StatusSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                                return (
                                    <View style={{ width: '100%' }}>
                                        <TextInput
                                            mode="outlined"
                                            label={t("ModalDeactivate_Input_Title")}
                                            placeholder={t("ModalDeactivate_Input_Placeholder")}
                                            value={values.reason}
                                            onChangeText={handleChange('reason')}
                                            onBlur={handleBlur('reason')}
                                            style={{ width: '100%' }}
                                            theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                        />
                                        {errors['reason'] && touched['reason'] ? (
                                            <Text style={{ color: '#B22D1D', fontSize: 12, }}>{t(errors['reason'])}</Text>
                                        ) : null}
                                        <View style={styles.info_status_modalItem_button}>
                                            <Button
                                                mode='contained'
                                                color="#F3F3F3"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={onPressVisable}
                                                uppercase={false}
                                            >
                                                {t("ModalDeactivate_Label_Cancel")}
                                            </Button>
                                            <Button
                                                mode='contained'
                                                color="#1890FF"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={handleSubmit}
                                                uppercase={false}
                                            >
                                                {t("ModalDeactivate_Label_Confirm")}
                                            </Button>
                                        </View>

                                    </View>
                                )
                            }}

                        </Formik>

                    </Card>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};


//make this component available to the app
export default ModalDeactivate;
