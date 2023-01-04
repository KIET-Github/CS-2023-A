/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import jwt from 'jwt-decode';

const AuthContext = React.createContext({
    token: '',
    user: {},
    isLoggedIn: false,
    login: () => { },
    logout: () => { },
});

export function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);

    useEffect(() => {
        // get token value on loading application
        const savedToken = localStorage.getItem('token');
        setToken(savedToken);
    }, [])

    const userIsLoggedIn = token !== null;

    // decode payload aka token
    const userData = token === null ? {} : jwt(token);

    const loginHandler = (tkn) => {
        setToken(tkn);

        // saving token in local storage
        localStorage.setItem('token', tkn);
    }

    const logoutHandler = () => {
        setToken(null);

        // set token in local storage as null
        localStorage.clear('token');
    }

    const contextValue = {
        token,
        user: userData,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;