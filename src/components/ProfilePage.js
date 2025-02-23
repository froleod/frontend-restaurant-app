import React from 'react';
import { useAuth } from '../context/AuthContext'; // Импортируем контекст авторизации
import { useNavigate } from 'react-router-dom'; // Для навигации
import '../styles/profilepage.css'; // Импортируем стили

const ProfilePage = () => {
    const { isAuthenticated, user, logout } = useAuth(); // Получаем данные из контекста
    const navigate = useNavigate(); // Хук для навигации

    const handleLoginClick = () => {
        navigate('/login'); // Переход на страницу логина
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Переход на страницу регистрации
    };

    return (
        <div className="profile-page">
            {isAuthenticated ? (
                <>
                    <h1>Привет, {user?.username}!</h1>
                    <button onClick={logout}>Выйти</button>
                </>
            ) : (
                <>
                    <h1>Добро пожаловать!</h1>
                    <button onClick={handleLoginClick}>Войти</button>
                    <button onClick={handleRegisterClick}>Зарегистрироваться</button>
                </>
            )}
        </div>
    );
};

export default ProfilePage;