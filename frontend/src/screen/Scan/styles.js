import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    header: {
        alignItems: 'center',
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        padding: 15,
    },
    header_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    header_content_buttonClose: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header_content_buttonClose_iconClose: {
        tintColor: '#BDBDBD',
    },
    preview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '70%',
    },
    preview_camera: {
        width: "100%", 
        backgroundColor: "#ffff", 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    preview_overlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview_suggest: {
        justifyContent: 'center',
        backgroundColor: '#BDBDBD',
        borderRadius: 15,
        padding: 5,
        position: 'absolute',
        top: '20%',
    },
    preview_iconOverlay: {
        height: Dimensions.get('window').width * 0.7,
        width: Dimensions.get('window').width * 0.9,
        resizeMode: 'contain',
    },
    footer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '20%',
    },
    footer_content: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        
    },
    footer_buttonScan: {
        width: '20%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BDBDBD',
        borderRadius: 100000,
    },
    footer_buttonScan_iconScan: {
        tintColor: '#ffff',
        width: '50%',
        height: '50%',
    },
});

export default styles;