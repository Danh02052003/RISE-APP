import { useEffect, useState } from 'react';
import '../styles/Dash-Board.css'
import Point from './Point.js';
import AsideMenu from './AsideMenu.js';
import Search from './Search.js';
import Calendar from './Calendar.js';
import Schedule from './TodaySchedule.js';
import ChallengeSection from './ChallengeSection.js';
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
          setEvents(data);
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
       <AsideMenu/> 

        <main className="main-content">
          <header className="header">
            <Search/>
            <div className="user-actions">
              <button className="notification-btn">
              <img  src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`} alt='notification'/>
              </button>
              <div className="avatar"><img src={`${process.env.PUBLIC_URL}/images/icon/notification.svg`} alt='avatar'/></div>
            </div>

          </header>
          <section className="welcome-section">
            <h1>Welcome, Danh</h1>
            <Point/>
          </section>
          <section className="schedule-section">
            <div className="section-header">
              <h2>Your schedule</h2>
              <button className="view-more-btn">View more</button>
            </div>
            <div className="schedule-grid">
              {/* <Calendar  events={events}/>
              <Schedule  events={events}/> */}
            </div>
          </section>
          
          <ChallengeSection/>
       
        </main>
      </div>
    );
  }

  export default Dashboard;