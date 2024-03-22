import React, { useEffect, useState } from "react";
import axios from "axios";
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

  return (
    <div className="cart-page-container">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        {error ? (
          <p>{error}</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div className="trending-item-card" key={item._id}>
                <div className="trending-item-card-top-section">
                  <img src={item.image} alt="product.image" />
                </div>
                <div className="trending-item-card-bottom-section">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <button onClick={() => handleAddToCart(item._id)}>
                    Add product to cart
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        <button className="payment-button">
          <a href="/payment">Checkout</a>
        </button>
      </div>
    </div>
  );
};

export default Cart;
