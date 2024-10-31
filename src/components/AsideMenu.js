import React from 'react'

export default function AsideMenu(){
    return (
      <div>
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
      </div>
    )
}
