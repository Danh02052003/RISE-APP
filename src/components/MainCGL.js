import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './orange-button';
import '../styles/Career-Guidance.css';

const Main = () => {
  const [animated, setAnimated] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionStarted, setTransitionStarted] = useState(false); 
  
  useEffect(() => {
    const handleScroll = () => {
      // console.log(`Current scroll position: ${window.scrollY}`);

      if (window.scrollY > 90) {
        // console.log("Scroll position is greater than 100. Setting animated to true.");
        setAnimated(true);
      } 
      if (window.scrollY > 750 && !transitionStarted) {
        // console.log("Scroll position is greater than 1000. Starting GIF transition.");
        setTransitionStarted(true);
        startGifTransition();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log("Cleanup: Removed scroll event listener.");
    };
  }, [transitionStarted]);

  const startGifTransition = () => {
    console.log("Starting GIF transitions...");
    const timeouts = [];

    const showGifs = () => {
      timeouts.push(setTimeout(() => {
        console.log("Transitioning to three-step");
        setActiveIndex(0);
      }, 0)); 

      // Transition for gif-coin
      timeouts.push(setTimeout(() => {
        console.log("Transitioning to gif-coin");
        setActiveIndex(1);
      }, 2000)); // Move to gif-coin after 2 seconds

      // Transition for gif-run
      timeouts.push(setTimeout(() => {
        console.log("Transitioning to gif-run");
        setActiveIndex(2);
      }, 4000)); // Move to gif-run after 4 seconds

      // Transition for gif-gift
      timeouts.push(setTimeout(() => {
        console.log("Transitioning to gif-gift");
        setActiveIndex(3);
      }, 6000)); // Move to gif-gift after 6 seconds

      // Transition for the-best
      timeouts.push(setTimeout(() => {
        console.log("Transitioning to the-best");
        setActiveIndex(4);
      }, 8000)); // Move to the-best after 8 seconds
    };

    showGifs(); // Initialize the GIF display

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout)); // Cleanup on unmount
    };    
  };

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

      <div className="container grey-circle">
        <div className={`something-cool three-step ${activeIndex === 0 ? 'middle' : 'bot-left'}`}>
          <img className='text-star' src={`${process.env.PUBLIC_URL}/images/group-text.png`} alt='group text star' />
        </div>
        <div className={`something-cool gif-coin ${activeIndex === 1 ? 'middle' : (activeIndex === 2 ? 'bot-left' : 'bot-right')}`}>
          <div className="name-area">Register</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/jcuCd"
              alt="flying coin"
            />
          </div>
        </div>
        <div className={`something-cool gif-run ${activeIndex === 2 ? 'middle' : (activeIndex === 3 ? 'bot-left' : 'bot-right')}`}>
          <div className="name-area">Have fun</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/t5zaz"
              alt="running toy"
            />
          </div>
        </div>
        <div className={`something-cool gif-gift ${activeIndex === 3 ? 'middle' : (activeIndex === 4 ? 'bot-left' : 'bot-right')}`}>
          <div className="name-area">Select</div>
          <div className="white-area">
            <img
              className="gif"
              src="https://shorturl.at/5gq69"
              alt="jumping gift"
            />
          </div>
        </div>
        <div className={`something-cool the-best ${activeIndex === 4 ? 'middle' : 'bot-right'}`}>
          <img className='text-star' src={`${process.env.PUBLIC_URL}/images/best.png`} alt='group text star' />
        </div>
        <img className='hello-dog' src={`${process.env.PUBLIC_URL}/images/hello-dog.svg`} alt='Mascot' />
      </div>
    </main>
  );
};

export default Main;
