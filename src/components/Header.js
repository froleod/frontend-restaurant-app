import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="logo">Ресторан "УЮТ"</div>
            <nav className="nav">
                <Link to="/" className="link">Главная</Link>
                <Link to="/menu" className="link">Меню</Link>
                <Link to="/profile" className="link">Личный кабинет</Link>
            </nav>
        </header>

    );
};


export default Header;