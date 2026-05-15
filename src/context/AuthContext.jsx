import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('urbanstyle_admin_user');
        return saved ? JSON.parse(saved) : null;
    });

    const login = (username, password) => {
        // Simple hardcoded auth for demo/functional requirement
        if (username === 'admin' && password === 'admin123') {
            const userData = { username: 'Abishek Adhikari', role: 'Store Manager', avatar: 'AA' };
            setUser(userData);
            localStorage.setItem('urbanstyle_admin_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('urbanstyle_admin_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
