import React from "react";
import { MissionParallax } from "../../components/mission-parallax/MissionParallax";
import { Header } from "../../components/header/Header";
import { Trendingproducts } from "../../components/trending-products/TrendingProducts";

export const MainLandingPage = () => {
  return (
    <>
      <Header />
      <MissionParallax />
      <Trendingproducts />
    </>
  );
};
