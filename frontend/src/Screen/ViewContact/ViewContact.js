//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import iconPath from '../../constants/iconPath';

import { Appbar, Button, IconButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FetchApi } from '../../service/api/FetchAPI';
import i18next from "../../language/i18n"; 
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import ModalStatus from '../../components/viewcontact/modal/ModalStatus';
import ModalFlag from '../../components/viewcontact/modal/ModalFlag';
import { FormatDate } from '../../validate/FormatDate';
import OpenURLButton from '../../components/viewcontact/OpenUrl';

import styles from './styles';
import BottomSheetContact from '../../components/viewcontact/bottomsheet/BottomSheetContact';

// create a component



const ViewContact = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [modalStatusVisible, setModalStatusVisible] = useState(false);
    const [flag, setFlag] = useState();
    const [contact, setContact] = useState();
    const [status, setStatus] = useState();
    const isFocused = useIsFocused()
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
            value: 'S0001',
        },
        S0002: {
            name: 'ongoing',
            color: '#F2994A',
            title: t("Screen_ViewContact_Button_Status_OnGoing"),
            value: 'S0002',
        },
        S0003: {
            name: 'success',
            color: '#00C853',
            title: t("Screen_ViewContact_Button_Status_Completed"),
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
                <Appbar.Content title={t("Screen_ViewContact_Appbar_Content_Title")} />
                <Appbar.Action icon={Platform.OS === 'android' ? "dots-vertical" : "dots-horizontal"} onPress={() => setModalFloatVisible(true)} />
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
                                {Boolean(contact.job_title) ?<Text>{contact.job_title}</Text>:<Text>{t("Screen_ViewContact_Text_NoJobTitle")}</Text>}
                                <Text>{contact.company}</Text>
                            </View>
                            <View style={styles.info_flag}>
                                <ModalFlag listItem={Object.values(listFlag)} visible={modalVisible} onPress={handlePressButtonFlag} onPressVisable={() => setModalVisible(false)} />
                                <Button
                                    icon="chevron-down"
                                    mode='outlined'
                                    contentStyle={{ flexDirection: 'row-reverse' }}
                                    onPress={() => setModalVisible(true)}
                                    style={[styles.info_flag_button, { backgroundColor: flag === undefined ? 'transparent' : flag.background }]}
                                    color={flag === undefined ? '#000000' : flag.color}
                                >
                                    <Text style={{ color: flag === undefined ? '#000000' : flag.color, fontWeight: 'bold' }}>{flag === undefined ? t("Screen_ViewContact_Text_Classify") : flag.name == 'none' ? t("Screen_ViewContact_Text_Classify") : flag.title}</Text>
                                </Button>
                            </View>
                            <View style={styles.info_component}>
                                {Boolean(contact.phone) &&
                                    <View style={styles.info_contact_des}>
                                        <Icon name="cellphone" size={24} color="#828282" />
                                        <Text style={styles.info_contact_des_label}>{contact.phone}</Text>
                                        <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.phone)} />
                                    </View>
                                }
                                <View style={styles.info_contact_des}>
                                    <Icon name="email-outline" size={24} color="#828282" />
                                    <Text style={styles.info_contact_des_label}>{contact.email}</Text>
                                    <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.email)} />
                                </View>
                                {Boolean(contact.fax) &&
                                    <View style={styles.info_contact_des}>
                                        <Icon name="fax" size={24} color="#828282" />
                                        <Text style={styles.info_contact_des_label}>{contact.fax}</Text>
                                        <Icon.Button name={'content-copy'} backgroundColor='transparent' iconStyle={{ marginLeft: 10 }} size={24} color="#828282" onPress={async () => await Clipboard.setStringAsync(contact.fax)} />
                                    </View>
                                }

                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>{t("Screen_ViewContact_Text_Label_Address")}</Text>
                                <Text style={[styles.info_component_des, { color: contact.address ? "#2D9CDB" : "#828282" }]}>{Boolean(contact.address) ? contact.address : t("Screen_ViewContact_Text_Label_NoAddress")}</Text>
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>{t("Screen_ViewContact_Text_Label_Website")}</Text>
                                {Boolean(contact.website) ? <OpenURLButton url={contact.website} >{contact.website}</OpenURLButton> : <Text style={[styles.info_component_des, { color: "#828282" }]}>{t("Screen_ViewContact_Text_Label_NoWebsite")}</Text>}
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>{t("Screen_ViewContact_Text_Label_Group")}</Text>
                                <View style={styles.info_componetn_content}>
                                    <Icon name="credit-card-multiple-outline" size={24} color="#828282" />
                                    <Text style={[styles.info_component_label, styles.ml10]}>FIS</Text>
                                </View>
                            </View>
                            <View style={styles.info_component}>
                                {status && <ModalStatus listStatus={Object.values(listStatus)} visible={modalStatusVisible} status={status} onPressSubmit={onSubmitStatus} onPressVisable={() => setModalStatusVisible(!modalStatusVisible)} />}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.info_component_title}>{t("Screen_ViewContact_Text_Label_Status")}</Text>
                                    {status &&
                                        <Button
                                            color={listStatus[status.status].color}
                                            onPress={() => setModalStatusVisible(true)}
                                        >
                                            {listStatus[status.status].title}
                                        </Button>
                                    }
                                </View>
                                {status && <Text style={styles.info_component_label}>{status.reason_status ? status.reason_status : t("Screen_ViewContact_Text_Label_NoStatusReason")}</Text>}
                            </View>
                            <View style={styles.info_component}>
                                <Text style={styles.info_component_title}>{t("Screen_ViewContact_Text_Label_CreatedDated")}</Text>
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

        </SafeAreaView>
    );
};


//make this component available to the app
export default ViewContact;
