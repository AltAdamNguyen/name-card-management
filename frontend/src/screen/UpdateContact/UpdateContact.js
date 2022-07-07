//import liraries
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import { TextInput, Provider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackActions } from '@react-navigation/native';
import styles from './styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, Method, ContentType } from '../../constants/ListAPI';
import { Formik } from 'formik';
import AddContactSchema from '../../validate/ValidateFormAddContact';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
// create a component

const AddContact = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const formRef = useRef();
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
        route.params && route.params.idContact && formRef.current && FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
        if(route.params && route.params.contact && formRef.current){
            formRef.current.setValues(route.params.contact)
            setLoading(true)
        }
    }, [route.params])

    const formInput = [
        {
            name: 'name',
            title: t("Screen_UpdateContact_Input_Title_FullName"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_FullName"),
            icon: 'account',
        },
        {
            name: 'job_title',
            title: t("Screen_UpdateContact_Input_Title_JobTitle"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_JobTitle"),
            icon: "briefcase"
        },
        {
            name: 'company',
            title: t("Screen_UpdateContact_Input_Title_Company"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Company"),
            icon: "office-building"
        },
        {
            name: 'phone',
            title: t("Screen_UpdateContact_Input_Title_PhoneNumber"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_PhoneNumber"),
            icon: "cellphone"
        },
        {
            name: 'email',
            title: t("Screen_UpdateContact_Input_Title_Email"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Email"),
            icon: "email"
        },
        {
            name: 'fax',
            title: t("Screen_UpdateContact_Input_Title_Fax"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Fax"),
            icon: "fax"
        },
        {
            name: 'address',
            title: t("Screen_UpdateContact_Input_Title_Address"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Address"),
            icon: "map-marker"
        },
        {
            name: 'website',
            title: t("Screen_UpdateContact_Input_Title_Website"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Website"),
            icon: "web"
        }
    ]

    const getContact = (data) => {
        if (data.data) {
            formRef.current.setValues(data.data)
            setLoading(true)
        }
    }


    const handleSubmit = (values) => {
        route.params && route.params.idContact && FetchApi(`${ContactAPI.UpdateContact}/${route.params.idContact}`, Method.PUT, ContentType.JSON, values, getMessage)
        route.params && route.params.contact && FetchApi(ContactAPI.AddContact,Method.POST,ContentType.JSON,values,getMessage);
    }

    const getMessage = (data) => {
        navigation.dispatch(StackActions.popToTop());
        route.params && route.params.idContact && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: route.params.idContact } })
    }


    return (
        <Provider style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <ShimmerPlaceholder visible={loading} width={windowWidth * 0.9} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10, }}>
                    <View style={styles.imgContact}>
                        {route.params && formRef.current && <Image source={{ uri: formRef.current.values.img_url }} style={styles.image} />}
                    </View>
                </ShimmerPlaceholder>
            </View>

            <Formik
                initialValues={value}
                onSubmit={handleSubmit}
                validationSchema={AddContactSchema}
                innerRef={formRef}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
                    console.log(errors)
                    return (
                        <View style={styles.formInput}>
                            <ScrollView>
                                {formInput.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.formInput_component}>
                                            <View style={styles.formInput_item} >
                                                <ShimmerPlaceholder
                                                    visible={loading}
                                                    style={{ width: '100%' }}
                                                    shimmerStyle={styles.shimmer_FormInput}
                                                >
                                                    <View style={styles.formInput_item_component}>
                                                        <Icon size={20} name={item.icon} color="#1890FF"/>
                                                        <View style={{width: '100%', marginLeft: 10}}>
                                                            <Text style={{fontWeight: '600', color: '#1890FF'}}>{item.title}</Text>
                                                            <TextInput
                                                                placeholder={item.placeholder}
                                                                value={values[item.name]}
                                                                multiline={true}
                                                                dense={true}
                                                                style={styles.formInput_item_input}
                                                                onChangeText={handleChange(item.name)}
                                                                onBlur={handleBlur(item.name)}
                                                                error={errors[item.name] && touched[item.name]}
                                                                theme={{
                                                                    colors: {
                                                                        primary: '#1890FF',
                                                                        error: '#B22D1D',
                                                                    },
                                                                }}
                                                            />
                                                        </View>
                                                    </View>
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
                                <View style={{marginBottom: 15}}/>
                            </ScrollView>                           
                            <View style={styles.footer}>
                                <Button onPress={() => navigation.goBack()} style={styles.footer_button_label} color="#1890FF">Thoát</Button>
                                <Button style={styles.footer_button_label} color="#1890FF" onPress={handleSubmit}>Lưu</Button>
                            </View>
                        </View>
                    )
                }}
            </Formik>

        </Provider>
    );
};


//make this component available to the app
export default AddContact;