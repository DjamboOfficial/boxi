import React from "react";
import "./main-landing-page.css";
import { MissionParallax } from "../../components/mission-parallax/MissionParallax";
import { Header } from "../../components/header/Header";
import { Trendingproducts } from "../../components/trending-products/TrendingProducts";

export const MainLandingPage = () => {
  return (
    <>
      <Header />
      <div className="main-landing-page-container">
        <MissionParallax />
        <Trendingproducts />
      </div>
    </>
  );
};
