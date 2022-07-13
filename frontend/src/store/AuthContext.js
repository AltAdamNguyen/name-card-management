import React, {useEffect, useState} from "react";
import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const AuthContext = React.createContext({
    locale: 'vn',
    isLogin: false,
    isMarketer: 0,
    userId: 0,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [locale, setLocale] = useState('vn')
    const [isMarketer, setIsMarketer] = useState(0)
    const [userId, setUserId] = useState(0)

    const handleLogin = async(accessToken, refreshToken) => {
        let decoded = jwt_decode(accessToken);
        if(decoded.role !== 4){
            setIsMarketer(decoded.role)
            setUserId(decoded.uid)
            setIsLogin(true);
            await SecureStore.setItemAsync('access_token',accessToken)
            SecureStore.setItemAsync('refresh_token',refreshToken)
        }
        
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
            userId: userId,
            onLogin: handleLogin,
            onLogout: handleLogout,
            language: handleLocale}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;