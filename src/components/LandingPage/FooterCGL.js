import React from "react";
import "../../styles/Career-Guidance.css";
//import img
import apple from "../../Assets/icon/apple.svg";
import google from "../../Assets/icon/google.svg";
import iphone from "../../Assets/images/iphone.svg";
const Footer = () => {
  return (
    <footer>
      <div className="blue-area m-0">
        <h3 class="text-[64px] ml-[96px] mt-[55px] mb-0">
          Better Experience.
          <br />
          Get App Now
        </h3>
        <p className="description-app text-[32px] font-normal leading-[42.56px] ml-[96px] mt-[13px] mb-[98px] w-[667px]">
          Our mobile app is designed to provide you with the best service
          experience possible
        </p>
        <div className="app-buttons ml-[96px] flex">
          <button className="app-button ">
            <img src={apple} alt="App Store" />
            <div className="button-text">
              <span>Download on the</span>
              <span>App Store</span>
            </div>
          </button>
          <button className="app-button">
            <img src={google} alt="Google Play" />
            <div className="button-text">
              <span>Download on the</span>
              <span>Google Play</span>
            </div>
          </button>
        </div>
      </div>
      <img className="iphone-app" src={iphone} alt="App icon" />
    </footer>
  );
};

export default Footer;
