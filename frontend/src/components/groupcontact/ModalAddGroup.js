//import liraries
import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import styles from '../../components/groupcontact/styles';
import { Formik } from 'formik';
import { useTranslation } from "react-i18next";
import AddGroupSchema from '../../validate/ValidateFormAddGroup';
// create a component
const ModalAddGroup = ({ visible, onPressVisable, value, onPressSubmit }) => {
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableWithoutFeedback>
                    <Card elevation={3} style={styles.info_status_modalView}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', margin: 10 }}>{t("ModalAddGroup_Title")}</Text>
                        <Formik
                            initialValues={value}
                            onSubmit={onPressSubmit}
                            validationSchema={AddGroupSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                                return (
                                    <View style={{ width: '100%' }}>

                                        <TextInput
                                            mode="outlined"
                                            label={t("ModalAddGroup_Input_Title_GroupName")}
                                            placeholder={t("ModalAddGroup_Input_Placeholder_GroupName")}
                                            value={values.group_name}
                                            onChangeText={handleChange('group_name')}
                                            onBlur={handleBlur('group_name')}
                                            style={{ width: '100%', marginBottom: 15 }}
                                            theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                        />
                                        {errors['group_name'] && touched['group_name'] ? (
                                            <Text style={{ color: '#B22D1D', fontSize: 12, }}>{errors['group_name']}</Text>
                                        ) : null}
                                        <View style={styles.info_status_modalItem_button}>
                                            <Button
                                                mode='contained'
                                                color="#F3F3F3"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={onPressVisable}
                                                uppercase={false}
                                            >
                                                {t("ModalAddGroup_Button_Cancel")}
                                            </Button>
                                            <Button
                                                mode='contained'
                                                color="#1890FF"
                                                style={{ borderRadius: 10, width: '40%' }}
                                                onPress={handleSubmit}
                                                uppercase={false}
                                            >
                                                {t("ModalAddGroup_Button_Confirm")}
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
export default ModalAddGroup;
