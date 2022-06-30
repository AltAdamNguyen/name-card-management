//import liraries
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { Appbar, Button, IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FetchApi } from '../../service/api/FetchAPI';

import ModalStatus from '../../components/viewcontact/modal/ModalStatus';
import ModalFlag from '../../components/viewcontact/modal/ModalFlag';
import { FormatDate } from '../../validate/FormatDate';
import OpenURLButton from '../../components/viewcontact/OpenUrl';

import styles from './styles';
import BottomSheetContact from '../../components/viewcontact/bottomsheet/BottomSheetContact';

// create a component
const listFlag = {
    F0001: {
        name: 'very-important',
        title: 'Rất quan trọng',
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 'F0001',
    },
    F0002: {
        name: 'important',
        title: 'Quan trọng',
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 'F0002',
    },
    F0003: {
        name: 'not-important',
        title: 'Không quan trọng',
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 'F0003',
    },
    F0004: {
        name: 'dont-care',
        title: 'Không quan tâm',
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 'F0004',
    },
    none: {
        name: 'none',
        title: 'Xoá lựa chọn',
        color: '#000000',
        background: 'transparent',
        value: 'null',
    }
}

const listStatus = {
    S0001: {
        name: 'failed',
        color: '#EB5757',
        title: 'Thất bại',
        value: 'S0001',
    },
    S0002: {
        name: 'ongoing',
        color: '#F2994A',
        title: 'Đang tiến hành',
        value: 'S0002',
    },
    S0003: {
        name: 'success',
        color: '#00C853',
        title: 'Hoàn thành',
        value: 'S0003',
    }
}
const ViewContact = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [modalStatusVisible, setModalStatusVisible] = useState(false);
    const [flag, setFlag] = useState();
    const [contact, setContact] = useState();
    const [status, setStatus] = useState();
    const isFocused = useIsFocused()

    const onSubmitStatus = (values) => {
        setStatus(values)
        FetchApi(`${ContactAPI.SetStatus}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, values, getFlag)
        setModalStatusVisible(!modalStatusVisible)

    }

    const handlePressButtonFlag = (item) => {
        FetchApi(`${ContactAPI.SetFlag}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, { flag: item.value }, getFlag)
        setModalVisible(!modalVisible);
        setFlag(item);
    }

    const getFlag = (data) => {
        console.log(data)
    }
    useEffect(() => {
        console.log(route.params.idContact)
        FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
    }, [])

    useEffect(() => {
        isFocused && setModalFloatVisible(false)
    }, [isFocused]);

    useEffect(() => {
        if (contact) {
            setFlag(listFlag[contact.flag])
            setStatus({
                status: contact.status,
                reason_status: contact.reason_status
            })
        }

    }, [contact])

    const getContact = (data) => {
        console.log(data)
        setContact(data.data)
    }

    const handlePressUpdateContact = () => {
        navigation.navigate('UpdateContact', { 'idContact': route.params.idContact })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header theme={{ colors: { primary: "transparent" } }} statusBarHeight={1}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                {/* <Appbar.Content title="Thông tin liên hệ" />
                <Appbar.Action icon={Platform.OS === 'android' ? "dots-vertical" : "dots-horizontal"} onPress={() => setModalFloatVisible(true)} /> */}
            </Appbar.Header>
            <View style={[styles.body, modalFloatVisible ? styles.containerOverlay : null, modalVisible ? styles.containerOverlay : null, modalStatusVisible ? styles.containerOverlay : null]}>
                <View style={styles.body_imgContact}>
                    {contact !== undefined && <Image source={{ uri: contact.img_url }} style={styles.body_imgContact_image} />}
                </View>
                {contact !== undefined &&
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.info}>
                            <View style={styles.info_title}>
                                <Text style={styles.info_title_name}>{contact.name}</Text>
                                {Boolean(contact.job_title) ? <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>Chức vụ </Text>{contact.job_title}</Text> : <Text>Không có chức danh</Text>}
                                <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>Công ty </Text>{contact.company}</Text>
                            </View>
                            {/* <View style={styles.info_flag}>
                                <ModalFlag listItem={Object.values(listFlag)} visible={modalVisible} onPress={handlePressButtonFlag} onPressVisable={() => setModalVisible(false)} />
                                <Button
                                    icon="chevron-down"
                                    mode='outlined'
                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                    onPress={() => setModalVisible(true)}
                                    style={[styles.info_flag_button, { backgroundColor: flag === undefined ? 'transparent' : flag.background }]}
                                    color={flag === undefined ? '#000000' : flag.color}
                                >
                                    <Text style={{ color: flag === undefined ? '#000000' : flag.color, fontWeight: 'bold' }}>{flag === undefined ? 'Phân loại' : flag.name == 'none' ? 'Phân loại' : flag.title}</Text>
                                </Button>
                            </View> */}
                            <View style={styles.info_component}>
                                {Boolean(contact.phone) &&
                                    <Pressable style={[styles.info_contact_des, styles.borderDes]} >
                                        <View>
                                            <Text style={styles.info_component_des_title}>Di động</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.phone}</Text>
                                        </View>
                                        <IconButton icon="cellphone" size={16} color="#828282" />
                                        {/* <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.phone)} /> */}
                                    </Pressable>
                                }
                                <View style={[styles.info_contact_des, styles.borderDes]}>
                                    <View>
                                        <Text style={styles.info_component_des_title}>Email</Text>
                                        <Text style={styles.info_contact_des_label}>{contact.email}</Text>
                                    </View>
                                    <IconButton icon="email" size={16} color="#828282" />
                                    {/* <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.email)} /> */}
                                </View>
                                {Boolean(contact.fax) &&
                                    <View style={styles.info_contact_des}>
                                        <View>
                                            <Text style={styles.info_component_des_title}>Fax</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.fax}</Text>
                                        </View>
                                        <IconButton icon="fax" size={16} color="#828282" />
                                        {/* <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.fax)} /> */}
                                    </View>
                                }

                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Địa chỉ</Text>
                                <Text style={[styles.info_component_des, { color: contact.address ? "#2D9CDB" : "#828282" }]}>{Boolean(contact.address) ? contact.address : "Không có địa chỉ"}</Text>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Website</Text>
                                {Boolean(contact.website) ? <OpenURLButton url={contact.website} >{contact.website}</OpenURLButton> : <Text style={[styles.info_component_des, { color: "#828282" }]}>Không có website</Text>}
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Nhóm</Text>
                                <View style={styles.info_componetn_content}>
                                    <Icon name="credit-card-multiple-outline" size={24} color="#828282" />
                                    <Text style={[styles.info_component_label, styles.ml10]}>FIS</Text>
                                </View>
                            </View>
                            <View style={styles.info_component}>
                                {status && <ModalStatus listStatus={Object.values(listStatus)} visible={modalStatusVisible} status={status} onPressSubmit={onSubmitStatus} onPressVisable={() => setModalStatusVisible(!modalStatusVisible)} />}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.info_component_title}>Trạng thái:</Text>
                                    {status &&
                                        <Button
                                            color={listStatus[status.status].color}
                                            onPress={() => setModalStatusVisible(true)}
                                        >
                                            {listStatus[status.status].title}
                                        </Button>
                                    }
                                </View>
                                {status && <Text style={styles.info_component_label}>{status.reason_status ? status.reason_status : 'Không có lí do'}</Text>}
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>Ngày khởi tạo</Text>
                                <View style={styles.info_componetn_content}>
                                    <Icon name="calendar-today" size={24} color="#828282" />
                                    <Text style={[styles.info_component_label, styles.ml10]}>{FormatDate(contact.created_at)}</Text>
                                </View>

                            </View>
                        </View>
                    </ScrollView>
                }
                <BottomSheetContact visible={modalFloatVisible} onPressVisible={() => setModalFloatVisible(false)} onPressUpdate={handlePressUpdateContact} />
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.footer_button}>
                    <Icon name="account-multiple-plus-outline" size={24} color="#828282" />
                    <Text style={styles.footer_button_label}>Thêm nhóm</Text>
                </Pressable>
                <Pressable style={styles.footer_button}>
                    <Icon name="account-edit-outline" size={24} color="#828282" />
                    <Text style={styles.footer_button_label}>Sửa</Text>
                </Pressable>
                <Pressable style={styles.footer_button}>
                    <Icon name="account-minus-outline" size={24} color="#828282" />
                    <Text style={styles.footer_button_label}>Vô hiệu hoá</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};


//make this component available to the app
export default ViewContact;
