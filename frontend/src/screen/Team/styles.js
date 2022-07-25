import { StyleSheet }  from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#828282',
        fontSize: 16,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
    },
    header_label: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    body: {
        flex: 1, 
        width: '100%', 
        marginTop: 20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#1890FF'
    }
})
export default styles