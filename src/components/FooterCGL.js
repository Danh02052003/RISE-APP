import React from 'react';
import '../styles/Career-Guidance.css'

const Footer = () => {
  return (
    <footer>
      <div className='blue-area'>
        <h3>Better Experience.<br/>Get App Now</h3>
        <p className="description-app">Our mobile app is designed to provide you with the best service experience possible</p>
        <div className="app-buttons">
          <button className="app-button">
            <img src={`${process.env.PUBLIC_URL}/images/apple.svg`} alt="App Store" />
            <div className="button-text">
              <span>Download on the</span>
              <span>App Store</span>
            </div>            
          </button>
          <button className="app-button">
            <img src={`${process.env.PUBLIC_URL}/images/google.svg`} alt="Google Play" />
            <div className="button-text">
              <span>Download on the</span>
              <span>Google Play</span>
            </div>   
          </button>
        </div> 
      </div>               
      <img className='iphone-app' src={`${process.env.PUBLIC_URL}/images/iphone.svg`} alt="App icon" />
    </footer>
  );
};

export default Footer;
