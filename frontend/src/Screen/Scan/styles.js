import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    preview: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: Math.round((Dimensions.get('window').width*4)/3),
        width: Dimensions.get('window').width,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    suggest: {
        justifyContent: 'center',
        backgroundColor: '#BDBDBD',
        borderRadius: 15,
        padding: 5,
        position: 'absolute',
        bottom: '80%',
    },
    iconOverlay: {
        height: Dimensions.get('window').width*0.7,
        width: Dimensions.get('window').width*0.9,
        resizeMode: 'contain',
    },
    iconScan: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        height: '10%',
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    containerScan: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BDBDBD',
        borderRadius: 30,
    },
    iconScan: {
        tintColor: '#ffff',
    },
});

export default styles;