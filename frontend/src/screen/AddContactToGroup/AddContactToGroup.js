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
import Tab1 from "./Tab1";

const AddContactToGroup = ({navigation}) => {
    const [listContact, setListContact] = useState([]);
    const [choosenItems, setChoosenItems] = useState(0);
    const [listFilter, setListFilter] = useState([]);

    // useEffect(() => {
    //     setChoosenItems(0)
    // }, [])

    // const setdd = (id, check) => {
    //     setChoosenItems(10)
    // }


    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header statusBarHeight={1} theme={{ colors: { primary: "transparent" } }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title={"Đã chọn " + choosenItems} />
                <Appbar.Action icon={"dots-horizontal"} />
            </Appbar.Header>
            <TopBarNavigator allTab={[Tab1, Tab2]} />
            <View style={styles.bottomButtonContainer}>
                <Button style={choosenItems == 0 ? styles.bottomButtonDisable : styles.bottomButtonEnable} labelStyle={{ color: 'white' }} disabled={choosenItems == 0 ? true : false} onPress={() => { }}>
                    Thêm
                </Button>
            </View>
        </SafeAreaView>
    );
}

const Tab2 = ({setdd}) => {
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
                                <CustomCheckedBox id={1}  />
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
                                <CustomCheckedBox id={2}  />
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
                                <CustomCheckedBox id={3}  />
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
export default AddContactToGroup