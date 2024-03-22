import React from "react";
import { useSpring, animated } from "react-spring";
import "../../App.css";
import "./homepage.css";
import { Header } from "../../components/header/Header";

export const Homepage = () => {
  const [{ scroll }, api] = useSpring(() => ({ scroll: 0 }));

  const handleScroll = () => {
    api.start({ scroll: window.scrollY });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="homepage-container">
        <div>
          <div className="parallax-section">
            <animated.div
              className="parallax-bg"
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711033746/boxi/djambo1990_51954_dawn_in_a_golden_hue_with_a_giant_sun_rising_o_95c9df71-12c3-4e05-80a2-5728dace761d_1_srvgkf.png")`,
                transform: scroll.to((s) => `translateY(-${s * 0.3}px)`),
              }}
            />
            <div className="parallax-content">
              <h1 className="homepage-message-h1">Welcome to boxi</h1>
              <p className="homepage-message-p">
                Where nature's bounty awaits, crafting wonders from earth's
                treasures.
              </p>
            </div>
          </div>
          <div className="parallax-section">
            <animated.div
              className="parallax-bg"
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711033774/boxi/djambo1990_51954_In_the_craftsmans_studio_a_potters_wheel_takes_d376a3e1-010a-4874-a248-38095e459e66_ujf16y.png")`,
                transform: scroll.to((s) => `translateY(-${s * 0.2}px)`),
              }}
            />
            <div className="parallax-content">
              <h1 className="homepage-message-h1">
                Where Craftsmanship Flourishes
              </h1>
              <p className="homepage-message-p">
                Artisans transform raw materials into exquisite creations.
              </p>
            </div>
          </div>
          <div className="parallax-section">
            <img
              className="left-tree"
              src="left-tree-image-url.jpg"
              alt="Left Tree"
              style={{
                transform: scroll.to((s) => `translateX(-${s * 0.1}px)`),
              }}
            />
            <animated.div
              className="parallax-bg"
              style={{
                backgroundImage: `url("https://res.cloudinary.com/dgwvbd9ki/image/upload/v1711033780/boxi/djambo1990_51954_a_park_immersed_in_a_golden_hue_where_a_dad_is_e253ae00-c90f-4e71-84a3-1074da54d2dc_b7hdes.png")`,
                transform: scroll.to((s) => `translateY(-${s * 0.3}px)`),
                height: "180vh",
              }}
            />
            <div className="parallax-content">
              <h1 className="homepage-message-h1">Discover the Perfect Gift</h1>
              <p className="homepage-message-p">
                Experience the joy of giving with our curated selection of
                treasures.
              </p>
              <button className="homepage-message-button">
                <a href="/main-landing-page">ENTER</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
