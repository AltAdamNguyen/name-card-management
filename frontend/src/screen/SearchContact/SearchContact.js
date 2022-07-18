//import liraries
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Alert } from 'react-native';

import { Searchbar, Card, List, IconButton, Button, RadioButton, FAB } from 'react-native-paper'
import debounce from 'lodash.debounce';
import styles from '../Home/styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method, TeamAPI } from '../../constants/ListAPI';

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalActivate from '../../components/searchcontact/ModalActivate';
import Contact from '../../components/searchcontact/Contact';
import ModalTransfer from '../../components/searchcontact/ModalTransfer';

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

// create a component
const SearchContact = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listFilter, setListFilter] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleCheckBox, setVisibleCheckBox] = useState(false);
    const [visibleTransfer, setVisibleTransfer] = useState(false);
    const textInputRef = useRef();
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    const [loading, setLoading] = useState(false);
    const [contactId, setContactId] = useState();

    useEffect(() => {
        !route.params && textInputRef.current && textInputRef.current.focus();
        if (route.params && route.params.useid) {
            FetchApi(`${TeamAPI.ViewContactMember}/${route.params.useid}/contacts`, Method.GET, ContentType.JSON, undefined, getContact)
        }
        if (route.params && route.params.deactive) {
            FetchApi(`${ContactAPI.ListDeactive}`, Method.GET, ContentType.JSON, undefined, getContact)
        }
        if (route.params && route.params.transfer) {
            FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
            setVisibleCheckBox(true)
        }
    }, []);

    const SearchApi = (value) => {
        route.params && route.params.useid && FetchApi(`${ContactAPI.SearchContact}?value=${value}&userId=${route.params.useid}`, Method.GET, ContentType.JSON, undefined, getContact)
        !route.params && FetchApi(`${ContactAPI.SearchContact}?value=${value}`, Method.GET, ContentType.JSON, undefined, getContact)
    }

    const getContact = (data) => {
        setLoading(false);
        route.params && setListContact(data.data)
        setListFilter(data.data)
    }
    const debounceSearch = useCallback(debounce((nextValue) => SearchApi(nextValue), 200), [])
    const handleSearch = (value) => {
        value && setListFilter(listContact)
        setLoading(true);
        setText(value);
        debounceSearch(value);
        setListFilter([]);
    }

    const handleViewContact = (id) => {
        !route.params && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: id, showFooter: true, request: item.status_request } })
        route.params && route.params.useid && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: id, viewOnly: true } })
    }

    const handleReActivateButton = (id) => {
        setVisible(true)
        setContactId(id)
    }

    const handleReactivate = () => {
        FetchApi(`${ContactAPI.ReactiveContact}/${contactId}`, Method.PATCH, ContentType.JSON, null, getMessage)
    }

    const getMessage = (data) => {
        setVisible(false);
        FetchApi(`${ContactAPI.ListDeactive}`, Method.GET, ContentType.JSON, undefined, getContact)
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
                contact_id: listGroup,
                email: values.email,
            },
            getMessageTransfer)
    }

    const getMessageTransfer = (data) => {
        console.log(data)
        if (data.message === "C0018") {
            Alert.alert("Email không tồn tại")
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
            selectedContactIds.push({ contact_id: listGroup[i]})
        }
        navigation.navigate("HomeSwap", {
            screen: "AddContactToManyGroup",
            params: { id: [...selectedContactIds] , userId: route.params.useid }
        });
    }

    const addContactToManyGroupAPICallBack = (data) => {
        navigation.goBack()
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
                        >Thêm
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
                            Select All
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
                        <Text>Đã chọn ({listGroup.length})</Text>
                        <Button
                            onPress={handleSelectAll}
                            uppercase={false}
                            color="#1980FF"
                        >
                            Select All
                        </Button>
                    </View>
                }
            </View>
            <View style={styles.listContainer}>
                {listFilter && listFilter.length == 0 && loading == false &&
                    <View style={styles.listContainer_view}>
                        <Text style={styles.listContainer_label}>Không có danh thiếp</Text>
                    </View>}
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
                <ScrollView>
                    {listFilter && listFilter.length != 0 && listFilter.map((item, index) => {
                        if (item.owner_id === item.createdBy) {
                            return (
                                <Contact key={index} item={item} route={route} handleViewContact={handleViewContact} checkListGroup={checkListGroup} handleReActivateButton={handleReActivateButton} listGroup={listGroup} visibleCheckBox={visibleCheckBox} />
                            )
                        }
                    })}
                </ScrollView>
                {visibleCheckBox && route.params && route.params.transfer && <Button
                    style={styles.floatButton_team}
                    mode="contained"
                    onPress={() => setVisibleTransfer(true)}
                >
                    Chuyển
                </Button>}

                {visibleCheckBox && route.params && route.params.useid && <Button
                    style={styles.floatButton_team}
                    mode="contained"
                    onPress={handleAddContactsToGroups}
                >
                    Thêm vào nhóm
                </Button>}
                <ModalActivate visible={visible} onPressVisable={() => setVisible(false)} onPressSubmit={handleReactivate} />
                <ModalTransfer visible={visibleTransfer} onPressVisable={() => setVisibleTransfer(false)} onPressSubmit={handleTransfer} />
            </View>
        </SafeAreaView>
    );
};

//make this component available to the app
export default SearchContact;
