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
import styles from "./styles";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from "../../store/AuthContext";
import Loading from "../../components/customDialog/dialog/loadingDialog/LoadingDialog";
import {
  IconButton,
  Searchbar,
  Portal,
  Dialog,
  RadioButton,
  Provider,
  FAB
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from "@react-navigation/native";
import ModalAddGroup from "../../components/groupcontact/ModalAddGroup"
// create a component
const GroupContact = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [listGroupContact, setLisGroupContact] = useState([]);
  const [listGroupContactTotal, setListGroupContactTotal] = useState([]);
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const inputGroupName = {
    group_name: "",
  }
  const isFocus = useIsFocused();
  const [modalAddContactVisible, setModalAddContactVisible] = useState(false);
  const onAddNewGroupContactPressed = (groupName) => {
    if(groupName.trim() == ""){
      alert(t("Screen_GroupContact_Alert_GroupNameEmpty"),"")
    }else{
      setModalAddContactVisible(false);
      FetchApi(
        GroupContactAPI.AddGroupContact,
        Method.POST,
        ContentType.JSON,
        value,
        addGroupContact
      );  
  };}

  useEffect(() => {
    FetchApi(
      GroupContactAPI.ViewGroupContact,
      Method.GET,
      ContentType.JSON,
      undefined,
      getGroupContact
    );
  }, []);

  const searchGroupHandle = (groupName) => {
    
    let listSearchGroup = [];
    if (groupName !== "") {
      listGroupContactTotal.map((item, index) => {
        if (item.group_name.toLowerCase().includes(groupName.toLowerCase())) {
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
  }, [isFocus]);

  const getGroupContact = (data) => {
    setLisGroupContact([])
    setListGroupContactTotal([])
    if (data.data.length > 0) {
      setLisGroupContact(data.data);
      setListGroupContactTotal(data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
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
                      <Icon name="chevron-right" size={20}/>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        <FAB style={styles.floatButton} icon="plus" size={24} color="#fff" onPress={() => setModalAddContactVisible(true)} />
      </SafeAreaView>
      <ModalAddGroup visible={modalAddContactVisible} value={inputGroupName} onPressSubmit={onAddNewGroupContactPressed} onPressVisable={() => setModalAddContactVisible(!modalAddContactVisible)}/>
      <Loading onVisible={isLoading ? true : false} />
    </Provider>
  );
};

//make this component available to the app
export default GroupContact;
