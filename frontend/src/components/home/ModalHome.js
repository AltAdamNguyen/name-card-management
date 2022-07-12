import * as React from "react";
import { useContext, useState } from "react";
import i18next from "../../language/i18n";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import {Modal,TouchableOpacity,TouchableWithoutFeedback,View,Text,Alert} from "react-native";
import { Button, Card } from "react-native-paper";
import styles from "../../screen/Home/styles";

const ModalHome = ({ visible, onPressVisable, sort, onPressSort, onPressDeactive, onPressTranfer }) => {
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  const listSort = [
    {
      name: "date",
      title:  t("Screen_Home_ModalHome_Button_ListSort_Date"),
      icon: "calendar-range",
      value: "create_date",
    },
    {
      name: "name",
      title: t("Screen_Home_ModalHome_Button_ListSort_Name"),
      icon: "account-outline",
      value: "name",
    },
    {
      name: "company",
      title: t("Screen_Home_ModalHome_Button_ListSort_Company"),
      icon: "office-building-outline",
      value: "company",
    },
  ];
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onPressVisable}>
      <View style={{alignItems: 'center', flex: 1}}>
        <TouchableWithoutFeedback>

          <Card elevation={5} style={styles.modelViewFloat}>
            <View style={styles.mb10}>
              <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>
                {t("Screen_Home_ModalHome_Text_Label_Sort")}
              </Text>
              <View style={styles.modalFloatSort}>
                {listSort.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      icon={item.icon}
                      color={item.value == sort ? "#1890FF" : "#828282"}
                      labelStyle={{ fontSize: 16 }}
                      mode="outlined"
                      style={{ alignItems: "flex-start" }}
                      onPress={() => onPressSort(item)}
                    >
                      <Text style={{ fontSize: 12 }}>{item.title}</Text>
                    </Button>
                  );
                })}
              </View>
            </View>
            <View>
              <Text style={[styles.modalLabel, styles.Bold, styles.mb10]}>
                {t("Screen_Home_ModalHome_Text_Label_Manage")}
              </Text>
              <View>
                <Button
                  icon="account-plus-outline"
                  color="#000000"
                  labelStyle={{ fontSize: 25 }}
                  style={{ alignItems: "flex-start" }}
                  uppercase={false}
                >
                  <Text style={{ fontSize: 14 }}>
                    {t("Screen_Home_ModalHome_Text_Label_AddNameCard")}
                  </Text>
                </Button>
                <Button
                  icon="export"
                  color="#000000"
                  labelStyle={{ fontSize: 25 }}
                  style={{ alignItems: "flex-start" }}
                  uppercase={false}
                >
                  <Text style={{ fontSize: 14 }}>
                    {t("Screen_Home_ModalHome_Text_Label_Export")}
                  </Text>
                </Button>
                <Button
                  icon="swap-horizontal"
                  color="#000000"
                  labelStyle={{ fontSize: 25 }}
                  style={{ alignItems: "flex-start" }}
                  uppercase={false}
                  onPress={onPressTranfer}
                >
                  <Text style={{ fontSize: 14 }}>
                    {t("Screen_Home_ModalHome_Text_Label_TransferNamecard")}
                  </Text>
                </Button>
                <Button
                  icon="account-multiple-minus-outline"
                  color="#000000"
                  labelStyle={{ fontSize: 25 }}
                  style={{ alignItems: "flex-start" }}
                  uppercase={false}
                  onPress={onPressDeactive}
                >
                  <Text style={{ fontSize: 14 }}>
                    {t("Screen_Home_ModalHome_Text_Label_DeactivateList")}
                  </Text>
                </Button>
              </View>
            </View>
          </Card>
        </TouchableWithoutFeedback>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalHome;
