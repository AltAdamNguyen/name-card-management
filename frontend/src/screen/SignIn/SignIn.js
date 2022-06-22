import { View, Text, Image, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import AuthContext from '../../store/AuthContext';

import styles from './styles'
import iconPath from '../../constants/iconPath';
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import CustemHeaders from '../../components/CustomHeaders/CustemHeaders'
import Logo_Login from '../../asset/image/login.png'
import { FetchApiAuth } from '../../service/api/FetchAPI';

import { AuthAPI, ContentType, Method } from '../../constants/ListAPI';
const SignIn = ({ navigation }) => {

  const [user,setUser] = useState({
    email: '',
    password: ''
  })
  const [ isSecureEntry, setIsSecureEntry] = useState(true)
  const authCtx = useContext(AuthContext);
  const onVisibilityPasswordPressed = () => {
    setIsSecureEntry((prev) => !prev);
  }
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword')
  }

  const onSignInPressed = () => {
    FetchApiAuth(AuthAPI.Login, Method.POST, ContentType.JSON, user, getMessage)
  }

  const getMessage = (data) => {
    console.log(data)
    if(data.message === "Get token success"){
      authCtx.onLogin(data.data.access_token, data.data.refresh_token)
    }

  }

  const handleChange = (name) => {
    return (text) => {
        setUser({
            ...user,
            [name]: text
        })
    }
}

  const onClearUsernamePressed = () => {
    setUser(...user, {email: ''})
  }
  return (
      <View style={styles.root}>
        <CustemHeaders text_PRIMARY='Name Card Management' Logo={Logo_Login}   />
        <CustomInputs placeholder='Tên dăng nhập' value={user.email} setValue={handleChange('email')} icon={iconPath.icCloseCircle} onpress={onClearUsernamePressed}/>
        <CustomInputs placeholder='Mật khẩu' value={user.password} setValue={handleChange('password')} secureTextEntry={isSecureEntry} icon={isSecureEntry ? iconPath.icEye : iconPath.icEye_invisible} 
        onpress = {onVisibilityPasswordPressed}/>
        <CustomButtons text='Quên mật khẩu' onPress={onForgotPasswordPressed} type="TERTIARY" />
        <CustomButtons text='Đăng nhập' onPress={onSignInPressed} />
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