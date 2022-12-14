import React, { useState, useEffect, useContext } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    Pressable,
    Alert
} from "react-native";
import styles from "./styles";
import {
    Searchbar,
    Appbar,
    Button,
    Provider,
    Portal,
    HelperText,
} from "react-native-paper";
import { FormatDate } from '../../validate/FormatDate';
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog"
import { useIsFocused } from "@react-navigation/native";
import { t } from "i18next";
import { TouchableOpacity } from "react-native";
import AuthContext from "../../store/AuthContext";

const DeleteContactFromGroup = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listContactTotal, setListContactTotal] = useState([]);
    const [listSearch, setListSearch] = useState([]);
    const authCtx = useContext(AuthContext)
    const [choosenItems, setChoosenItems] = useState(0);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const isFocus = useIsFocused()

    useEffect(() => {
        setIsLoading(true)
        FetchApi(
            `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
            Method.GET,
            ContentType.JSON,
            undefined,
            getGroupContactDetail
        );
    }, [])

    useEffect(() => {
        FetchApi(
            `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
            Method.GET,
            ContentType.JSON,
            undefined,
            getGroupContactDetail
        );
    }, [isFocus]);

    const getGroupContactDetail = (status, data) => {
        authCtx.checkToken()
        setIsLoading(false)
        if(!status) {
            Alert.alert("", t("Something_Wrong"))
            return
        }
        if (status && data) {
            if (data.data.contacts.length > 0) {
                let initListContact = []
                data.data.contacts.map((item, index) => {
                    initListContact.push({ isChecked: false, contact: item })
                })
                setListContact(initListContact)
                setListContactTotal(initListContact)
                setListSearch([])
            }
        }
    }

    const checkBoxOnClickCallBack = (id, check) => {
        if (check) {
            updateStateForListContact(id, true)
            setChoosenItems(choosenItems + 1)
        } else {
            updateStateForListContact(id, false)
            setChoosenItems(choosenItems - 1)
        }
    }


    const updateStateForListContact = (id, check) => {
        let newState = [...listContactTotal]
        let index = newState.findIndex(el => el.contact.contact_id === id)
        newState[index] = { ...newState[index], isChecked: check }
        setListContactTotal(newState)
        if (listSearch.length == 0) {
            let newState = [...listContact]
            let index = newState.findIndex(el => el.contact.contact_id === id)
            newState[index] = { ...newState[index], isChecked: check }
            setListContact(newState)
        }
        else {
            let newState = [...listSearch]
            let index = newState.findIndex(el => el.contact.contact_id === id)
            newState[index] = { ...newState[index], isChecked: check }
            setListSearch(newState)
        }
    }

    const deleteContactFromGroup = () => {
        let listIdSaved = []
        listContactTotal.map((item) => {
            if (item.isChecked === true) {
                listIdSaved.push({ contact_id: item.contact.contact_id })
            }
        })
        FetchApi(
            GroupContactAPI.DeleteContactInGroup,
            Method.DELETE,
            ContentType.JSON,
            {
                group_id: route.params.id,
                contact_ids: [
                    ...listIdSaved
                ]
            },
            deleteContactsFromGroupAPICallBack
        )
    }

    const deleteContactsFromGroupAPICallBack = (status, data) => {
        if(!status) {
            Alert.alert("", t("Something_Wrong"))
            return
        }
        if (status && data) {
            navigation.goBack()
        }
    }

    const handleSearch = (contactSearch) => {
        let listSearchContact = [];
        if (contactSearch !== "") {
            for (var i = 0; i < listContactTotal.length; i++) {
                if (listContactTotal[i].contact.contact_name != null && listContactTotal[i].contact.contact_name.toLowerCase().includes(contactSearch.toLowerCase())) {
                    listSearchContact.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.contact_jobtitle != null && listContactTotal[i].contact.contact_jobtitle.toLowerCase().includes(contactSearch.toLowerCase())) {
                    listSearchContact.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.contact_company != null && listContactTotal[i].contact.contact_company.toLowerCase().includes(contactSearch.toLowerCase())) {
                    listSearchContact.push(listContactTotal[i])
                }
            }
            setListContact([])
            setListSearch(listSearchContact)
        }
        else {
            setListSearch([])
            setListContact(listContactTotal)
        }
    };

    return (
        <Provider>
            <Portal>
                <SafeAreaView style={styles.container}>
                    <Appbar.Header statusBarHeight={1} theme={{ colors: { primary: "transparent" } }}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Appbar.Content title={choosenItems + t("Screen_DeleteContactFromGroup_Appbar_Content_Title_Selected")} />

                    </Appbar.Header>
                    <View style={styles.header}>
                        <Pressable style={styles.sectionStyle} >
                            <Searchbar
                                placeholder={t("Screen_DeleteContactFromGroup_SearchBar_Placeholder")}
                                theme={{
                                    roundness: 10,
                                    colors: { primary: '#1890FF' }
                                }}
                                editable={true}
                                onChangeText={text => handleSearch(text)}
                            />
                        </Pressable>
                        <HelperText>
                            {t("Screen_AddContactToGroup_SearchBar_HelpText")}
                        </HelperText>
                    </View>
                    <View style={styles.contactsContainer}>
                        <View style={styles.listContainer}>
                            {listContact.length == 0 && listSearch == 0 && (
                                <View style={styles.listContainer_view}>
                                    <Text style={styles.listContainer_label}>
                                        {t("Screen_DeleteContactFromGroup_ListContact_NoContactFound")}
                                    </Text>
                                </View>
                            )}
                            {listSearch.length != 0 && listSearch.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => checkBoxOnClickCallBack(item.contact.contact_id, !item.isChecked)}>
                                        <View style={styles.item}>
                                            <CustomCheckedBox id={item.contact.contact_id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                            <View style={styles.image}>
                                                <Image style={styles.image} source={{ uri: item.contact.contact_imgurl }} />
                                            </View>
                                            <View style={styles.txtContact}>
                                                <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                    <Text style={styles.nameContact}>{item.contact.contact_name}</Text>
                                                </View>
                                                <Text style={styles.titleContact}>{item.contact.contact_jobtitle}</Text>
                                                <View style={styles.title}>
                                                    <Text numberOfLines={1} style={styles.companyContact}>{item.contact.contact_company}</Text>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <Text style={styles.date}>{FormatDate(item.contact.contact_createdat)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {listContact.length != 0 && listContact.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => checkBoxOnClickCallBack(item.contact.contact_id, !item.isChecked)}>
                                            <View style={styles.item}>
                                                <CustomCheckedBox id={item.contact.contact_id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                                <View style={styles.image}>
                                                    <Image style={styles.image} source={{ uri: item.contact.contact_imgurl }} />
                                                </View>
                                                <View style={styles.txtContact}>
                                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                        <Text style={styles.nameContact}>{item.contact.contact_name}</Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>{item.contact.contact_jobtitle}</Text>
                                                    <View style={styles.title}>
                                                        <Text numberOfLines={1} style={styles.companyContact}>{item.contact.contact_company}</Text>
                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Text style={styles.date}>{FormatDate(item.contact.contact_createdat)}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <Button
                            style={choosenItems == 0 ? styles.bottomButtonDisable : styles.bottomButtonEnable}
                            labelStyle={{ color: 'white' }}
                            disabled={choosenItems == 0 ? true : false}
                            onPress={() => { setConfirmDialogVisible(true) }}
                            uppercase={false}
                        >
                            {t("Screen_DeleteContactFromGroup_Button_DeleteContact")}
                        </Button>
                    </View>
                    <ConfirmDialog
                        visible={confirmDialogVisible}
                        title={t("Screen_DeleteContactFromGroup_ConfirmDialog_Label")}
                        leftButtonTitle={t("Screen_DeleteContactFromGroup_ConfirmDialog_LeftButtonTitle")}
                        rightButtonTitle={t("Screen_DeleteContactFromGroup_ConfirmDialog_RightButtonTitle")}
                        onPressVisable={() => setConfirmDialogVisible(false)}
                        onPressConfirm={deleteContactFromGroup}
                    />
                </SafeAreaView>
            </Portal>
            <Loading onVisible={isLoading ? true : false} />
        </Provider>
    );
}

export default DeleteContactFromGroup