import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffff', 
    },
    containerOverLay: {
        backgroundColor: 'rgba(130, 130, 130,0.5)',
    },
    sectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '92%',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    listContainer_view: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listContainer_label: {
        color: '#828282',
        fontSize: 16,
    },
    contactsContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
        marginHorizontal: 20,
        width: '92%',
        flexDirection: 'column',
    },
    item: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: '#82828250',
        borderRadius: 10,
        padding: 5,
        marginBottom: 8,
        alignItems: 'center',
        flexDirection: 'row'
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
    image: {
        width: 94.29,
        height: 70,
        borderRadius: 10,
    },
    listContainer_label: {
        color: '#828282',
        fontSize: 16,
    },
    listContainer_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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

    // Bottom Button Region
    bottomButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    bottomButtonEnable: {
        width: '95%',
        backgroundColor: '#1890FF',
    },
    bottomButtonDisable: {
        width: '95%',
        backgroundColor: 'grey'
    }
    // End Bottom Buttom Region
});

export default styles;