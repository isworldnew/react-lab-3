import React, { useState, useEffect } from 'react';
import ProductInfo from "../common-components/product-info/ProductInfo.jsx";
import './ShoppingCart.css';
import Card from "../common-components/card/Card.jsx";
import Header from "../common-components/header/Header.jsx";
import Button from "../common-components/button/Button.jsx";
import * as localStorageManagement from "../common-components/localStorageManagement.js";
import bicycles from "../common-components/data.js";
import CardInCart from "./cart-card/CardInCart.jsx";
import GoodIcon from "./goods-icon/GoodsIcon.jsx";

export default function ShoppingCart() {
    const productIdentifiers = localStorageManagement.getAllProductId();
    const [productAmounts, setProductAmounts] = useState({});
    const [totalPrice, setTotalPrice] = useState(localStorageManagement.calculateTotalPriceFromLocalStorage());

    useEffect(() => {
        const amounts = {};
        let total = 0;
        productIdentifiers.forEach(id => {
            const amount = localStorageManagement.getAmountByProductId(id);
            amounts[id] = amount;
            total += amount * bicycles[id - 1].price;
        });
        setProductAmounts(amounts);
        setTotalPrice(total);
    }, [productIdentifiers]);

    const addToCartHandler = (bicycleId, value) => {
        localStorageManagement.addToCart(bicycleId, value);
        const newAmount = (productAmounts[bicycleId] || 0) + value;
        setProductAmounts(prevAmounts => ({
            ...prevAmounts,
            [bicycleId]: newAmount
        }));
        const priceChange = value * bicycles[bicycleId - 1].price;
        setTotalPrice(prevPrice => prevPrice + priceChange);
    };

    const renderCards = () => {
        return productIdentifiers.map(id => (
            <CardInCart id={id} key={id} amount={productAmounts[id]} onAddToCart={addToCartHandler}>
                <GoodIcon
                    imageRef={bicycles[id - 1].img}
                    path="/goods-card"
                    param={id}
                />
                <ProductInfo fontSize="20px" fontWeight="bold">{bicycles[id - 1].name}</ProductInfo>
                <ProductInfo fontSize="20px">{bicycles[id - 1].price + " руб."}</ProductInfo>
                <div className="good-counter">
                    <button onClick={() => { addToCartHandler(id, -1) }}>-</button>
                    <p>{productAmounts[id]}</p>
                    <button onClick={() => { addToCartHandler(id, 1) }}>+</button>
                </div>
            </CardInCart>
        ));
    };

    return (
        <>
            <Header />
            <div className="shopping-cart-page">
                <ProductInfo fontSize="40px" fontWeight="bold">Корзина</ProductInfo>
                <div className="shopping-cart-page-info">
                    <div>{renderCards()}</div>
                    <Card>
                        <ProductInfo fontSize="35px">Сумма</ProductInfo>
                        <ProductInfo fontSize="20px">{totalPrice + " руб."}</ProductInfo>
                        <Button>К оплате</Button>
                    </Card>
                </div>
            </div>
        </>
    );
}