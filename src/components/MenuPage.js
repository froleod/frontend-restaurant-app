import React from 'react';
import '../styles/menupage.css'; // Импортируем стили

const MenuPage = () => {
    return (
        <div className="menu-page">
            <h1>Наше меню</h1>
            <ul className="menu-list">
                <li>Блюдо 1</li>
                <li>Блюдо 2</li>
                <li>Блюдо 3</li>
            </ul>
        </div>
    );
};

export default MenuPage;