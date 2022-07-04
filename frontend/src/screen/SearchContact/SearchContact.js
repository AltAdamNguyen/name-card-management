//import liraries
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar, Card, IconButton } from 'react-native-paper'
import debounce from 'lodash.debounce';
import styles from '../Home/styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method, TeamAPI } from '../../constants/ListAPI';
import { FormatDate } from '../../validate/FormatDate';
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import ModalActivate from '../../components/searchcontact/ModalActivate';
const listFlag = {
    F0001: {
        name: 'very-important',
        title: 'Rất quan trọng',
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 'F0001',
    },
    F0002: {
        name: 'important',
        title: 'Quan trọng',
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 'F0002',
    },
    F0003: {
        name: 'not-important',
        title: 'Không quan trọng',
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 'F0003',
    },
    F0004: {
        name: 'dont-care',
        title: 'Không quan tâm',
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 'F0004',
    }
}

const listStatus = {
    S0001: {
        name: 'failed',
        color: '#EB5757',
        value: 'S0001',
    },
    S0002: {
        name: 'ongoing',
        color: '#F2994A',
        value: 'S0002',
    },
    S0003: {
        name: 'success',
        color: '#00C853',
        value: 'S0003',
    }
}
// create a component
const SearchContact = ({ navigation, route }) => {
    console.log(route.params)
    const [listContact, setListContact] = useState([]);
    const [listFilter, setListFilter] = useState([]);
    const [text, setText] = useState("");
    const [visible, setVisible] = useState(false);
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

    const handleReactivate = () => {
        FetchApi(`${ContactAPI.ReactiveContact}/${contactId}`, Method.PATCH, ContentType.JSON, null, getMessage)
    }

    const getMessage = (data) => {
        setVisible(false);
        FetchApi(`${ContactAPI.ListDeactive}`, Method.GET, ContentType.JSON, undefined, getContact)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <Searchbar
                        placeholder="Tìm kiếm danh thiếp"
                        icon="arrow-left"
                        onIconPress={() => navigation.goBack()}
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
                            <Card mode='elevated' style={styles.card} elevation={2} key={index} onPress={() => handleViewContact(item.id)}>
                                <View>
                                    <View style={styles.item}>
                                        <View style={styles.imgContact}>
                                            <Image source={{ uri: item.img_url }} style={styles.image} />
                                        </View>
                                        <View style={styles.txtContact}>
                                            <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                                <Text style={styles.nameContact}>{item.name}</Text>
                                                {!route.params && item.flag_id &&
                                                    <Icon name="bookmark" size={24} color={listFlag[item.flag_id].color} />
                                                }
                                                {route.params && route.params.useid &&
                                                    <Icon name="checkbox-blank-circle" size={14} color={listStatus[item.status_id].color} />
                                                }
                                                {route.params && route.params.deactive &&
                                                    <Icon name="account-reactivate"
                                                        size={24}
                                                        color={"#828282"}
                                                        onPress={() => { 
                                                            setVisible(true) 
                                                            setContactId(item.id)
                                                        }} />
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
                                    {route.params && route.params.deactive &&
                                        <View style={styles.item_reason}>
                                            <Text>Lí do: <Text style={styles.titleContact}>{item.reason_da}</Text></Text>
                                        </View>}
                                </View>

                            </Card>
                        )
                    })}
                </ScrollView>
                <ModalActivate visible={visible} onPressVisable={() => setVisible(false)} onPressSubmit={handleReactivate} />
            </View>
        </SafeAreaView>
    );
};

//make this component available to the app
export default SearchContact;
