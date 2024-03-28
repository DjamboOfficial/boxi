import React, { useEffect, useState } from "react";
import "./artisans.css";
import axios from "axios";

export const Artisans = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get("http://localhost:3000/artisan/all");
        const newData = response.data;
        console.log(newData);
        setArtisans((prevArtisans) => [...prevArtisans, ...newData]);
      } catch (error) {
        console.error("Error fetching artisans:", error);
      }
    };

    // Fetch artisans initially
    fetchArtisans();

    // Set up interval to fetch artisans every 5 seconds
    const interval = setInterval(fetchArtisans, 5000);

    // Clear interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const containerWidth = artisans.length * 300;
    const intervalId = setInterval(() => {
      setScrollPosition((prevPosition) => (prevPosition + 1) % containerWidth);
    }, 500);
    return () => clearInterval(intervalId);
  }, [artisans.length]);

  return (
    <div className="artisans-page-container">
      <h2>Browse our most popular artisans...</h2>
      <div className="artisans-container">
        {artisans.length > 0 ? (
          artisans.map((artisan, index) => (
            <div
              key={index}
              className="artisan-card"
              style={{ transform: `translateX(-${scrollPosition}px)` }}
            >
              <div className="artisan-card-top-section">
                <img
                  className="artisan-image"
                  src={artisan.profilePicture}
                  alt="artisan.image"
                />
              </div>
              <div className="artisan-card-bottom-section">
                <h3>{artisan.name}</h3>
                <p>{artisan.bio}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
