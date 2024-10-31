import React from 'react'

const activities = [
    `${process.env.PUBLIC_URL}/images/activities/paint.png`,
    `${process.env.PUBLIC_URL}/images/activities/garden.png`,
    `${process.env.PUBLIC_URL}/images/activities/hiking.png`,
    `${process.env.PUBLIC_URL}/images/activities/robot.png`,
  ];
  
function Activities() {
    return (
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
    )
}

export default Activities;