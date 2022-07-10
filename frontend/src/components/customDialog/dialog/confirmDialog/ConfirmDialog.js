import React, { useState, useContext, useEffect } from "react";
import styles from "./styles";
import {
  Button,
  Dialog,
  Portal
} from "react-native-paper";
const ConfirmDialog = ({onVisible, label, onDismiss, onPressCancel, onPressConfirm, leftButtonTitle, rightButtonTitle}) => {
  return (
    <Portal>
      <Dialog visible={onVisible}  style={{ borderRadius: 10 , backgroundColor: 'white' }} onDismiss={onDismiss}>
        <Dialog.Title>{label}</Dialog.Title>
        <Dialog.Actions>
          <Button color="red"  onPress={() => {onPressCancel()}}>
            {leftButtonTitle}
          </Button>
          <Button color="#1890FF" onPress={() => {onPressConfirm()}}>
            {rightButtonTitle}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ConfirmDialog