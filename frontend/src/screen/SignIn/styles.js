import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    mr20: {
        marginRight: 20
    },
    button_login:{
        width:'100%',
        alignItems:'center'
    },
    error_text:{
        width:'85%',
        textAlign: 'right',
        // alignItems:'center',
        marginTop: '3%',
        marginBottom: '3%',
    },  
    root: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    button: {
        width: '100%'
    },
    language: {
        position: 'absolute',
        width: '35%',
        bottom: '6%'
    },
    icon: {
        width: 50,
    },
    title: {
        position: 'absolute',
        bottom: '2%',
    },
    SwitchSelector: {
        fontSize: 13
    },
    input:{
        width: '100%',
        alignItems: 'center'
    }
})

export default styles