import React, { useEffect, useState } from 'react';

import '../styles/PopularChallenges.css';
import ChallengeCard from './ChallengesCard';
import FooterHome from './FooterHome';
import Activities from './Activities';

const PopularChallenges = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/events');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const sortedEvents = [...events].sort((a, b) => new Date(b.date) - new Date(a.date));
  const newestEvents = sortedEvents.slice(0, 6);

  return (
    <div className="popular-challenges">
      <img 
        className="text-star" 
        src={`${process.env.PUBLIC_URL}/images/popularchallenge.svg`} 
        alt="group text star" 
      />
      <div className="challenge-grid">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : newestEvents.length > 0 ? (
          newestEvents.map((event) => (
            <ChallengeCard key={event._id} event={event} />
          ))
        ) : (
          <div className="no-events">No events found</div>
        )}
      </div>

      <button className="see-all-button">
        See all <img className='arrow' src={`${process.env.PUBLIC_URL}/images/icon/arrow.svg`} alt='arrow'/>
      </button>

     
      <Activities/>
      <FooterHome />
    </div>     
  );
};

export default PopularChallenges;
