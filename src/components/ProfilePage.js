import React, { useState } from 'react';
import '../styles/profilepage.css'; // Импортируем стили
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            {isLoggedIn ? (
                <p>Добро пожаловать!</p>
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