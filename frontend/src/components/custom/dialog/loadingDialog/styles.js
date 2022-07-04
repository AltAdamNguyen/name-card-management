import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    dialog: {
        width: '60%',
        zIndex: 4, 
        position: "absolute", 
        alignItems: "center", 
        justifyContent: "center", 
        backgroundColor: 'red', 
        top: '40%',
        height: '25%'
    },
    loadingContainer :{
        alignItems:'center',
        justifyContent: 'center',
        
    },
    loading: {
        height: 100,
        width: '60%',
        alignItems: 'center',
        paddingHorizontal: '50%',
        
    },
    title: {
        textAlign:'center'
    }
})

export default styles;
