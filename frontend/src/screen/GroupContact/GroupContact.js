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
import {
  IconButton,
  Searchbar,
  FAB,
  Portal,
  Dialog,
  RadioButton,
  Provider,
} from "react-native-paper";
import ModalAddGroupContact from "../../components/groupcontact/ModalAddGroupContact";
import { FetchApi } from "../../service/api/FetchAPI";
import { GroupContactAPI, ContentType, Method } from "../../constants/ListAPI";
import { useIsFocused } from '@react-navigation/native';

// create a component
const GroupContact = ({ navigation }) => {
  const [listGroupContact, setLisGroupContact] = useState([]);
  const [listGroupContactTotal, setListGroupContactTotal] = useState([]);
  const [addNewContact, setAddNewContact] = useState([]);
  const [text, setText] = useState("");
  const [textGroup, setTextGroup] = useState("");
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const isFocus = useIsFocused();
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
  }, [isFocus]);

  const getGroupContact = (data) => {
    if (data.data.length > 0) {
      setLisGroupContact(data.data);
      setListGroupContactTotal(data.data);
    }
  };

  const addGroupContact = (data) => {
    if (data.message == "Add Group Successully") {
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
              <Text style={styles.listContainer_label}>
                Không có nhóm
              </Text>
            </View>
          )}
          <ScrollView>
            {listGroupContact.length != 0 &&
              listGroupContact.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("GroupSwap", {
                        screen: "GroupContactDetail",
                        params: { id: item.group_id, name: item.group_name },
                      });
                    }}
                  >
                    <View style={styles.container_listGroup_item}>
                      <Text style={styles.container_listGroup_item_label}>
                        {item.group_name}
                      </Text>
                      <Image source={iconPath.icRight} />
                    </View>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
        <View>
          <TouchableOpacity
            style={styles.container_footer}
            onPress={() => setModalAddContactVisible(true)}
          >
            <Image source={iconPath.icPlus} />
            <ModalAddGroupContact
              label="Tên nhóm"
              confirmLabel="Thêm"
              onVisible={modalAddContactVisible}
              onDismiss={() => setModalAddContactVisible(false)}
              onPressCancel={() => setModalAddContactVisible(false)}
              onPressConfirm={onAddNewGroupContactPressed}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

//make this component available to the app
export default GroupContact;
