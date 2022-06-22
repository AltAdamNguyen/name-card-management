//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import iconPath from '../../constants/iconPath';
import imgPath from '../../constants/imgPath';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FetchApi } from '../../service/api/FetchAPI';

import styles from './styles';

// create a component
const listFlag = [
    {
        name: 'very-important',
        title: 'Rất quan trọng',
        icon: iconPath.icBookMark,
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 1
    },
    {
        name: 'important',
        title: 'Quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 2
    },
    {
        name: 'not important',
        title: 'Không quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 3
    },
    {
        name: 'dont-care',
        title: 'Không quan tâm',
        icon: iconPath.icBookMark,
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 4
    },
]


const ViewContact = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState();
    const [contact, setContact] = useState();

    const handlePressButtonFlag = (item) => {
        setModalVisible(!modalVisible);
        setFlag(item);
    }

    useEffect(() => {
        FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
    }, [])

    const getContact = (data) => {
        setContact(data.data)
    }

    console.log(contact)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={iconPath.icArrow_Left} />
                </TouchableOpacity>
                <View>
                    {/* <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalFloatVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalFloatVisible(!modalFloatVisible);
                        }}>
                        <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalVisible(!modalVisible)}>
                            <TouchableWithoutFeedback>
                                <View style={styles.header_modalView}>
                                    <TouchableOpacity
                                        style={styles.header_modalItem}
                                        key={index}
                                    >
                                        <Image source={item.icon} style={[{ tintColor: item.color }, styles.header_modalIcon]} />
                                        <Text style={styles.header_modalText}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal> */}
                    <TouchableOpacity>
                        <Image source={iconPath.icDot} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.body}>
                <View style={styles.body_imgContact}>
                    {contact !== undefined && <Image source={{ uri: contact.img_url }} style={styles.body_imgContact_image} />}
                </View>
                {contact !== undefined &&
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.info}>
                            <View style={styles.info_title}>
                                <Text style={styles.info_title_name}>{contact.name}</Text>
                                <Text>{contact.job_title}</Text>
                                <Text>{contact.company}</Text>
                            </View>
                            <View style={styles.info_flag}>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                        setModalVisible(!modalVisible);
                                    }}>
                                    <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalVisible(!modalVisible)}>
                                        <TouchableWithoutFeedback>
                                            <View style={styles.info_flag_modalView}>
                                                {listFlag.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity
                                                            style={styles.info_flag_modalItem}
                                                            onPress={() => handlePressButtonFlag(item)}
                                                            key={index}
                                                        >
                                                            <Image source={item.icon} style={[{ tintColor: item.color }, styles.info_flag_modalIcon]} />
                                                            <Text style={styles.info_flag_modalText}>{item.title}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </TouchableOpacity>
                                </Modal>
                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                    <View style={styles.info_flag_button}>
                                        <Text>Phân loại</Text>
                                        <Image source={iconPath.icDown} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.info_component}>
                                <View style={[styles.info_contact_des, styles.mb10]}>
                                    <Image source={iconPath.icMobile} />
                                    <Text style={styles.info_contact_des_label}>{contact.phone}</Text>
                                </View>
                                <View style={[styles.info_contact_des, styles.mb10]}>
                                    <Image source={iconPath.icMail} />
                                    <Text style={styles.info_contact_des_label}>{contact.email}</Text>
                                </View>
                                {contact.fax !== undefined &&
                                    <View style={styles.info_contact_des}>
                                        <Image source={iconPath.icPrinter} />
                                        <Text style={styles.info_contact_des_label}>{contact.fax}</Text>
                                    </View>
                                }
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Địa chỉ</Text>
                                <Text style={styles.info_component_des}>{contact.address}</Text>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Website</Text>
                                <Text style={styles.info_component_des}>{contact.website}</Text>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Nhóm</Text>
                                <View style={styles.info_componetn_content}>
                                    <Image source={iconPath.icGroup} />
                                    <Text style={[styles.info_component_label, styles.ml10]}>FIS</Text>
                                </View>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Trạng thái: <Text style={{ color: '#F2C94C' }}>Đang chờ</Text></Text>
                                <Text style={styles.info_component_label}>lý do</Text>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Ngày khởi tạo</Text>
                                <Text style={styles.info_component_label}>{contact.created_at}</Text>
                            </View>
                        </View>
                    </ScrollView>
                }
            </View>

        </SafeAreaView>
    );
};


//make this component available to the app
export default ViewContact;
