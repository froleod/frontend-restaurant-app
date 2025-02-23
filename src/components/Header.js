import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'
import {useAuth} from "../context/AuthContext";

const Header = () => {

    const { isAuthenticated, user, role, logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault(); // Предотвращаем переход по ссылке
        logout(); // Вызываем метод логаута
    };

    return (
        <header className="header">
            <div className="logo">Ресторан "УЮТ"</div>
            <nav className="nav">
                <Link to="/" className="link">Главная</Link>
                <Link to="/menu" className="link">Меню</Link>
                <Link to="/profile" className="link">Личный кабинет</Link>
                {isAuthenticated ? (
                    <Link to="/" onClick={handleLogout} className="nav-link">Выйти</Link>                ) : (
                    <>
                        <Link to="/login">Войти</Link>
                        <Link to="/register">Зарегистрироваться</Link>
                    </>
                )}
                {role === 'ROLE_ADMIN' && <Link to="/admin">Админка</Link>}
            </nav>
        </header>

    );
};


export default Header;