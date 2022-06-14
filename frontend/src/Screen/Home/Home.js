//import liraries
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, ScrollView, Modal, Pressable, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';

import iconPath from '../../constants/iconPath';
import imgPath from '../../constants/imgPath';
// create a component
const listFlag = [
    {
        name: 'very-important',
        title: 'Rất quan trọng',
        icon: iconPath.icBookMark,
        color: '#EB5757',
        background: 'rgba(235, 87, 87, 0.2)',
        value: 1
    },
    {
        name: 'important',
        title: 'Quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2994A',
        background: 'rgba(242, 153, 74, 0.2)',
        value: 2
    },
    {
        name: 'not important',
        title: 'Không quan trọng',
        icon: iconPath.icBookMark,
        color: '#F2C94C',
        background: 'rgba(242, 201, 76, 0.2)',
        value: 3
    },
    {
        name: 'dont-care',
        title: 'Không quan tâm',
        icon: iconPath.icBookMark,
        color: '#2D9CDB',
        background: 'rgba(45, 156, 219, 0.2)',
        value: 4
    },
]

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

const Home = ({ navigation }) => {

    const [countContact, setContContact] = useState(0);
    const [text, setText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState();
    const [sort, setSort] = useState(1);

    const handlePressButtonFlag = (item) => {
        setModalVisible(!modalVisible);
        setFlag(item);
    }

    const deleteFlag = () => {
        setFlag()
    }

    const changeTextButtonFlag = (flag) => {
        if (flag) {
            return (
                <View style={styles.buttonFlag}>
                    <View style={[{ backgroundColor: flag.background }, styles.sectionFlag]}>
                        <Text style={[styles.labelFlag, { color: flag.color }]}>{flag.title}</Text>
                        <TouchableOpacity onPress={() => { deleteFlag() }} activeOpacity={1}>
                            <Image source={iconPath.icClose} style={{ tintColor: flag.color }} />
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <Image source={iconPath.icSearch} style={styles.icSearch} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm thông tin"
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <TouchableOpacity
                        style={styles.closeButtonParent}
                        onPress={() => setText("")}
                    >
                        <Image
                            style={styles.buttongray3}
                            source={iconPath.icClose}
                        />
                    </TouchableOpacity>
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
                                        {listFlag.map((item, index) => {
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
                <ScrollView>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => { navigation.navigate('ViewContact') }}>
                                <View style={styles.item}>
                                    <View style={styles.imgContact}>
                                        <Image source={imgPath.imgContact} style={styles.image} />
                                    </View>
                                    <View style={styles.txtContact}>
                                        <View style={styles.title}>
                                            <Text style={styles.nameContact}>Đặng Vũ Hoàng Trung</Text>
                                            <Image source={iconPath.icBookMark} />
                                        </View>
                                        <Text style={styles.titleContact}>Nhóm trưởng</Text>
                                        <View style={styles.title}>
                                            <Text style={styles.companyContact}>Đại học FPT</Text>
                                            <Text style={styles.date}>30 - 05 - 2022</Text>
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
