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
    Provider,
} from "react-native-paper";
import { FormatDate } from '../../validate/FormatDate';
import ModalGroupContactDetail from "../../components/groupcontact/ModalGroupContactDetail";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { set } from "lodash";
import { useIsFocused } from "@react-navigation/native";

const GroupContactDetail = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const isFocus = useIsFocused();

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
    const getGroupContactDetail = (data) => { //Get Detail
        if (data.message === "Get Group Contact Detail Successully") {
            setListContact(data.data.contacts)
        }
        else {
        }
    }

    const deleteGroupContact = (data) => { //Delete Group
        navigation.goBack()
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
            )
        }
    }

    const getContactSearchCallBack = (data) => {
        console.log(data)
        //setListContact(data.data)
    }

    const handleSearch = (contactName) => {
        if (contactName != "") {
            FetchApi(
                `${GroupContactAPI.SearchContactInGroup}/${route.params.groupId}`,
                Method.GET,
                ContentType.JSON,
                { value : "Nghiêm"},
                getContactSearchCallBack
            )
        }
    }

    return (
        <Provider>
            <SafeAreaView style={[styles.container, modalVisible ? styles.containerOverLay : styles.container ]}>
                <Appbar.Header statusBarHeight={1} theme={{ colors: { primary: "transparent" } }}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title={route.params.name} />
                    <TouchableOpacity></TouchableOpacity>
                    <Appbar.Action icon={"dots-horizontal"} onPress={() => { setModalVisible(true) }} />
                </Appbar.Header>
                <View style={styles.header}>
                    <Pressable style={styles.sectionStyle} >
                        <Searchbar
                            placeholder="Find contacts"
                            theme={{
                                roundness: 10,
                                colors: { primary: '#1890FF' }
                            }}
                            onChangeText = {text => handleSearch(text)}
                        />
                    </Pressable>
                </View>
                <View style={styles.contactsContainer}>
                    <View style={styles.listContainer}>
                        <ScrollView>
                            {listContact.length != 0 &&
                                listContact.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <View style={styles.image}>
                                                    <Image source={{ uri: "" }} style={styles.image} />
                                                </View>
                                                <View style={styles.txtContact}>
                                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                        <Text style={styles.nameContact}>{item.contact_name}</Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>{item.contact_jobtitle}</Text>
                                                    <View style={styles.title}>
                                                        <Text numberOfLines={1} style={styles.companyContact}>{item.contact_company}</Text>
                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Text style={styles.date}>{FormatDate(item.contact_createdat)}</Text>
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
                <ModalGroupContactDetail groupContactId={route.params.id} visible={modalVisible} onDismiss={() => { setModalVisible(false) }} onPressAddContact={() => { navigation.navigate("GroupSwap", { screen: "AddContactToGroup" , params : { id : route.params.groupId} }); setModalVisible(false) }} onPressDeleteGroup = {() => {setModalVisible(false)}} onDataReturn = {onDataReturn} />
            </SafeAreaView>
        </Provider>
    );
};

export default GroupContactDetail;
