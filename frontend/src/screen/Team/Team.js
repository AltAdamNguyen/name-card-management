//import liraries
import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Pressable,
  Text
} from "react-native";

import { IconButton, Searchbar, FAB } from "react-native-paper";
import styles from "./styles";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from "../../store/AuthContext";
// create a component
const Team = () => {
  const [text, setText] = useState("");
  const [textGroup, setTextGroup] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const authCtx = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.sectionStyle}
        >
          <Searchbar
                        placeholder="Tìm kiếm đội"
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                        editable={false}
                    />
        </Pressable>
      </View>
      <View style={styles.container_title}>
            <Text style={styles.container_title_label}>Đội của tôi</Text>
        </View>
    </SafeAreaView>
  );
};

export default Team;
