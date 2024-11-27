import React, { useEffect, useState, useRef } from 'react';
import Point from './Point.js';
import Calendar from './Calendar.js';
import Schedule from './TodaySchedule.js';

function Welcome() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const textRef = useRef(null); // Create a ref for the element

  //fetch api
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

  useEffect(() => {
    // Safely set the text content after the component has rendered
    if (textRef.current) {
      textRef.current.textContent = `Welcome, Danh! You have ${events.length} events.`;
    }
  }, [events]);

  return (
    <div>
      <section className="welcome-section">
        <h1 ref={textRef}>Welcome</h1>
        <Point />
      </section>
      
      <section className="schedule-section">
        <div className="section-header">
          <h2>Your schedule</h2>
          <button className="view-more-btn">View more</button>
        </div>

        <div className="schedule-grid">
          {loading && <p>Loading events...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && events.length === 0 && <p>No events found.</p>}
          
          {events.length > 0 && (
            <>
              <Calendar events={events} />
              <Schedule events={events} />
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Welcome;
