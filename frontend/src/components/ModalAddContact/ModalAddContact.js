import { Modal, View, TouchableOpacity, TouchableWithoutFeedback, Text } from "react-native";
import { RadioButton } from 'react-native-paper';
import styles from "./styles";

const ModalAddContact = ({listItem, title, name, value, visible, onPress, onPressVisable}) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                // setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity style={styles.containerOverlay} onPress={() => onPressVisable()}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View>
                            <Text>{title}</Text>
                        </View>
                        {listItem.map((item, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => onPress(item, name)}>
                                    <View style={styles.modalView_item}>
                                        <RadioButton
                                            value={item}
                                            status={item == value ?'checked': 'unchecked'} 
                                            color='#1890FF'/>
                                        <Text>{item}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    )
}

export default ModalAddContact;