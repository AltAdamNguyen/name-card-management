import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import AuthContext from '../../store/AuthContext';

import styles from './styles'
import iconPath from '../../constants/iconPath';
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import CustemHeaders from '../../components/CustomHeaders/CustemHeaders'
import Logo_Login from '../../asset/image/login.png'
const SignIn = ({ navigation }) => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ isSecureEntry, setIsSecureEntry] = useState(true)
  const authCtx = useContext(AuthContext);
  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  }
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onClearUsernamePressed = () => {
    setUsername('')
  }
  return (
      <View style={styles.root}>
        <CustemHeaders text_PRIMARY='Name Card Management' Logo={Logo_Login}   />
        <CustomInputs placeholder='Tên dăng nhập' value={username} setValue={setUsername} icon={iconPath.icCloseCircle} onpress={onClearUsernamePressed}/>
        <CustomInputs placeholder='Mật khẩu' value={password} setValue={setPassword} secureTextEntry={isSecureEntry} icon={isSecureEntry ? iconPath.icEye : iconPath.icEye_invisible} 
        onpress = {onVisibilityPasswordPressed}/>
        <CustomButtons text='Quên mật khẩu' onPress={onForgotPasswordPressed} type="TERTIARY" />
        <CustomButtons text='Đăng nhập' onPress={authCtx.onLogin} />
        <View style={styles.language}>
          <TouchableOpacity>
            <Image source={iconPath.icVN} style={[styles.icon,styles.mr20]}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={iconPath.icUK} style={styles.icon}/>
          </TouchableOpacity>
        </View>
        <View style={styles.title}>
          <Text>@2022 Phát triển bởi NCM Team</Text>
        </View>
      </View>


  )
}

export default SignIn