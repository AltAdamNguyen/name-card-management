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
import { useTranslation } from "react-i18next";
import i18next from "../../language/i18n";

const ModalAddGroupContact = ({onVisible, label, value, confirmLabel, context, onPress, onDismiss, icon, onPressCancel, onPressConfirm}) => {
    const [inputVal, setInputVal] = useState("");
    const { t, i18n } = useTranslation();
    const onCancelPress = () => {
      onVisible = false;
      setInputVal("")
    }
  return (
    <Portal>
      <Dialog visible={onVisible}  style={{ borderRadius: 10, alignContent: 'center' }} onDismiss={() => {onDismiss(); setInputVal("")}}>
        <Dialog.Title style={styles.title}>{t("ModalAddGroupContact_Title")}</Dialog.Title>
        <Dialog.Content>
        <TextInput
          mode='outlined'
          label={label}
          onChangeText={text => setInputVal(text)}
          value={inputVal}
          style={styles.input}
          theme={{ roundness: 10, colors: { primary: '#1890FF', error: '#B22D1D' } }}
          right={<TextInput.Icon name={icon} onPress={onPress } />}
        />
        </Dialog.Content>
        <Dialog.Actions>
          <Button color="red"  onPress={() => {onPressCancel(); setInputVal("")}}>
          {t("ModalAddGroupContact_Label_Cancel")}
          </Button>
          <Button color="#1890FF" onPress={() => {onPressConfirm(inputVal); setInputVal("")}}>
          {confirmLabel}
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
