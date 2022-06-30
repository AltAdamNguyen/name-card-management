//import liraries
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Keyboard, Dimensions } from 'react-native';
import { TextInput, Provider, IconButton, Button } from 'react-native-paper';
import { StackActions } from '@react-navigation/native';
import iconPath from '../../constants/iconPath';
import styles from './styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, Method, ContentType } from '../../constants/ListAPI';
import { Formik } from 'formik';
import AddContactSchema from '../../validate/ValidateFormAddContact';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import ModalContact from '../../components/addcontact/ModelContact';
import i18next from "../../language/i18n"; 
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
// create a component



const AddContact = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const formRef = useRef();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const authCtx = useContext(AuthContext)
    const [value, setValue] = useState({
        name: '',
        job_title: '',
        company: '',
        phone: '',
        email: '',
        fax: '',
        address: '',
        website: '',
        img_url: '',
    });
    useEffect(() => {
        if (route.params && formRef.current) {
            FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
        }

    }, [route.params])

    const formInput = [
        {
            name: 'name',
            title: t("Screen_UpdateContact_Input_Title_FullName"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_FullName"),
        },
        {
            name: 'job_title',
            title: t("Screen_UpdateContact_Input_Title_JobTitle"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_JobTitle"),
        },
        {
            name: 'company',
            title: t("Screen_UpdateContact_Input_Title_Company"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Company"),
        },
        {
            name: 'phone',
            title: t("Screen_UpdateContact_Input_Title_PhoneNumber"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_PhoneNumber"),
        },
        {
            name: 'email',
            title: t("Screen_UpdateContact_Input_Title_Email"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Email"),
        },
        {
            name: 'fax',
            title: t("Screen_UpdateContact_Input_Title_Fax"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Fax"),
        },
        {
            name: 'address',
            title: t("Screen_UpdateContact_Input_Title_Address"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Address"),
        },
        {
            name: 'website',
            title: t("Screen_UpdateContact_Input_Title_Website"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Website"),
        }
    ]
    const contextGoBack = {
        title: t("Screen_UpdateContact_ContextGoback_Title"),
        message: t("Screen_UpdateContact_ContextGoback_Message"),
        cancel: t("Screen_UpdateContact_ContextGoback_Cancel"),
        submit: t("Screen_UpdateContact_ContextGoback_Submit"),
    }
    
    const contextOnSubmit = {
        title: t("Screen_UpdateContact_ContextOnSubmit_Title"),
        message: t("Screen_UpdateContact_ContextOnSubmit_Message"),
        cancel: t("Screen_UpdateContact_ContextOnSubmit_Cancel"),
        submit: t("Screen_UpdateContact_ContextOnSubmit_Submit"),
    }

    const getContact = (data) => {
        if(data.data){
            formRef.current.setValues(data.data)
            setValue(data.data)
            setLoading(true)
        }
    }

    const [goBack, setGoBack] = useState(false);
    const [onSubmit, setOnSubmit] = useState(false);

    const handlePressAdd = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    const handleSubmit = (values) => {
        console.log(route.params.idContact)
        FetchApi(`${ContactAPI.UpdateContact}/${route.params.idContact}`, Method.PUT, ContentType.JSON, values, getMessage)
    }

    const getMessage = (data) => {
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate('Home', { screen: 'HomeScreen', params: { visibleModal: true } })
    }


    return (
        <Provider style={styles.container}>
            <ModalContact visible={onSubmit} context={contextOnSubmit} onPress={handlePressAdd} onPressVisable={() => setOnSubmit(false)} />
            <ModalContact visible={goBack} context={contextGoBack} onPress={() => navigation.goBack()} onPressVisable={() => setGoBack(false)} />
            <View style={styles.header}>
                <View style={styles.header_titleButton}>
                    <IconButton icon="arrow-left" size={20} onPress={() => setGoBack(!goBack)}/>
                    <Text style={styles.header_titleButton_label}>{t("Screen_UpdateContact_Button_Header_Title")}</Text>
                </View>

                <View style={styles.header_modal}>
                    <Button color='#1890FF' onPress={() => setOnSubmit(!onSubmit)}>{t("Screen_UpdateContact_Button_Header_Modal")}</Button>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ShimmerPlaceholder visible={loading} width={windowWidth * 0.95} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10, }}>
                    <TouchableOpacity style={styles.imgContact} onPress={() => Keyboard.dismiss()}>
                        {route.params && <Image source={{ uri: value.img_url }} style={styles.image} />}
                    </TouchableOpacity>
                </ShimmerPlaceholder>
            </View>

            <ScrollView>
                <Formik
                    initialValues={value}
                    onSubmit={handleSubmit}
                    validationSchema={AddContactSchema}
                    innerRef={formRef}
                >
                    {({ handleChange, handleBlur, values, errors, touched }) => {
                        console.log(errors)
                        return (
                            <View style={styles.formInput}>
                                {formInput.map((item, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={styles.formInput_item}>
                                                <ShimmerPlaceholder visible={loading} style={{ width: '100%' }} shimmerStyle={{ with: '100%', height: 56, borderRadius: 10 }}>
                                                    <TextInput
                                                        mode='outlined'
                                                        label={item.title}
                                                        placeholder={item.placeholder}
                                                        style={styles.formInput_item_input}
                                                        value={values[item.name]}
                                                        onChangeText={handleChange(item.name)}
                                                        onBlur={handleBlur(item.name)}
                                                        error={errors[item.name] && touched[item.name]}
                                                        theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                                    />
                                                </ShimmerPlaceholder>
                                                {errors[item.name] && touched[item.name] ? (
                                                    <View style={styles.formInput_item_error}>
                                                        <Text style={styles.formInput_item_error_label}>{errors[item.name]}</Text>
                                                    </View>
                                                ) : null}
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    }}
                </Formik>
            </ScrollView>
        </Provider>
    );
};


//make this component available to the app
export default AddContact;
