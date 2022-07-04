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
} from "react-native-paper";
import { FormatDate } from '../../validate/FormatDate';
import ModalGroupContactDetail from "../../components/groupcontact/ModalGroupContactDetail";

const GroupContactDetail = ({navigation}) => {
    const [listGroup, setListGroup] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setModalVisible(false)
    }, [])

    return (
        <SafeAreaView style={[styles.container, modalVisible ? styles.containerOverLay : null]}>
        
            <Appbar.Header statusBarHeight={1} theme={{ colors: { primary: "transparent" } }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="My Team" />
                <TouchableOpacity></TouchableOpacity>
                <Appbar.Action icon={"dots-horizontal"} onPress={() => {setModalVisible(true)}}/>
            </Appbar.Header>
            <View style={styles.header}>
                <Pressable style={styles.sectionStyle} >
                    <Searchbar
                        placeholder="Find contacts"
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
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
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.image}>
                                    <Image source={{ uri: "" }} style={styles.image} />
                                </View>
                                <View style={styles.txtContact}>
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <View style={styles.image}>
                                    <Image source={{ uri: "" }} style={styles.image} />
                                </View>
                                <View style={styles.txtContact}>
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
            
            <ModalGroupContactDetail visible={modalVisible} onDismiss={() => {setModalVisible(false)}} onPressAddContact={() => { navigation.navigate('AddContactToGroup'); setModalVisible(false) }}/>
                        
           
        </SafeAreaView>
    );
}

export default GroupContactDetail