import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionStyle: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#F3F3F3',
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    icSearch: {
        padding: 10,
        margin: 5,
        height: 16,
        width: 16,
        resizeMode: 'stretch',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        height: 40,
        fontSize: 16,
        color: '#828282',
    },
});

export default styles;