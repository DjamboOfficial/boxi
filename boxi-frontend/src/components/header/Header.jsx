import React, { useState } from "react";
import "./header.css";
import { useUserAuth } from "../../contexts/userAuthContext";

export const Header = () => {
  const { isLoggedIn } = useUserAuth();
  const [isUserChecked, setIsUserChecked] = useState(false);
  const [isArtisanButtonDisabled, setIsArtisanButtonDisabled] = useState(false);

  const handleUserCheckboxChange = () => {
    setIsUserChecked((prevChecked) => !prevChecked);
    setIsArtisanButtonDisabled((prevChecked) => !prevChecked); // Toggle the disabled state of the artisan button
  };

  return (
    <>
      <div className="header-container">
        <div className="edo-logo-container">
          <img
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1708695526/portfolio/edo-logo_jdaxxe.png"
            alt=""
          />
        </div>
        <div className="boxi-logo-container">
          <img
            src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711036672/portfolio/boxi-logo_q3n2kq.png"
            alt=""
          />
        </div>

        <div className="user-or-artisan-toggle-container">
          <label className="switch">
            <p>Are you a simple User?</p>
            <input
              type="checkbox"
              id="header-checkbox"
              checked={isUserChecked}
              onChange={handleUserCheckboxChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <button
          disabled={isUserChecked ? isArtisanButtonDisabled : false} // Disable the button if user checkbox is checked
        >
          <a href={isUserChecked ? "/login" : "/artisanLogin"}>
            {isUserChecked ? "USER LOG IN" : "ARTISAN LOG IN"}
          </a>
        </button>
        <button>
          <a href={isUserChecked ? "/signup" : "/artisanSignup"}>
            {isUserChecked ? "USER SIGN UP" : "ARTISAN SIGN UP"}
          </a>
        </button>
        {isLoggedIn && (
          <div className="cart-image-container">
            <a href="/cart">
              <img
                src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711036924/boxi/djambo1990_51954_a_realistic_wicker_basket_against_a_white_back_611c3c44-98a2-4c9f-9792-6c993f3e122d-removebg-preview_ytywa2.png"
                alt=""
              />
            </a>
          </div>
        )}
      </div>
    </>
  );
};
