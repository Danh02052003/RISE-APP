import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Calendar.css';

const Calendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay());
    return start;
  };

  const startOfWeek = getStartOfWeek(currentDate);

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const isCurrentDay = day.toDateString() === currentDate.toDateString();
      const eventsForDay = events.filter(event => new Date(event.date).toDateString() === day.toDateString());

      days.push(
        <div key={day.toDateString()} className={`calendar-day ${isCurrentDay ? 'current' : ''}`}>
          <span>{day.getDate()}</span>
          <div className="dots-container">
            {eventsForDay.map(event => (
              <div key={event.id} className={`event-dot ${event.typeOfEvent.toLowerCase().includes('event') ? 'orange' : 'green'}`}></div>
            ))}
          </div>
        </div>
      );
    }
    return days;
  };

  useEffect(() => {
    document.getElementById('calendar-month-year').textContent =
      currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>
          <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/calendar.svg`} alt="Calendar Icon" />
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="calendar-nav">
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}><ChevronLeft /></button>
          <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}><ChevronRight /></button>
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
