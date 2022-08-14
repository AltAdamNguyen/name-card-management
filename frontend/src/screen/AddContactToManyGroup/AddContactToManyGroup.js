//import liraries
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert
} from "react-native";
import { StackActions } from "@react-navigation/native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import { Searchbar, Provider, Button } from "react-native-paper";
import ModalAddGroup from "../../components/groupcontact/ModalAddGroup";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import AuthContext from "../../store/AuthContext";

const AddContactToManyGroup = ({ route, navigation }) => {
  const isFocus = useIsFocused();
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext);
  const [listGroupContact, setLisGroupContact] = useState([]);
  const [listGroupContactTotal, setListGroupContactTotal] = useState([]);
  const [listGroupSearch, setListGroupSearch] = useState([]);
  const inputGroupName = {
    group_name: "",
  }
  const [choosenItems, setChoosenItems] = useState(0);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [modalAddContactVisible, setModalAddContactVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const onAddNewGroupContactPressed = (value) => {
    setIsLoading(true);
    setModalAddContactVisible(false);
    FetchApi(
      GroupContactAPI.AddGroupContact,
      Method.POST,
      ContentType.JSON,
      value,
      addGroupContact
    );
  };

  const addGroupContact = (status, data) => {
    authCtx.checkToken()
    if (status && data && data.message == "Success") {
      FetchApi(
        GroupContactAPI.ViewGroupContact,
        Method.GET,
        ContentType.JSON,
        undefined,
        getGroupContact
      );
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
    setIsLoading(false);
  };

  const searchGroupHandle = (groupName) => {
    let listSearchGroup = [];
    if (groupName !== "") {
      listGroupContactTotal.map((item, index) => {
        if (
          item.group.group_name != null &&
          item.group.group_name.toLowerCase().includes(groupName.toLowerCase())
        ) {
          listSearchGroup.push(item);
        }
      });
      setListGroupSearch(listSearchGroup);
      setLisGroupContact([]);
    } else {
      setLisGroupContact(listGroupContactTotal);
      setListGroupSearch([]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    );
  }, [isFocus]);

  const getGroupContact = (status, data) => {
    if(status && data){
      if (data.data.length > 0) {
        if (listGroupContactTotal.length > 0) {
          setListGroupSearch([]);
          setLisGroupContact([
            ...listGroupContactTotal,
            { isChecked: false, group: data.data[data.data.length - 1] },
          ]);
          setListGroupContactTotal([
            ...listGroupContactTotal,
            { isChecked: false, group: data.data[data.data.length - 1] },
          ]);
        } else {
          let initListGroup = [];
          data.data.map((item, index) => {
            initListGroup.push({ isChecked: false, group: item });
          });
          setLisGroupContact(initListGroup);
          setListGroupContactTotal(initListGroup);
        }
      }
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }  
    setIsLoading(false);
  };

  const checkBoxOnClickCallBack = (id, check) => {
    if (check) {
      updateStateForListGroup(id, true);
      setChoosenItems(choosenItems + 1);
    } else {
      updateStateForListGroup(id, false);
      setChoosenItems(choosenItems - 1);
    }
  };

  const updateStateForListGroup = (id, check) => {
    let newState = [...listGroupContactTotal];
    let index = newState.findIndex((el) => el.group.group_id === id);
    newState[index] = { ...newState[index], isChecked: check };
    setListGroupContactTotal(newState);
    if (listGroupSearch.length == 0) {
      let newState = [...listGroupContact];
      let index = newState.findIndex((el) => el.group.group_id === id);
      newState[index] = { ...newState[index], isChecked: check };
      setLisGroupContact(newState);
    } else {
      let newState = [...listGroupSearch];
      let index = newState.findIndex((el) => el.group.group_id === id);
      newState[index] = { ...newState[index], isChecked: check };
      setListGroupSearch(newState);
    }
  };

  const addContactToManyGroupAPICallBack = (status, data) => {
    if(status && data){
      if (route.params.isTeam) {
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate("Bottom", { screen: "GroupContact", params: { isSuccess: true} })
      }
      else{
        navigation.goBack();
      }    
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
  };

  const AddContactToManyGroup = () => {
    let selectedGroupIds = [];
    for (let i = 0; i < listGroupContactTotal.length; i++) {
      if (listGroupContactTotal[i].isChecked == true) {
        selectedGroupIds.push({
          group_id: listGroupContactTotal[i].group.group_id,
        });
      }
    }
    setConfirmDialogVisible(false);
    FetchApi(
      GroupContactAPI.AddContactsToGroup,
      Method.POST,
      ContentType.JSON,
      {
        user_id: route.params.userId,
        contact_ids: route.params.id,
        group_ids: [...selectedGroupIds],
      },
      addContactToManyGroupAPICallBack
    );
  };

  return (
    <Provider>
      <View style={styles.container_provider}>
        <Appbar.Header
          statusBarHeight={1}
          theme={{ colors: { primary: "transparent" } }}
        >
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content
            title={t("Screen_AddContactToManyGroup_Appbar_Content_Title_AddToGroup")}
          />
          <TouchableOpacity></TouchableOpacity>
        </Appbar.Header>
      </View>
      <Loading onVisible={isLoading ? true : false} />
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
          <Text style={styles.container_title_label}>
            {t("Screen_AddContactToManyGroup_Title_MyGroups")}
          </Text>
          <TouchableOpacity onPress={() => setModalAddContactVisible(true)}>
            <Text style={styles.container_label_addNewGroup}>
              {t("Screen_AddContactToManyGroup_Title_AddGroup")}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container_listGroup}>
          {listGroupContact.length == 0 && listGroupSearch.length == 0 && (
            <View style={styles.listContainer_view}>
              <Text style={styles.listContainer_label}>
                {t("Screen_AddContactToManyGroup_ListGroup_NoGroupFound")}
              </Text>
            </View>
          )}
          <ScrollView>
            {listGroupSearch.length != 0 &&
              listGroupSearch.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      checkBoxOnClickCallBack(
                        item.group.group_id,
                        !item.isChecked
                      );
                    }}
                  >
                    <View style={styles.container_listGroup_item}>
                      <CustomCheckedBox
                        id={item.group.group_id}
                        onClick={checkBoxOnClickCallBack}
                        isChecked={item.isChecked}
                      />
                      <Text style={styles.container_listGroup_item_label} numberOfLines={1}>
                        {item.group.group_name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            {listGroupContact.length != 0 &&
              listGroupContact.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      checkBoxOnClickCallBack(
                        item.group.group_id,
                        !item.isChecked
                      );
                    }}
                  >
                    <View style={styles.container_listGroup_item}>
                      <CustomCheckedBox
                        id={item.group.group_id}
                        onClick={checkBoxOnClickCallBack}
                        isChecked={item.isChecked}
                      />
                      <Text style={styles.container_listGroup_item_label}>
                        {item.group.group_name}
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
                ? styles.bottomButtonDisable
                : styles.bottomButtonEnable
            }
            labelStyle={{ color: "white" }}
            disabled={choosenItems == 0 ? true : false}
            onPress={() => {
              setConfirmDialogVisible(true);
            }}
            uppercase={false}
          >
            {t("Screen_AddContactToManyGroup_Button_AddContact")}
          </Button>
        </View>
      </SafeAreaView>
      <ModalAddGroup
        visible={modalAddContactVisible}
        value={inputGroupName}
        onPressSubmit={onAddNewGroupContactPressed}
        onPressVisable={() => setModalAddContactVisible(!modalAddContactVisible)}
        title={t("ModalAddGroup_Title")}
        label={t("ModalAddGroup_Input_Title_GroupName")}
        placeholder={t("ModalAddGroup_Input_Placeholder_GroupName")}
        cancel={t("ModalAddGroup_Button_Cancel")}
        submit={t("ModalAddGroup_Button_Confirm")}
      />
      <ConfirmDialog
        visible={confirmDialogVisible}
        title={t("Screen_AddContactToManyGroup_ConfirmDialog_Label")}
        leftButtonTitle={t("Screen_AddContactToManyGroup_ConfirmDialog_LeftButtonTitle")}
        rightButtonTitle={t("Screen_AddContactToManyGroup_ConfirmDialog_RightButtonTitle")}
        onPressVisable={() => setConfirmDialogVisible(false)}
        onPressConfirm={AddContactToManyGroup}
      />
    </Provider>
  );
};

export default AddContactToManyGroup;
