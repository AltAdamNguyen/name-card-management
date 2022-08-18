import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import {
  Searchbar,
  Appbar,
  Button,
  Provider,
  Portal,
  HelperText,
} from "react-native-paper";
import { FormatDate } from "../../validate/FormatDate";
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import ConfirmDialog from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";

const AddContactToGroup = ({ navigation, route }) => {
  const [listContact, setListContact] = useState([]);
  const [listContactTotal, setListContactTotal] = useState([]);
  const [listSearch, setListSearch] = useState([]);
  const { t, i18n } = useTranslation();
  const [choosenItems, setChoosenItems] = useState(0);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    FetchApi(
      `${GroupContactAPI.ViewAvailableContactsForGroup}/${route.params.type}/${route.params.id}`,
      Method.GET,
      ContentType.JSON,
      undefined,
      getContactCallBack
    );
  }, []);

  const getContactCallBack = (status, data) => {
    if(status && data){
      if (data.data.length > 0) {
        let initListContact = [];
        data.data.map((item) => {
          initListContact.push({ isChecked: false, contact: item });
        });
        setListContact(initListContact);
        setListContactTotal(initListContact);
      }
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }    
    setIsLoading(false);
  };

  const checkBoxOnClickCallBack = (id, check) => {
    if (check) {
      updateStateForListContact(id, true);
      setChoosenItems(choosenItems + 1);
    } else {
      updateStateForListContact(id, false);
      setChoosenItems(choosenItems - 1);
    }
  };

  const updateStateForListContact = (id, check) => {
    let newState = [...listContactTotal];
    let index = newState.findIndex((el) => el.contact.contact_id === id);
    newState[index] = { ...newState[index], isChecked: check };
    setListContactTotal(newState);
    if (listSearch.length == 0) {
      let newState = [...listContact];
      let index = newState.findIndex((el) => el.contact.contact_id === id);
      newState[index] = { ...newState[index], isChecked: check };
      setListContact(newState)
    }
    else {
      let newState = [...listSearch];
      let index = newState.findIndex((el) => el.contact.contact_id === id);
      newState[index] = { ...newState[index], isChecked: check };
      setListSearch(newState)
    }
  };

  const addContactToGroup = () => {
    let listIdSaved = [];
    listContactTotal.map((item) => {
      if (item.isChecked === true) {
        listIdSaved.push({ contact_id: item.contact.contact_id });
      }
    });
    FetchApi(
      GroupContactAPI.AddContactsToGroup,
      Method.POST,
      ContentType.JSON,
      {
        user_id: "",
        contact_ids: [...listIdSaved],
        group_ids: [{ group_id: route.params.id }],
      },
      addContactsToGroupCallBack
    );
  };

  const addContactsToGroupCallBack = (status, data) => {
    if(status && data){
      navigation.goBack()
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
    setConfirmDialogVisible(false);
  };

  const handleSearch = (contactSearch) => {
    let listSearchContact = [];
    if (contactSearch !== "") {
      for (var i = 0; i < listContactTotal.length; i++) {
        if (
          listContactTotal[i].contact.contact_name != null &&
          listContactTotal[i].contact.contact_name
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContact.push(listContactTotal[i]);
        } else if (
          listContactTotal[i].contact.contact_jobtitle != null &&
          listContactTotal[i].contact.contact_jobtitle
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContact.push(listContactTotal[i]);
        } else if (
          listContactTotal[i].contact.contact_company != null &&
          listContactTotal[i].contact.contact_company
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContact.push(listContactTotal[i]);
        }
      }
      setListContact([]);
      setListSearch(listSearchContact);
    } else {
      setListSearch([]);
      setListContact(listContactTotal);
    }
  };

  return (
    <Provider>
      <Portal>
        <SafeAreaView style={styles.container}>
          <Appbar.Header
            statusBarHeight={1}
            theme={{ colors: { primary: "transparent" } }}
          >
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
              title={
                choosenItems +
                t("Screen_AddContactToGroup_Appbar_Content_Title_Selected")
              }
            />
          </Appbar.Header>
          <View style={styles.header}>
            <Pressable style={styles.sectionStyle}>
              <Searchbar
                placeholder={t(
                  "Screen_AddContactToGroup_SearchBar_Placeholder"
                )}
                theme={{
                  roundness: 10,
                  colors: { primary: "#1890FF" },
                }}
                editable={true}
                onChangeText={(text) => handleSearch(text)}
              />
            </Pressable>
            <HelperText>
              {t("Screen_AddContactToGroup_SearchBar_HelpText")}
            </HelperText>
          </View>
          <View style={styles.contactsContainer}>
            <View style={styles.listContainer}>
              {listContact.length == 0 && listSearch == 0 && (
                <View style={styles.listContainer_view}>
                  <Text style={styles.listContainer_label}>
                    {t("Screen_AddContactToGroup_ListContact_NoContactFound")}
                  </Text>
                </View>
              )}
              {listSearch.length != 0 &&
                listSearch.map((item, index) => {
                  return (
                    <TouchableOpacity onPress={() => { checkBoxOnClickCallBack(item.contact.contact_id, !item.isChecked) }} key={index}>
                      <View style={styles.item}>
                        <CustomCheckedBox
                          id={item.contact.contact_id}
                          onClick={checkBoxOnClickCallBack}
                          isChecked={item.isChecked}
                        />
                        <View style={styles.image}>
                          <Image
                            style={styles.image}
                            source={{ uri: item.contact.contact_imgurl }}
                          />
                        </View>
                        <View style={styles.txtContact}>
                          <View
                            style={[
                              styles.title,
                              {
                                flexDirection: "row",
                                justifyContent: "space-between",
                              },
                            ]}
                          >
                            <Text style={styles.nameContact} numberOfLines={1}>
                              {item.contact.contact_name}
                            </Text>
                          </View>
                          <Text style={styles.titleContact} numberOfLines={1}>
                            {item.contact.contact_jobtitle}
                          </Text>
                          <View style={styles.title}>
                            <Text numberOfLines={1} style={styles.companyContact}>
                              {item.contact.contact_company}
                            </Text>
                            <View style={{ alignItems: "flex-end" }}>
                              <Text style={styles.date}>
                                {FormatDate(item.contact.contact_createdat)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              <ScrollView showsVerticalScrollIndicator={false}>
                {listContact.length != 0 &&
                  listContact.map((item, index) => {
                    return (
                      <TouchableOpacity key={index} onPress={() => checkBoxOnClickCallBack(item.contact.contact_id, !item.isChecked)}>
                        <View style={styles.item} >
                          <CustomCheckedBox
                            id={item.contact.contact_id}
                            onClick={checkBoxOnClickCallBack}
                            isChecked={item.isChecked}
                          />
                          <View style={styles.image}>
                            <Image
                              style={styles.image}
                              source={{ uri: item.contact.contact_imgurl }}
                            />
                          </View>
                          <View style={styles.txtContact}>
                            <View
                              style={[
                                styles.title,
                                {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                },
                              ]}
                            >
                              <Text style={styles.nameContact}>
                                {item.contact.contact_name}
                              </Text>
                            </View>
                            <Text style={styles.titleContact}>
                              {item.contact.contact_jobtitle}
                            </Text>
                            <View style={styles.title}>
                              <Text
                                numberOfLines={1}
                                style={styles.companyContact}
                              >
                                {item.contact.contact_company}
                              </Text>
                              <View style={{ alignItems: "flex-end" }}>
                                <Text style={styles.date}>
                                  {FormatDate(item.contact.contact_createdat)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>
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
              {t("Screen_AddContactToGroup_Button_AddContact")}
            </Button>
          </View>
          <ConfirmDialog
            visible={confirmDialogVisible}
            title={t("Screen_AddContactToGroup_ConfirmDialog_Label")}
            leftButtonTitle={t("Screen_AddContactToGroup_ConfirmDialog_LeftButtonTitle")}
            rightButtonTitle={t("Screen_AddContactToGroup_ConfirmDialog_RightButtonTitle")}
            onPressVisable={() => { setConfirmDialogVisible(false) }}
            onPressConfirm={addContactToGroup}
          />
        </SafeAreaView>
      </Portal>
      <Loading onVisible={isLoading} />
    </Provider>
  );
};

export default AddContactToGroup;
