import { useEffect, useState } from 'react';
import '../styles/Dash-Board.css';
import Point from '../components/Point.js';
import AsideMenu from '../components/AsideMenu.js';
import Search from '../components/Search.js';
import Calendar from '../components/Calendar.js';
import Schedule from '../components/TodaySchedule.js';
import ChallengeSection from '../components/ChallengeSection.js';

function Dashboard() {
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
        // Ensure events is an array
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        setError('Error fetching events');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="dashboard">
      <AsideMenu />

      <main className="main-content">
        <header className="header">
          <Search />
          <div className="user-actions">
            <button className="notification-btn">
              <img src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`} alt='notification' />
            </button>
            <div className="avatar">
              <img src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`} alt='avatar' />
            </div>
          </div>
        </header>
        
        <section className="welcome-section">
          <h1>Welcome, Danh</h1>
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

        <ChallengeSection />
      </main>
    </div>
  );
}

export default Dashboard;
