import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Ionicons';
const CustomInputs = ({value, setValue, placeholder, secureTextEntry, icon}) => {
   
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder={placeholder} 
        style={styles.input}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        
      />
      <Icon  name={icon} size={30} style={styles.icon} />

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        height: 60,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },
    input:{

    },
    icon:{
      marginTop: 10
    }
})
export default CustomInputs