import React, { useState, useEffect, useRef } from 'react';
import Button from './orange-button';
import '../styles/Career-Guidance.css';
import { Link } from 'react-router-dom';



const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`} alt="Logo" />
      </div>
      <div>
        <Button className="login-button">Log In</Button>
        <Button className="signup-button">Sign up</Button>
      </div>
    </header>
  );
};

const Main = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <div className='center'>
        <h2>Unlock your child's career potential through every challenge!</h2>
        <p className="description">
          Our app helps parents guide their children in exploring their ambitions, interests, qualifications, and
          abilities through fun challenges. It also provides insights into the labor market and education systems.
        </p>
      </div>

      <Link to="/dash-board">
        <Button className="explore-button">
          Explore now 
          <img src={`${process.env.PUBLIC_URL}/images/icon/arrow-right.svg`} alt="arrow" />
        </Button>
      </Link>
      
      <div className={`gear-box ${animated ? 'animated' : ''}`}>
        <img 
          className="boy" 
          src={`${process.env.PUBLIC_URL}/images/boy.svg`} 
          alt="Boy"
        />
        <img 
          className="tube" 
          src={`${process.env.PUBLIC_URL}/images/tube.svg`} 
          alt="Gears" 
        />
        <img 
          className="girl" 
          src={`${process.env.PUBLIC_URL}/images/girl.svg`} 
          alt="Girl"
        />
      </div>

      <div className='container grey-circle'>
        <div className='something-cool'>
          <img className='text-star' src={`${process.env.PUBLIC_URL}/images/group-text.png`} alt='group text star' />
        </div>
        <div className='something-cool'>
          <div className='name-area'>Register</div>
          <div className='white-area'>
            <img className='gif' src={`${process.env.PUBLIC_URL}/images/gif/flying.gif`} alt='flying coin' />
          </div>
        </div>
        <div className='something-cool'>
          <div className='name-area'>Have fun</div>
          <div className='white-area'>
            <img className='gif' src={`${process.env.PUBLIC_URL}/images/gif/run.gif`} alt='running toy' />
          </div>
        </div>
        <div className='something-cool'>
          <div className='name-area'>Select</div>
          <div className='white-area'>
            <img className='gif' src={`${process.env.PUBLIC_URL}/images/gif/gift.gif`} alt='jumping gift' />
          </div>
        </div>
        <div className='something-cool'>
          <img className='only-best-star' src={`${process.env.PUBLIC_URL}/images/gif/only-the-best.svg`} alt='only the best star' />
        </div>
        <img className='hello-dog' src={`${process.env.PUBLIC_URL}/images/hello-dog.svg`} alt='Mascot' />
      </div>
    </main>
  );
};

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

const CareerGuidanceLanding = () => {
  const gearBoxRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
      const getInScreen = () => {
          if (window.scrollY > 80) {
              setAnimated(true);
          }
      };
      
      window.addEventListener('scroll', getInScreen);
      
      return () => {
          window.removeEventListener('scroll', getInScreen);
      };
  }, []);

  return (
      <div className="container">
          <Header />
          <Main animated={animated} gearBoxRef={gearBoxRef} />
          <Footer />
      </div>
  );
};



export default CareerGuidanceLanding;
