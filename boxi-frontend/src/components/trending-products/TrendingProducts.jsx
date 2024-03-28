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
      <div className="trending-items-page-container">
        <h2>Browse our most popular products...</h2>
        <div className="trending-items-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div className="trending-item-card" key={product._id}>
                <div className="trending-item-card-top-section">
                  <img
                    className="product-image"
                    src={product.image}
                    alt="product.image"
                  />
                </div>
                <div className="trending-item-card-bottom-section">
                  {" "}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button onClick={() => handleAddToCart(product._id)}>
                    <img
                      id="trending-item-button-image"
                      src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711036924/boxi/djambo1990_51954_a_realistic_wicker_basket_against_a_white_back_611c3c44-98a2-4c9f-9792-6c993f3e122d-removebg-preview_ytywa2.png"
                      alt="add-to-cart-image"
                    />{" "}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};
