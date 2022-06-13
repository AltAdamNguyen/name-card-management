//import liraries
import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity} from 'react-native';
import iconPath from '../../constants/iconPath';
import styles from './styles';


// create a component
const GroupContact = () => {
    const [text, setText] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.sectionStyle}>
                <Image  source={iconPath.icSearch}/>
                <TextInput
                style={styles.input}
                    placeholder="Tìm kiếm thông tin"
                    value={text}
                    onChangeText={(value) => setText(value)}
                />
                <TouchableOpacity>
                    <Image source={iconPath.icClose}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default GroupContact;
