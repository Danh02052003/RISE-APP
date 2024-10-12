import React from 'react';
import '../styles/Dash-Board.css'
import Point from './Point.js';
import Search from './Search.js';
import Calendar from './Calendar.js';
import Schedule from './TodaySchedule.js';

  function Dashboard() {
    return (
      <div className="dashboard">
        <aside className="sidebar">
          <div className="logo">
            <img src={`${process.env.PUBLIC_URL}/images/logo/logo.svg`} alt='logo-orange' />
          </div>
          <nav>
            <div className="nav-buttons">
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/home.svg`} alt="Home" className="nav-icon" />
                Home
              </button>
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/analy.svg`} alt="Analysis" className="nav-icon" />
                Analysis
              </button>
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/quizz.svg`} alt="Quizzes" className="nav-icon" />
                Quizzes
              </button>
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/insight.svg`} alt="Insights" className="nav-icon" />
                Insights
              </button>
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/Mess.svg`} alt="Messages" className="nav-icon" />
                Messages
              </button>
              <button className="nav-item">
                <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/partner.svg`} alt="Partner" className="nav-icon" />
                Partner
              </button>
            </div>
            <button className="nav-item settings">
              <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/setting.svg`} alt="Setting" className="nav-icon" />
              Setting
            </button>
          </nav>
        </aside>

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
              <Calendar/>
              <Schedule/>
            </div>
          </section>
          <section className="challenge-section">
            <h2>Keep going the Challenge</h2>
            <h3>Moth collection</h3>
            <div className="progress-bar">
              <div className="progress" style={{ width: '75%' }} />
            </div>
            <div className="challenge-footer">
              <div className="challenge-stats">
                <span className="time-left">9 minutes left</span>
                <span className="points">10 <span className="point-icon" /></span>
              </div>
              <button className="keep-going-btn">Keep going</button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  export default Dashboard;