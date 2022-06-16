import { View, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import CustemHeaders from '../../components/CustomHeaders/CustemHeaders'
import Logo_ForgotPassword from '../../asset/image/forgotPassword.png'
import styles  from './styles'

import iconPath from '../../constants/iconPath';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    }

    const onClearEmailPressed = () => {
      setEmail('')
    }
  return (
    <View style={styles.root}>
    <CustemHeaders  Logo={Logo_ForgotPassword}/>
      <CustomInputs placeholder='Email' value={email} setValue={setEmail} icon={iconPath.icCloseCircle} onpress={onClearEmailPressed}/>
      <CustomButtons text='Đặt lại mật khẩu' onPress={onForgotPasswordPressed} />
    </View>
  )
}

export default ForgotPassword