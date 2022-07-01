import { StyleSheet }  from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '95%',
    },
    sectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    container_title: {
        width: '90%',
        marginTop: 20,
    },
    container_title_label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
    }
})
export default styles