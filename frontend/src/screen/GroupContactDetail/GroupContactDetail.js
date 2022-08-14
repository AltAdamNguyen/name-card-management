import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Alert
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import { Searchbar, Appbar, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FormatDate } from "../../validate/FormatDate";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import ConfirmDialogg from "../../components/customDialog/dialog/confirmDialog/ConfirmDialog";
import ModalAddGroup from "../../components/groupcontact/ModalAddGroup";
import AuthContext from "../../store/AuthContext";

const GroupContactDetail = ({ navigation, route }) => {
  const [listContact, setListContact] = useState([]);
  const [listContactTotal, setListContactTotal] = useState([]);
  const [listContactSearch, setListContactSearch] = useState([]);
  const { t, i18n } = useTranslation();
  const [inputGroupName, setInpuitGroupName] = useState ({
    group_name: route.params.name,
  })
  const [groupName, setGroupName] = useState(route.params.name);
  const authCtx = useContext(AuthContext);
  const isFocus = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [dialogDeleteGroupConfirmVisible, setDialogDeleteGroupConfirmVisible] = useState(false);
  const [dialogChangeGroupNameVisible, setDialogChangGroupNameVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    FetchApi(
      `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContactDetail
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    FetchApi(
      `${GroupContactAPI.ViewGroupContactDetail}/${route.params.id}`,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContactDetail
    );
  }, [isFocus]);

  // API call back
  const getGroupContactDetail = (status, data) => {
    //Get Detail
    authCtx.checkToken()
    if(status && data){
      if (data.message === "Success" && data.data.contacts.length > 0) {
        let initListContact = [];
        data.data.contacts.map((item, index) => {
          initListContact.push(item);
        });
        setListContact(initListContact);
        setListContactTotal(initListContact);
      } else {
        setListContact([]);
        setListContactTotal([]);
      }
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
    setListContactSearch([]);
    setIsLoading(false);
  };

  const handleDeleteGroup = () => {
    setDialogDeleteGroupConfirmVisible(false);
    FetchApi(
      `${GroupContactAPI.DeleteGroupContact}/${route.params.id}`,
      Method.DELETE,
      ContentType.JSON,
      undefined,
      deleteGroupContact
    );
  }

  const deleteGroupContact = (status, data) => {
    authCtx.checkToken();
    if(status && data){
      navigation.goBack();
    }
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
  };

  const handleChangeNameGroup = (value) => {
    console
    setDialogChangGroupNameVisible(false);
    FetchApi(
      `${GroupContactAPI.ChangeGroupName}/${route.params.id}`,
      Method.PATCH,
      ContentType.JSON,
      value,
      changeGroupName
    );
    setInpuitGroupName(value)
  }

  const changeGroupName = (status, data) => {
    authCtx.checkToken()
    if(!status){
      Alert.alert("", t("Something_Wrong"))
    }
  };

  const handleSearch = (contactSearch) => {
    let listSearchContactInGroup = [];
    if (contactSearch !== "") {
      for (var i = 0; i < listContactTotal.length; i++) {
        if (
          listContactTotal[i].contact_name != null &&
          listContactTotal[i].contact_name
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContactInGroup.push(listContactTotal[i]);
        } else if (
          listContactTotal[i].contact_jobtitle != null &&
          listContactTotal[i].contact_jobtitle
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContactInGroup.push(listContactTotal[i]);
        } else if (
          listContactTotal[i].contact_company != null &&
          listContactTotal[i].contact_company
            .toLowerCase()
            .includes(contactSearch.toLowerCase())
        ) {
          listSearchContactInGroup.push(listContactTotal[i]);
        } else if (
          listContactTotal[i].contact_phone != null &&
          listContactTotal[i].contact_phone.toLowerCase().includes(contactSearch.toLowerCase())
        ){
          listSearchContactInGroup.push(listContactTotal[i]);
        }
      }
      setListContact([]);
      setListContactSearch(listSearchContactInGroup);
    } else {
      setListContactSearch([]);
      setListContact(listContactTotal);
    }
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header
          statusBarHeight={1}
          theme={{ colors: { primary: "transparent" } }}
        >
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title={inputGroupName.group_name} />
        </Appbar.Header>
        <View style={styles.header}>
          <Pressable style={styles.sectionStyle}>
            <Searchbar
              placeholder={t("Screen_GroupContactDetail_PlaceHolder_SearchContact")}
              theme={{
                roundness: 10,
                colors: { primary: "#1890FF" },
              }}
              onChangeText={(text) => handleSearch(text)}
            />
          </Pressable>
        </View>
        <View style={styles.contactsContainer}>
          <View style={styles.listContainer}>
            <ScrollView>
              {listContact.length == 0 && listContactSearch.length == 0 && (
                <View style={styles.listContainer_view}>
                  <Text style={styles.listContainer_label}>
                    {t("Screen_GroupContactDetail_ListContact_NoContactFound")}
                  </Text>
                </View>
              )}
              {listContactSearch.length != 0 &&
                listContactSearch.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("HomeSwap", {
                          screen: "ViewContact",
                          params: { idContact: item.contact_id },
                        });
                      }}
                      key={index}
                    >
                      <View style={styles.item}>
                        <View style={styles.image}>
                          <Image
                            source={{ uri: item.contact_imgurl }}
                            style={styles.image}
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
                              {item.contact_name}
                            </Text>
                          </View>
                          <Text style={styles.titleContact} numberOfLines={1}>
                            {item.contact_jobtitle}
                          </Text>
                          <View style={styles.title}>
                            <Text
                              numberOfLines={1}
                              style={styles.companyContact}
                            >
                              {item.contact_company}
                            </Text>
                            <View style={{ alignItems: "flex-end" }}>
                              <Text style={styles.date}>
                                {FormatDate(item.contact_createdat)}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              {listContact.length != 0 &&
                listContact.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("HomeSwap", {
                          screen: "ViewContact",
                          params: {
                            idContact: item.contact_id,
                            showFooter: false,
                          },
                        });
                      }}
                      key={index}
                    >
                      <View style={styles.item}>
                        <View style={styles.image}>
                          <Image
                            source={{ uri: item.contact_imgurl }}
                            style={styles.image}
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
                              {item.contact_name}
                            </Text>
                          </View>
                          <Text style={styles.titleContact}>
                            {item.contact_jobtitle}
                          </Text>
                          <View style={styles.title}>
                            <Text
                              numberOfLines={1}
                              style={styles.companyContact}
                            >
                              {item.contact_company}
                            </Text>
                            <View style={{ alignItems: "flex-end" }}>
                              <Text style={styles.date}>
                                {FormatDate(item.contact_createdat)}
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
      </SafeAreaView>
      <Loading onVisible={isLoading} />
      <View style={styles.footer}>
        <Pressable
          style={styles.footer_button}
          onPress={() => {
            navigation.navigate("GroupSwap", {
              screen: "AddContactToGroup",
              params: { id: route.params.id, type: "personal" },
            });
          }}
        >
          <Icon name="account-plus-outline" size={24} color="#828282" />
          <Text style={styles.footer_button_label}>
            {t("ModalGroupContactDetail_Label_AddContact")}
          </Text>
        </Pressable>
        <Pressable
          style={styles.footer_button}
          onPress={() => {
            setDialogChangGroupNameVisible(true);
          }}
        >
          <Icon name="swap-horizontal" size={24} color="#828282" />
          <Text style={styles.footer_button_label}>
            {t("ModalGroupContactDetail_Label_ChangeGroupName")}
          </Text>
        </Pressable>
        <Pressable
          style={styles.footer_button}
          onPress={() => {
            navigation.navigate("GroupSwap", {
              screen: "DeleteContactFromGroup",
              params: { id: route.params.id },
            });
          }}
        >
          <Icon
            name="account-multiple-minus-outline"
            size={24}
            color="#828282"
          />
          <Text style={styles.footer_button_label}>
            {t("ModalGroupContactDetail_Label_DeleteContact")}
          </Text>
        </Pressable>
        <Pressable
          style={styles.footer_button}
          onPress={() => {
            setDialogDeleteGroupConfirmVisible(true);
          }}
        >
          <Icon
            name="account-multiple-minus-outline"
            size={24}
            color="#828282"
          />
          <Text style={styles.footer_button_label}>
            {t("ModalGroupContactDetail_Label_DeleteGroup")}
          </Text>
        </Pressable>
      </View>
      <ConfirmDialogg
        visible={dialogDeleteGroupConfirmVisible}
        title={t("Screen_GroupContactDetail_ConfirmDialog_Title")}
        leftButtonTitle={t("Screen_GroupContactDetail_ConfirmDialog_LeftButtonTitle")}
        rightButtonTitle={t("Screen_GroupContactDetail_ConfirmDialog_RightButtonTitle")}
        onPressVisable={() => setDialogDeleteGroupConfirmVisible(false)}
        onPressConfirm={handleDeleteGroup}
      />
      <ModalAddGroup
        visible={dialogChangeGroupNameVisible}
        value={inputGroupName}
        onPressSubmit={handleChangeNameGroup}
        onPressVisable={() => setDialogChangGroupNameVisible(!dialogChangeGroupNameVisible)}
        title={t("Screen_GroupContactDetail_InputDialog_Title")}
        label={t("Screen_GroupContactDetail_InputDialog_Label")}
        cancel={t("Screen_GroupContactDetail_InputDialog_LeftButtonTitle")}
        submit={t("Screen_GroupContactDetail_InputDialog_RightButtonTitle")}
      />
    </Provider>
  );
};

export default GroupContactDetail;
