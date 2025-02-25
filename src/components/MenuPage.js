import React, {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import '../styles/MenuPage.css';

const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {cart, addToCart, updateQuantity, removeFromCart} = useAuth();

    // Проверяем, добавлен ли продукт в корзину
    const isProductInCart = (productId) => {
        return cart.some((item) => item.id === productId);
    };

    // Получаем количество продукта в корзине
    const getProductQuantity = (productId) => {
        const productInCart = cart.find((item) => item.id === productId);
        return productInCart ? productInCart.quantity : 0;
    };

    const handleAddToCart = (product) => {
        addToCart(product, 1); // Добавляем продукт в корзину с количеством 1
    };

    const handleIncreaseQuantity = (productId) => {
        updateQuantity(productId, getProductQuantity(productId) + 1); // Увеличиваем количество
    };

    const handleDecreaseQuantity = (productId) => {
        const currentQuantity = getProductQuantity(productId);
        if (currentQuantity > 1) {
            updateQuantity(productId, currentQuantity - 1); // Уменьшаем количество
        } else {
            // Если количество равно 1, удаляем продукт из корзины
            removeFromCart(productId);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products");
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке данных");
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Ошибка загрузки продуктов:", error);
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="menu-page">Загрузка...</div>;
    }

    if (error) {
        return <div className="menu-page">Ошибка: {error}</div>;
    }

    if (products.length === 0) {
        return <div className="menu-page">Меню пока пусто.</div>;
    }

    return (
        <div className="menu-page">
            <h1>Наше меню</h1>
            <ul className="menu-list">
                {products.map((product) => {
                    const quantity = getProductQuantity(product.id);
                    return (
                        <li key={product.id} className="menu-item">
                            <img src={product.imageUrl} alt={product.name} className="product-image"/>
                            <div className="product-details">
                                <h2>{product.name}</h2>
                                <p className="desc">{product.description}</p>
                                <p className="product-price">{product.price} ₽</p>
                            </div>
                            {quantity > 0 ? (
                                <div className="quantity-controls">
                                    <button
                                        onClick={() => handleDecreaseQuantity(product.id)}
                                        className="quantity-button"
                                    >
                                        -
                                    </button>
                                    <span>{quantity}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(product.id)}
                                        className="quantity-button"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="add-to-cart-button"
                                >
                                    Добавить в корзину
                                </button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MenuPage;