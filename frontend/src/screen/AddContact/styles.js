import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    header: {
        width: '90%',
        flexDirection: "row",
        justifyContent: "space-between",
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
        width: "90%",
        height: "30%",
        justifyContent: "center",
        padding: 5,
    },
    image:{
        flex: 1,
        width: '100%',
        aspectRatio: 1.63185185185,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    formInput: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    formInput_label: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    formInput_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#82828225',
        borderRadius: 10,
        height: 56,
        alignItems: 'center',
        paddingLeft: 10,
        marginBottom: 10,
    },
    formInput_item_input: {
        width: '90%',
    }
})

export default styles