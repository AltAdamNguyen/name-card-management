//import liraries
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

import icClose from '../../asset/icon/close.png';
import icFilter from '../../asset/icon/filter.png';
import icBookMark from '../../asset/icon/bookmark.png';
import icSearch from '../../asset/icon/search.png';
import imgEllispis from '../../asset/icon/ellipsis.png';
import imgContact from '../../asset/image/contact.jpg';


// create a component
const Home = ({ navigation }) => {

    const [text, setText] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <Image source={icSearch} style={styles.iconSearch} />
                    <TextInput
                        style={styles.input}
                        placeholder="Tìm kiếm thông tin"
                        value={text}
                        onChangeText={(value) => setText(value)}
                    />
                    <TouchableOpacity
                        style={styles.closeButtonParent}
                        onPress={() => setText("")}
                    >
                        <Image
                            style={styles.closeButton}
                            source={icClose}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.label}>Danh thiếp (10)</Text>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedLanguage(itemValue)
                        }
                        style={styles.picker}
                        >
                        <Picker.Item value="java">
                            <Text style={styles.pickerText}>Java</Text>
                        </Picker.Item>
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.listContainer}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { navigation.navigate('ViewContactScreen') }}>
                        <View style={styles.item}>
                            <View style={styles.imgContact}>
                                <Image source={imgContact} style={styles.image} />
                                <Image source={icBookMark} style={styles.bookmark} />
                            </View>
                            <View style={styles.txtContact}>
                                <View style={styles.title}>
                                    <Text style={styles.nameContact}>Đặng Vũ Hoàng Trung</Text>
                                    <TouchableOpacity>
                                        <Image source={imgEllispis} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.titleContact}>Nhóm trưởng</Text>
                                <View style={styles.title}>
                                    <Text style={styles.companyContact}>Đại học FPT</Text>
                                    <Text style={styles.date}>30 - 05 - 2022</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity style={styles.floatButton}>
                    <Image source={icFilter} style={styles.iconFilter} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default Home;
