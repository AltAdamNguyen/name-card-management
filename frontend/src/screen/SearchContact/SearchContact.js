//import liraries
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Searchbar } from 'react-native-paper'
import debounce from 'lodash.debounce';
import styles from '../Home/styles';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';
import { FormatDate } from '../../validate/FormatDate';

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
// create a component
const SearchContact = ({navigation, route}) => {
    const [listFilter, setListFilter] = useState([]);
    const [text, setText] = useState("");
    const textInputRef = useRef();

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    const SearchApi = (value) => {
        FetchApi(`${ContactAPI.SearchContact}?type=home&value=${value}`,Method.GET,ContentType.JSON,undefined,getContact)
    }

    const getContact = (data) => {
        setListFilter(data.data)
    }
    const debounceSearch = useCallback(debounce((nextValue) => SearchApi(nextValue), 500), [])
    const handleSearch = (value) => {
        setText(value);
        debounceSearch(value);
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
                                            {/* {item.flag !== null &&
                                                <Icon name="bookmark" size={24} color={listFlag[item.flag].color} />
                                            } */}
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
        </SafeAreaView>
    );
};

//make this component available to the app
export default SearchContact;
