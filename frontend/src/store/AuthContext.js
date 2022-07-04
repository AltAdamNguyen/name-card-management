import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext({
    locale: 'vn',
    isLogin: false,
    isMarketer: 0,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [locale, setLocale] = useState('vn')
    const [isMarketer, setIsMarketer] = useState(0)
    const handleLogin = async(accessToken, refreshToken) => {
        setIsLogin(true);
        await SecureStore.setItemAsync('access_token',accessToken)
        SecureStore.setItemAsync('refresh_token',refreshToken)

        let decoded = jwt_decode(accessToken);
        setIsMarketer(decoded.role)
    }

    const handleLogout = async() => {
        setIsLogin(false);  
        SecureStore.deleteItemAsync('access_token')
        SecureStore.deleteItemAsync('refresh_token')
    }

    const handleLocale = (language) => {      
        setLocale(language)   
    }
    

    return (
        <AuthContext.Provider value={{
            locale : locale,
            isLogin: isLogin,
            isMarketer: isMarketer,
            onLogin: handleLogin,
            onLogout: handleLogout,
            language: handleLocale}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;