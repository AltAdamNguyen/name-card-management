import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mb20: {
        marginBottom: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        position: 'absolute',
        top: '5%',
        left: '5%',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button: {
        width: '50%',
        borderRadius: 10,
        backgroundColor: '#1890FF',
        alignItems: 'center',
        padding: 10,
    },
    label: {
        fontSize: 16,
        color: '#fff',
    }
});

export default styles;