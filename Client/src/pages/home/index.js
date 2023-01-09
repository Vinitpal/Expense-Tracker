import React from "react";
import LandingSection from "../../components/Homepage/LandingSection";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <div className="home-page">
      {/** HOME PAGE */}
      <Navbar theme="home" />
      <LandingSection />
    </div>
  );
};

export default Home;
