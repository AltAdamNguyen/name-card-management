import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerOverlay: {
        fontfamily: 'Roboto',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '60%',
        alignItems: 'flex-start',
    },
    modalView_item: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default styles;