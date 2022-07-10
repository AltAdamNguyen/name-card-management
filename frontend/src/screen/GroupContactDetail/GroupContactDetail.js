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
        setIsLoading(true)
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
                initListContact.push(item)
            })
            setListContact(initListContact)
            setListContactTotal(initListContact)
        } else {
            setListContact([])
            setListContactTotal([])
        }
        setIsLoading(false)
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
                        {listContact.length == 0 && (
                                <View style={styles.listContainer_view}>
                                    <Text style={styles.listContainer_label}>
                                        Không có liên hệ
                                    </Text>
                                </View>
                            )}
                            {listContactSearch.length != 0 &&
                                listContactSearch.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <View style={styles.image}>
                                                    <Image source={{ uri: item.contact_imgurl }} style={styles.image} />
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
                                                            {item.contact_name}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>
                                                        {item.contact_jobtitle}
                                                    </Text>
                                                    <View style={styles.title}>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.companyContact}
                                                        >
                                                            {item.contact_company}
                                                        </Text>
                                                        <View style={{ alignItems: "flex-end" }}>
                                                            <Text style={styles.date}>
                                                                {FormatDate(item.contact_createdat)}
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
                                                <View style={styles.image}>
                                                    <Image source={{ uri: item.contact_imgurl }} style={styles.image} />
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
                                                            {item.contact_name}
                                                        </Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>
                                                        {item.contact_jobtitle}
                                                    </Text>
                                                    <View style={styles.title}>
                                                        <Text
                                                            numberOfLines={1}
                                                            style={styles.companyContact}
                                                        >
                                                            {item.contact_company}
                                                        </Text>
                                                        <View style={{ alignItems: "flex-end" }}>
                                                            <Text style={styles.date}>
                                                                {FormatDate(item.contact_createdat)}
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
                        navigation.navigate("GroupSwap", {
                            screen: "DeleteContactFromGroup",
                            params: { id: route.params.id },
                        });
                    }}
                    onDataReturn={onDataReturn}
                />
            </SafeAreaView>
            <Loading onVisible={isLoading ? true : false} />
        </Provider>
    );
};

export default GroupContactDetail;
