
import { Text, Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../screen/Home/styles';

const ModalFlag = ({ listItem, visible, onPress, onPressVisable }) => {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPressVisable}>
            <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Phân loại</Text>
                    {listItem.map((item, index) => {
                        return (
                            <Button key={index} icon="bookmark" color={item.color} onPress={() => onPress(item)} style={{width: '100%', alignItems: 'flex-start'}}>
                                <Text style={{ color: '#000' }}>{item.title}</Text>
                            </Button>
                        )
                    })}
                </View>
            </TouchableWithoutFeedback>
        </TouchableOpacity>
    </Modal>
    )
}

export default ModalFlag;