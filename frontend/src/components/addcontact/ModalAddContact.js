import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { RadioButton } from 'react-native-paper';
import styles from "./styles";

const ModalAddContact = ({ listItem, title, name, value, visible, onPress, onPressVisable }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible[name]}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                // setModalVisible(!visible[name]);
            }}>
            <TouchableOpacity style={styles.containerOverlay} onPress={() => onPressVisable(name)}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View style={styles.modalView_title}>
                            <Text style={styles.modalView_title_label}>{title}</Text>
                        </View>
                        <View style={styles.modalView_item}>
                            {listItem.map((item, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onPress(item, name)}>
                                        <View style={styles.modalView_item_content}>
                                            <RadioButton
                                                value={item}
                                                status={item == value ? 'checked' : 'unchecked'}
                                                color='#1890FF' 
                                                onPress={() => onPress(item, name)}
                                                />
                                            <Text style={styles.modalView_item_content_label}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalAddContact;