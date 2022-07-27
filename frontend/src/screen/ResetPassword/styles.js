import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
        width: '100%'
    },
    header: {
        backgroundColor: 'white'
    },
    logo: {
        width: 300,
        maxWidth: 300,
        alignItems: "center",
        paddingHorizontal: "50%",
        
      },
    
      text_PRIMARY: {
      
        fontWeight: "bold",
        fontSize: 20,
        color: "#2F80ED",
        textAlign: "center",
        marginBottom: '10%',
        alignItems: "center",
      },
      headline: {
        width: '100%',
        
      }
})

export default styles