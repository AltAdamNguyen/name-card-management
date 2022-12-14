//import liraries
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Pressable, RefreshControl, FlatList, Platform, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { IconButton, Searchbar, FAB, Card, Provider, ActivityIndicator } from 'react-native-paper';
import styles from './styles';
import { FormatDate } from '../../validate/FormatDate';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from '../../store/AuthContext';
import ModalHome from '../../components/home/ModalHome';
import ModalFlag from '../../components/home/ModalFlag';

import LoadingDialog from '../../components/customDialog/dialog/loadingDialog/LoadingDialog';
import { ListFlag } from '../../components/home/ContextHome';


// create a component

const listRequest = {
    R0001: {
        color: "#C73E1D",
        icon: "account-cancel"
    },
    R0002: {
        color: "#F29339",
        icon: "account-clock"
    },
}

const Home = ({ route, navigation }) => {

    const [refreshing, setRefreshing] = useState(false);
    const [countContact, setContContact] = useState(0);
    const [listContact, setListContact] = useState();
    const [loading, setLoading] = useState(false);
    const [listFilter, setListFilter] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState('null');
    const [sort, setSort] = useState('create_date');
    const isFocused = useIsFocused()
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const [page, setPage] = useState(1);
    const [loadMore, setLoadMore] = useState(false);
    const listFlag = ListFlag()
    useEffect(() => {
        if (true) {
            FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
            setLoading(true);
        }

    }, [])

    useEffect(() => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }, [route.params, navigation]);

    useEffect(() => {
        isFocused && FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }, [isFocused]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }, []);

    const getContact = (status,data) => {
        authCtx.checkToken()
        setLoading(false);
        if(!status){
            Alert.alert("", t("Something_Wrong"))
            return
        }
        if( status && data){       
            if (data.data.length > 0) {
                setListContact(data.data);
                setListFilter(data.data);
                setContContact(data.data.length);
            }
        }
    }

    const handlePressSort = (item) => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${item.value}&flag=${flag}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
        setSort(item.value);
        setModalFloatVisible(!modalFloatVisible);
    };

    const handlePressButtonFlag = (item) => {
        setModalVisible(!modalVisible);
        setFlag(item.value);
        setLoading(true);
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${item.value}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }

    const handleLoadMore = (e) => {
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}&flag=${flag}&page=${page + 1}`, Method.GET, ContentType.JSON, undefined, getContactLoadMore)
        setLoadMore(true);
    }

    const getContactFilter = (status, data) => {
        authCtx.checkToken()
        setLoading(false);
        setRefreshing(false);
        if(!status){
            Alert.alert("", t("Something_Wrong"))
            return
        }
        if (status && data) {
            setPage(1)
            if (data.data) {
                if (data.data.length > 0) {
                    setListFilter(data.data);
                    setContContact(data.data.length);
                    return
                }
                if(data.data.length == 0){
                    setListFilter([]);
                    setContContact(0);
                    return
                }
            }
            if(!data.data){
                setListFilter([]);
                setContContact(0);
                return
            }
            
        }

    }
    const deleteFlag = () => {
        setLoading(true);
        setFlag('null')
        FetchApi(`${ContactAPI.ViewContact}?sortBy=${sort}`, Method.GET, ContentType.JSON, undefined, getContactFilter)
    }

    const getContactLoadMore = (status, data) => {
        setLoadMore(false);
        if(!status){
            Alert.alert("", t("Something_Wrong"))
            return
        }
        if (status && data && data.data) {
            if (data.data.length > 0) {
                setListFilter([...listFilter, ...data.data]);
                setContContact(listFilter.length + data.data.length);
                setPage(page + 1);
            }
        }
    }

    const changeTextButtonFlag = (flag) => {
        if (flag !== 'null') {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: listFlag[flag].background, borderColor: listFlag[flag].color, borderWidth: 1 }, styles.sectionFlag]}>
                        <Text style={[styles.labelFlag, { color: listFlag[flag].color }]}>{listFlag[flag].title}</Text>
                        <IconButton icon="close-circle" size={16} color="#828282" onPress={() => { deleteFlag() }} />
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: '#FFF', borderColor: '#828282', borderWidth: 1 }, styles.sectionFlag]}>
                        <Text style={styles.labelFlag}>{t("Screen_Home_Button_Flag_Label")}</Text>
                        <IconButton icon="chevron-down" size={16} />
                    </View>
                </View>
            )
        }
    }

    const handlePressDeactive = () => {
        navigation.navigate('HomeSwap', { screen: 'SearchContact', params: { deactive: true } })
        setModalFloatVisible(!modalFloatVisible);
    }

    const handlePressTranfer = () => {
        navigation.navigate('HomeSwap', { screen: 'SearchContact', params: { transfer: true } })
        setModalFloatVisible(!modalFloatVisible);
    }

    const handleAddContact = () => {
        navigation.navigate('HomeSwap', { screen: 'UpdateContact', params: { addContact: true } })
        setModalFloatVisible(!modalFloatVisible);
    }


    const CardContact = ({ item }) => {
        return (
            <Card mode='elevated' style={styles.card} elevation={2} onPress={() => { navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: item.id, showFooter: true, request: item.status_request } }) }}>
                <View style={styles.item}>
                    <View style={styles.imgContact}>
                        <Image source={{ uri: item.status_request || item.owner_id !== item.createdBy ? 'https://ncmsystem.azurewebsites.net/Images/noImage.jpg' : item.img_url }} style={styles.image} />
                    </View>
                    <View style={styles.txtContact}>
                        <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                            <Text style={styles.nameContact} numberOfLines={1}>{item.name}</Text>
                            {item.flag !== null &&
                                <Icon name="bookmark" size={24} color={listFlag[item.flag].color} />
                            }
                            {!Boolean(item.status_request) && item.owner_id !== item.createdBy &&
                                <Icon name="account-alert" size={24} color="#cc6e1b" />
                            }
                            {Boolean(item.status_request) &&
                                <Icon name={listRequest[item.status_request].icon} size={24} color={listRequest[item.status_request].color} />
                            }
                        </View>
                        {!Boolean(item.status_request) && item.owner_id === item.createdBy &&
                            <Text style={styles.titleContact} numberOfLines={1}>{item.job_title}</Text>
                        }
                        <View style={styles.title}>
                            <Text numberOfLines={1} style={styles.companyContact}>{item.company}</Text>
                            <View style={{ alignItems: 'flex-end' }}>
                                <Text style={styles.date}>{FormatDate(item.created_at)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Card>
        )
    }

    const EmptyList = () => {
        return (
            <View >
                <Text style={styles.listContainer_label}>{t("Screen_Home_Empty_Contact")}</Text>
            </View>
        )
    }

    const FooterList = () => {
        return (
            loadMore ? <View>
                <ActivityIndicator color="#1890FF" size="small" />
            </View> : null
        )
    }

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={styles.sectionStyle} onPress={() => navigation.navigate('HomeSwap', { screen: 'SearchContact' })}>
                        <Searchbar
                            placeholder={t("Screen_Home_Placeholder_Search")}
                            theme={{
                                roundness: 10,
                                colors: { primary: '#1890FF' }
                            }}
                            editable={false}
                            pointerEvents="none"
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
                    {loading &&
                        <LoadingDialog onVisible={loading} />
                    }
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        style={{ width: '100%', }}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: listFilter.length === 0 ? 'center' : 'flex-start' }}
                        data={listFilter}
                        renderItem={CardContact}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={Platform.OS === 'android' ? 0.1 : 0.5}
                        ListEmptyComponent={EmptyList}
                        ListFooterComponent={FooterList}
                    />
                </View>
                <ModalHome visible={modalFloatVisible} onPressVisable={() => setModalFloatVisible(false)} sort={sort} onPressSort={handlePressSort} onPressDeactive={handlePressDeactive} onPressTranfer={handlePressTranfer} onPressAdd={handleAddContact} />
                <FAB style={styles.floatButton} icon="tune" size={24} color="#fff" onPress={() => setModalFloatVisible(!modalFloatVisible)} />
            </SafeAreaView>
        </Provider>
    );
};

export default Home;
