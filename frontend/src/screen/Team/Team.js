//import liraries
import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text, Alert } from 'react-native';
import styles from './styles';
import { Searchbar, FAB, Provider, Button } from 'react-native-paper';
import Tree from '../../components/team/Tree';
import { useIsFocused } from '@react-navigation/native';
import { FetchApi } from '../../service/api/FetchAPI';
import { ContentType, Method, TeamAPI } from '../../constants/ListAPI';
import AuthContext from '../../store/AuthContext';
import LoadingDialog from '../../components/customDialog/dialog/loadingDialog/LoadingDialog';
import { useTranslation } from 'react-i18next';

// create a component
const Team = ({ navigation }) => {
    const [text, setText] = useState("");
    const [team, setTeam] = useState([]);
    const [searchTeam, setSearchTeam] = useState([]);
    const [checked, setChecked] = useState(false);
    const [listExport, setListExport] = useState([]);
    const isFocused = useIsFocused()
    const authCtx = useContext(AuthContext);
    const { t, i18n } = useTranslation()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (authCtx.role !== 1) {
            setLoading(true)
            FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
        }
    }, [])

    useEffect(() => {
        FetchApi(TeamAPI.GetTeam, Method.GET, ContentType.JSON, undefined, getTeam)
    }, [isFocused]);

    useEffect(() => {
        const searchTimeOut = setTimeout(() => {
            if (text) {
                SearchApi(text)
            } else {
                setSearchTeam(team)
            }
        }, 500);

        return () => {
            clearTimeout(searchTimeOut);
        }
    }, [text])

    const getTeam = (data) => {
        authCtx.checkToken()
        if (data) {
            setTeam(data.data);
            setSearchTeam(data.data)
        }
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
        authCtx.checkToken()
        if (data) {
            setSearchTeam(data.data)
        }
    }

    const handleSearch = (value) => {
        setText(value);  
    }

    const handleExport = () => {
        listExport.length === 0 && Alert.alert(t("Screen_Team_Alet_Export_Warning"), t("Screen_Team_Alet_Export_Warning_Message"), [{ text: 'OK' }])
        if (listExport.length > 0) {
            setLoading(true)
            FetchApi(TeamAPI.Export, Method.POST, ContentType.JSON, { array_id: listExport }, exportSuccess)
        }
    }

    const exportSuccess = (data) => {
        authCtx.checkToken()
        if (data) {
            setLoading(false)
            Alert.alert(t("Screen_Team_Alet_Export_Success"), t("Screen_Team_Alet_Export_Success_Message"), [{ text: 'OK' }])
        }
    }

    return (
        <Provider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    {authCtx.role !== 1 && <View style={styles.sectionStyle}>
                        <Searchbar
                            placeholder={t("Screen_Team_Input_Placeholder")}
                            theme={{
                                roundness: 10,
                                colors: { primary: '#1890FF' }
                            }}
                            value={text}
                            onChangeText={handleSearch}
                            clearIcon="close-circle"
                            editable={authCtx.role !== 1}
                        />
                    </View>}
                    {checked && <View style={styles.header_label}>
                        <Text style={styles.header_label_button}>{t("Screen_Team_Text_Selected")} ({listExport.length})</Text>
                        <Button uppercase={false} color="#1980FF" onPress={handleExport}>{t("Screen_Team_Button_Eport")}</Button>
                    </View>}
                </View>
                <View style={styles.body}>
                    {authCtx.role !== 1 && searchTeam && searchTeam.length === 0 && !loading &&
                        <View style={styles.container}>
                            <Text style={styles.label}>{t("Screen_Team_List_NoTeam")}</Text>
                        </View>
                    }
                    {authCtx.role === 1 &&
                        <View style={styles.container}>
                            <Text style={styles.label}>{t("Screen_Team_Text_Unavailable")}</Text>
                        </View>
                    }
                    {loading &&
                        <LoadingDialog onVisible={loading} />
                    }
                    {authCtx.role !== 1 &&
                        < ScrollView >
                            {searchTeam && searchTeam.map((item, index) => {
                                return (
                                    <Tree
                                        item={item}
                                        navigation={navigation}
                                        key={index} checked={checked}
                                        checklistExport={checklistExport}
                                        listExport={listExport}
                                        handleChecked={handleChecked}
                                    />
                                )
                            })}
                        </ScrollView>
                    }
                    {authCtx.role === 3 &&
                        <FAB icon="export" size={24} color="#FFF" style={styles.fab} onPress={() => setChecked(!checked)} />
                    }
                </View>
            </SafeAreaView >
        </Provider>
    );
};

export default Team;
