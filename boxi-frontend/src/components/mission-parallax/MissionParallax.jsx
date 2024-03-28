import "./mission-parallax.css";
import "../../../src/App.css";
import React, { useEffect, useState } from "react";

export const MissionParallax = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710926198/boxi/djambo1990_51954_Hyperrealistic_photograph_of_a_studio_where_a__9caa0b79-3e96-4168-b49d-a1449311d5ca_otd0yd.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710926137/boxi/djambo1990_51954_a_modern-style_studio_where_one_guy_and_one_wo_b51f4c86-2e41-4ff1-b476-1d7ddfef383d_gxoir8.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710926135/boxi/djambo1990_51954_a_modern-style_pottery_studio_where_three_wome_ea3038e7-5a90-4e51-a191-c37a24d4799a_qizzr6.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710926125/boxi/djambo1990_51954_a_modern-style_studio_where_one_woman_from_Sen_e8573ac8-295d-4eb1-9b7a-2b339be1612b_fmvjzo.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const backgroundImageStyle = {
    backgroundImage: `url(${images[currentImageIndex]})`,
    backgroundColor: "#f0f0f0", // Fallback background color
  };

  useEffect(() => {
    const nav = document.querySelector(".horizontal-parallax-nav");

    const handleMouseMove = (e) => {
      const xPos = e.clientX / window.innerWidth;
      const moveAmount = -150 * xPos;
      nav.style.transform = `translateX(${moveAmount}px)`;
    };

    nav.addEventListener("mousemove", handleMouseMove);

    return () => {
      nav.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className="horizontal-parallax" style={backgroundImageStyle}>
        <h1>boxi</h1>
        <nav className="horizontal-parallax-nav"></nav>
      </div>
    </>
  );
};
