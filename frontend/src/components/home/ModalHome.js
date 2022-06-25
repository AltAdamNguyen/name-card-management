import * as React from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../screen/Home/styles';
const listSort = [
    {
        name: 'date',
        title: 'Ngày',
        icon: "calendar-range",
        value: 'create_date'
    },
    {
        name: 'name',
        title: 'Tên',
        icon: "account-outline",
        value: 'name'
    },
    {
        name: 'company',
        title: 'Công ty',
        icon: "office-building-outline",
        value: 'company'
    },
]

const ModalHome = ({ visible, onPressVisable, sort, onPressSort }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onPressVisable}>
                <TouchableWithoutFeedback >
                    <View style={styles.modelViewFloat}>
                        <View style={styles.mb10}>
                            <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>Sắp xếp</Text>
                            <View style={styles.modalFloatSort}>
                                {listSort.map((item, index) => {
                                    return (
                                        <Button
                                            key={index}
                                            icon={item.icon}
                                            color={item.value == sort?"#1890FF":"#828282"}
                                            labelStyle={{ fontSize: 16 }}
                                            mode='contained'
                                            style={{ alignItems: 'flex-start' }}
                                            onPress={() => onPressSort(item)}
                                        >
                                            <Text style={{ fontSize: 12 }}>{item.title}</Text>
                                        </Button>
                                    )
                                })}

                            </View>
                        </View>
                        <View>
                            <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>Quản lí</Text>
                            <View>
                                <Button
                                    icon="account-plus-outline"
                                    color='#000000'
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: 'flex-start' }}
                                >
                                    <Text style={{ fontSize: 14 }}>Thêm danh thiếp</Text>
                                </Button>
                                <Button
                                    icon="export"
                                    color='#000000'
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: 'flex-start' }}
                                >
                                    <Text style={{ fontSize: 14 }}>Thêm danh thiếp</Text>
                                </Button>
                                <Button
                                    icon="swap-horizontal"
                                    color='#000000'
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: 'flex-start' }}
                                >
                                    <Text style={{ fontSize: 14 }}>Chuyển danh thiếp</Text>
                                </Button>
                                <Button
                                    icon="account-multiple-minus-outline"
                                    color='#000000'
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: 'flex-start' }}
                                >
                                    <Text style={{ fontSize: 14 }}>Danh sách vô hiệu hoá</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalHome;