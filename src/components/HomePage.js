import React from 'react';
import '../styles/homepage.css'; // Импортируем стили
import logo from './uyut.png'
const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Добро пожаловать в ресторан "УЮТ"!</h1>
            <p>Мы рады видеть вас здесь. Выберите раздел в меню выше.</p>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={logo} className="App-logo" alt="logo" />

        </div>
    );
};

export default HomePage;