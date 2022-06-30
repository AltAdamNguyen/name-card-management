import { StyleSheet }  from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
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
    containerOverlay: {
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
})
export default styles