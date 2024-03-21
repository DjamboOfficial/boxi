import "./header.css";

export const Header = () => {
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
        <button>
          <a href="/login">User Log In</a>
        </button>
        <button>
          <a href="/signup">User Sign Up</a>
        </button>
        <button>
          <a href="/artisanLogin">Artisan Login</a>
        </button>
        <button>
          <a href="/artisanSignup">Artisan Sign up</a>
        </button>
        <div className="cart-image-container">
          <a href="/user/cart">
            <img
              src="https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711036924/boxi/djambo1990_51954_a_realistic_wicker_basket_against_a_white_back_611c3c44-98a2-4c9f-9792-6c993f3e122d-removebg-preview_ytywa2.png"
              alt=""
            />
          </a>
        </div>
      </div>
    </>
  );
};
