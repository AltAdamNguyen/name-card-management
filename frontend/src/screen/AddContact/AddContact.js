//import liraries
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';

import iconPath from '../../constants/iconPath';
import styles from './styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { API, Method, ContentType } from '../../constants/ListAPI';
import ModalAddContact from '../../components/addcontact/ModalAddContact';
import { Formik } from 'formik';
import AddContactSchema from '../../validate/ValidateFormAddContact';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
// create a component


const formInput = [
    {
        name: 'name',
        title: 'Họ và tên (bắt buộc)',
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
        name: 'mobile',
        title: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
    },
    {
        name: 'email',
        title: 'Email (bắt buộc)',
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

const AddContact = ({ contact, loading, navigation }) => {
    console.log(contact)
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const formRef = useRef();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [value, setValue] = useState({
        name: '',
        job_title: '',
        company: '',
        mobile: '',
        email: '',
        fax: '',
        address: '',
        website: '',
        imgUrl: ''
    });
    useEffect(() => {
        if (contact && formRef.current) {
            formRef.current.setValues({
                name: '',
                job_title: '',
                company: '',
                mobile: contact.mobile,
                email: contact.email,
                fax: contact.fax,
                address: '',
                website: contact.website,
                imgUrl: contact.imgUrl
            })
        }

    }, [contact])

    const [modalVisible, setModalVisible] = useState({
        name: false,
        job_title: false,
        company: false,
        mobile: false,
        email: false,
        fax: false,
        address: false,
        website: false
    });

    const handelerModal = (item, name) => {
        if (formRef.current) {
            formRef.current.setValues({
                ...formRef.current.values,
                [name]: item
            })
        }

        setModalVisible({
            ...modalVisible,
            [name]: false
        })

    }

    const handleVisable = (item) => {
        setModalVisible({
            ...modalVisible,
            [item]: false
        })
    }

    const handleGoBack = () => {

    }

    const removeEmpty = (obj) => {
        return obj.length >= 3
    }

    const handlePressAdd = () => {
        if (formRef.current) {
            formRef.current.handleSubmit()
        }
    }

    const handleSubmit = (values) => {

        // FetchApi(API.AddContact, Method.POST, ContentType.JSON, value, getMessage)
    }

    const getMessage = (data) => {
        console.log(data)
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.header_titleButton}>
                        <Image source={iconPath.icArrow_Left} />
                        <Text style={styles.header_titleButton_label}>Thêm liên hệ</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.header_modal}>
                    <TouchableOpacity onPress={handlePressAdd}>
                        <Text style={styles.header_modal_label}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <ShimmerPlaceholder visible={loading} width={windowWidth * 0.95} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10, }}>
                    <TouchableOpacity style={styles.imgContact} onPress={() => Keyboard.dismiss()}>
                        {contact && <Image source={{ uri: contact.imgUrl }} style={styles.image} />}
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
                                                        right={<TextInput.Icon name='chevron-right'
                                                            onPress={() => {
                                                                setModalVisible({ ...modalVisible, [item.name]: true })
                                                                Keyboard.dismiss()
                                                            }}
                                                        />
                                                        }
                                                        theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
                                                    />
                                                </ShimmerPlaceholder>
                                                {errors[item.name] && touched[item.name] ? (
                                                    <View style={styles.formInput_item_error}>
                                                        <Text style={styles.formInput_item_error_label}>{errors[item.name]}</Text>
                                                    </View>
                                                ) : null}
                                                <View>
                                                    {contact && <ModalAddContact listItem={contact.items.filter(removeEmpty)} title={item.title} visible={modalVisible} name={item.name} value={values[item.name]} onPress={handelerModal} onPressVisable={handleVisable} />}
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        )
                    }}
                </Formik>

            </ScrollView>
        </SafeAreaView>
    );
};


//make this component available to the app
export default AddContact;
