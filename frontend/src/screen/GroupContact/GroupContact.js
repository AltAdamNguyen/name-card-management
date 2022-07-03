//import liraries
import React, { useState, useContext } from "react";
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

// create a component
const GroupContact = () => {
  const [text, setText] = useState("");
  const [textGroup, setTextGroup] = useState("");
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const [modalAddContactVisible, setModalAddContactVisible] = useState(false);
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
              editable={false}
            />
          </Pressable>
        </View>
        <View style={styles.container_title}>
          <Text style={styles.container_title_label}>
            {t("Screen_GroupContact_Text_Container_Label_Title")}
          </Text>
        </View>
        <View style={styles.container_listGroup}>
          <ScrollView>
            <TouchableOpacity>
              <View style={styles.container_listGroup_item}>
                <Text style={styles.container_listGroup_item_label}>
                  Yêu thích (0)
                </Text>
                <Image source={iconPath.icRight} />
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View>
          <TouchableOpacity
            style={styles.container_footer}
            onPress={() => setModalAddContactVisible(true)}
          >
            <Image source={iconPath.icPlus} />
            <ModalAddGroupContact
              onVisible={modalAddContactVisible}
              onDismiss={() => setModalAddContactVisible(false)}
              onPressCancel={() => setModalAddContactVisible(false)}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

//make this component available to the app
export default GroupContact;
