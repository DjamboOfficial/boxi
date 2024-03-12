import "./mission-parallax.css";
import "../../../src/App.css";
import React, { useEffect, useState } from "react";

export const MissionParallax = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1709908516/boxi/djambo1990_51954_Hyperrealistic_photograph_of_a_studio_where_a__ddccb40e-63af-44b2-850e-9ab7b7104697_pz5sz7.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710145809/boxi/djambo1990_51954_a_modern-style_pottery_studio_where_three_wome_ea3038e7-5a90-4e51-a191-c37a24d4799a_twotft.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710147533/boxi/djambo1990_51954_a_modern-style_studio_where_one_guy_and_one_wo_b51f4c86-2e41-4ff1-b476-1d7ddfef383d_ygjnko.png",
    "https://res.cloudinary.com/dgwvbd9ki/image/upload/v1710147830/boxi/djambo1990_51954_a_modern-style_studio_where_one_woman_from_Sen_e8573ac8-295d-4eb1-9b7a-2b339be1612b_imvlhi.png",
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
        <nav className="horizontal-parallax-nav">
          <ul>
            <li>
              <a href="">Our mission</a>
            </li>
            <li>
              <a href="">Our mission</a>
            </li>
            <li>
              <a href="">Our mission</a>
            </li>
            <li>
              <a href="">Our mission</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
