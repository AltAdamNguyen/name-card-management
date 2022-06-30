import {StyleSheet, Dimensions } from 'react-native';


// define your styles
const styles = StyleSheet.create({
    mb10: {
        marginBottom: 10,
    },
    ml10: {
        marginLeft: 10,
    },
    containerOverlay: {
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    info_flag_modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '70%',
        alignItems: 'flex-start',
        padding: 5
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
    info_status_modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '90%',
        alignItems: 'flex-start',
        padding: 10
    },
    info_status_modalItem_button: {
        flexDirection:'row', 
        justifyContent: 'space-around', 
        width: '100%', 
        marginTop: 10
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    body: {
        flex: 1,
    },
    body_imgContact: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height*0.3,
        justifyContent: "center",
        padding: 5,
        marginBottom: 10,
    },
    body_imgContact_image:{
        width: '100%',
        height: '100%',
        aspectRatio: 1.63185185185,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    info: {
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
        borderRadius: 10,
        marginTop: 10
    },
    info_component: {
        borderTopWidth: 1,
        borderColor: '#82828225',
        marginTop: 10,
        paddingTop: 10,
    },
    info_component_item: {
        flexDirection: 'row',
        alignItems: 'center',
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
        // color: '#2D9CDB',
    },
    info_componetn_content: {
        flexDirection: 'row',
    },
    info_component_label: {
        fontSize: 16,
        color: '#828282',
    },
    modelViewFloat: {
        backgroundColor: '#ffff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

});

export default styles;