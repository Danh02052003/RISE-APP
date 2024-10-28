import React from 'react';
import { useEffect, useState } from 'react';
import '../styles/PopularChallenges.css'
import ChallengeCard from './ChallengesCard';

const activities = [
  `${process.env.PUBLIC_URL}/images/activities/paint.png`,
  `${process.env.PUBLIC_URL}/images/activities/garden.png`,
  `${process.env.PUBLIC_URL}/images/activities/hiking.png`,
  `${process.env.PUBLIC_URL}/images/activities/robot.png`,
];
  
const PopularChallenges = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data.events);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const handleAnimation = () => {
      const activities = document.querySelector('.activities');
      if (activities) {
        let hasAnimated = false;
        activities.addEventListener('mouseenter', function() {
          if (!hasAnimated) {
            hasAnimated = true;
            this.classList.add('animate');
          }
        });
      }
    };

    handleAnimation();
  }, []);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  // Sắp xếp sự kiện theo thứ tự mới nhất trước
  const sortedEvents = events.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Lấy 6 sự kiện mới nhất
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
        ) : events.length > 0 ? (
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

      <div className='activities'>
        <h2>FUN ACTIVITIES <br/> WITH US.</h2>
        <div className="activity-grid">
          {activities.map((src, index) => (
            <img 
              key={index} 
              src={src} 
              alt={`Activity ${index + 1}`} 
              className={`activity-image ${['top-left', 'top-right', 'bottom-left', 'bottom-right'][index]}`} 
            />
          ))}
        </div>
        <div className="instagram-icon">
          <img src={`${process.env.PUBLIC_URL}/images/icon/instagram.svg`} alt="Instagram" />
        </div>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo/white-logo.svg`} alt="Rise Logo"/>
            <p className="follow-us">
              Follow us on: 
              <a href="#1">Facebook</a>
              <a href="#1">Instagram</a>
              <a href="#1">Threads</a>
              <a href="#1">Youtube</a>
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-section service">
              <h3>Services</h3>
              <ul>
                <li><a href="#1">Clients</a></li>
                <li><a href="#1">Vendors</a></li>
              </ul>
            </div>
            <div className="footer-section company">
              <h3>Company</h3>
              <ul>
                <li><a href="#1">Orientation hub</a></li>
                <li><a href="#1">About us</a></li>
                <li><a href="#1">Career</a></li>
                <li><a href="#1">News</a></li>
                <li><a href="#1">Rebranding</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-contact">
          <div className="contact-section">
            <h3>Call us</h3>
            <p>+84 939 107 890</p>
          </div>
          <div className="contact-section">
            <h3>Write to us</h3>
            <p>info@rise.com.vn</p>
          </div>
          <div className="contact-section">
            <h3>Find us</h3>
            <p>101 - 103, Nguyen Tri Phuong St, District 10</p>
          </div>
          <a href="#1" className="view-all">View all contacts</a>
        </div>
        <div className="footer-bottom">           
          <p className="copyright">©2022 RISE Company. All rights reserved</p>
          <a href="#1" className="privacy-notice">Privacy Notice</a>
        </div>
      </footer>
    </div>     
  );
};

export default PopularChallenges;
