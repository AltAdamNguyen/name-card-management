//import liraries
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text, Dimensions } from 'react-native';
import styles from './styles';
import { Searchbar, FAB } from 'react-native-paper';
import debounce from 'lodash.debounce';
import Tree from '../../components/team/Tree';
import { useIsFocused } from '@react-navigation/native';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContentType, Method, TeamAPI } from '../../constants/ListAPI';
import AuthContext from '../../store/AuthContext';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { LinearGradient } from 'expo-linear-gradient';
// create a component
const Team = ({ navigation }) => {
    const windowWidth = Dimensions.get('window').width;
    const [text, setText] = useState("");
    const [team, setTeam] = useState([]);
    const [searchTeam, setSearchTeam] = useState([]);
    const [checked, setChecked] = useState(false);
    const [listExport, setListExport] = useState([]);
    const isFocused = useIsFocused()
    const authCtx = useContext(AuthContext);

    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [])

    useEffect(() => {
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [isFocused]);

    const getTeam = (data) => {
        setTeam(data.data);
        setSearchTeam(data.data)
        setLoading(false)
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
                        placeholder="Tìm kiếm nhân viên"
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
                {checked && <View style={styles.header_label}>
                    <Text style={styles.header_label_button}>Đã chọn ({listExport.length})</Text>

                </View>}
            </View>
            <View style={{ flex: 1, width: '100%', marginTop: 20 }}>
                {authCtx.isMarketer !== 1 && searchTeam && searchTeam.length === 0 && !loading &&
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
                    {loading &&
                        <View style={{alignItems: 'center'}}>
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.9} height={56} style={{borderRadius: 10, marginBottom: 10}}/>
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.9} height={56} style={{borderRadius: 10, marginBottom: 10}}/>
                            <ShimmerPlaceholder visible={!loading} width={windowWidth * 0.9} height={56} style={{borderRadius: 10, marginBottom: 10}}/>
                        </View>

                    }
                    {searchTeam && searchTeam.map((item, index) => {
                        return (
                            <Tree item={item} navigation={navigation} key={index} checked={checked} checklistExport={checklistExport} listExport={listExport} handleChecked={handleChecked} />
                        )
                    })}
                </ScrollView>
                <FAB icon="export" size={24} color="#FFF" style={styles.fab} onPress={() => setChecked(!checked)} />
            </View>

        </SafeAreaView>
    );
};

export default Team;
