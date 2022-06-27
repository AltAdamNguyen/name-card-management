//import liraries
import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../../../screen/ViewContact/styles';

// create a component
const BottomSheetContact = ({visible,onPressUpdate,onPressVisible}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={onPressVisible}>
                <TouchableWithoutFeedback >
                    <View style={styles.modelViewFloat}>
                        <View>
                            <Button icon="account-multiple-plus-outline" color='#000000' labelStyle={{ fontSize: 25 }} style={{ alignItems: 'flex-start', width: '100%' }}>
                                <Text style={{ fontSize: 14 }}>Thêm nhóm</Text>
                            </Button>
                            <Button
                                icon="account-edit-outline"
                                color='#000000'
                                labelStyle={{ fontSize: 25 }}
                                style={{ alignItems: 'flex-start' }}
                                onPress={onPressUpdate}
                            >
                                <Text style={{ fontSize: 14 }}>Sửa thông tin</Text>
                            </Button>
                            <Button icon="account-minus-outline" color='#000000' labelStyle={{ fontSize: 25 }} style={{ alignItems: 'flex-start' }}>
                                <Text style={{ fontSize: 14 }}>Vô hiệu hoá danh thiếp</Text>
                            </Button>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};


//make this component available to the app
export default BottomSheetContact;
