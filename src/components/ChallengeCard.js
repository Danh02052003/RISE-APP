import React, { useState } from 'react';
import ChallengeCategories from './ChallengesCategories';
import ChallengeStatus from './ChallengesStatus';
import '../styles/ChallengesCard.css';

const ChallengeCard = ({ event }) => {
  const [hovered, setHovered] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ`;
  };

  const { day, month } = formatDate(event.schedule.date);
  const categories = event.categories || [];
  const formattedPrice = formatPrice(event.pricing.basePrice);

  return (
    <div
      className="challenge-card"
      onMouseEnter={() => setHovered(true)} // Set hovered state to true
      onMouseLeave={() => setHovered(false)} // Set hovered state to false
    >
      <div className='challenge-top'>
        <div className="challenge-date card-in-challenge">
          <span className="day">{day}</span>
          <span className="month">{month}</span>
        </div>
        <img
          src={`${process.env.PUBLIC_URL}/images/Events/${
            hovered ? event.images[0][1] : event.images[0][0] || 'default.jpg'
          }`}
          alt={event.title || 'Event image'}
          className="challenge-image"
        />
        <div className='challenge-favorite card-in-challenge'>
          <img 
            src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/heart.svg`}
            alt='favorite challenge'
            className='favorite-challenge'
          />
        </div>
      </div>
      <div className="challenge-details">
        <div className='challenge-status'>
          <ChallengeStatus status={event.status}/>
          <ChallengeCategories categories={categories} />
        </div>
        <div className="challenge-header">
          <div className="challenge-title">{event.title || 'Event Title'}</div>
          <div className="challenge-location">
            {event.organizer.name} • {event.location.address.city}
          </div>
        </div>
        <div className="challenge-cost">
          FROM {formattedPrice}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
