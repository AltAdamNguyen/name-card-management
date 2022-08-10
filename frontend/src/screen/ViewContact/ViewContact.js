//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Pressable, Linking, Platform, Dimensions, Alert } from 'react-native';
import { Appbar, IconButton, TouchableRipple } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FetchApi } from '../../service/api/FetchAPI';
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';

import ModalStatus from '../../components/viewcontact/modal/ModalStatus';
import ModalFlag from '../../components/viewcontact/modal/ModalFlag';
import ModalDeactivate from '../../components/viewcontact/modal/ModalDeactivate';
import { FormatDate } from '../../validate/FormatDate';
import SnackbarComponent from '../../components/viewcontact/Snackbar';

import styles from './styles';
import { ListFlag, ListStatus } from '../../components/viewcontact/ContextViewContact';

const ViewContact = ({ navigation, route }) => {
    const listFlag = ListFlag()
    const listStatus = ListStatus()
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [modalVisible, setModalVisible] = useState(false);
    const [modalStatusVisible, setModalStatusVisible] = useState(false);
    const [snackVisible, setSnackVisible] = useState(false);
    const [modalDeactivateVisible, setModalDeactivateVisible] = useState(false);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused()
    const [flag, setFlag] = useState();
    const [contact, setContact] = useState();
    const [status, setStatus] = useState();
    const [deactive, setDeactive] = useState({
        reason: '',
    });
    const { t, i18n } = useTranslation();
    const authCtx = useContext(AuthContext)

    const onSubmitStatus = (values) => {
        const body = {
            status: values.status,
            reason_status: values.reason,
        }
        FetchApi(`${ContactAPI.SetStatus}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, body, getFlag)
        setStatus(values)
        setModalStatusVisible(!modalStatusVisible)
    }

    const handlePressButtonFlag = (item) => {
        FetchApi(`${ContactAPI.SetFlag}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, { flag: item.value }, getFlag)
        setModalVisible(!modalVisible);
        setFlag(item);
    }

    const getFlag = (status, data) => {
        console.log(status)
        authCtx.checkToken()
        if(!status){
            Alert.alert("", t("Something_Wrong"))
        }
    }
    useEffect(() => {
        setLoading(true)
        FetchApi(`${ContactAPI.ViewContact}/${route.params.idContact}`, Method.GET, ContentType.JSON, undefined, getContact)
    }, [])

    useEffect(() => {
        setLoading(true)
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

    const getContact = (status, data) => {
        authCtx.checkToken()
        if(status && data){
            setContact(data.data)
            setLoading(false)
        }
        if(!status){
            Alert.alert("", t("Something_Wrong"))
        }

    }

    const handlePressUpdateContact = () => {
        navigation.navigate('UpdateContact', { 'idContact': route.params.idContact })
    }

    const handleDeactivate = (values) => {
        FetchApi(`${ContactAPI.DeactiveContact}/${route.params.idContact}`, Method.PATCH, ContentType.JSON, { reason_da: values.reason }, getMessage)
    }

    const getMessage = (status, data) => {
        authCtx.checkToken()
        if(status && data){
            navigation.navigate("Bottom", { screen: "HomeScreen" })
        }
        if(!status){
            Alert.alert("", t("Something_Wrong"))
        }
    }

    const handleRequest = () => {
        FetchApi(`${ContactAPI.RequestTransferContact}/${contact.id}/${contact.idDuplicate}`,Method.GET, ContentType.JSON, undefined, getMessage)
    }


    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header theme={{ colors: { primary: "transparent" } }} statusBarHeight={1}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
            </Appbar.Header>
            <View style={styles.body}>
                <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.95} height={windowHeight * 0.3} shimmerStyle={{ borderRadius: 10, marginBottom: 10 }}>
                    <View style={styles.body_imgContact}>
                        {contact && <Image source={{ uri: contact.img_url ? contact.img_url : 'https://ncmsystem.azurewebsites.net/Images/noImage.jpg' }} style={styles.body_imgContact_image} />}
                    </View>
                </ShimmerPlaceholder>
                {!contact &&
                    <View style={styles.info}>
                        <View style={styles.info_title}>
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.5} height={windowHeight * 0.05} shimmerStyle={{ borderRadius: 10, marginBottom: 20 }} />
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.9} height={windowHeight * 0.02} shimmerStyle={{ borderRadius: 10, marginBottom: 10 }} />
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.9} height={windowHeight * 0.02} shimmerStyle={{ borderRadius: 10, marginBottom: 10 }} />
                        </View>
                    </View>

                }
                {contact &&
                    <ScrollView style={{ flex: 1, width: '100%' }}>
                        <View style={{ marginTop: 10 }} />
                        <View style={styles.info}>
                            <View style={styles.info_title}>
                                <Text style={styles.info_title_name}>{contact.name}</Text>
                                {Boolean(contact.job_title) && <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>{t("Screen_ViewContact_Text_Label_JobTitle")} </Text>{contact.job_title}</Text>}
                                <Text style={styles.info_title_job}><Text style={styles.info_title_job_name}>{t("Screen_ViewContact_Text_Label_Company")} </Text>{contact.company}</Text>
                            </View>
                            {!Boolean(contact.owner) && <View style={styles.info_component}>
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
                                                <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Phone")}</Text>
                                                <Text style={styles.info_contact_des_label}>{contact.phone}</Text>
                                            </View>
                                            <IconButton icon="cellphone" size={16} color="#828282" />
                                        </View>
                                    </TouchableRipple>
                                }
                                {Boolean(contact.email) && <TouchableRipple
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
                                </TouchableRipple>}

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
                            </View>}
                            {!Boolean(contact.owner) && (Boolean(contact.address) || Boolean(contact.website)) && <View style={styles.info_component}>
                                {Boolean(contact.address) && <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                    onPress={() => Linking.openURL(Platform.OS === 'android' ? `geo:0,0?q=${contact.address}` : `maps:0,0?q=${contact.address}`)}
                                    onLongPress={async () => {
                                        setSnackVisible(true)
                                        await Clipboard.setStringAsync(contact.address)
                                    }}
                                >
                                    <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Address")}</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.address}</Text>
                                        </View>
                                        <IconButton icon="map-marker" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>}
                                {Boolean(contact.website) && <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                    onPress={() => Linking.openURL(`https://${contact.website}`)}
                                    onLongPress={async () => {
                                        setSnackVisible(true)
                                        await Clipboard.setStringAsync(contact.website)
                                    }}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Website")}</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.website}</Text>
                                        </View>
                                        <IconButton icon="web" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>}
                            </View>}
                            {Boolean(contact.note) && <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={styles.info_component_button}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Note")}</Text>
                                            <Text style={styles.info_contact_des_label}>{contact.note}</Text>
                                        </View>
                                    </View>
                                </TouchableRipple>
                            </View>}
                            {!Boolean(contact.owner) && <View style={styles.info_component}>
                                <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.btl20, styles.btr20]}
                                    onPress={() => setModalVisible(true)}
                                    disabled={route.params && route.params.viewOnly}
                                >
                                    <View style={[styles.info_contact_des, styles.info_contact_border]}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Classify")}</Text>
                                            <Text style={[styles.info_contact_des_label, { color: flag === undefined ? '#000000' : flag.color }]}>{flag === undefined ? t("Screen_ViewContact_Text_NoClassify") : flag.name == 'none' ? t("Screen_ViewContact_Text_NoClassify") : flag.title}</Text>
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
                                            <Text style={[styles.info_contact_des_label, { color: listStatus[status.status].color }]}>{status.reason ? status.reason : t("Screen_ViewContact_Text_Label_NoStatusReason")}</Text>
                                        </View>
                                        <IconButton icon={listStatus[status.status].icon} color={listStatus[status.status].color} size={16} />
                                    </View>
                                </TouchableRipple>}
                            </View>}
                            {!Boolean(contact.owner) && <View style={styles.info_component}>
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
                                {Boolean(contact.group_name) && Boolean(contact.group_name.length) && <TouchableRipple
                                    borderless={true}
                                    style={[styles.info_component_button, styles.bbl20, styles.bbr20]}
                                >
                                    <View style={styles.info_contact_des}>
                                        <View style={styles.info_contact_des_item}>
                                            <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Group")}</Text>
                                            <Text style={styles.info_contact_des_label}>
                                                {contact.group_name.map((item) => {
                                                    return `${item}, `
                                                })}
                                            </Text>
                                        </View>
                                        <IconButton icon="credit-card-multiple-outline" size={16} color="#828282" />
                                    </View>
                                </TouchableRipple>}
                            </View>}
                            {Boolean(contact.owner) &&
                                <View style={styles.info_component}>
                                    <TouchableRipple
                                        borderless={true}
                                        style={styles.info_component_button}
                                    >
                                        <View style={styles.info_contact_des}>
                                            <View style={styles.info_contact_des_item}>
                                                <Text style={styles.info_component_des_title}>{t("Screen_ViewContact_Text_Label_Owner")}</Text>
                                                <Text style={styles.info_contact_des_label}>{contact.owner}</Text>
                                            </View>
                                            <IconButton icon="account" size={16} color="#828282" />
                                        </View>
                                    </TouchableRipple>
                                </View>
                            }
                        </View>
                        <View style={{ marginBottom: 20 }} />
                    </ScrollView>
                }
                {status && <ModalStatus listStatus={Object.values(listStatus)} visible={modalStatusVisible} status={status} onPressSubmit={onSubmitStatus} onPressVisable={() => setModalStatusVisible(!modalStatusVisible)} />}
                <ModalFlag listItem={Object.values(listFlag)} visible={modalVisible} onPress={handlePressButtonFlag} onPressVisable={() => setModalVisible(false)} />
                <SnackbarComponent visible={snackVisible} onPressVisible={() => setSnackVisible(false)} message={t("Screen_ViewContact_Text_Copy")} />
                <ModalDeactivate visible={modalDeactivateVisible} reason={deactive} onPressVisable={() => setModalDeactivateVisible(false)} onPressSubmit={handleDeactivate} />
            </View>
            {route.params && route.params.showFooter && 
                <View style={styles.footer}>
                    {Boolean(contact) && !Boolean(contact.owner) &&
                        <Pressable style={styles.footer_button} onPress={() => {
                        navigation.navigate("HomeSwap", {
                            screen: "AddContactToManyGroup",
                            params: { id: [{ contact_id: route.params.idContact }], userId: "" }
                        });
                    }}>
                        <Icon name="account-multiple-plus-outline" size={24} color="#828282" />
                        <Text style={styles.footer_button_label}>{t("Screen_ViewContact_BottomSheet_Text_AddToGroup")}</Text>
                    </Pressable>}
                    {route.params && !route.params.useid && contact && !Boolean(contact.owner) &&
                        <Pressable style={styles.footer_button} onPress={handlePressUpdateContact}>
                            <Icon name="account-edit-outline" size={24} color="#828282" />
                            <Text style={styles.footer_button_label}>{t("Screen_ViewContact_BottomSheet_Text_UpdateInformation")}</Text>
                        </Pressable>}
                    {route.params && !route.params.useid && contact && !Boolean(contact.owner) &&
                        <Pressable style={styles.footer_button} onPress={() => setModalDeactivateVisible(true)}>
                            <Icon name="account-minus-outline" size={24} color="#828282" />
                            <Text style={styles.footer_button_label}>{t("Screen_ViewContact_BottomSheet_Text_DeactivateNameCard")}</Text>
                        </Pressable>}
                    {route.params && route.params.request !== "R0002" && contact && contact.owner_id !== contact.createBy &&
                        <Pressable style={styles.footer_button} onPress={handleRequest}>
                            <Icon name="account-question-outline" size={24} color="#828282" />
                            <Text style={styles.footer_button_label}>{t("Screen_ViewContact_BottomSheet_Text_Request")}</Text>
                        </Pressable>}
                </View>}
        </SafeAreaView>
    );
};

export default ViewContact;
