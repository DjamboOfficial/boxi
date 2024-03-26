import { useState, useEffect } from "react";
import axios from "axios";
import "../../artisan-dashboard/artisan-dashboard.css";

export const ArtisanProducts = (artisanId) => {
  const [artisanProducts, setArtisanProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:3000/artisan/allProducts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setArtisanProducts(response.data);
        console.log("Products: ", artisanProducts);
      } catch (error) {
        console.log("Error: ", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="artisan-product-card">
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
      </div>
    </>
  );
};
