//import liraries
import React, { useState, useReducer } from 'react';
import { View, Text, SafeAreaView, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';

import ModalAddContact from '../../components/ModalAddContact/ModalAddContact';
// create a component

const initialTodos = [
    {
        name: 'name',
        visible: false,
    },{
        name: 'jobTitle',
        visible: false,
    }
];

const AddContact = ({ contact, navigation }) => {
    const [value, setValue] = useState({
        name: '',
    });

    const visableReducer = (visible, action) => {
        switch (action.name) {
          case 'name':
            return visible.map(item => {
              if (item.name === action.name) {
                return { ...item, visible: true };
              } else {
                return item;
              }
            });
          case 'jobTitle':
            return visible.map(item => {
                if (item.name === action.name) {
                  return { ...item, visible: true };
                } else {
                  return item;
                }
              });
          default:
            return visible;
        }
      };

    const [modalVisible, setModalVisible] = useReducer(visableReducer, initialTodos);

    const handelerModal = (item, name) => {
        setValue({
            ...value,
            [name]: item
        })
        setModalVisible(!modalVisible);
    }
    const handleChange = (name) => {
        return (text) =>{
            setValue({
                ...value,
                [name]: text
            })
        }
    }

    const handleVisable = (item) => {
        setModalVisible({
            name: item.name,
            visible: !item.visible
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
                    <View style={styles.formInput_item}>
                        <TextInput placeholder='Họ và tên' style={styles.formInput_item_input} value={value.name} onChangeText={handleChange('name')}/>
                        <View>
                            <ModalAddContact listItem={contact.items} title={'Họ và tên'} visible={modalVisible} name={'name'} value={value.name} onPress={handelerModal} onPressVisable={handleVisable}/>
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
