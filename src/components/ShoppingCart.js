import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/ShoppingCart.css';

const ShoppingCart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useAuth();
    console.log('Текущая корзина:', cart);
    // Подсчёт итоговой стоимости
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="shopping-cart">
            <h1>Корзина</h1>
            {cart.length === 0 ? (
                <p>Ваша корзина пуста :(</p>
            ) : (
                <>
                    <ul className="cart-list">
                        {cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h2>{item.name}</h2>
                                    <p>{item.price} ₽</p>
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">
                                        Удалить
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h2>Итого: {totalPrice.toFixed(2)} ₽</h2>
                        <button onClick={clearCart} className="clear-cart-button">
                            Очистить корзину
                        </button>
                        <Link to="/checkout" className="checkout-button">
                            Оформить заказ
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;