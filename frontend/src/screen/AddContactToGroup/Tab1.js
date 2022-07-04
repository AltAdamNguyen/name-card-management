import React, { useState, useContext, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    Pressable,
} from "react-native";
import styles from "./styles";
import i18next from "../../language/i18n";
import { useTranslation } from "react-i18next";
import AuthContext from "../../store/AuthContext";
import {
    Searchbar,
    Appbar,
    Button,
} from "react-native-paper";
import { FormatDate } from '../../validate/FormatDate';
import CustomCheckedBox from "../../components/groupcontact/checkBoxCustom/CustomCheckedBox";
import TopBarNavigator from "../../components/navigation/TopBarAddContactToGroupNavigation";

const Tab1 = ({hello}) => {
    const checkedStatus = (id, check) => {
        if (check) {
            //setListContact(listContact => [...listContact, id])
            //setChoosenItems(choosenItems + 1)
        }
        else {

        }//setChoosenItems(choosenItems - 1)
    }

    return (
        <SafeAreaView style={styles.cotain}>
            <View style={styles.header}>
                <Pressable style={styles.sectionStyle} >
                    <Searchbar
                        placeholder="Find contacts"
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                    />
                </Pressable>
            </View>
            <View style={styles.contactsContainer}>
                <View style={styles.listContainer}>
                    <ScrollView>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <CustomCheckedBox id={1} onPresss={checkedStatus} />
                                <View style={styles.image}>
                                    <Image style={styles.image} />
                                </View>
                                <View style={styles.txtContact}>
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <CustomCheckedBox id={2} onPresss={checkedStatus} />
                                <View style={styles.image}>
                                    <Image style={styles.image} />
                                </View>
                                <View style={styles.txtContact}>
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.item}>
                                <CustomCheckedBox id={3} onPresss={checkedStatus} />
                                <View style={styles.image}>
                                    <Image style={styles.image} />
                                </View>
                                <View style={styles.txtContact}>
                                    <View style={[styles.title, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                                        <Text style={styles.nameContact}>Test</Text>
                                    </View>
                                    <Text style={styles.titleContact}>Test</Text>
                                    <View style={styles.title}>
                                        <Text numberOfLines={1} style={styles.companyContact}>Test</Text>
                                        <View style={{ alignItems: 'flex-end' }}>
                                            <Text style={styles.date}>{FormatDate(14 - 11 - 2000)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Tab1