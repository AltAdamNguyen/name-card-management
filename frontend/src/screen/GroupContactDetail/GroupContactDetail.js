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
import { Searchbar, Appbar, Provider, Button } from "react-native-paper";
import { FormatDate } from "../../validate/FormatDate";
import ModalGroupContactDetail from "../../components/groupcontact/ModalGroupContactDetail";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { set } from "lodash";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";

const GroupContactDetail = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listContactTotal, setListContactTotal] = useState([])
    const [listContactSearch, setListContactSearch] = useState([])
    const [choosenItems, setChoosenItems] = useState(0);
    const [functionTitle, setFuctionTitle] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const isFocus = useIsFocused();
    const [groupName, setGroupName] = useState(route.params.name)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        FetchApi(
            `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
            Method.GET,
            ContentType.JSON,
            undefined,
            getGroupContactDetail
        );
        setModalVisible(false);
    }, []);

    useEffect(() => {
        FetchApi(
            `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
            Method.GET,
            ContentType.JSON,
            undefined,
            getGroupContactDetail
        );
        setModalVisible(false);
    }, [isFocus]);

    // API call back
    const getGroupContactDetail = (data) => {
        //Get Detail
        if (data.message === "Success" && data.data.contacts.length > 0) {
            let initListContact = []
            data.data.contacts.map((item, index) => {
                initListContact.push({ isChecked: false, contact: item })
            })
            setListContact(initListContact)
            setListContactTotal(initListContact)
            setIsLoading(false)
        } else {

        }
    };

    const deleteGroupContact = (data) => {
        // Delete Group
        navigation.goBack();
    };

    const changeGroupName = () => {
        FetchApi(
            `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
            Method.GET,
            ContentType.JSON,
            undefined,
            getGroupContactDetail
        );
    }
    // end API call back

    const onDataReturn = (data) => {
        if (data.function === "delete") {
            FetchApi(
                `${GroupContactAPI.DeleteGroupContact}/${route.params.id}`,
                Method.DELETE,
                ContentType.JSON,
                undefined,
                deleteGroupContact
            );
        }
        else if (data.function === 'changeGroupName') {
            FetchApi(
                `${GroupContactAPI.ChangeGroupName}/${route.params.id}`,
                Method.PATCH,
                ContentType.JSON,
                { name: data.groupCurrentName },
                changeGroupName
            );
            setGroupName(data.groupCurrentName)
        }
    };

    const handleSearch = (contactSearch) => {
        let listSearchContactInGroup = [];
        if (contactSearch !== "") {
            for (var i = 0; i < listContactTotal.length; i++) {
                if (listContactTotal[i].contact.contact_name.includes(contactSearch)) {
                    listSearchContactInGroup.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.contact_jobtitle.includes(contactSearch)) {
                    listSearchContactInGroup.push(listContactTotal[i])
                }
                else if (listContactTotal[i].contact.contact_company.includes(contactSearch)) {
                    listSearchContactInGroup.push(listContactTotal[i])
                }
            }
            setListContact([])
            setListContactSearch(listSearchContactInGroup)
        }
        else {
            setListContactSearch([])
            setListContact(listContactTotal)
        }
    };

    const checkBoxOnClickCallBack = (id, check) => {
        if (check) {
            setChoosenItems(choosenItems + 1)
            updateStateForListContact(id,true)
        }
        else {
            setChoosenItems(choosenItems - 1)
            updateStateForListContact(id, false)
        }
    }

    const updateStateForListContact = (id, check) => {
        let newState = [...listContactTotal]
        let index = newState.findIndex(el => el.contact.contact_id === id)
        newState[index] = { ...newState[index], isChecked: check }
        setListContactTotal(newState)
        console.log(listContactTotal)
    }

    return (
        <Provider>
            <SafeAreaView
                style={styles.container}
            >
                <Appbar.Header
                    statusBarHeight={1}
                    theme={{ colors: { primary: "transparent" } }}
                >
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={groupName} />
                    <TouchableOpacity></TouchableOpacity>
                    <Appbar.Action
                        icon={"dots-horizontal"}
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    />
                </Appbar.Header>
                <View style={styles.header}>
                    <Pressable style={styles.sectionStyle}>
                        <Searchbar
                            placeholder="Find contacts"
                            theme={{
                                roundness: 10,
                                colors: { primary: "#1890FF" },
                            }}
                            onChangeText={(text) => handleSearch(text)}
                        />
                    </Pressable>
                </View>
                <View style={styles.contactsContainer}>
                    <View style={styles.listContainer}>
                        <ScrollView>
                            {listContactSearch.length != 0 &&
                                listContactSearch.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <CustomCheckedBox id={item.contact.contact_id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                                <View style={styles.image}>
                                                    <Image source={{ uri: item.contact.contact_imgurl }} style={styles.image} />
                                                </View>
                                                <View style={styles.txtContact}>
                                                    <View
                                                        style={[
                                                            styles.title,
                                                            {
                                                                flexDirection: "row",
                                                                justifyContent: "space-between",
                                                            },
                                                        ]}
                                                    >
                                                        <Text style={styles.nameContact}>
                                                            {item.contact.contact_name}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>
                                                        {item.contact.contact_jobtitle}
                                                    </Text>
                                                    <View style={styles.title}>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.companyContact}
                                                        >
                                                            {item.contact.contact_company}
                                                        </Text>
                                                        <View style={{ alignItems: "flex-end" }}>
                                                            <Text style={styles.date}>
                                                                {FormatDate(item.contact.contact_createdat)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                            {listContact.length != 0 &&
                                listContact.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <CustomCheckedBox id={item.contact.contact_id} onClick={checkBoxOnClickCallBack} isChecked={item.isChecked} />
                                                <View style={styles.image}>
                                                    <Image source={{ uri: item.contact.contact_imgurl }} style={styles.image} />
                                                </View>
                                                <View style={styles.txtContact}>
                                                    <View
                                                        style={[
                                                            styles.title,
                                                            {
                                                                flexDirection: "row",
                                                                justifyContent: "space-between",
                                                            },
                                                        ]}
                                                    >
                                                        <Text style={styles.nameContact}>
                                                            {item.contact.contact_name}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>
                                                        {item.contact.contact_jobtitle}
                                                    </Text>
                                                    <View style={styles.title}>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.companyContact}
                                                        >
                                                            {item.contact.contact_company}
                                                        </Text>
                                                        <View style={{ alignItems: "flex-end" }}>
                                                            <Text style={styles.date}>
                                                                {FormatDate(item.contact.contact_createdat)}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                })}
                        </ScrollView>
                    </View>
                </View>
                <ModalGroupContactDetail
                    groupContactId={route.params.id}
                    groupContactName={route.params.name}
                    visible={modalVisible}
                    onPressVisable={() => setModalVisible(false)}
                    onDismiss={() => {
                        setModalVisible(false);
                    }}
                    onPressAddContact={() => {
                        navigation.navigate("GroupSwap", {
                            screen: "AddContactToGroup",
                            params: { id: route.params.id },
                        });
                        setModalVisible(false);
                    }}
                    onPressDeleteGroup={() => {
                        setModalVisible(false);
                    }}
                    onPressChangeGroupName={() => {
                        setModalVisible(false);
                    }}
                    onPressDeleteGroupContact={() => {
                        setModalVisible(false)
                        setFuctionTitle("Xoá")
                    }}
                    onDataReturn={onDataReturn}
                />
                <View style={styles.bottomButtonContainer}>
                    <Button style={choosenItems == 0 ? styles.bottomButtonDisable : styles.bottomButtonEnable} labelStyle={{ color: 'white' }} disabled={choosenItems == 0 ? true : false} onPress={() => { setConfirmDialogVisible(true) }}>
                        {functionTitle}
                    </Button>
                </View>
            </SafeAreaView>
            <Loading onVisible={isLoading ? true : false} />
        </Provider>
    );
};

export default GroupContactDetail;
