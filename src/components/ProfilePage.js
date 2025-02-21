import React, { useState } from 'react';
import '../styles/profilepage.css'; // Импортируем стили
import { useNavigate } from 'react-router-dom';
import {useAuth} from "./AuthContext";

const ProfilePage = () => {
    const { isAuthenticated, username, logout } = useAuth();
    const navigate = useNavigate();



    const handleRegister = () => {
        navigate('/register');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="profile-page">
            <h1>Личный кабинет</h1>
            {isAuthenticated ? (
                <p>Добро пожаловать, {username}! <button onClick={logout}>Выйти</button></p>


            ) : (
                <div>
                    <button onClick={handleRegister}>Регистрация</button>
                    <button onClick={handleLogin}>Войти</button>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;