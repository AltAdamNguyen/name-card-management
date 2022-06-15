//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';

import ModalAddContact from '../../components/ModalAddContact/ModalAddContact';
// create a component
const AddContact = ({ contact, navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState({});
    const handelerModal = (item) => {
        setValue(item)
        setModalVisible(!modalVisible);
    }
    const handleChange = (event) => {
        console.log(event.targeet)
        // setValue({ ...value, [event.target.name]: event.target.value });
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
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Họ và tên' style={styles.formInput_item_input} value={value} onChangeText={setValue}/>
                        <View>
                            <ModalAddContact listItem={contact.items} title={'Họ và tên'} visible={modalVisible} value={value} onPress={handelerModal} onPressVisable={() => setModalVisible(!modalVisible)}/>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={iconPath.icRight} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Chức danh' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Công ty' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Số điện thoại di động' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Số điện thoại bàn' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Email' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Địa chỉ' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Website' style={styles.formInput_item_input} />
                        <Image source={iconPath.icRight} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


//make this component available to the app
export default AddContact;
