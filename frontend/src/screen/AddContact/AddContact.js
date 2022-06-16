//import liraries
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';

import ModalAddContact from '../../components/ModalAddContact/ModalAddContact';
// create a component

const formInput = [
    {
        name: 'name',
        title: 'Họ và tên',
    },
    {
        name: 'jobTitle',
        title: 'Chức vụ',
    },
    {
        name: 'company',
        title: 'Công ty',
    },
    {
        name: 'mobile',
        title: 'Số điện thoại di động',
    },
    {
        name: 'email',
        title: 'Email',
    },
    {
        name: 'fax',
        title: 'Fax',
    },
    {
        name: 'address',
        title: 'Địa chỉ',
    },
    {
        name: 'website',
        title: 'Website',
    }
]

const AddContact = ({ contact, navigation }) => {
    const [value, setValue] = useState({
        name: '',
        jobTitle: '',
        company: '',
        mobile: '',
        phone: '',
        email: '',
        fax: '',
        address: '',
        website: ''
    });

    const [modalVisible, setModalVisible] = useState({
        name: false,
        jobTitle: false,
        company: false,
        mobile: false,
        phone: false,
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
                    <TouchableOpacity>
                        <Text style={styles.header_modal_label}>Thêm</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.imgContact}>
                <Image source={{ uri: contact.imgUrl }} style={styles.image} />
            </View>
            <ScrollView>
                <View style={styles.formInput}>
                    {formInput.map((item, index) => {
                        return (
                            <View key={index}>
                                <Text style={styles.formInput_label}>{item.title}</Text>
                                <View style={styles.formInput_item}>
                                    <TextInput placeholder={item.title} style={styles.formInput_item_input} value={value[item.name]} onChangeText={handleChange(item.name)} />
                                    <View>
                                        <ModalAddContact listItem={contact.items} title={item.title} visible={modalVisible} name={item.name} value={value[item.name]} onPress={handelerModal} onPressVisable={handleVisable} />
                                        <TouchableOpacity onPress={() => setModalVisible({ ...modalVisible, [item.name]: true })}>
                                            <Image source={iconPath.icRight} />
                                        </TouchableOpacity>
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
