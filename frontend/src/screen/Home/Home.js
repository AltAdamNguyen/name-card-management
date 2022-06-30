//import liraries
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { IconButton, Searchbar, FAB } from 'react-native-paper';
import styles from './styles';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import i18next from "../../language/i18n"; 
import { useTranslation } from "react-i18next";
import AuthContext from '../../store/AuthContext';
import ModalHome from '../../components/home/ModalHome';
import ModalFlag from '../../components/home/ModalFlag';
import { FormatDate } from '../../validate/FormatDate';
// create a component


const Home = ({ route, navigation }) => {
   
    const [visibleModal, setVisibleModal] = useState(false);
    const [countContact, setContContact] = useState(0);
    const [listContact, setListContact] = useState();
    const [listFilter, setListFilter] = useState([]);
    const [text, setText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState('null');
    const [sort, setSort] = useState('create_date');
    const isFocused = useIsFocused()
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation();   
    const listFlag = {
        F0001: {
            name: 'very-important',
            title: t("Screen_Home_Button_Flag_VeryImportant"),
            color: '#EB5757',
            background: 'rgba(235, 87, 87, 0.2)',
            value: 'F0001',
        },
        F0002: {
            name: 'important',
            title: t("Screen_Home_Button_Flag_Important"),
            color: '#F2994A',
            background: 'rgba(242, 153, 74, 0.2)',
            value: 'F0002',
        },
        F0003: {
            name: 'not-important',
            title: t("Screen_Home_Button_Flag_NotImportant"),
            color: '#F2C94C',
            background: 'rgba(242, 201, 76, 0.2)',
            value: 'F0003',
        },
        F0004: {
            name: 'dont-care',
            title: t("Screen_Home_Button_Flag_DoNotCare"),
            color: '#2D9CDB',
            background: 'rgba(45, 156, 219, 0.2)',
            value: 'F0004',
        }
    }
    useEffect(() => {
        FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
    }, [])

    useEffect(() => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }, [route.params, navigation]);

    useEffect(() => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }, [isFocused]);

    useEffect(() => {
        if (route.params) {
            setVisibleModal(route.params.visibleModal);
        }
    }, [route.params]);

    const getContact = (data) => {
        console.log(data)
        if (data.data.length > 0) {
            setListContact(data.data);
            setListFilter(data.data);
            setContContact(data.data.length);
        }
    }

    const handlePressSort = (item) => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${item.value}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
        setSort(item.value);
        setModalFloatVisible(!modalFloatVisible);
    };

    const handlePressButtonFlag = (item) => {
        console.log(item);
        setModalVisible(!modalVisible);
        setFlag(item.value);
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${item.value}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }

    const getContactFilter = (data) => {
        if (data.data) {
            if (data.data.length > 0) {
                setListFilter(data.data);
                setContContact(data.data.length);
            }
        } else {
            setListFilter([]);
            setContContact(0);
        }
    }
    const deleteFlag = () => {
        setFlag('null')
        setListFilter(listContact);
        setContContact(listContact.length);
    }

    const changeTextButtonFlag = (flag) => {
        if (flag !== 'null') {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: listFlag[flag].background }, styles.sectionFlag]}>
                        <Text style={[styles.labelFlag, { color: listFlag[flag].color }]}>{listFlag[flag].title}</Text>
                        <IconButton icon="close-circle" size={16} onPress={() => { deleteFlag() }} />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: '#82828250' }, styles.sectionFlag]}>
                        <Text style={styles.labelFlag}>{t("Screen_Home_Button_Flag_Label")}</Text>
                        <IconButton icon="chevron-down" size={16} />
                    </View>
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={[styles.container, modalFloatVisible ? styles.containerOverlay : null, modalVisible ? styles.containerOverlay : null]}>
            <View style={styles.header}>
                <Pressable style={styles.sectionStyle} onPress={() => navigation.navigate('HomeSwap', { screen: 'SearchContact'})}>
                    <Searchbar
                        placeholder={t("Screen_Home_Placeholder_Search")}
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                        editable={false}
                    />
                </Pressable>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.labelList}>{t("Screen_Home_Text_Container_Title_LabelList")} ({countContact})</Text>
                <ModalFlag listItem={Object.values(listFlag)} visible={modalVisible} onPress={handlePressButtonFlag} onPressVisable={() => setModalVisible(!modalVisible)} />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {changeTextButtonFlag(flag)}
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                {listFilter.length == 0 &&
                    <View style={styles.listContainer_view}>
                        <Text style={styles.listContainer_label}>Không có danh thiếp</Text>
                    </View>}
                <ScrollView>
                    {listFilter.length != 0 && listFilter.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => { navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: item.id } }) }}>
                                <View style={styles.item}>
                                    <View style={styles.imgContact}>
                                        <Image source={{ uri: item.img_url }} style={styles.image} />
                                    </View>
                                    <View style={styles.txtContact}>
                                        <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                            <Text style={styles.nameContact}>{item.name}</Text>
                                            {item.flag !== null &&
                                                <Icon name="bookmark" size={24} color={listFlag[item.flag].color} />
                                            }
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
            <ModalHome visible={modalFloatVisible} onPressVisable={() => setModalFloatVisible(false)} sort={sort} onPressSort={handlePressSort} />
            <FAB style={styles.floatButton} icon="tune" size={24} color="#fff" onPress={() => setModalFloatVisible(!modalFloatVisible)} />
        </SafeAreaView>
    );
};

export default Home;
