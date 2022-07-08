//import liraries
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import iconPath from "../../constants/iconPath";
import styles from "./styles";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from "../../store/AuthContext";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import {
  IconButton,
  Searchbar,
  FAB,
  Portal,
  Dialog,
  RadioButton,
  Provider,
  Button,
} from "react-native-paper";
import ModalAddGroupContact from "../../components/groupcontact/ModalAddGroupContact";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from "@react-navigation/native";
import { Checkbox, Appbar } from "react-native-paper";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
const AddContactToManyGroup = ({ route, navigation }) => {
  const [checked, setChecked] = React.useState(false);
  const isFocus = useIsFocused();
  const [listGroupContact, setLisGroupContact] = useState([]);
  const [listGroupContactTotal, setListGroupContactTotal] = useState([]);
  const [choosenItems, setChoosenItems] = useState(0);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [modalAddContactVisible, setModalAddContactVisible] = useState(false);

  const onAddNewGroupContactPressed = (groupName) => {
    setModalAddContactVisible(false);
    FetchApi(
      GroupContactAPI.AddGroupContact,
      Method.POST,
      ContentType.JSON,
      { group_name: groupName },
      addGroupContact
    );
  };

  const addGroupContact = (data) => {
    if (data.message == "Success") {
      FetchApi(
        GroupContactAPI.ViewGroupContact,
        Method.GET,
        ContentType.JSON,
        undefined,
        getGroupContact
      );
    } else {
    }
  };
  const searchGroupHandle = (groupName) => {
    let listSearchGroup = [];
    if (groupName !== "") {
      listGroupContactTotal.map((item, index) => {
        if (item.group_name.includes(groupName)) {
          listSearchGroup.push(item);
        }
      });
      setLisGroupContact(listSearchGroup);
    } else {
      setLisGroupContact(listGroupContactTotal);
    }
  };

  useEffect(() => {
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    );
  }, []);

  useEffect(() => {
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    );
  }, [isFocus]);

  const getGroupContact = (data) => {
    if (data.data.length > 0) {
      setLisGroupContact(data.data);
      setListGroupContactTotal(data.data);
      // setLoading(false);
    }
  };
  return (
    <Provider>
      <View style={styles.container_provider}>
        <Appbar.Header
          statusBarHeight={1}
          theme={{ colors: { primary: "transparent" } }}
        >
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Thêm vào nhóm" />
          <TouchableOpacity></TouchableOpacity>
        </Appbar.Header>
      </View>

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.sectionStyle}>
            <Searchbar
              placeholder="Search Group"
              theme={{
                roundness: 10,
                colors: { primary: "#1890FF" },
              }}
              editable={true}
              onChangeText={(text) => searchGroupHandle(text)}
            />
          </Pressable>
        </View>
        <View style={styles.container_title}>
          <Text style={styles.container_title_label}>Nhóm của tôi</Text>
          <TouchableOpacity onPress={() => setModalAddContactVisible(true)}>
            <Text style={styles.container_label_addNewGroup}>
              + Thêm Nhóm
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_listGroup}>
          {listGroupContact.length == 0 && (
            <View style={styles.listContainer_view}>
              <Text style={styles.listContainer_label}>Không có nhóm</Text>
            </View>
          )}
          <ScrollView>
            {listGroupContact.length != 0 &&
              listGroupContact.map((item, index) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.container_listGroup_item}>
                      <Checkbox
                        status={checked ? "checked" : "unchecked"}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                        style={styles.checkBox}
                      />
                      <Text style={styles.container_listGroup_item_label}>
                        {item.group_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button
            style={
              choosenItems == 0
                ? styles.bottomButtonEnable
                : styles.bottomButtonEnable
            }
            labelStyle={{ color: "white" }}
            disabled={choosenItems == 0 ? false : false}
            onPress={() => {
              setConfirmDialogVisible(true);
            }}
          >
            Thêm
          </Button>
        </View>
      </SafeAreaView>
      <ModalAddGroupContact
        label="Tên nhóm"
        confirmLabel="Thêm"
        onVisible={modalAddContactVisible}
        onDismiss={() => setModalAddContactVisible(false)}
        onPressCancel={() => setModalAddContactVisible(false)}
        onPressConfirm={onAddNewGroupContactPressed}
      />
      <ConfirmDialog
        onVisible={confirmDialogVisible}
        label={"Bạn muốn thêm liên hệ này vào những nhóm đã chọn không?"}
        leftButtonTitle={"Hủy"}
        rightButtonTitle={"Thêm"}
        onDismiss={() => {
          setConfirmDialogVisible(false);
        }}
        onPressConfirm={() => {
          setConfirmDialogVisible(false);
        }}
        onPressCancel={() => {
          setConfirmDialogVisible(false);
        }}
      />
    </Provider>
  );
};

export default AddContactToManyGroup;
