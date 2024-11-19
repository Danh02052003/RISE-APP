import React, { useRef, useState, useEffect } from 'react';
import '../styles/Career-Guidance.css';
import Header from '../components/HeaderCGL';
import Main from '../components/MainCGL';
import Footer from '../components/FooterCGL';
import PopularChallenges from '../components/PopularChallenges';
import FooterHome from '../components/FooterHome';

const HomePage = () => {
  const gearBoxRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  // Handle scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) setAnimated(true);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={gearBoxRef} className={`container ${animated ? 'animated' : ''}`}>
      <Header />
      <Main />
      <Footer />
      <PopularChallenges />
      <FooterHome />
    </div>
  );
};

export default HomePage;
