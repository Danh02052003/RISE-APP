import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../orange-button";
import "../../styles/Career-Guidance.css";
//import function
import startGifTransition from "../../utils/RunAnimationGift";
//import assets
import arrow from "../../Assets/icon/arrow-right.svg";
import boy from "../../Assets/images/boy.svg";
import tube from "../../Assets/images/tube.svg";
import girl from "../../Assets/images/girl.svg";
import textStar from "../../Assets/images/text-star.png";
import theBest from "../../Assets/images/best.png";
import mascot from "../../Assets/images/mascot.svg";
const Main = () => {
  const [animated, setAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionStarted, setTransitionStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 90) {
        setAnimated(true); // Start animation once scroll position exceeds 90px
      }

      if (window.scrollY > 750 && !transitionStarted) {
        setTransitionStarted(true); // Prevent triggering the transition multiple times
        startGifTransition(setActiveIndex); // Pass the setActiveIndex function for updating state
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup event listener on unmount
      console.log("Cleanup: Removed scroll event listener.");
    };
  }, [transitionStarted]); // Only trigger once on scroll passing 750px

  return (
    <main>
      <div className="center">
        <h2 className="text-[#1A2035] text-center font-['Test_Founders_Grotesk'] text-6xl font-semibold leading-none">
          Unlock your child's career potential through every challenge!
        </h2>
        <p className="text-center text-2xl my-4">
          Our app helps parents guide their children in exploring their
          ambitions, interests, qualifications, and abilities through fun
          challenges. It also provides insights into the labor market and
          education systems.
        </p>
      </div>

      <Link to="/dash-board">
        <Button className="explore-button">
          Explore now
          <img src={arrow} alt="arrow" />
        </Button>
      </Link>

      <div
        className={`gear-box ${animated ? "animated" : ""} relative w-full h-[600px] flex justify-center items-center overflow-hidden mb-[120px]`}
      >
        <img className="boy" src={boy} alt="Boy" />
        <img className="tube" src={tube} alt="Gears" />
        <img className="girl" src={girl} alt="Girl" />
      </div>

      <div className="grey-circle relative w-[120%] h-[1150px] flex justify-center items-center bg-[#D7DCFC] overflow-hidden m-0">
        {/* Each div represents a GIF transition. The CSS classes change based on activeIndex */}
        <div
          className={`something-cool three-step ${activeIndex === 0 ? "middle" : "bot-left"}`}
        >
          <img className="text-star" src={textStar} alt="group text star" />
        </div>
        <div
          className={`something-cool gif-coin ${activeIndex === 1 ? "middle" : activeIndex === 2 ? "bot-left" : "bot-right"}`}
        >
          <div className="name-area">Register</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/jcuCd"
              alt="flying coin"
            />
          </div>
        </div>
        <div
          className={`something-cool gif-run ${activeIndex === 2 ? "middle" : activeIndex === 3 ? "bot-left" : "bot-right"}`}
        >
          <div className="name-area">Have fun</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/t5zaz"
              alt="running toy"
            />
          </div>
        </div>
        <div
          className={`something-cool gif-gift ${activeIndex === 3 ? "middle" : activeIndex === 4 ? "bot-left" : "bot-right"}`}
        >
          <div className="name-area">Select</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/5gq69"
              alt="jumping gift"
            />
          </div>
        </div>
        <div
          className={`something-cool the-best ${activeIndex === 4 ? "middle" : "bot-right"}`}
        >
          <img className="text-star" src={theBest} alt="group text star" />
        </div>
        <img
          className="hello-dog mt-[550px] block w-[500px] h-[600px]"
          src={mascot}
          alt="Mascot"
        />
      </div>
    </main>
  );
};

export default Main;
