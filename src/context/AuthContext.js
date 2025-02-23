import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            // Здесь можно добавить запрос для получения данных пользователя
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setUser({ username });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { username, email, password });
            localStorage.setItem('token', response.data.token);
            setIsAuthenticated(true);
            setUser({ username });
        } catch (error) {
            console.error('Registration failed', error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);