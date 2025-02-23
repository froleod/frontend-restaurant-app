// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
//
// const AuthContext = createContext();
//
// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);
//     const [role, setRole] = useState(localStorage.getItem('role') || null);
//
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Загружаем данные пользователя
//             fetchUserData(token);
//         }
//     }, []);
//
//     const fetchUserData = async (token) => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/auth/me', {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setUser(response.data); // Сохраняем данные пользователя
//             setIsAuthenticated(true); // Устанавливаем флаг авторизации
//         } catch (error) {
//             console.error('Ошибка при загрузке данных пользователя:', error);
//             logout(); // Если токен недействителен, разлогиниваем пользователя
//         }
//     };
//
//     const login = async (username, password) => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('role', role);
//             setRole(role);
//             setIsAuthenticated(true);
//             setUser({ username });
//         } catch (error) {
//             console.error('Login failed', error);
//         }
//     };
//
//     const register = async (username, email, password) => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/auth/register', { username, email, password });
//             localStorage.setItem('token', response.data.token);
//             // localStorage.setItem('role', response.data.role);
//             setIsAuthenticated(true);
//             setUser({ username });
//         } catch (error) {
//             console.error('Registration failed', error);
//         }
//     };
//
//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         setRole(null);
//         setIsAuthenticated(false);
//         setUser(null);
//     };
//
//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, role, login, register, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };
//
// export const useAuth = () => useContext(AuthContext);


import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(localStorage.getItem('role') || null);

    // Проверка авторизации при загрузке приложения
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Загружаем данные пользователя
            fetchUserData(token);
        }
    }, []);

    // Метод для загрузки данных пользователя
    const fetchUserData = async (token) => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { username, role } = response.data; // Предполагаем, что бэкенд возвращает username и role
            setUser({ username }); // Сохраняем данные пользователя
            setRole(role); // Сохраняем роль
            setIsAuthenticated(true); // Устанавливаем флаг авторизации
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
            logout(); // Если токен недействителен, разлогиниваем пользователя
        }
    };

    // Метод для входа
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            const { token, role } = response.data; // Извлекаем токен и роль из ответа

            // Сохраняем токен и роль в локальном хранилище
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Обновляем состояние
            setRole(role);
            setIsAuthenticated(true);
            setUser({ username });
        } catch (error) {
            console.error('Ошибка при входе:', error);
        }
    };

    // Метод для регистрации
    const register = async (username, email, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { username, email, password });
            const { token, role } = response.data; // Извлекаем токен и роль из ответа

            // Сохраняем токен и роль в локальном хранилище
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Обновляем состояние
            setRole(role);
            setIsAuthenticated(true);
            setUser({ username });
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
        }
    };

    // Метод для выхода
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setRole(null);
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, role, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);