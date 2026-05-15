import React, { createContext, useContext, useState } from 'react';

const UserAuthContext = createContext();

export const useUserAuth = () => useContext(UserAuthContext);

// Hardcoded consumer credentials
const CONSUMER_CREDENTIALS = {
    email: 'user@gmail.com',
    password: 'user',
    name: 'Urban Style User',
    avatar: 'US',
};

export const UserAuthProvider = ({ children }) => {
    const [consumerUser, setConsumerUser] = useState(() => {
        const saved = localStorage.getItem('urbanstyle_consumer_user');
        return saved ? JSON.parse(saved) : null;
    });

    const [isUserLoginOpen, setIsUserLoginOpen] = useState(false);

    const userLogin = (email, password) => {
        if (email === CONSUMER_CREDENTIALS.email && password === CONSUMER_CREDENTIALS.password) {
            const userData = { email, name: CONSUMER_CREDENTIALS.name, avatar: CONSUMER_CREDENTIALS.avatar };
            setConsumerUser(userData);
            localStorage.setItem('urbanstyle_consumer_user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const userLogout = () => {
        setConsumerUser(null);
        localStorage.removeItem('urbanstyle_consumer_user');
    };

    const openUserLogin = () => setIsUserLoginOpen(true);
    const closeUserLogin = () => setIsUserLoginOpen(false);

    return (
        <UserAuthContext.Provider value={{
            consumerUser,
            userLogin,
            userLogout,
            isConsumerAuthenticated: !!consumerUser,
            isUserLoginOpen,
            openUserLogin,
            closeUserLogin,
        }}>
            {children}
        </UserAuthContext.Provider>
    );
};
