import React from 'react';

const ArrowButton = () => {
  return (
    <button className="arrow-button">
        <img src={`${process.env.PUBLIC_URL}/images/icon/arrow.svg`}/>
    </button>
  );
};

export default ArrowButton;
