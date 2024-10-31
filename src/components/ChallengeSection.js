import React from 'react'

function ChallengeSection(){
    return (
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
    )
}

export default ChallengeSection;