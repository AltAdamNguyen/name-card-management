//import liraries
import React, { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { View, Text, SafeAreaView, Alert, FlatList } from 'react-native';

import { Searchbar, Card, IconButton, Button, ActivityIndicator } from 'react-native-paper'
import debounce from 'lodash.debounce';
import styles from '../Home/styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method, TeamAPI } from '../../constants/ListAPI';

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalActivate from '../../components/searchcontact/ModalActivate';
import Contact from '../../components/searchcontact/Contact';
import ModalTransfer from '../../components/searchcontact/ModalTransfer';
import AuthContext from '../../store/AuthContext';
import { useTranslation } from 'react-i18next';

const SearchContact = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listFilter, setListFilter] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleCheckBox, setVisibleCheckBox] = useState(false);
    const [visibleTransfer, setVisibleTransfer] = useState(false);
    const [page, setPage] = useState(1);
    const textInputRef = useRef();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [contactId, setContactId] = useState();
    const authCtx = useContext(AuthContext)
    const { t, i18n } = useTranslation()

    useEffect(() => {
        if (!route.params && textInputRef.current) {
            textInputRef.current.focus();
            FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
        }
        if (route.params && route.params.useid) {
            FetchApi(`${TeamAPI.ViewContactMember}/${route.params.useid}/contacts`, Method.GET, ContentType.JSON, undefined, getContact)
        }
        if (route.params && route.params.deactive) {
            FetchApi(`${ContactAPI.ListDeactive}`, Method.GET, ContentType.JSON, undefined, getContact)
        }
        if (route.params && route.params.transfer) {
            FetchApi(ContactAPI.ListTransferContact, Method.GET, ContentType.JSON, undefined, getContact)
            setVisibleCheckBox(true)
        }
    }, []);

    const SearchApi = (value) => {
        route.params && route.params.useid && FetchApi(`${ContactAPI.SearchContact}?userId=${route.params.useid}`, Method.GET, ContentType.JSON, undefined, getContact)
        !route.params && FetchApi(`${ContactAPI.SearchContact}?value=${value}`, Method.GET, ContentType.JSON, undefined, getContact)
        route.params && route.params.transfer && FetchApi(`${ContactAPI.SearchContactTransfer}?value=${value}`, Method.GET, ContentType.JSON, undefined, getContact)
    }

    const getContact = (data) => {
        authCtx.checkToken()
        if (data) {
            setLoading(false);
            route.params && setListContact(data.data)
            setListFilter(data.data)
        }

    }
    const debounceSearch = useCallback(debounce((nextValue) => SearchApi(nextValue), 200), [])
    const handleSearch = (value) => {
        value && setListFilter(listContact)
        setLoading(true);
        setText(value);
        debounceSearch(value);
        setListFilter([]);
    }

    const handleViewContact = (item) => {
        !route.params && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: item.id, showFooter: true, request: item.status_request } })
        route.params && route.params.useid && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: item.id, viewOnly: true } })
        route.params && route.params.transfer && checkListGroup(item.id, !listGroup.includes(item.id))
    }

    const handleReActivateButton = (id) => {
        setVisible(true)
        setContactId(id)
    }

    const handleReactivate = () => {
        FetchApi(`${ContactAPI.ReactiveContact}/${contactId}`, Method.PATCH, ContentType.JSON, null, getMessage)
    }

    const getMessage = (data) => {
        authCtx.checkToken()
        if (data) {
            setVisible(false);
            FetchApi(`${ContactAPI.ListDeactive}`, Method.GET, ContentType.JSON, undefined, getContact)
        }

    }

    const checkListGroup = (item, check) => {
        if (check) {
            setListGroup([...listGroup, item]);
        } else {
            setListGroup(listGroup.filter(i => i !== item));
        }
    }

    const handleSelectAll = () => {
        const list = listContact.map(i => { return i.id })
        if (listGroup && listGroup.length === listContact.length) {
            setListGroup([]);
        } else {
            setListGroup(list);
        }
    }

    const handleGoBack = () => {
        if (!route.params || route.params && route.params.deactive) {
            navigation.goBack();
        }
    }

    const handleTransfer = (values) => {
        FetchApi(ContactAPI.TransferContact
            , Method.PATCH,
            ContentType.JSON,
            {
                from: "",
                contact_id: listGroup,
                to: values.email,
            },
            getMessageTransfer)
    }

    const getMessageTransfer = (data) => {
        authCtx.checkToken()
        if (data) {
            if (data.message === "C0018") {
                Alert.alert(t("Screen_SearchContact_Alert_Error"),t("Screen_SearchContact_Alert_EmailNotFound"))
            }
            if (data.message === "Success") {
                setVisibleTransfer(false);
                setListGroup([]);
                FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
            }
        }
        if (data.message === "C0018") {
            Alert.alert(t("Screen_SearchContact_Alert_Error"),t("Screen_SearchContact_Alert_EmailNotFound"))
        }
        if (data.message === "Success") {
            setVisibleTransfer(false);
            setListGroup([]);
            FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
        }
    }
    const handleAddContactsToGroups = () => {
        let selectedContactIds = []
        for (let i = 0; i < listGroup.length; i++) {
            selectedContactIds.push({ contact_id: listGroup[i] })
        }
        navigation.navigate("HomeSwap", {
            screen: "AddContactToManyGroup",
            params: { id: [...selectedContactIds], userId: route.params.useid }
        });
    }

    const addContactToManyGroupAPICallBack = (data) => {
        navigation.goBack()
    }

    const CardContact = ({ item }) => {
        return (
            <Contact
                item={item}
                route={route}
                handleViewContact={handleViewContact}
                checkListGroup={checkListGroup}
                handleReActivateButton={handleReActivateButton}
                listGroup={listGroup}
                visibleCheckBox={visibleCheckBox}
            />
        )
    }

    const EmptyList = () => {
        return (
            <View >
                <Text style={styles.listContainer_label}>{t("Screen_SearchContact_Text_NoContactFound")}</Text>
            </View>
        )
    }

    const FooterList = () => {
        return (
            <View>
                <ActivityIndicator color="#1890FF" size="small" />
            </View>
        )
    }

    const handleLoadMore = (e) => {
        if(route.params && route.params.transfer){
            FetchApi(`${ContactAPI.ListTransferContact}?&page=${page}`, Method.GET, ContentType.JSON, undefined, getContactLoadMore)
        }
        if(route.params && route.params.useid){
            FetchApi(`${TeamAPI.ViewContactMember}/${route.params.useid}/contacts?page=${page}`, Method.GET, ContentType.JSON, undefined, getContactLoadMore)
        }
        
    }

    const getContactLoadMore = (data) => {
        authCtx.checkToken()
        if (data) {
            if (data.data) {
                if (data.data.length > 0) {
                    setListFilter([...listFilter, ...data.data]);
                    setPage(page + 1);
                }
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {route.params && Boolean(route.params.useid) &&
                    <View style={styles.header_title}>
                        <View style={styles.header_title_left}>
                            <IconButton icon="arrow-left" size={26} onPress={() => navigation.goBack()} />
                            <Text style={styles.header_title_left_label}>{route.params.name}</Text>
                        </View>
                        <Button
                            onPress={() => setVisibleCheckBox(!visibleCheckBox)}
                            uppercase={false}
                            color="#1980FF"
                        >
                            {t("Screen_SearchContact_Button_AddGroup")}
                        </Button>
                    </View>
                }
                {route.params && route.params.transfer &&
                    <View style={styles.header_title}>
                        <View style={styles.header_title_left}>
                            <IconButton icon="arrow-left" size={26} onPress={() => navigation.goBack()} />
                            <Text style={styles.header_title_left_label}>Đã chọn ({listGroup.length})</Text>
                        </View>
                        <Button
                            onPress={handleSelectAll}
                            uppercase={false}
                            color="#1980FF"
                        >
                            {t("Screen_SearchContact_Button_SelectAll")}
                        </Button>
                    </View>
                }
                <View style={styles.sectionStyle}>
                    <Searchbar
                        placeholder="Tìm kiếm danh thiếp"
                        icon={!route.params || route.params && route.params.deactive ? "arrow-left" : "magnify"}
                        onIconPress={handleGoBack}
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                        value={text}
                        onChangeText={handleSearch}
                        clearIcon="close-circle"
                        ref={textInputRef}
                    />
                </View>
                {visibleCheckBox && route.params && Boolean(route.params.useid) &&
                    <View style={styles.header_title}>
                        <Text>{t("Screen_SearchContact_Button_Selected")} ({listGroup.length})</Text>
                        <Button
                            onPress={handleSelectAll}
                            uppercase={false}
                            color="#1980FF"
                        >
                            {t("Screen_SearchContact_Text_SelectAll")}
                        </Button>
                    </View>
                }
            </View>
            <View style={styles.listContainer}>
                {loading &&
                    <Card mode='elevated' style={styles.card} elevation={2}>
                        <View style={styles.item}>
                            <View style={styles.imgContact}>
                                <ShimmerPlaceholder visible={!loading} shimmerStyle={styles.image} />
                            </View>
                            <View style={styles.txtContact}>
                                <View style={{ marginBottom: 5 }}>
                                    <ShimmerPlaceholder visible={!loading} shimmerStyle={{ flexDirection: 'row', borderRadius: 5 }} />
                                </View>
                                <ShimmerPlaceholder visible={!loading} shimmerStyle={{ flexDirection: 'row', borderRadius: 5 }} />
                                <View style={[styles.title, { marginTop: 5 }]}>
                                    <ShimmerPlaceholder visible={!loading} shimmerStyle={{ flexDirection: 'row', borderRadius: 5 }} />
                                </View>
                            </View>
                        </View>
                    </Card>
                }
                <FlatList
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

                {visibleCheckBox && route.params && route.params.transfer && <Button
                    style={styles.floatButton_team}
                    mode="contained"
                    onPress={() => setVisibleTransfer(true)}
                >
                    {t("Screen_SearchContact_Button_Transfer")}
                </Button>}

                {visibleCheckBox && route.params && route.params.useid && <Button
                    style={styles.floatButton_team}
                    mode="contained"
                    onPress={handleAddContactsToGroups}
                >
                    {t("Screen_SearchContact_Button_AddToGroup")}
                </Button>}
                <ModalActivate visible={visible} onPressVisable={() => setVisible(false)} onPressSubmit={handleReactivate} />
                <ModalTransfer visible={visibleTransfer} onPressVisable={() => setVisibleTransfer(false)} onPressSubmit={handleTransfer} />
            </View>
        </SafeAreaView>
    );
};

export default SearchContact;
