import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const ModalContact = ({ visible, context, onPress, onPressVisable }) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onPressVisable} style={{borderRadius: 10}}>
                <Dialog.Title>{context.title}</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{context.message}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color='#1890FF' onPress={onPressVisable}>{context.cancel}</Button>
                    <Button color='#1890FF'  onPress={onPress}>{context.submit}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default ModalContact;