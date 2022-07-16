//import liraries
import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, Image, ScrollView, Dimensions, Alert } from 'react-native';
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
import { useTranslation } from "react-i18next";
import ModalContact from '../../components/addcontact/ModelContact';
import LoadingDialog from '../../components/customDialog/dialog/loadingDialog/LoadingDialog';
// create a component

const contextDuplicate = {
    title: "Thông báo",
    message: "Liên hệ đã tồn tại bạn có muốn chỉnh sửa",
    cancel: "Không",
    submit: "Sửa",
  }

const UpdateContact = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();
    const formRef = useRef();
    const [value, setValue] = useState({
        name: '',
        job_title: '',
        company: '',
        phone: '',
        email: '',
        fax: '',
        address: '',
        note: '',
        website: '',
        img_url: '',
    });
    useEffect(() => {
        route.params && route.params.idContact && formRef.current && FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
        if (route.params && route.params.contact && formRef.current) {
            formRef.current.setValues(route.params.contact)
            setLoading(true)
        }
    }, [route.params])

    const [duplicate, setDuplicate] = useState(false);

    const [duplicateOther, setDuplicateOther] = useState(false);
    const [duplicateInfo, setDuplicateInfo] = useState({
        id: "",
        id_duplicate: "",
        owner: "",
    });

    const contextDuplicateOther = {
        title: "Thông báo",
        message: `Bản ghi đã tồn tại và có owner là ${duplicateInfo.owner}, bản ghi này sẽ vẫn được lưu lại nhưng bạn ko phải owner. bạn có muốn yêu cầu được cấp quyền owner cho contact này ko?`,
        cancel: "Không",
        submit: "Đồng ý",
      }

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
            name: 'note',
            title: t("Screen_UpdateContact_Input_Title_Note"),
            placeholder: t("Screen_UpdateContact_Input_PlaceHolder_Note"),
            icon: "text-box"
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


    const handleOnSubmit = (values) => {
        setIsLoading(true)
        route.params && route.params.idContact && FetchApi(`${ContactAPI.UpdateContact}/${route.params.idContact}`, Method.PUT, ContentType.JSON, values, getMessage)
        route.params && route.params.contact && FetchApi(ContactAPI.AddContact, Method.POST, ContentType.JSON, values, getMessage);
    }

    const getMessage = (data) => {
        console.log(data)
        setIsLoading(false)
        if (data.message === "C0009") {
            navigation.dispatch(StackActions.popToTop());
            route.params && route.params.contact && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: data.data.id } })
        }
        if (data.message === "C0010") {
            navigation.dispatch(StackActions.popToTop());
            route.params && route.params.idContact && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: route.params.idContact } })
        }
        if (data.message === "D0001") {
            setDuplicate(true)
            setDuplicateInfo({...duplicateInfo, id: data.data.id})
        }
        if (data.message === "D0003") {
            setDuplicateOther(true)
            setDuplicateInfo({
                id: data.data.id,
                id_duplicate: data.data.id_duplicate,
                owner: data.data.user_name,
            })
        }
        if(data.message === "D0005"){
            Alert.alert('Thông báo', 'Email đã tồn tại', [{ text: 'OK' }])
        }
    }

    const handleDuplicateOther = () => {
        FetchApi(`${ContactAPI.RequestTransferContact}/${duplicateInfo.id}/${duplicateInfo.id_duplicate}`, Method.GET, ContentType.JSON, undefined, getMessageDuplaicate)
    }

    const getMessageDuplaicate = (data) => {
        setDuplicateOther(false)
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate("HomeSwap", {
            screen: "ViewContact",
            params: { idContact: duplicateInfo.id_duplicate },
          });
    }

    const handleDuplicate = () => {
        console.log(duplicateInfo)
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate("HomeSwap", {
          screen: "UpdateContact",
          params: { idContact: duplicateInfo.id },
        });
      }

    const handleOnCancel = () => {
        setDuplicateOther(false)
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate("HomeSwap", {
            screen: "ViewContact",
            params: { idContact: duplicateInfo.id_duplicate },
          });
    }

    return (
        <Provider style={styles.container}>
            <LoadingDialog onVisible={isLoading} />
            <ModalContact visible={duplicate} onPress={handleDuplicate} onPressVisable={() => setDuplicate(false)} context={contextDuplicate} onCancel={() => setDuplicate(false)}/>
            <ModalContact visible={duplicateOther} onPress={handleDuplicateOther} onPressVisable={() => setDuplicateOther(false)} context={contextDuplicateOther} onCancel={handleOnCancel}/>
            <View style={{ alignItems: 'center' }}>
                <ShimmerPlaceholder visible={loading} width={windowWidth * 0.9} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10, }}>
                    <View style={styles.imgContact}>
                        {route.params && formRef.current && <Image source={{ uri: formRef.current.values.img_url }} style={styles.image} />}
                    </View>
                </ShimmerPlaceholder>
            </View>

            <Formik
                initialValues={value}
                onSubmit={handleOnSubmit}
                validationSchema={AddContactSchema}
                innerRef={formRef}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
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
                                                        <Icon size={20} name={item.icon} color="#1890FF" />
                                                        <View style={{ width: '100%', marginLeft: 10 }}>
                                                            <Text style={{ fontWeight: '600', color: '#1890FF' }}>{item.title}</Text>
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
                                                            {errors[item.name] && touched[item.name] ? (
                                                                <View style={styles.formInput_item_error}>
                                                                    <Text style={styles.formInput_item_error_label}>{errors[item.name]}</Text>
                                                                </View>
                                                            ) : null}
                                                        </View>
                                                    </View>
                                                </ShimmerPlaceholder>
                                            </View>
                                        </View>
                                    )
                                })}
                                <View style={{ marginBottom: 15 }} />
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
export default UpdateContact;