import React from 'react';
import ArrowButton from './ArrowButton'; // Adjust the path as needed
import ChallengeCategories from './ChallengeCategories'; // Adjust the path as needed

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <div className="challenge-date">
        <span className="day">{challenge.date.split(' ')[0]}</span>
        <span className="month">{challenge.date.split(' ')[1]}</span>
      </div>
      <img src={challenge.src} alt={challenge.title} className="challenge-image" />
      <div className="challenge-details">
        <div className="challenge-header">
          <span className="challenge-title">{challenge.title}</span>
        </div>
        <div className='container-challenges'>
          <ChallengeCategories categories={challenge.category} typeOfEvent={challenge.typeOfEnvent} />
          <div className="challenge-info">
            <div className='info'>
              <img src={`${process.env.PUBLIC_URL}/images/icon/clock.svg`} alt="Clock Icon" className="icon-info icon-clock" />
              <span className="challenge-time">{challenge.time}</span>
            </div>
            <div className='info'>
              <img src={`${process.env.PUBLIC_URL}/images/icon/location.svg`} alt="Location Icon" className="icon-info icon-location" />
              <span className="challenge-location">{challenge.location}</span>
            </div>
          </div>
          <ArrowButton />
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
