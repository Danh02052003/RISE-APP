import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../styles/Calendar.css'

const Calendar = () => {
  const currentDate = new Date();
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
      const hasEvent = [6, 7, 9, 10, 12].includes(day.getDate());
      const hasSecondEvent = day.getDate() === 10;

      days.push(
        <div key={i} className={`calendar-day day  ${isCurrentDay ? 'current' : ''}`}>
          {day.getDate()}
          {hasEvent && <div className="event-dot orange"></div>}
          {hasSecondEvent && <div className="event-dot green"></div>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <h3>
          <img src={`${process.env.PUBLIC_URL}/images/icon/Dash-Board/calendar.svg`} alt="Calendar Icon"/>
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="calendar-nav">
          <button><ChevronLeft /></button>
          <button><ChevronRight /></button>
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