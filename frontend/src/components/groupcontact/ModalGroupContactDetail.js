import * as React from "react";
import { useContext, useState } from "react";
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
import { Button } from "react-native-paper";
import styles from "../../screen/Home/styles";

const ModalGroupContactDetail = ({ visible, onPressVisable, sort, onPressSort, onPressAddContact, onDismiss }) => {
    const { t, i18n } = useTranslation();
    const authCtx = useContext(AuthContext);
    return (
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
                                    <Text style={{ fontSize: 14 }}>
                                        Thêm danh thiếp
                                    </Text>
                                </Button>
                                <Button
                                    icon="export"
                                    color="#000000"
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: "flex-start" }}
                                >
                                    <Text style={{ fontSize: 14 }}>
                                        Xuất thông tin
                                    </Text>
                                </Button>
                                <Button
                                    icon="swap-horizontal"
                                    color="#000000"
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: "flex-start" }}
                                >
                                    <Text style={{ fontSize: 14 }}>
                                        Đổi tên nhóm
                                    </Text>
                                </Button>
                                <Button
                                    icon="account-multiple-minus-outline"
                                    color="#000000"
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: "flex-start" }}
                                >
                                    <Text style={{ fontSize: 14 }}>
                                        Xóa danh thiếp
                                    </Text>
                                </Button>
                                <Button
                                    icon="account-multiple-minus-outline"
                                    color="#000000"
                                    labelStyle={{ fontSize: 25 }}
                                    style={{ alignItems: "flex-start" }}
                                >
                                    <Text style={{ fontSize: 14 }}>
                                        Xóa nhóm
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
};

export default ModalGroupContactDetail;