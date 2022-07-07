import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import styles from "./styles";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from "../../store/AuthContext";
import {
    Searchbar,
    Appbar,
    Button,
    Provider,
    Portal,
} from "react-native-paper";
import { FormatDate } from '../../validate/FormatDate';
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import { FetchApi } from "../../service/api/FetchAPI";
import { ContactAPI, GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";

const AddContactToGroup = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listContactTotal, setListContactTotal] = useState([]);
    const [choosenItems, setChoosenItems] = useState(0);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
    const [listSearch, setListSearch] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        FetchApi(
            ContactAPI.ViewContact,
            Method.GET,
            ContentType.JSON,
            undefined,
            getContactCallBack
        )
    }, [])

    const getContactCallBack = (data) => {
        if (data.data.length > 0) {
            let list = []
            data.data.map((item, index) => {
                list.push({ isChecked: false, contact: item })
            })
            setListContact(list)
            setListContactTotal(list)
            setIsLoading(false)
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
        let index = newState.findIndex(el => el.contact.id === id)
        newState[index] = { ...newState[index], isChecked: check }
        setListContactTotal(newState)
        //setListSearch(newState)
    }

    const addContactToGroup = () => {
        let listIdSaved = []
        listContactTotal.map((item) => {
            if (item.isChecked === true) {
                listIdSaved.push({ contact_id: item.contact.id })
            }
        })
        FetchApi(
            GroupContactAPI.AddContactsToGroup,
            Method.POST,
            ContentType.JSON,
            {
                group_id: route.params.id,
                contact_ids: [
                    listIdSaved
                ]
            },
            addContactsToGroupCallBack
        )
    }

    const addContactsToGroupCallBack = (data) => {
        console.log(data.message)
    }

    const handleSearch = (contactSearch) => {
        let listSearchContact = [];
        if (contactSearch !== "") {
            for (var i = 0; i < listContactTotal.length; i++) {
                if (listContactTotal[i].contact.name.includes(contactSearch)) {
                    listSearchContact.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.job_title.includes(contactSearch)) {
                    listSearchContact.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.company.includes(contactSearch)) {
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
                        <Appbar.Content title={"Đã chọn " + choosenItems} />
                        <Appbar.Action icon={"dots-horizontal"} />
                    </Appbar.Header>
                    <View style={styles.header}>
                        <Pressable style={styles.sectionStyle} >
                            <Searchbar
                                placeholder="Find contacts"
                                theme={{
                                    roundness: 10,
                                    colors: { primary: '#1890FF' }
                                }}
                                editable={true}
                                onChangeText={text => handleSearch(text)}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.contactsContainer}>
                        <View style={styles.listContainer}>
                            {listContact.length == 0 && listSearch == 0 && (
                                <View style={styles.listContainer_view}>
                                    <Text style={styles.listContainer_label}>
                                        Không có liên hệ
                                    </Text>
                                </View>
                            )}
                            {listSearch.length != 0 && listSearch.map((item, index) => {
                                return (
                                    <View style={styles.item}>
                                        <CustomCheckedBox id={item.contact.id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                        <View style={styles.image}>
                                            <Image style={styles.image} source={{ uri: item.contact.img_url }} />
                                        </View>
                                        <View style={styles.txtContact}>
                                            <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                <Text style={styles.nameContact}>{item.contact.name}</Text>
                                            </View>
                                            <Text style={styles.titleContact}>{item.contact.job_title}</Text>
                                            <View style={styles.title}>
                                                <Text numberOfLines={1} style={styles.companyContact}>{item.contact.company}</Text>
                                                <View style={{ alignItems: 'flex-end' }}>
                                                    <Text style={styles.date}>{FormatDate(item.contact.created_at)}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                            <ScrollView>
                                {listContact.length != 0 && listContact.map((item, index) => {
                                    return (
                                        <View style={styles.item}>
                                            <CustomCheckedBox id={item.contact.id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                            <View style={styles.image}>
                                                <Image style={styles.image} source={{ uri: item.contact.img_url }} />
                                            </View>
                                            <View style={styles.txtContact}>
                                                <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                    <Text style={styles.nameContact}>{item.contact.name}</Text>
                                                </View>
                                                <Text style={styles.titleContact}>{item.contact.job_title}</Text>
                                                <View style={styles.title}>
                                                    <Text numberOfLines={1} style={styles.companyContact}>{item.contact.company}</Text>
                                                    <View style={{ alignItems: 'flex-end' }}>
                                                        <Text style={styles.date}>{FormatDate(item.contact.created_at)}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.bottomButtonContainer}>
                        <Button style={choosenItems == 0 ? styles.bottomButtonDisable : styles.bottomButtonEnable} labelStyle={{ color: 'white' }} disabled={choosenItems == 0 ? true : false} onPress={() => { setConfirmDialogVisible(true) }}>
                            Thêm
                        </Button>
                    </View>
                    <ConfirmDialog onVisible={confirmDialogVisible}
                        label={"Bạn muốn thêm những liên hệ này vào nhóm không?"}
                        leftButtonTitle={"Hủy"}
                        rightButtonTitle={"Thêm"}
                        onDismiss={() => {
                            setConfirmDialogVisible(false)
                        }}
                        onPressConfirm={addContactToGroup}
                        onPressCancel={() => {
                            setConfirmDialogVisible(false)
                        }} />
                </SafeAreaView>
            </Portal>
            <Loading onVisible={isLoading ? true : false }/>
        </Provider>
    );
}

export default AddContactToGroup