import React, { useEffect, useState } from 'react';
import '../styles/Dash-Board.css';
import AsideMenu from '../components/AsideMenu.js';
import HeaderDB from '../components/HeaderDB.js';
import SlideImage from '../components/SlideImage.js';
import FilterBar from '../components/FilterBar.js';
function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to format the date and time
  const formatDateTime = (date, time) => {
    const eventDate = new Date(date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Convert time to 12-hour format with AM/PM
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;

    return `${formattedDate} - ${formattedTime}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events');
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        if (Array.isArray(data.events)) {
          const transformedEvents = data.events.map((event, index) => ({
            title: event.title,
            // Format the date and time
            time: formatDateTime(event.schedule.date, event.schedule.startTime),
            images: event.images[0].map(img => {
              return `${process.env.PUBLIC_URL}/images/Events/${img}`;
            }),
            // Set backgroundImage based on index (odd/even)
            backgroundImage: index % 2 === 0 
              ? `${process.env.PUBLIC_URL}/images/icon/Dash-Board/pic-event/slide1.svg` 
              : `${process.env.PUBLIC_URL}/images/icon/Dash-Board/pic-event/slide2.svg`,
          }));
          setEvents(transformedEvents);
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
    const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    // console.log("Sorted events:", sortedEvents); 
    return sortedEvents;
  };
  
  

  return (
    <div className="dashboard">
      <AsideMenu />
      <div className="main-content">
        <HeaderDB />
        <div className="challenge-grid">
          {loading ? (
            <div>Loading events...</div>
          ) : error ? (
            <div>{error}</div>
          ) : events.length > 0 ? (
            <SlideImage event={getNewestEvents()} />
          ) : (
            <div className="no-events">No events available at this time</div>
          )}
        </div>
      <FilterBar/>
      </div>
    </div>
  );
}

export default Dashboard;
