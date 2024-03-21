import React, { useEffect, useState } from "react";
import axios from "axios";
import { PaymentForm } from "../../../components/payment-form/PaymentForm";

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
    <div>
      <h2>Shopping Cart</h2>
      {error ? (
        <p>{error}</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <div>
                <img src={item.image} alt="product" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ${item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <PaymentForm />
    </div>
  );
};

export default Cart;
