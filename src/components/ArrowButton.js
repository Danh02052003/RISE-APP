import React from 'react';

const ArrowButton = () => {
  return (
    <button className="arrow-button">
        <img src={`${process.env.PUBLIC_URL}/images/icon/arrow.svg`} alt='arrow'/>
    </button>
  );
};

export default ArrowButton;
