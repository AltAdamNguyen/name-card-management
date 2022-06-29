import React, {useState, useEffect} from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext({
    locale: 'vn',
    isLogin: false,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [locale, setLocale] = useState('vn')
    const handleLogin = async(accessToken, refreshToken) => {
        setIsLogin(true);
        await SecureStore.setItemAsync('access_token',accessToken)
        await SecureStore.setItemAsync('refresh_token',refreshToken)
    }

    const handleLogout = async() => {
        setIsLogin(false);
        
        await SecureStore.deleteItemAsync('access_token')
        await SecureStore.deleteItemAsync('refresh_token')
    }

    const handleLocale = (language) => {      
           () => setLocale(language)   
    }

    useEffect(() => {
        setLocale(locale)
      }, [])  
    return (
        <AuthContext.Provider value={{
            locale : locale,
            isLogin: isLogin,
            onLogin: handleLogin,
            onLogout: handleLogout,
            language: handleLocale}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;