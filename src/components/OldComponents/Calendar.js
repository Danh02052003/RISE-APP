import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Calendar.css';

const Calendar = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const startOfWeek = getStartOfWeek(currentDate);

  // Function to render each day in the calendar
  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const isCurrentDay = day.toDateString() === currentDate.toDateString();
      const eventsForDay = events.filter(event => new Date(event.date).toDateString() === day.toDateString());
      const hasChallenge = eventsForDay.some(event => event.typeOfEvent === 'challenge');
      const hasEvent = eventsForDay.some(event => event.typeOfEvent === 'event');

      days.push(
        <div key={day.toDateString()} className={`calendar-day ${isCurrentDay ? 'current' : 'day'}`}>
          <span>{day.getDate()}</span>
          <div className="dots-container">
            {hasChallenge && (
              <div className="event-dot orange" style={{ marginTop: '16px' }}></div>
            )}
            {hasEvent && (
              <div className="event-dot green" style={{ marginTop: hasChallenge ? '40px' : '16px' }}></div>
            )}
          </div>
        </div>
      );
    }
    return days;
  };

  const currentMonthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>
          <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/calendar.svg`} alt="Calendar Icon" />
          {currentMonthYear}
        </h3>
        <div className="calendar-nav">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
            <ChevronLeft />
          </button>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day day-of-week">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
