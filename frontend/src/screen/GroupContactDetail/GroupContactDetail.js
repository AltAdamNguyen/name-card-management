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
import { Searchbar, Appbar, Provider } from "react-native-paper";
import { FormatDate } from "../../validate/FormatDate";
import ModalGroupContactDetail from "../../components/groupcontact/ModalGroupContactDetail";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { set } from "lodash";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog"
const GroupContactDetail = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const isFocus = useIsFocused();
    const [groupName, setGroupName] = useState(route.params.name)
    const [listContactTotal, setListContactTotal] = useState([])

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
        if (data.message === "Success") {
            if (data.data.contacts.length > 0) {
                setListContact(data.data.contacts);
                setListContactTotal(data.data.contacts);
            }
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
        if (contactName !== "") {
            listGroupContactTotal.map((item, index) => {
                if (item.contact_name.includes(contactSearch)) {
                    listSearchContactInGroup.push(item)
                }
                else if (item.title.includes(contactSearch)) {
                    listSearchContactInGroup.push(item)
                }
                else if (item.contact_company.includes(contactSearch)) {
                    listSearchContactInGroup.push(item)
                }
            })
            setListContact(listSearchContactInGroup)
        }
        else {
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
                            <TouchableOpacity>
                                <View style={styles.item}>
                                    <View style={styles.image}>
                                        <Image source={{ uri: "" }} style={styles.image} />
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
                                                Hello
                                            </Text>
                                        </View>
                                        <Text style={styles.titleContact}>
                                            Alo
                                        </Text>
                                        <View style={styles.title}>
                                            <Text
                                                numberOfLines={1}
                                                style={styles.companyContact}
                                            >
                                                Hai
                                            </Text>
                                            <View style={{ alignItems: "flex-end" }}>
                                                <Text style={styles.date}>
                                                    {FormatDate('14-11-2000')}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* {listContact.length != 0 &&
                                listContact.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <View style={styles.image}>
                                                    <Image source={{ uri: item.contact_imgurl}} style={styles.image} />
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
                                })} */}
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
                    onDataReturn={onDataReturn}
                />
            </SafeAreaView>
            <Loading onVisible={isLoading ? true : false }/>
        </Provider>
    );
};

export default GroupContactDetail;
