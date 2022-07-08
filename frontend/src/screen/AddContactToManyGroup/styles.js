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
    container_provider : {
        backgroundColor: '#FFF',
        marginVertical: -5
    },
    container_title: {
        width: '90%',
        marginTop: 20,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container_title_label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
    },
    container_label_addNewGroup: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1890FF',
        
    },
    container: {    
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
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
        width: '95%',
    },
    sectionStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
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
        // justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#82828225',
        borderRadius: 10,
        padding: 10,
    },
    container_listGroup_item_label: {
        fontSize: 16,
        paddingLeft: 10,
        top: '2%'
    },
    // container_footer: {
    //     // position: 'absolute',
    //     width: 50,
    //     height: 50,
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     // left: '80%',
    //     // bottom: '12%',
    //     backgroundColor: '#1890FF',
    //     borderRadius: 25,
    // },
    listContainer_view: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    listContainer_label: {
        color: '#828282',
        fontSize: 16,
    },
    checkBox: {
        height: 1
    },
    
    // Bottom Button Region
    bottomButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '95%'
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