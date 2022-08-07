//import liraries
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import styles from "./styles";
import { useTranslation } from "react-i18next";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import {
  Searchbar,
  Provider,
  FAB
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from "@react-navigation/native";
import ModalAddGroup from "../../components/groupcontact/ModalAddGroup"
import AuthContext from "../../store/AuthContext";

// create a component
const GroupContact = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [listGroupContact, setLisGroupContact] = useState([]);
  const [listGroupContactTotal, setListGroupContactTotal] = useState([]);
  const { t, i18n } = useTranslation();
  const authCtx = useContext(AuthContext)
  const inputGroupName = {
    group_name: "",
  }
  const isFocus = useIsFocused();
  const [modalAddContactVisible, setModalAddContactVisible] = useState(false);
  const onAddNewGroupContactPressed = (value) => {
    setModalAddContactVisible(false);
    FetchApi(
      GroupContactAPI.AddGroupContact,
      Method.POST,
      ContentType.JSON,
      value,
      addGroupContact
    )
  }

  const addGroupContact = (data) => {
    authCtx.checkToken()
    if (data && data.message == "Success") {
      FetchApi(
        GroupContactAPI.ViewGroupContact,
        Method.GET,
        ContentType.JSON,
        undefined,
        getGroupContact
      )
    }
  }

  useEffect(() => {
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    )
  }, [])

  useEffect(() => {
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    )
  }, [isFocus])

  const getGroupContact = (data) => {
    authCtx.checkToken()
    if(data){
      if (data.data.length > 0) {
        setLisGroupContact(data.data);
        setListGroupContactTotal(data.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  const searchGroupHandle = (groupName) => {
    let listSearchGroup = [];
    if (groupName !== "") {
      listGroupContactTotal.map((item) => {
        if (item.group_name.toLowerCase().includes(groupName.toLowerCase())) {
          listSearchGroup.push(item);
        }
      });
      setLisGroupContact(listSearchGroup);
    } else {
      setLisGroupContact(listGroupContactTotal);
    }
  }

  return (
    <Provider style={styles.container_provider}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.sectionStyle}>
            <Searchbar
              placeholder={t("Screen_GroupContact_Placeholder_Search")}
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
            {t("Screen_GroupContact_Text_Container_Label_Title")}
          </Text>
        </View>
        <View style={styles.container_listGroup}>
          {listGroupContact.length == 0 && (
            <View style={styles.listContainer_view}>
              <Text style={styles.listContainer_label}>{t("Screen_GroupContact_Text_Container_Label_NoGroupFound")}</Text>
            </View>
          )}
          <ScrollView>
            {listGroupContact.length != 0 &&
              listGroupContact.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      let is = item.group_id;
                      navigation.navigate("GroupSwap", {
                        screen: "GroupContactDetail",
                        params: { id: item.group_id, name: item.group_name },
                      });
                    }}
                    key={index}
                  >
                    <View style={styles.container_listGroup_item}>
                      <Text style={styles.container_listGroup_item_label} >
                        {item.group_name}
                      </Text>
                      <Icon name="chevron-right" size={20} />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        <FAB style={styles.floatButton} icon="plus" size={24} color="#fff" onPress={() => setModalAddContactVisible(true)} />
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
      <Loading onVisible={isLoading}/>
    </Provider>
  );
};

//make this component available to the app
export default GroupContact;
