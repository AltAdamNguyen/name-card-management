import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        width: '95%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        margin: 10
    },
    header_titleButton: {
        flexDirection: "row",
        alignItems: "center"
    },
    header_titleButton_label: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    header_modal_label: {
        fontSize: 16,
        color: "#1890FF",
    },
    imgContact: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.3,
        justifyContent: "center",
        padding: 5,
        marginBottom: 10,
    },
    image:{
        flex: 1,
        width: '100%',
        height: '100%',
        aspectRatio: 1.63185185185,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    formInput: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
        width: "100%",

    },
    formInput_item: {
        alignItems: 'center',
        marginBottom: 14,
        width: '100%',
    },
    formInput_item_input: {
        width: '100%',
    },
    formInput_item_error: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    formInput_item_error_label:{
        color: '#B22D1D',
        fontSize: 12,
    }
})

export default styles