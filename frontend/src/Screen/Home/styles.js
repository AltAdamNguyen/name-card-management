import { StyleSheet } from 'react-native';

// define your styles
const styles = StyleSheet.create({
    container: {
        fontfamily: 'Roboto',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },

        header: {
            flex: 1.5,
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
                flex: 1,
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
                label: {
                    flex: 1,
                    textAlign: 'left',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#333333',
                },
                picker: {
                    flex: 1,
                    textAlign: 'right',
                    fontSize: 16,
                    color: '#333333',
                },

        listContainer: {
            flex: 8.5,
            width: '90%',
            flexDirection: 'column',
        },
            item: {
                width: '100%',
                height: 80,
                borderWidth: 1,
                borderColor: '#828282',
                borderRadius: 10,
                padding: 5,
                marginBottom: 8,
                alignItems: 'center',
                flexDirection: 'row'
            },

                bookmark: {
                    bottom: '85%',
                    left: '1%',
                    tintColor: '#EB5757',
                },
                image: {
                    top: '17%',
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
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                right: 10,
                bottom: 20,
                backgroundColor: '#1890FF',
                borderRadius: 20,
            },


});

export default styles;