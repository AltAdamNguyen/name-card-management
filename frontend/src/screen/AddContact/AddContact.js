//import liraries
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import { TextInput } from 'react-native-paper';

import iconPath from '../../constants/iconPath';
import styles from './styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { API, Method, ContentType } from '../../constants/ListAPI';
import ModalAddContact from '../../components/addcontact/ModalAddContact';
// create a component


const formInput = [
    {
        name: 'name',
        title: 'Họ và tên (bắt buộc)',
        placeholder: 'Nhập họ và tên',
        required: true
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
        required: true
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

const AddContact = ({ contact, navigation }) => {
    console.log(contact)
    const [value, setValue] = useState({
        name: '',
        job_title: '',
        company: '',
        mobile: contact.mobile,
        email: contact.email,
        fax: contact.fax,
        address: '',
        website: contact.website,
        imgUrl: contact.imgUrl
    });

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
        setValue({
            ...value,
            [name]: item
        })
        setModalVisible({
            ...modalVisible,
            [name]: false
        })
    }
    const handleChange = (name) => {
        return (text) => {
            setValue({
                ...value,
                [name]: text
            })
        }
    }
    const handleVisable = (item) => {
        setModalVisible({
            ...modalVisible,
            [item]: false
        })
    }

    const removeEmpty = (obj) => {
        return obj.length >= 3
    }

    const handlePressAdd = () => {
        FetchApi(API.AddContact, Method.POST, ContentType.JSON, value, getMessage)
    }

    const getMessage = (data) => {
        console.log(data)
        // if(data.message === "Add Successfully"){
        //     return (
        //         <View style={{
        //             flex: 1,
        //             flexDirection: 'column',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             backgroundColor: 'rgba(130, 130, 130,0.5)',
        //         }}>
        //             <Modal style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }}>{data.message}</Text></Modal>
        //         </View>
        //     )
        // }

    }

    console.log(value)
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
            <TouchableOpacity style={styles.imgContact} onPress={() => Keyboard.dismiss()}>
                <Image source={{ uri: contact.imgUrl }} style={styles.image} />
            </TouchableOpacity>
            <ScrollView>
                <View style={styles.formInput}>
                    {formInput.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={styles.formInput_item}>
                                    <TextInput
                                        mode='outlined'
                                        label={item.title}
                                        placeholder={item.placeholder}
                                        style={styles.formInput_item_input}
                                        value={value[item.name]}
                                        onChangeText={handleChange(item.name)}
                                        right={<TextInput.Icon name='chevron-right'
                                            onPress={() =>{ 
                                                setModalVisible({ ...modalVisible, [item.name]: true })
                                                Keyboard.dismiss()
                                            }}
                                            style={{backgroundColor: '#1890FF'}} 
                                            />
                                        }
                                        theme={{ roundness: 10 ,colors: {primary: '#1890FF'} }}
                                    />
                                    <View>
                                        <ModalAddContact listItem={contact.items.filter(removeEmpty)} title={item.title} visible={modalVisible} name={item.name} value={value[item.name]} onPress={handelerModal} onPressVisable={handleVisable} />
                                    </View>
                                </View>
                            </View>
                        )
                    })}

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


//make this component available to the app
export default AddContact;
