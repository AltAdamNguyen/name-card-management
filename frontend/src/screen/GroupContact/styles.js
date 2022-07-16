import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    containerOverlay: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#FFFF',
    },
    container_sectionStyle: {
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
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '90%',
    },
    sectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    container_title: {
        width: '90%',
        marginTop: 20,
    },
    container_title_label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
    },
    floatButton: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#1890FF'
    },
    container_listGroup: {
        flex: 1,
        flexDirection: 'column',
        width: '90%',
        marginTop: 20,
    },
    container_listGroup_item: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#82828225',
        borderRadius: 10,
        padding: 15,
        backgroundColor: "#FFF"
    },
    container_listGroup_item_label: {
        fontSize: 16,
    },
    container_footer: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: '30%',
        bottom: 20,
        backgroundColor: '#1890FF',
        borderRadius: 25,
    },
    listContainer_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listContainer_label: {
        color: '#828282',
        fontSize: 16,
    },
});

export default styles;