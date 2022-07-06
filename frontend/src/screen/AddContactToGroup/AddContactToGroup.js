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
import TopBarNavigator from "../../components/navigation/TopBarAddContactToGroupNavigation";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import { FetchApi } from "../../service/api/FetchAPI";
import { ContactAPI, GroupContactAPI ,ContentType, Method } from "../../constants/ListAPI";


const AddContactToGroup = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listIdSaved, setListIdSaved] = useState([]);
    const [choosenItems, setChoosenItems] = useState(0);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)

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
        setListContact(data.data)
    }

    const checkBoxOnClickCallBack = (id, check) => {
        if (check) {
            listIdSaved.push(id)
            setChoosenItems(choosenItems + 1)
        } else {
            listIdSaved.pop(id)
            setChoosenItems(choosenItems - 1)
        }
        setListIdSaved(listIdSaved)
        console.log(listIdSaved)
    }

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
                                editable = {true}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.contactsContainer}>
                        <View style={styles.listContainer}>
                            <ScrollView>
                                {listContact.length != 0 && listContact.map((item, index) => {
                                    return (
                                        <TouchableOpacity>
                                            <View style={styles.item}>
                                                <CustomCheckedBox id={item.id} onClick = {checkBoxOnClickCallBack} />
                                                <View style={styles.image}>
                                                    <Image style={styles.image} source = {{uri : item.img_url}} />
                                                </View>
                                                <View style={styles.txtContact}>
                                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                        <Text style={styles.nameContact}>{item.name}</Text>
                                                    </View>
                                                    <Text style={styles.titleContact}>{item.job_title}</Text>
                                                    <View style={styles.title}>
                                                        <Text numberOfLines={1} style={styles.companyContact}>{item.company}</Text>
                                                        <View style={{ alignItems: 'flex-end' }}>
                                                            <Text style={styles.date}>{FormatDate(item.created_at)}</Text>
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
                        onPressConfirm={() => {
                            setConfirmDialogVisible(false)
                        }}
                        onPressCancel={() => {
                            setConfirmDialogVisible(false)
                        }} />
                </SafeAreaView>
            </Portal>
        </Provider>
    );
}

export default AddContactToGroup