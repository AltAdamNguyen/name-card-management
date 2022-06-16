import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButtons = ({onPress, text, type = "PRIMARY"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 15,
        marginVertical: 5,
        // alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    container_PRIMARY: {
        backgroundColor: '#1890FF',
    },
    container_TERTIARY: {
        
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    text_TERTIARY:{
        color: '#2D9CDB',
        fontSize: 12,
        textAlign: 'right'
    }
})

export default CustomButtons