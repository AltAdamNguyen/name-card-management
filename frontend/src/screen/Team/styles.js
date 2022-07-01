import { StyleSheet }  from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    container_sectionStyle: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#F3F3F3',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#828282',
    },
    container_sectionStyle_icClose: {
        tintColor: '#82828250',
    },
    container_title: {
        width: '90%',
        marginTop: 20,
    },
    container_title_label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
    },
})
export default styles