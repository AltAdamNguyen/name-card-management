import {Text,Modal,TouchableWithoutFeedback, Pressable} from "react-native";
import { Button, Card } from "react-native-paper";
import styles from "../../screen/Home/styles";
import i18next from "../../language/i18n"; 
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import React, { useContext, useState } from "react";
const ModalFlag = ({ listItem, visible, onPress, onPressVisable }) => {
   const { t, i18n } = useTranslation();
   const authCtx = useContext(AuthContext)
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onPressVisable()
      }}
    >
      <Pressable
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        onPress={onPressVisable}
      >
        <TouchableWithoutFeedback>
          <Card elevation={3} style={styles.modalView}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>{t("Screen_Home_ModalFlag_Text_Classify")}</Text>
            {listItem.map((item, index) => {
              return (
                <Button
                  key={index}
                  icon="bookmark"
                  color={item.color}
                  onPress={() => onPress(item)}
                  style={{ width: "100%", alignItems: "flex-start" }}
                  uppercase={false}
                >
                  <Text style={{ color: "#000", fontWeight: 'normal' }}>{item.title}</Text>
                </Button>
              );
            })}
          </Card>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default ModalFlag;
