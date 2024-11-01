import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './orange-button';
import '../styles/Career-Guidance.css';

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
        {/* <div className='something-cool'>
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
        </div> */}
        <img className='hello-dog' src={`${process.env.PUBLIC_URL}/images/hello-dog.svg`} alt='Mascot' />
      </div>
    </main>
  );
};

export default Main;
