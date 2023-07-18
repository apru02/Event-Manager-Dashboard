import React, { useState } from "react";
import classNames from "classnames";
import { useContext, useEffect } from "react";
import eventContext from "../Context/EventContext";

const Calendar = () => {
  const context = useContext(eventContext);
  const { meetings,fetchMeetings} = context;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [meetingdates, setMeetingdates] = useState([]);
  useEffect(() => {
    fetchMeetings();
    //console.log(meetings);
    setmeetingdates();
    //console.log(meetingdates);
    // eslint-disable-next-line
  }, []);
  const setmeetingdates = () => {
    let meetdates=[];
    for (let i = 0; i < meetings.length; i++) {
      meetdates.push(convertDateFormat(meetings[i].meet_date));
    }
    
    setMeetingdates(meetdates);
  };
  const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${month}/${day}/${year}`;
  };
  

  
  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const prevMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1);
      return prevMonthDate;
    });
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const nextMonthDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1);
      return nextMonthDate;
    });
  };

  const formatDate = (date) => {
    const options = { month: "long", day: "numeric", weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const getMonthName = (date) => {
    const options = { month: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  const getYear = (date) => {
    return date.getFullYear();
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setCurrentDate((prevDate) => {
      const selectedDate = new Date(prevDate.getFullYear(), prevDate.getMonth(), day);
      return selectedDate;
    });
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
  
    const calendarDays = [];
  
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
  
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
      const dateString = date.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
      let isMeetingDate = false;
      if (meetingdates.includes(dateString)) {
        isMeetingDate = true;
      }
     // console.log(dateString);
     // console.log(isMeetingDate);
     
      
      const dayClass = classNames("calendar-day", {
        "active": i === currentDate.getDate(),
        "selected": i === selectedDate,
        "current-date": i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth(),
        "meeting-date": isMeetingDate,
      });
  
      calendarDays.push(
        <div key={i} className={dayClass} onClick={() => handleDayClick(i)}>
          {i}
        </div>
      );
    }
  
    return calendarDays;
  };
  
  
  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return daysOfWeek.map((day, index) => (
      <div key={day} className={`calendar-day ${index === currentDate.getDay() ? "current-date" : ""} wkdays`}>
        {day}
      </div>
    ));
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div className="current-date">{formatDate(currentDate)}</div>
        <div className="nav-buttons">
          <button className="prev-btn" onClick={prevMonth}>
            &lt;
          </button>
          <button className="next-btn" onClick={nextMonth}>
            &gt;
          </button>
        </div>
      </div>
      <div className="month-year">
        {getMonthName(currentDate)}, {getYear(currentDate)}
      </div>
      <div className="calendar-grid">
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
