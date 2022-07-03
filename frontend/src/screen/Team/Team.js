//import liraries
import React, { useEffect, useState } from 'react';
import { View, Pressable, SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './styles';
import { Button, Searchbar } from 'react-native-paper';
import Tree from '../../components/team/Tree';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContentType, Method, TeamAPI } from '../../constants/ListAPI';
// create a component
const Team = ({navigation}) => {
    const [team, setTeam] = useState([]);
    const [checked, setChecked] = useState(false);
    const [listExport, setListExport] = useState([]);
    useEffect(() => {
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [])

    const getTeam = (data) => {
        setTeam(data.data);
    }

    const checklistExport = (item, check) => {
        if (check) {
            setListExport([...listExport, item]);
        } else {
            setListExport(listExport.filter(i => i !== item));
        }
    }

    console.log(listExport);

    return (
        <SafeAreaView style={styles.container}>
            <Text>Team</Text>
            <Button
                onPress={() => setChecked(!checked)}
            >
                export
            </Button>
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

            <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
            <Text>Thành viên</Text>
                <ScrollView>
                    {Boolean(team) && team.map((item, index) => {
                        return (
                            <Tree item={item} navigation={navigation} key={index} checked={checked} checklistExport={checklistExport} listExport={listExport}/>
                        )
                    })}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default Team;
