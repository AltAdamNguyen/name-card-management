import React, {useState} from "react";
import * as SecureStore from 'expo-secure-store';

const AuthContext = React.createContext({
    isLogin: false,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

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

    return (
        <AuthContext.Provider value={{
            isLogin: isLogin,
            onLogin: handleLogin,
            onLogout: handleLogout,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;