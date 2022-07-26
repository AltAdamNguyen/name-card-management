import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff', 
        justifyContent: 'center',
        width: '100%',
        
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    section: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff', 
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center'
    },

     // Bottom Button Region
     bottomButtonContainer: {
        flexDirection: 'column',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'absolute',
        bottom: 0,
         
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
})

export default styles