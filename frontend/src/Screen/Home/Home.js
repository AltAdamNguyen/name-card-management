//import liraries
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, ScrollView, Modal, Pressable, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';

import iconPath from '../../constants/iconPath';
import imgPath from '../../constants/imgPath';
// create a component
const Home = ({ navigation }) => {

    const [countContact, setContContact] = useState(0);
    const [text, setText] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [flag, setFlag] = useState();

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
                        <TouchableOpacity onPress={() => { deleteFlag() }}>
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

    const handlePressFloatButton = () => {
        console.log('press')

    }

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <Image source={iconPath.icSearch} style={styles.iconSearch} />
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
                            style={styles.closeButton}
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
                    <TouchableOpacity onPress={() => { navigation.navigate('ViewContactScreen') }}>
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
                </ScrollView>
                <View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalFloatVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setModalFloatVisible(!modalVisible);
                        }}>
                        <TouchableOpacity style={styles.containerOverlay} onPress={() => setModalFloatVisible(!modalVisible)}>
                            <TouchableWithoutFeedback >
                                <View style={styles.modalView}>
                                    <View>
                                        <Text>Sắp xếp</Text>
                                        <View>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icDate} />
                                                    <Text>Ngày</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icUser} />
                                                    <Text>Tên</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icOffice} />
                                                    <Text>Công ty</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>Quản lí</Text>
                                        <View>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icUserAdd} />
                                                    <Text>Thêm danh thiếp</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icExport} />
                                                    <Text>Xuất thông tin</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icSwap} />
                                                    <Text>Chuyển danh thiếp</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <View>
                                                    <Image source={iconPath.icUserDelete} />
                                                    <Text>Vô hiệu hoá danh thiếp</Text>
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

            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default Home;
