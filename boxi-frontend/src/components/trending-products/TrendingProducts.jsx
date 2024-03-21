import React, { useEffect, useState } from "react";
import "./trending-products.css";
import axios from "axios";

export const Trendingproducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "http://localhost:3000/products/trending"
      );
      const data = response.data;
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      await axios.post(
        "http://localhost:3000/products/cart/add",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      console.log("Product added to cart");
    } catch (error) {
      console.error("Product not added to cart:", error);
    }
  };

  return (
    <>
      <div className="trending-items-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="trending-item-card" key={product._id}>
              <div className="trending-item-card-top-section">
                <img src={product.image} alt="product.image" />
              </div>
              <div className="trending-item-card-bottom-section">
                {" "}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <button onClick={() => handleAddToCart(product._id)}>
                  Add product to cart
                </button>
              </div>

              {/*    
             
          */}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
