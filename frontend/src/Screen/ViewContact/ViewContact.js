//import liraries
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import iconPath from '../../constants/iconPath';
import imgPath from '../../constants/imgPath';
import styles from './styles';

// create a component
const ViewContact = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Text>Back</Text>
                <Text>...</Text>
            </View>
            <View>
                <Image source={imgPath.imgContact} />
            </View>
            <View>
                <View>
                    <Text>Đặng Vũ Hoàng Trung</Text>
                    <Text>Nhóm trưởng</Text>
                    <Text>Đại học FPT</Text>
                </View>
                <View>
                    <Modal>

                    </Modal>
                    <TouchableOpacity>
                        <View>
                            <Text>Phân loại</Text>
                            <Image source={iconPath.icDown} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <View>
                        <Image source={iconPath.icBookMark} />
                        <Text>0912345678</Text>
                    </View>
                    <View>
                        <Image source={iconPath.icBookMark} />
                        <Text>0912345678</Text>
                    </View>
                    <View>
                        <Image source={iconPath.icBookMark} />
                        <Text>user@domain.com</Text>
                    </View>
                    <View>
                        <Image source={iconPath.icBookMark} />
                        <Text>0912345678</Text>
                    </View>
                </View>
                <View>
                    <Text>Địa chỉ</Text>
                    <Text>abc</Text>
                </View>
                <View>
                    <Text>Website</Text>
                    <Text>abc.com</Text>
                </View>
                <View>
                    <Text>Nhóm</Text>
                    <View>
                        <TouchableOpacity>
                            <Image source={iconPath.icGroup} />
                        </TouchableOpacity>
                        <Text>abc.com</Text>
                    </View>
                </View>
                <View>
                    <Text>Trạng thái<Text>Đang chờ</Text></Text>
                    <Text>Lí do</Text>
                </View>
                <View>
                    <Text>Ngày khởi tạo</Text>
                    <Text>Ngày</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};


//make this component available to the app
export default ViewContact;
