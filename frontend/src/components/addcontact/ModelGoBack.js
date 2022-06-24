
import styles from "./styles";
import { Button, Paragraph, Dialog, Portal, Provider } from 'react-native-paper';

const ModalAddContact = ({ visible, onPress, onPressVisable }) => {
    return (
        <Provider>
            <View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={hideDialog}>Done</Button>
                            <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </View>
        </Provider>
    )
}

export default ModalAddContact;