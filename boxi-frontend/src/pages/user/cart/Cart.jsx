import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../../../components/header/Header";
import { Payment } from "../Payment";
import "./cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/products/cart",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Failed to fetch cart items. Please try again later.");
      }
    };

    fetchCartItems();
  }, []);

  const totalCartPrice = cartItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <>
      <Header />
      <div className="cart-page-container">
        <h2>Shopping Cart</h2>
        {error ? (
          <p>{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="products-and-button">
              <div className="cart-products-container">
                <div className="cart-product-card">
                  {cartItems.map((item, index) => (
                    <div className="cart-product-card-item" key={item._id}>
                      <div className="trending-item-card-top-section">
                        <img src={item.image} alt={item.productName} />
                      </div>
                      <div className="trending-item-card-bottom-section">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>{item.price} €</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart-price">
                <div className="total-cart-price">
                  <h1>{totalCartPrice}</h1>
                </div>
                <button className="payment-button">
                  <a href="/payment">Checkout</a>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;

/*  <div className="artisan-product-card">
        {artisanProducts.length > 0 &&
          artisanProducts.map((product) => (
            <div className="artisan-product-card-item" key={product._id}>
              <div className="artisan-product-card-top">
                <img src={product.image} alt={product.productName} />
              </div>
              <div className="artisan-product-card-bottom">
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <p>Price: €{product.price}</p>
              </div>
            </div>
          ))}
      </div> */
