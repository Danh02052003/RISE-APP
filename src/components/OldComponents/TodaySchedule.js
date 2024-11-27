import React from 'react';
import '../styles/Schedule.css';

function Schedule({ events }) {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Filter today's events and challenges
  const todayEvents = events
    .filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === todayString && event.typeOfEvent.toLowerCase().includes('event');
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const todayChallenges = events
    .filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === todayString && event.typeOfEvent.toLowerCase().includes('challenge');
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Select events and challenges to display
  const displayEvents = todayEvents.length > 0 ? todayEvents.slice(0, 1) : [];
  const displayChallenges = todayChallenges.length > 0 ? todayChallenges.slice(0, 1) : [];

  // If only events exist and no challenges, display up to two events
  if (displayChallenges.length === 0 && todayEvents.length > 1) {
    displayEvents.push(todayEvents[1]);
  }

  // If only challenges exist and no events, display up to two challenges
  if (displayEvents.length === 0 && todayChallenges.length > 1) {
    displayChallenges.push(todayChallenges[1]);
  }

  return (
    <div className="today-schedule">
      <h3>Today</h3>
      {displayEvents.length > 0 || displayChallenges.length > 0 ? (
        <>
          {displayEvents.map((event) => {
              const eventStartDate = new Date(event.date);
              const eventEndDate = new Date(eventStartDate.getTime() + event.lasts * 60000);
              return (
                <div className="info-celeb event" key={event._id}>
                  <div className="event-time event-time-regular">
                    <div className="event-time_start">
                      {eventStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="event-time_end">
                      {eventEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div className='event-info'>
                    <div className="event-state">Upcoming event</div>
                    <div className="event-title">{event.title}</div>
                  </div>              
                </div>
              );
            })}

          {displayChallenges.map((challenge) => {
            const challengeStartDate = new Date(challenge.date);
            const challengeEndDate = new Date(challengeStartDate.getTime() + challenge.lasts * 60000);
            return (
              <div className="info-celeb challenge" key={challenge._id}>
                <div className="event-time challenge-time">
                  <div className="event-time_start">
                    {challengeStartDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="event-time_end">
                    {challengeEndDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
                <div className='event-info'>
                  <div className="event-state">Upcoming event</div>
                  <div className="event-title">{challenge.title}</div>
                </div>
              </div>
            );
          })}          
        </>
      ) : (
        <div>No events or challenges for today.</div>
      )}
    </div>
  );
}

export default Schedule;