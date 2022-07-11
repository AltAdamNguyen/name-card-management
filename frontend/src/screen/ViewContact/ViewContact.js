//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable, Linking, Platform } from 'react-native';
import { Appbar, IconButton, TouchableRipple } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FetchApi } from '../../service/api/FetchAPI';
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";

import ModalStatus from '../../components/viewcontact/modal/ModalStatus';
import ModalFlag from '../../components/viewcontact/modal/ModalFlag';
import ModalDeactivate from '../../components/viewcontact/modal/ModalDeactivate';
import { FormatDate } from '../../validate/FormatDate';
import SnackbarComponent from '../../components/viewcontact/Snackbar';

import styles from './styles';

// create a component



const ViewContact = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalStatusVisible, setModalStatusVisible] = useState(false);
    const [snackVisible, setSnackVisible] = useState(false);
    const [modalDeactivateVisible, setModalDeactivateVisible] = useState(false);

    const isFocused = useIsFocused()
    const [flag, setFlag] = useState();
    const [contact, setContact] = useState();
    const [status, setStatus] = useState();
    const [deactive, setDeactive] = useState({
        reason: '',
    });
    const { t, i18n } = useTranslation();
    const authCtx = useContext(AuthContext)

    const listFlag = {
        F0001: {
            name: 'very-important',
            title: t("Screen_ViewContact_Button_Flag_VeryImportant"),
            color: '#EB5757',
            background: 'rgba(235, 87, 87, 0.2)',
            value: 'F0001',
        },
        F0002: {
            name: 'important',
            title: t("Screen_ViewContact_Button_Flag_Important"),
            color: '#F2994A',
            background: 'rgba(242, 153, 74, 0.2)',
            value: 'F0002',
        },
        F0003: {
            name: 'not-important',
            title: t("Screen_ViewContact_Button_Flag_NotImportant"),
            color: '#F2C94C',
            background: 'rgba(242, 201, 76, 0.2)',
            value: 'F0003',
        },
        F0004: {
            name: 'dont-care',
            title: t("Screen_ViewContact_Button_Flag_DoNotCare"),
            color: '#2D9CDB',
            background: 'rgba(45, 156, 219, 0.2)',
            value: 'F0004',
        },
        none: {
            name: 'none',
            title: t("Screen_ViewContact_Button_Flag_DeleteSelection"),
            color: '#000000',
            background: 'transparent',
            value: 'null',
        }
    }

    const listStatus = {
        S0001: {
            name: 'failed',
            color: '#EB5757',
            title: t("Screen_ViewContact_Button_Status_Failed"),
            icon: 'close-circle',
            value: 'S0001',
        },
        S0002: {
            name: 'ongoing',
            color: '#F2994A',
            title: t("Screen_ViewContact_Button_Status_OnGoing"),
            icon: 'clock',
            value: 'S0002',
        },
        S0003: {
            name: 'success',
            color: '#00C853',
            title: t("Screen_ViewContact_Button_Status_Completed"),
            icon: 'check-circle',
            value: 'S0003',
        }
    }
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
        FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
    }, [])

    useEffect(() => {
        FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
    }, [isFocused]);

    useEffect(() => {
        if (contact) {
            setFlag(listFlag[contact.flag])
            setStatus({
                status: contact.status,
                reason: contact.reason_status
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

    const handleDeactivate = (values) => {
        console.log(values)
        FetchApi(`${ContactAPI.DeactiveContact}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, { reason_da: values.reason }, getMessage)
    }

    const getMessage = (data) => {
        console.log(data)
        navigation.navigate("Bottom", { screen: "HomeScreen" })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header theme={{ colors: { primary: "transparent" } }} statusBarHeight={1}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <View style={styles.body}>
                <View style={styles.body_imgContact}>
                    {contact && <Image source={{ uri: contact.img_url }} style={styles.body_imgContact_image} />}
                </View>
                {contact &&
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.info}>
                            <View style={styles.info_title}>
                                <Text style={styles.info_title_name}>{contact.name}</Text>
                                <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>Chức vụ </Text>{Boolean(contact.job_title) ? contact.job_title : t("Screen_ViewContact_Text_NoJobTitle")}</Text>
                                <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>Công ty </Text>{contact.company}</Text>
                            </View>
                            <View style={styles.info_component}>
                                {Boolean(contact.phone) &&
                                    <TouchableRipple
                                        borderless={true}
                                        style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                        onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                                        onLongPress={async () => {
                                            setSnackVisible(true)
                                            await Clipboard.setStringAsync(contact.phone)
                                        }}
                                    >
                                        <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                            <View style={styles.info_contact_des_item}>
                                                <Text style={styles.info_component_des_title}>Di động</Text>
                                                <Text style={styles.info_contact_des_label}>{contact.phone}</Text>
                                            </View>
                                            <IconButton icon="cellphone" size={16} color="#828282" />
                                        </View>
                                    </TouchableRipple>
                                }
                                <TouchableRipple
                                    borderless={true}
                                    style={styles.info_component_button}
                                    onPress={() => Linking.openURL(`mailto:${contact.email}`)}
                                    onLongPress={async () => {
                                        setSnackVisible(true)
                                        await Clipboard.setStringAsync(contact.email)
                                    }}
                                >
                                    <View style={[styles.info_contact_des, , styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>Email</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.email}</Text>
                                        </View>
                                        <IconButton icon="email" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>

                                {Boolean(contact.fax) &&
                                    <TouchableRipple
                                        borderless={true}
                                        style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                        onLongPress={async () => {
                                            setSnackVisible(true)
                                            await Clipboard.setStringAsync(contact.fax)
                                        }}
                                    >
                                        <View style={styles.info_contact_des}>
                                            <View style={styles.info_contact_des_item}>
                                                <Text style={styles.info_component_des_title}>Fax</Text>
                                                <Text style={styles.info_contact_des_label}>{contact.fax}</Text>
                                            </View>
                                            <IconButton icon="fax" size={16} color="#828282" />
                                        </View>
                                    </TouchableRipple>
                                }
                            </View>
                            <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                    onPress={() => Linking.openURL(Platform.OS === 'android' ? `geo:0,0?q=${contact.address}` : `maps:0,0?q=${contact.address}`)}
                                    onLongPress={async () => {
                                        setSnackVisible(true)
                                        await Clipboard.setStringAsync(contact.address)
                                    }}
                                    disabled={!Boolean(contact.address)}
                                >
                                    <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Address")}</Text>
                                            <Text style={styles.info_contact_des_label}>{Boolean(contact.address) ? contact.address : t("Screen_ViewContact_Text_Label_NoAddress")}</Text>
                                        </View>
                                        <IconButton icon="map-marker" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                    onPress={() => Linking.openURL(`https://${contact.website}`)}
                                    onLongPress={async () => {
                                        setSnackVisible(true)
                                        await Clipboard.setStringAsync(contact.website)
                                    }}
                                    disabled={!Boolean(contact.website)}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Website")}</Text>
                                            <Text style={styles.info_contact_des_label}>{Boolean(contact.website) ? contact.website : t("Screen_ViewContact_Text_Label_NoWebsite")}</Text>
                                        </View>
                                        <IconButton icon="web" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={styles.info_component_button}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View>
                                            <Text style={styles.info_component_des_title}>Ghi chú</Text>
                                            <Text style={styles.info_contact_des_label}>abcxyz</Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </View>
                            <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                    onPress={() => setModalVisible(true)}
                                    disabled={route.params && route.params.viewOnly}
                                >
                                    <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>Phân loại</Text>
                                            <Text style={[styles.info_contact_des_label, { color: flag === undefined ? '#000000' : flag.color }]}>{flag === undefined ? t("Screen_ViewContact_Text_Classify") : flag.name == 'none' ? t("Screen_ViewContact_Text_Classify") : flag.title}</Text>
                                        </View>
                                        <IconButton icon="bookmark" color={flag === undefined ? '#828282' : flag.color} size={16} />
                                    </View>
                                </TouchableRipple>
                                {Boolean(status) && <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                    onPress={() => setModalStatusVisible(true)}
                                    disabled={route.params && route.params.viewOnly}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Status")}</Text>
                                            <Text style={[styles.info_contact_des_label, { color: listStatus[status.status].color }]}>{status.reason_status ? status.reason_status : t("Screen_ViewContact_Text_Label_NoStatusReason")}</Text>
                                        </View>
                                        <IconButton icon={listStatus[status.status].icon} color={listStatus[status.status].color} size={16} />
                                    </View>
                                </TouchableRipple>}
                            </View>
                            <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                >
                                    <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_CreatedDated")}</Text>
                                            <Text style={styles.info_contact_des_label}>{FormatDate(contact.created_at)}</Text>
                                        </View>
                                        <IconButton icon="calendar-today" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Group")}</Text>
                                            <Text style={styles.info_contact_des_label}>FIS</Text>
                                        </View>
                                        <IconButton icon="credit-card-multiple-outline" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>
                            </View>
                        </View>
                        <View style={{ marginBottom: 20 }} />
                    </ScrollView>
                }
                {status && <ModalStatus listStatus={Object.values(listStatus)} visible={modalStatusVisible} status={status} onPressSubmit={onSubmitStatus} onPressVisable={() => setModalStatusVisible(!modalStatusVisible)} />}
                <ModalFlag listItem={Object.values(listFlag)} visible={modalVisible} onPress={handlePressButtonFlag} onPressVisable={() => setModalVisible(false)} />
                <SnackbarComponent visible={snackVisible} onPressVisible={() => setSnackVisible(false)} message={'Đã sao chép'} />
                <ModalDeactivate visible={modalDeactivateVisible} reason={deactive} onPressVisable={() => setModalDeactivateVisible(false)} onPressSubmit={handleDeactivate} />
            </View>
            {route.params.showFooter == true &&
                <View style={styles.footer}>
                    <Pressable style={styles.footer_button} onPress={() => {
                        navigation.navigate("HomeSwap", {
                            screen: "AddContactToManyGroup",
                            params: { id: [{ contact_id : route.params.idContact}], userId : "" }
                        });

                    }}>
                        <Icon name="account-multiple-plus-outline" size={24} color="#828282" />
                        <Text style={styles.footer_button_label}>Thêm nhóm</Text>
                    </Pressable>
                    {route.params && !route.params.useid && <Pressable style={styles.footer_button} onPress={handlePressUpdateContact}>
                        <Icon name="account-edit-outline" size={24} color="#828282" />
                        <Text style={styles.footer_button_label}>Sửa</Text>
                    </Pressable>}
                    {route.params && !route.params.useid && <Pressable style={styles.footer_button} onPress={() => setModalDeactivateVisible(true)}>
                        <Icon name="account-minus-outline" size={24} color="#828282" />
                        <Text style={styles.footer_button_label}>Vô hiệu hoá</Text>
                    </Pressable>}
                </View>}
        </SafeAreaView>
    );
};


//make this component available to the app
export default ViewContact;
