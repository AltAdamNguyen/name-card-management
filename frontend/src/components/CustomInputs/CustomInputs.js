import { View, Text, Image,TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomInputs = ({value, setValue, placeholder, secureTextEntry, icon, onpress}) => {
   
  return (
    <View style={styles.container}>
      <TextInput 
        placeholder={placeholder} 
        style={styles.input}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        
      />
      <TouchableOpacity onPress={onpress}>
      <Image source={icon} style={styles.icon} resizeMode='contain'/>
      </TouchableOpacity>
      

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent: 'space-between'
    },
    input:{
      fontSize: 10
    },
    icon:{
    }
})
export default CustomInputs