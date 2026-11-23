import React, { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react-refresh/only-export-components
export const Auth = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const currency = '₹'

    useEffect(() => {
        token && localStorage.setItem('token', token);
    }, [token]);

    const logout = () => {
        localStorage.clear();
        toast.success('Logged out')
        setToken('');
    };

    const value = {
        token,
        setToken,
        logout,
        currency
    };

    return <Auth.Provider value={value}>{children}</Auth.Provider>;
};

export default AuthProvider;
