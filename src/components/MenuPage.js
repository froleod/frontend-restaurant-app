import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import '../styles/menupage.css'


const MenuPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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