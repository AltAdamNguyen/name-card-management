import React, {useState} from "react";

const AuthContext = React.createContext({
    isLogin: false,
    onLogin: () => {},
    onLogout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);

    const handleLogin = () => {
        setIsLogin(true);
    }

    const handleLogout = () => {
        setIsLogin(false);
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