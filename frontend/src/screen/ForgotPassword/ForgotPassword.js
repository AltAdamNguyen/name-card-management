import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import CustemHeaders from '../../components/CustomHeaders/CustemHeaders'

import styles  from './styles'

const ForgotPassword = () => {
    const {email, setEmail} = useState('');

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    }
  return (
    <View style={styles.root}>
    <CustemHeaders text_PRIMARY='Name Card Management' text_TERTIARY='Scan, Export & Manage' text_title='Đặt lại mật khẩu'/>
      <CustomInputs placeholder='Email' value={email} setValue={setEmail}/>
      <CustomButtons text='Đặt lại mật khẩu' onPress={onForgotPasswordPressed} />
    </View>
  )
}

export default ForgotPassword