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
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="trending-items-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="trending-item-card" key={product._id}>
              <img src={product.imageUrl} alt="product-image" />
              <h3>{product.name}</h3>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
