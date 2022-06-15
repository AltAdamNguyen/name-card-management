import {StyleSheet, useWindowDimensions } from 'react-native';


// define your styles
const styles = StyleSheet.create({
    mb10: {
        marginBottom: 10,
    },
    ml10: {
        marginLeft: 10,
    },
    containerOverlay: {
        fontfamily: 'Roboto',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    info_flag_modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '50%',
        alignItems: 'flex-start',
    },
    info_flag_modalItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        info_flag_modalIcon: {
                width: 32,
                margin: 10
            },
            info_flag_modalText: {
                fontSize: 15,
            },

    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    imgView: {
        backgroundColor: '#1890FF'
    },
    image:{
        width: '95%',
        maxHeight: '32%',
        resizeMode: 'contain',
        borderRadius: 10,
        margin: 10,
    },
    info: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
    },
    info_title_name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '2%',
    },
    info_flag_button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#82828225',
        borderRadius: 10,
        width: '40%',
        padding: 5,
        marginTop: 10
    },
    info_component: {
        borderTopWidth: 1,
        borderColor: '#82828225',
        marginTop: 10,
        paddingTop: 10,
    },
    info_contact_des: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info_contact_des_label: {
        fontSize: 16,
        color: '#2D9CDB',
        marginLeft: 10,
    },
    info_component_title: {
        fontSize: 18,
        color: '#828282',
        fontWeight: '500',
    },
    info_component_des: {
        fontSize: 16,
        color: '#2D9CDB',
    },
    info_componetn_content: {
        flexDirection: 'row',
    },
    info_component_label: {
        fontSize: 16,
        color: '#828282',
    }

});

export default styles;