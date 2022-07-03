import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    Bold: {
        fontWeight: 'bold',
    },
    mb10: {
        marginBottom: 10,
    },
    mr10: {
        marginRight: 10,
    },
    w60: {
        width: '60%',
    },
    buttongray3: {
        tintColor: '#82828250',
        width: 20,
        height: 20,
    },
    containerOverlay: {
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },

    modalView: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        width: '70%',
        alignItems: 'flex-start',
        padding: 5
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalIcon: {
        width: 32,
        margin: 10
    },
    modalText: {
        fontSize: 15,
    },

    modelViewFloat: {
        backgroundColor: '#ffff',
        width: '90%',
        position: 'absolute',
        bottom: 0,
        padding: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalLabel: {
        fontSize: 16,
    },
    modalFloatSort: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalFloatSortItem: {
        borderColor: '#828282',
        borderWidth: 1,
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 3,
        paddingBottom: 3,
    },
    modalFloatMange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

    titleContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
    },
    labelList: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    buttonFlag: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    sectionFlag: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        paddingLeft: 5,
    },
    labelFlag: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
    },

    listContainer: {
        marginTop: 20,
        flex: 1,
        width: '90%',
        flexDirection: 'column',
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
    card: {
        marginBottom: 10,
        borderRadius: 10
    },
    item: {
        width: '100%',
        height: 80,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },

    image: {
        width: 94.29,
        height: 70,
        borderRadius: 10,
    },
    txtContact: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    title: {
        width: '100%',
    },
    nameContact: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#262626',
    },
    titleContact: {
        fontSize: 12,
        color: '#8C8C8C',
    },
    companyContact: {
        fontSize: 12,
        color: '#8C8C8C',
    },
    date: {
        fontSize: 10,
        color: '#8C8C8C',
    },
    floatButton: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#1890FF'
    },


});

export default styles;