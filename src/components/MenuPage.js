import React, { useEffect, useState } from 'react';
import '../styles/menupage.css';

const MenuPage = () => {
    const [products, setProducts] = useState([]); // Состояние для хранения продуктов
    const [loading, setLoading] = useState(true); // Состояние для отображения загрузки
    const [error, setError] = useState(null); // Состояние для обработки ошибок

    // Загрузка данных
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/products'); // Запрос на бэкенд
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setProducts(data); // Сохраняем данные в состояние
            } catch (error) {
                setError(error.message); // Обрабатываем ошибку
            } finally {
                setLoading(false); // Завершаем загрузку
            }
        };

        fetchProducts();
    }, []);

    // Отображение загрузки
    if (loading) {
        return <div className="menu-page">Загрузка...</div>;
    }

    // Отображение ошибки
    if (error) {
        return <div className="menu-page">Ошибка: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="menu-page">Меню пока пусто.</div>;
    }

    // Отображение данных
    return (
        <div className="menu-page">
            <h1>Наше меню</h1>
            <ul className="menu-list">
                {products.map((product) => (
                    <li key={product.name} className="menu-item">
                        <img src={product.imageUrl} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p className="product-price">{product.price} ₽</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuPage;