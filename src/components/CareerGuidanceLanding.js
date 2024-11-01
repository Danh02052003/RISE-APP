import React, { useRef, useState, useEffect } from 'react';
import Header from './HeaderCGL';
import Main from './MainCGL';
import Footer from './FooterCGL';
import '../styles/Career-Guidance.css';

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
