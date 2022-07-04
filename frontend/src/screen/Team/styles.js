import { StyleSheet }  from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
    },
    header_label: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    header_label_button: {
        fontSize: 16,
    },
    sectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
})
export default styles