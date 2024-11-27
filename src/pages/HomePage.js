import React, { useRef, useState, useEffect } from "react";
import "../styles/Career-Guidance.css";
import Header from "../components/LandingPage/HeaderCGL";
import Main from "../components/LandingPage/MainCGL";
import Footer from "../components/LandingPage/FooterCGL";
import PopularChallenges from "../components/LandingPage/PopularChallenges";
import FooterHome from "../components/LandingPage/FooterHome";

const HomePage = () => {
  const gearBoxRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setAnimated(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={gearBoxRef}
      className={`container ${animated ? "animated" : ""} min-w-full`}
    >
      <Header />
      <Main />
      <Footer />
      <PopularChallenges />
      <FooterHome />
    </div>
  );
};

export default HomePage;
