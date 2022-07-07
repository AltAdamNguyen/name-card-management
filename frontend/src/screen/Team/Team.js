//import liraries
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './styles';
import { Button, Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import Tree from '../../components/team/Tree';
import { useIsFocused } from '@react-navigation/native';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContentType, Method, TeamAPI } from '../../constants/ListAPI';
import AuthContext from '../../store/AuthContext';
// create a component
const Team = ({ navigation }) => {
    const [text, setText] = useState("");
    const [team, setTeam] = useState([]);
    const [searchTeam, setSearchTeam] = useState([]);
    const [checked, setChecked] = useState(false);
    const [listExport, setListExport] = useState([]);
    const isFocused = useIsFocused()
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [])

    useEffect(() => {
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [isFocused]);

    const getTeam = (data) => {
        setTeam(data.data);
        setSearchTeam(data.data)
    }

    const checklistExport = (item, check) => {
        if (check) {
            setListExport([...listExport, item]);
        } else {
            setListExport(listExport.filter(i => i !== item));
        }
    }

    const handleChecked = () => {
        setChecked(!checked)
    }
    const SearchApi = (value) => {
        FetchApi(`${TeamAPI.SearchMember}?value=${value}`, Method.GET, ContentType.JSON, undefined, getMember)
    }

    const getMember = (data) => {
        setSearchTeam(data.data)
    }

    const debounceSearch = useCallback(debounce((nextValue) => SearchApi(nextValue), 500), [])

    const handleSearch = (value) => {
        if (value === "") {
            setSearchTeam(team)
        }
        setText(value);
        debounceSearch(value);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.sectionStyle}>
                    <Searchbar
                        placeholder="Tìm kiếm danh thiếp"
                        theme={{
                            roundness: 10,
                            colors: { primary: '#1890FF' }
                        }}
                        value={text}
                        onChangeText={handleSearch}
                        clearIcon="close-circle"
                        editable={authCtx.isMarketer !== 1}
                    />
                </View>
                <View style={styles.header_label}>
                    <Button
                        onPress={() => setChecked(!checked)}
                        uppercase={false}
                        color="#1890FF"
                        disabled={authCtx.isMarketer === 1}
                    >
                        <Text style={styles.header_label_button}>Export</Text>
                    </Button>
                </View>
            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                {authCtx.isMarketer !== 1 && searchTeam && searchTeam.length === 0 &&
                    <View style={styles.container}>
                        <Text>Không có thành viên</Text>
                    </View>
                }
                {authCtx.isMarketer === 1 &&
                    <View style={styles.container}>
                        <Text>Bạn không có quyền sử dụng tính năng này</Text>
                    </View>
                }
                <ScrollView>
                    {searchTeam && searchTeam.map((item, index) => {
                        return (
                            <Tree item={item} navigation={navigation} key={index} checked={checked} checklistExport={checklistExport} listExport={listExport} handleChecked={handleChecked} />
                        )
                    })}
                </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default Team;
