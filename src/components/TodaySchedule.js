import React from 'react';
import '../styles/Schedule.css';

function Schedule({ events }) {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const todayEvents = events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === todayString && event.type === 'event'; // Only events
  });

  const todayChallenges = events.filter(event => {
      const eventDate = new Date(event.date).toISOString().split('T')[0];
      return eventDate === todayString && event.type === 'challenge'; // Only challenges
  });

  return (
      <div className="today-schedule">
          <h3>Today's Schedule</h3>
          {todayEvents.length > 0 || todayChallenges.length > 0 ? (
              <>
                  {todayChallenges.map((challenge) => (
                      <div className="challenge" key={challenge._id}>
                          <div className="event-time">
                              {new Date(challenge.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="event-title">{challenge.title} (Challenge)</div>
                      </div>
                  ))}
                  {todayEvents.map((event) => (
                      <div className="event" key={event._id}>
                          <div className="event-time">
                              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="event-title">{event.title}</div>
                      </div>
                  ))}
              </>
          ) : (
              <div>No events or challenges for today.</div>
          )}
      </div>
  );
}
export default Schedule;
