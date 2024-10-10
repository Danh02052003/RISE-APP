import React from 'react';
import '../styles/PopularChallenges.css'
import ChallengeCard from './ChallengesCard';

const challenges = [
  {
    id: 1,
    title: "STEM Explorer - A Journey of Sci...",
    participants: 522,
    typeOfEvent: "Challenge Event",
    days: 4,
    date: "21 DEC",
    time: "12:00 AM",
    location: "TP.HCM",
    category: ["STEM", "Innovation"],
    src: `${process.env.PUBLIC_URL}/images/Events/stem.png`
  },
  {
    id: 2,
    title: "Festival 'Future Artists'",
    participants: undefined,
    days: undefined,
    date: "11 NOV",
    time: "5:00 PM",
    location: "TP.HCM",
    category: ["Arts & Design", "Creativity"],
    src: `${process.env.PUBLIC_URL}/images/Events/festival.png`
  },
  {
    id: 3,
    title: "Competition 'Young Innovators - ...",
    participants: undefined,
    days: undefined,
    date: "21 NOV",
    time: "7:00 AM",
    location: "TP.HCM",
    category: ["Entrepreneurs", "Innovation"],
    src: `${process.env.PUBLIC_URL}/images/Events/competition.png`
  },
  {
    id: 4,
    title: "VNG Company Tour",
    participants: undefined,
    days: undefined,
    date: "11 OCT",
    time: "7:00 AM",
    location: "TP HCM",
    category: ["Career Day"],
    src: `${process.env.PUBLIC_URL}/images/Events/vng.png`
  },
  {
    id: 5,
    title: "Workshop 'The Art of Speaking'",
    participants: undefined,
    days: undefined,
    date: "09 JAN",
    time: "9:00 AM",
    location: "TP.HCM",
    category: ["Media & Communication", "Presentation"],
    src: `${process.env.PUBLIC_URL}/images/Events/workshop.png`
  },
  {
    id: 6,
    title: "Hands Together for the Community",
    participants: undefined,
    days: undefined,
    date: "07 JAN",
    time: "7:00 AM",
    location: "TP.HCM",
    category: ["Human Services", "Emotional Intelligence"],
    src: `${process.env.PUBLIC_URL}/images/Events/hands.png`
  }
];
  
const activities = [
  `${process.env.PUBLIC_URL}/images/activities/paint.png`,
    `${process.env.PUBLIC_URL}/images/activities/garden.png`,
    `${process.env.PUBLIC_URL}/images/activities/hiking.png`,
    `${process.env.PUBLIC_URL}/images/activities/robot.png`,
];
  
const PopularChallenges = () => {
  document.addEventListener('DOMContentLoaded', function() {
    const activities = document.querySelector('.activities');
    let hasAnimated = false;

    activities.addEventListener('mouseenter', function() {
        if (!hasAnimated) {
            hasAnimated = true;
            this.classList.add('animate');
        }
    });
});
    return (
      <div className="popular-challenges">
        <img className='text-star' src={`${process.env.PUBLIC_URL}/images/popularchallenge.svg`} alt='group text star' />
        <div className="challenge-grid">
        {challenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
        </div>

        <button className="see-all-button">See all <img className='arrow' src={`${process.env.PUBLIC_URL}/images/icon/arrow.svg`}/></button>
        
        

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

        <footer class="footer">
          <div class="footer-content">
            <div class="footer-logo">
              <img src={`${process.env.PUBLIC_URL}/images/logo/white-logo.svg`} alt="Rise Logo"/>
              <p class="follow-us">
                Follow us on: 
                <a href="#">Facebook</a>
                <a href="#">Instagram</a>
                <a href="#">Threads</a>
                <a href="#">Youtube</a>
              </p>
            </div>
            <div class="footer-links">
              <div class="footer-section service">
                <h3>Services</h3>
                <ul>
                  <li><a href="#">Clients</a></li>
                  <li><a href="#">Vendors</a></li>
                </ul>
              </div>
              <div class="footer-section company">
                <h3>Company</h3>
                <ul>
                  <li><a href="#">Orientation hub</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Career</a></li>
                  <li><a href="#">News</a></li>
                  <li><a href="#">Rebranding</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-contact">
            <div class="contact-section">
              <h3>Call us</h3>
              <p>+84 939 107 890</p>
            </div>
            <div class="contact-section">
              <h3>Write to us</h3>
              <p>info@rise.com.vn</p>
            </div>
            <div class="contact-section">
              <h3>Find us</h3>
              <p>101 - 103, Nguyen Tri Phuong St, District 10</p>
            </div>
            <a href="#" class="view-all">View all contacts</a>
          </div>
          <div class="footer-bottom">           
            <p class="copyright">©2022 RISE Company. All rights reserved</p>
            <a href="#" class="privacy-notice">Privacy Notice</a>
          </div>
        </footer>
      </div>     
    );
  };

 
  export default PopularChallenges;