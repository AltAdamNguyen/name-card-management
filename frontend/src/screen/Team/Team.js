//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { IconButton, Searchbar, FAB } from 'react-native-paper';
// create a component
const Team = () => {
    const [modalFloatVisible, setModalFloatVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style={[styles.container, modalFloatVisible ? styles.containerOverlay : null, modalVisible ? styles.containerOverlay : null]}>
            <View style={styles.header}>
                <Pressable style={styles.sectionStyle}>
                    <Searchbar
                        placeholder="Tìm kiếm nhóm"
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                        editable={false}
                    />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Team;
