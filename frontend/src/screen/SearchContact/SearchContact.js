//import liraries
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';

import { Searchbar, Card, List, IconButton, Button, RadioButton } from 'react-native-paper'
import debounce from 'lodash.debounce';
import styles from '../Home/styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method, TeamAPI } from '../../constants/ListAPI';

import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalActivate from '../../components/searchcontact/ModalActivate';
import Contact from '../../components/searchcontact/Contact';

// create a component
const SearchContact = ({ navigation, route }) => {
    const [listContact, setListContact] = useState([]);
    const [listFilter, setListFilter] = useState([]);
    const [listGroup, setListGroup] = useState([]);
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
    const [visibleCheckBox, setVisibleCheckBox] = useState(false);
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
        !route.params && navigation.navigate('HomeSwap', { screen: 'ViewContact', params: { idContact: id } })
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

    const handleAddContactsToGroups = () => {
        let selectedContactIds = []
        for (let i = 0; i < listGroup.length; i++) {
            selectedContactIds.push({ contact_id: listGroup[i]})
        }
        navigation.navigate("HomeSwap", {
            screen: "AddContactToManyGroup",
            params: { id: [...selectedContactIds] , userId: route.params.useid}
        });
    }

    const addContactToManyGroupAPICallBack = (data) => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {route.params && route.params.useid &&
                    <View style={styles.header_title}>
                        <View style={styles.header_title_left}>
                            <IconButton icon="arrow-left" size={26} onPress={() => navigation.goBack()} />
                            <Text>Đặng Vũ Hoàng Trung</Text>
                        </View>
                        <Button
                            onPress={() => setVisibleCheckBox(!visibleCheckBox)}
                        >Thêm
                        </Button>
                        <Button
                            onPress={handleSelectAll}
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
                        return (
                            <Contact key={index} item={item} route={route} handleViewContact={handleViewContact} checkListGroup={checkListGroup} handleReActivateButton={handleReActivateButton} listGroup={listGroup} visibleCheckBox={visibleCheckBox} />
                        )
                    })}
                </ScrollView>
                {visibleCheckBox && <Button style={styles.floatButton_team} onPress={handleAddContactsToGroups} mode="contained">Add to group</Button>}
                <ModalActivate visible={visible} onPressVisable={() => setVisible(false)} onPressSubmit={handleReactivate} />
            </View>
        </SafeAreaView>
    );
};

//make this component available to the app
export default SearchContact;
