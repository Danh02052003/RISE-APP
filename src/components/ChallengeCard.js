import React, { useEffect, useState } from 'react';
import ArrowButton from './ArrowButton'; 
import ChallengeCategories from './ChallengesCategories';
import '../styles/ChallengesCard.css';

const ChallengeCard = ({ event }) => { // Accept single event instead of events array
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    if (event) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [event]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    return { day, month };
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    let mins = date.getUTCMinutes();
    
    let period = 'AM';
    if (hours >= 12) {
      period = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
    if (hours === 0) {
      hours = 12;
    }
  
    mins = String(mins).padStart(2, '0');
    
    return `${hours}:${mins} ${period}`;
  };

  if (loading) {
    return <div>Loading event...</div>; // Adjust loading message
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { day, month } = formatDate(event.date);
  const time = formatTime(event.date);

  return (
    <div className="challenge-card">
      <div className="challenge-date">
        <span className="day">{day}</span>
        <span className="month">{month}</span>
      </div>
      <img 
        src={`${process.env.PUBLIC_URL}/images/${event.src}`} 
        alt={event.title} 
        className="challenge-image" 
      />
      <div className="challenge-details">
        <div className="challenge-header">
          <span className="challenge-title">{event.title}</span>
        </div>
        <div className="container-challenges">
          <ChallengeCategories 
            categories={event.category} 
            typeOfEvent={event.typeOfEvent} 
          />
          <div className="challenge-info">
            <div className="info">
              <img 
                src={`${process.env.PUBLIC_URL}/images/icon/clock.svg`} 
                alt="Clock Icon" 
                className="icon-info icon-clock" 
              />
              <span className="challenge-time">{time}</span>
            </div>
            <div className="info">
              <img 
                src={`${process.env.PUBLIC_URL}/images/icon/location.svg`} 
                alt="Location Icon" 
                className="icon-info icon-location" 
              />
              <span className="challenge-location">{event.location}</span>
            </div>
          </div>
          <ArrowButton />
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
