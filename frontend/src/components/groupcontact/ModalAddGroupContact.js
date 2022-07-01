import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  TextInput
} from "react-native-paper";

const ModalAddGroupContact = ({onVisible, label, value, context, onPress, onDismiss, icon, onPressCancel, onPressConfirm}) => {
    const [inputVal, setInputVal] = useState('test');
    
  return (
    <Portal>
      <Dialog visible={onVisible}  style={{ borderRadius: 10 }} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>Thêm tên nhóm</Dialog.Title>
        <Dialog.Content>
        <TextInput
          mode='outlined'
          label="Tên nhóm"
          onChangeText={setInputVal}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
          right={<TextInput.Icon name={icon} onPress={onPress} />}
        />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="red"  onPress={onPressCancel}>
          Hủy
          </Button>
          <Button color="#1890FF" onPress={onPressConfirm}>
          Thêm
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
    input:{
      width: '100%',
      marginBottom: 5,
      backgroundColor: 'white'
    },
    title: {
        paddingLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
    },
  });
export default ModalAddGroupContact;
