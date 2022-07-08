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

const InputDialog = ({onVisible, label, value, setValue, leftButtonTitle, rightButtonTitle, onPress, onDismiss, icon, title, onPressCancel, onPressConfirm}) => {
    const [inputVal, setInputVal] = useState("");

  return (
    <Portal>
      <Dialog visible={onVisible}  style={{ borderRadius: 10 }} onDismiss={onDismiss}>
        <Dialog.Title style={styles.title}>{title}</Dialog.Title>
        <Dialog.Content>
        <TextInput
          mode='outlined'
          label={label}
          onChangeText={setValue}
          value={value}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
          right={<TextInput.Icon name={icon} onPress={onPress } />}
        />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="red"  onPress={onPressCancel}>
          {leftButtonTitle}
          </Button>
          <Button color="#1890FF" onPress={onPressConfirm}>
          {rightButtonTitle}
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
export default InputDialog;
