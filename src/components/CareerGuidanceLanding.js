import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import '../styles/Career-Guidance.css';

const CareerGuidanceLanding = () => {
  return (
    <div className="container">
      <header>
        <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="Logo" />
        </div>

        <div>
          <button className="auth-button login-button">Log In</button>
          <button className="auth-button signup-button">Sign up</button>
        </div>
      </header>

      <main>
        <div className='center'>
            <h2>Unlock your child's career potential through every challenge!</h2>
            <p className="description">
            Our app helps parents guide their children in exploring their ambitions, interests, qualifications, and
            abilities through fun challenges. It also provides insights into the labor market and education systems.
            </p>           
        </div>

        <div className="main-container">
            <div className="gear-box">
                <div className='space'></div>
                <button className="explore-button">
                    Explore now <img src={`${process.env.PUBLIC_URL}/images/icon/arrow-right.svg`} alt='arrow'/>
                </button>   
                <img className='boy' src={`${process.env.PUBLIC_URL}/images/boy.svg`} alt="boy" />
                <img className='tube' src={`${process.env.PUBLIC_URL}/images/tube.svg`} alt="Gears" />
                <img className='girl' src={`${process.env.PUBLIC_URL}/images/girl.svg`} alt="girl" />
            </div>

            <div className='container grey-circle'>
                <img className='text-star' src={`${process.env.PUBLIC_URL}/images/group-text.png`} alt='group text star' />
                <img className='hello-dog' src={`${process.env.PUBLIC_URL}/images/hello-dog.svg`} alt="Mascot" />
            </div>
        </div>
      </main>

      <footer>
        <div>
        <h3>Better Experience. Get App Now</h3>
        <p>Our mobile app is designed to provide you with the best service experience possible</p>
        <div className="app-buttons">
          <button className="app-button">
            <img className='apple' src={`${process.env.PUBLIC_URL}/images/APPLE.png`} alt="App Store" />
          </button>
          <button className="app-button">
            <img className='google' src={`${process.env.PUBLIC_URL}/images/GOOGLE.svg`} alt="Google Play" />
          </button>
        </div> 
        </div>
               
          <img className='iphone-app' src={`${process.env.PUBLIC_URL}/images/iphone.svg`} alt="App icon" />
      </footer>
    </div>
  );
};

export default CareerGuidanceLanding;