import * as React from "react";
import { useContext, useState, useEffect } from "react";
import i18next from "../../language/i18n";
import AuthContext from "../../store/AuthContext";
import { useTranslation } from "react-i18next";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import styles from "../../screen/Home/styles";
import ConfirmDialog from "../customDialog/dialog/confirmDialog/ConfirmDialog";
import InputDialog from "../customDialog/dialog/inputDialog/InputDialog";
const ModalGroupContactDetail = ({
  visible,
  onPressVisable,
  onPressAddContact,
  onPressDeleteGroup,
  onDataReturn,
  onDismiss,
  onPressChangeGroupName,
  groupContactId,
  groupContactName,
  route
}) => {
  const [dialogDeleteGroupConfirmVisible, setDialogDeleteGroupConfirmVisible] = useState(false);
  const [dialogChangeGroupNameVisible, setDialogChangGroupNameVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  const [groupName, setGroupName] = useState(groupContactName);
  useEffect(() => {
    setDialogDeleteGroupConfirmVisible(false);
  }, []);

  useEffect(() => {
    setDialogChangGroupNameVisible(false);
  }, []);

  const onPressConfirmDialog = () => {
    setDialogDeleteGroupConfirmVisible(false);
  };

  const handleChange = (name) => {   
        setGroupName(name);
  }

  return (
    <Portal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
        onDismiss={onDismiss}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={onPressVisable}>
          <TouchableWithoutFeedback>
            <View style={styles.modelViewFloat}>
              <View>
                <View>
                  <Button
                    icon="account-plus-outline"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                    onPress={onPressAddContact}
                  >
                    <Text style={{ fontSize: 14 }}>Thêm danh thiếp</Text>
                  </Button>
                  <Button
                    icon="export"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 14 }}>Xuất thông tin</Text>
                  </Button>
                  <Button
                    icon="swap-horizontal"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                    onPress={() => {
                      setDialogChangGroupNameVisible(true);
                      onPressChangeGroupName()
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>Đổi tên nhóm</Text>
                  </Button>
                  <Button
                    icon="account-multiple-minus-outline"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                  >
                    <Text style={{ fontSize: 14 }}>Xóa danh thiếp</Text>
                  </Button>
                  <Button
                    icon="account-multiple-minus-outline"
                    color="#000000"
                    labelStyle={{ fontSize: 25 }}
                    style={{ alignItems: "flex-start" }}
                    onPress={() => {
                      setDialogDeleteGroupConfirmVisible(true);
                      setDialogTitle("Bạn chắc chắn muốn xóa nhóm này không?");
                      onPressDeleteGroup();
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>Xóa nhóm</Text>
                  </Button>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <ConfirmDialog
        onVisible={dialogDeleteGroupConfirmVisible}
        label={dialogTitle}
        leftButtonTitle={"Hủy"}
        rightButtonTitle={"Xóa"}
        onDismiss={() => setDialogDeleteGroupConfirmVisible(false)}
        onPressConfirm={() => {
          setDialogDeleteGroupConfirmVisible(false);
          onDataReturn({ function: "delete" });
        }}
        onPressCancel={() => {
          setDialogDeleteGroupConfirmVisible(false);
        }}
       
      />
      <InputDialog
        onVisible={dialogChangeGroupNameVisible}
        title="Đổi tên nhóm"
        leftButtonTitle="Hủy"
        rightButtonTitle="Đổi"
        value = {groupName}
        setValue = {(name) => handleChange(name)}
        onDismiss={() => {
          setDialogChangGroupNameVisible(false);
        }}
        onPressCancel= {() => {
            setDialogChangGroupNameVisible(false)
        }}
        onPressConfirm={() => {
            setDialogChangGroupNameVisible(false)
            onDataReturn({ function: "delete" });
            console.log("abc")
        }}
      />
    </Portal>
  );
};

export default ModalGroupContactDetail;
