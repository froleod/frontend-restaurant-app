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

// const styles = {
    // header: {
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     padding: '20px 50px',
    //     backgroundColor: '#333',
    //     color: '#fff',
    // },
    // logo: {
    //     fontSize: '35px',
    //     fontWeight: 'bold',
    // },
    // nav: {
    //     display: 'flex',
    //     gap: '20px',
    // },
    // link: {
    //     color: '#fff',
    //     textDecoration: 'none',
    //     fontSize: '30px',
    // },
// };

export default Header;