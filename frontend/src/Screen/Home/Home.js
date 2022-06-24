//import liraries
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import styles from './styles';

import iconPath from '../../constants/iconPath';

import { FetchApi } from '../../service/api/FetchAPI';
import { ContactAPI, ContentType, Method } from '../../constants/ListAPI';

// create a component
const listFlag = {
    F0001: {
        name: 'very-important',
        title: 'Rất quan trọng',
        icon: iconPath.icBookMark,
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 'F0001',
    },
    F0002: {
        name: 'important',
        title: 'Quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 'F0002',
    },
    F0003: {
        name: 'not-important',
        title: 'Không quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 'F0003',
    },
    F0004: {
        name: 'dont-care',
        title: 'Không quan tâm',
        icon: iconPath.icBookMark,
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 'F0004',
    }
}

const listSort = [
    {
        name: 'date',
        title: 'Ngày',
        icon: iconPath.icDate,
        value: 1
    },
    {
        name: 'name',
        title: 'Tên',
        icon: iconPath.icUser,
        value: 2
    },
    {
        name: 'company',
        title: 'Công ty',
        icon: iconPath.icOffice,
        value: 3
    },
]

const Home = ({ route, navigation }) => {

    const [countContact, setContContact] = useState(0);
    const [listContact, setListContact] = useState();
    const [listFilter, setListFilter] = useState([]);
    const [text, setText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState();
    const [sort, setSort] = useState(1);

    useEffect(() => {
        FetchApi(ContactAPI.ViewContact, Method.GET, ContentType.JSON, undefined, getContact)
    }, []);

    const getContact = (data) => {
        if (data.data.length > 0) {
            setListContact(data.data);
            setListFilter(data.data);
            setContContact(data.data.length);
        } 
    }

    const handlePressButtonFlag = (item) => {
        setModalVisible(!modalVisible);
        setFlag(item);
        let newList = listContact.filter(items => items.flag == item.value)
        setListFilter(newList); 
    }

    const deleteFlag = () => {
        setFlag()
        setListFilter(listContact);
    }

    const changeTextButtonFlag = (flag) => {
        if (flag) {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: flag.background }, styles.sectionFlag]}>
                        <Text style={[styles.labelFlag, { color: flag.color }]}>{flag.title}</Text>
                        <TouchableOpacity onPress={() => { deleteFlag() }} activeOpacity={1}>
                            <Image source={iconPath.icClose} style={{ tintColor: flag.color, width: 16, height: 16 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.buttonFlag}>
                    <Text style={styles.labelFlag}>Phân loại</Text>
                    <Image source={iconPath.icDown} />
                </View>
            )
        }
    }

    const handlePressSort = (item) => {
        setSort(item.value);
    };

    console.log(listFilter)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <TextInput
                        mode='outlined'
                        dense={true}
                        placeholder='Tìm kiếm danh thiếp'
                        value={text}
                        onChangeText={(value) => setText(value)}
                        left={<TextInput.Icon name="magnify" color="#828282"/>}
                        right={<TextInput.Icon name="close-circle" color="#828282" onPress={() => setText('')}/>}
                        style={styles.input}
                        theme={{ 
                            roundness: 10,
                            colors: {primary: '#1890FF'} 
                        }} 
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.labelList}>Danh thiếp ({countContact})</Text>
                    <View style={styles.flag}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setModalVisible(!modalVisible);
                            }}>
                            <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalVisible(!modalVisible)}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.modalView}>
                                        {Object.values(listFlag).map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.modalItem}
                                                    onPress={() => handlePressButtonFlag(item)}
                                                    key={index}
                                                >
                                                    <Image source={item.icon} style={[{ tintColor: item.color }, styles.modalIcon]} />
                                                    <Text style={styles.modalText}>{item.title}</Text>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </TouchableWithoutFeedback>
                            </TouchableOpacity>
                        </Modal>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            {changeTextButtonFlag(flag)}
                        </TouchableOpacity>
                    </View>
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
                            <TouchableOpacity key={index} onPress={() => { navigation.navigate('ViewContact',{'idContact':item.id}) }}>
                                <View style={styles.item}>
                                    <View style={styles.imgContact}>
                                        <Image source={{ uri: item.img_url }} style={styles.image} />
                                    </View>
                                    <View style={styles.txtContact}>
                                        <View style={styles.title}>
                                            <Text style={styles.nameContact}>{item.name}</Text>
                                            <Image source={iconPath.icBookMark} style={{tintColor: listFlag[item.flag].color}}/>
                                        </View>
                                        <Text style={styles.titleContact}>{item.job_title}</Text>
                                        <View style={styles.title}>
                                            <Text style={styles.companyContact}>{item.company}</Text>
                                            <Text style={styles.date}>{item.created_at}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </ScrollView>
            </View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalFloatVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalFloatVisible(!modalFloatVisible);
                    }}>
                    <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalFloatVisible(!modalFloatVisible)}>
                        <TouchableWithoutFeedback >
                            <View style={styles.modelViewFloat}>
                                <View style={styles.mb10}>
                                    <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>Sắp xếp</Text>
                                    <View style={styles.modalFloatSort}>
                                        {listSort.map((item, index) => {
                                            return (
                                                <TouchableOpacity key={index} onPress={() => handlePressSort(item)}>
                                                    <View style={[styles.modalItem, styles.modalFloatSortItem, { borderColor: item.value == sort ? '#1890FF' : '#828282' }]}>
                                                        <Image source={item.icon} style={[{ tintColor: item.value == sort ? '#1890FF' : '#828282' }, styles.mr10]} />
                                                        <Text style={{ color: item.value == sort ? '#1890FF' : '#828282' }}>{item.title}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                </View>
                                <View>
                                    <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>Quản lí</Text>
                                    <View style={styles.w60}>
                                        <TouchableOpacity>
                                            <View style={[styles.modalFloatMange, styles.mb10]}>
                                                <Image source={iconPath.icUserAdd} style={styles.mr10} />
                                                <Text style={styles.modalLabel}>Thêm danh thiếp</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={[styles.modalFloatMange, styles.mb10]}>
                                                <Image source={iconPath.icExport} style={styles.mr10} />
                                                <Text style={styles.modalLabel}>Xuất thông tin</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={[styles.modalFloatMange, styles.mb10]}>
                                                <Image source={iconPath.icSwap} style={styles.mr10} />
                                                <Text style={styles.modalLabel}>Chuyển danh thiếp</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <View style={[styles.modalFloatMange, styles.mb10]}>
                                                <Image source={iconPath.icUserDelete} style={styles.mr10} />
                                                <Text style={styles.modalLabel}>Vô hiệu hoá danh thiếp</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                <TouchableOpacity style={styles.floatButton} onPress={() => setModalFloatVisible(true)}>
                    <Image source={iconPath.icFilter} style={styles.iconFilter} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default Home;
