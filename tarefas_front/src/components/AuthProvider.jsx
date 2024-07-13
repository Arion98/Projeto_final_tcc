// AuthProvider.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [autenticado, setAutenticado] = useState(true);
    const [user, setUser] = useState(null);

    const login = (userInfo) => {
        setAutenticado(true);
        setUser(userInfo);
    };

    const logout = () => {
        setAutenticado(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ autenticado, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
