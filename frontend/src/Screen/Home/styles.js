import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    Bold: {
        fontWeight: 'bold',
    },
    mb10: {
        marginBottom: 10,
    },
    mr10:{
        marginRight: 10,
    },
    w60: {
        width: '60%',
    },
    buttongray3: {
        tintColor: '#82828250',
    },
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
            width: '50%',
            alignItems: 'flex-start',
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
            width: '100%',
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
        fontfamily: 'Roboto',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },

    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
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

    titleContainer: {
        marginTop: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    labelList: {
        textAlign: 'left',
        width: '50%',
        fontSize: 16,
        fontWeight: 'bold',
        
    },
    flag: {
        width: '50%',
    },
        buttonFlag: {
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
            sectionFlag: {
                flexDirection:'row', 
                alignItems:'center', 
                borderRadius:10, 
                paddingLeft: 5, 
                paddingRight: 5
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
    item: {
        width: '100%',
        height: 80,
        borderWidth: 1,
        borderColor: '#82828225',
        borderRadius: 10,
        padding: 5,
        marginBottom: 8,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        marginTop: 15,
        fontSize: 10,
    },
    floatButton: {
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


});

export default styles;