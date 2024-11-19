import React, { useEffect, useState } from 'react';
import ChallengeCard from './ChallengeCard';
import { Link } from 'react-router-dom';
import '../styles/PopularChallenges.css';

const PopularChallenges = () => {
  const [events, setEvents] = useState([]);
  const [activitiesState, setActivitiesState] = useState({
    activities: [],
    loading: true,
    error: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          throw new Error('Expected an array of events');
        }
      } catch (error) {
        setError(`Error fetching events: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get the six newest events
  const getNewestEvents = () => {
    // console.log("Events before sorting:", events);
    const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
    // console.log("Sorted events:", sortedEvents); 
    return sortedEvents;
  };

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/activities');
        if (!res.ok) throw new Error('Failed to fetch activities');

        const data = await res.json();
        setActivitiesState({
          activities: Array.isArray(data) ? data : [],
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error fetching activities:', error);
        setActivitiesState({
          activities: [],
          loading: false,
          error: 'Failed to fetch activities. Please try again later.',
        });
      }
    };
    fetchActivities();
  }, [error]);

  const { activities, loading: activitiesLoading, error: activitiesError } = activitiesState;

  return (
    <div className="popular-challenges">
      <img
        className="text-star"
        src={`${process.env.PUBLIC_URL}/images/popularchallenge.svg`}
        alt="Popular Challenges"
      />

      <div className="challenge-grid">
        {loading ? (
          <div>Loading events...</div>
        ) : getNewestEvents().length > 0 ? (
          getNewestEvents().map((event) => (
            <ChallengeCard event={event} />
          ))
        ) : (
          <div className="no-events">No events available at this time</div>
        )}
      </div>

      <Link to="/dash-board">
          <button className="see-all-button">
          See all
          <img
            className="arrow"
            src={`${process.env.PUBLIC_URL}/images/icon/arrow.svg`}
            alt="arrow"
          />
        </button>
      </Link>
      <div className="activities">
        <h2>FUN ACTIVITIES <br/> WITH US.</h2>
        
        {activitiesLoading && <p>Loading activities...</p>}
        {activitiesError && <p className="error">{activitiesError}</p>}

        <div className="activity-grid">
          {activities.map((activity, index) => (
            <img
              key={activity._id}
              src={`${process.env.PUBLIC_URL}${activity.src}`} 
              alt={activity.alt}
              className={`activity-image ${['top-left', 'top-right', 'bottom-left', 'bottom-right'][index]}`} 
            />
          ))}
        </div>

        <div className="instagram-icon">
          <img src={`${process.env.PUBLIC_URL}/images/icon/instagram.svg`} alt="Instagram" />
        </div>
      </div>
    </div>
  );
};

export default PopularChallenges;
