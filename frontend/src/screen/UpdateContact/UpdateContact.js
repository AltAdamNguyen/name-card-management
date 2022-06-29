//import liraries
import React, { useState, useRef, useEffect } from 'react';
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
// create a component


const formInput = [
    {
        name: 'name',
        title: 'Họ và tên',
        placeholder: 'Nhập họ và tên',
    },
    {
        name: 'job_title',
        title: 'Chức vụ',
        placeholder: 'Nhập chức vụ',
    },
    {
        name: 'company',
        title: 'Công ty',
        placeholder: 'Nhập công ty',
    },
    {
        name: 'phone',
        title: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
    },
    {
        name: 'email',
        title: 'Email',
        placeholder: 'Nhập email',
    },
    {
        name: 'fax',
        title: 'Fax',
        placeholder: 'Nhập fax',
    },
    {
        name: 'address',
        title: 'Địa chỉ',
        placeholder: 'Nhập địa chỉ',
    },
    {
        name: 'website',
        title: 'Website',
        placeholder: 'Nhập website',
    }
]
const contextGoBack = {
    title: 'Xác nhận',
    message: 'Ban có chắc chắn muốn thoát không?',
    cancel: 'Hủy',
    submit: 'Đồng ý',
}

const contextOnSubmit = {
    title: 'Chỉnh sửa liên hệ',
    message: 'Bạn có muốn lưu thay đổi không?',
    cancel: 'Hủy',
    submit: 'Lưu',
}
const AddContact = ({ route, navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const formRef = useRef();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);
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
                    <Text style={styles.header_titleButton_label}>Chỉnh sửa liên hệ</Text>
                </View>

                <View style={styles.header_modal}>
                    <Button color='#1890FF' onPress={() => setOnSubmit(!onSubmit)}>Sửa</Button>
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
