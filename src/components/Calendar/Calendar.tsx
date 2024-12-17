import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({qualifiedCount,attendance}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState([]);
    const [startDay, setStartDay] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);


    useEffect(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }

        setDaysInMonth(days);
        setStartDay(new Date(year, month, 1).getDay());
    }, [currentDate]);

    const dayNames = ['MON', 'TUE', 'WED', 'THR', 'FRI', 'SAT', 'SUN'];

    const prevMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={prevMonth}>&lt;</button>
                <span>
                    {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </span>
                <button onClick={nextMonth}>&gt;</button>
            </div>
            <div className="day-names">
                {dayNames.map((day) => (
                    <div key={day} className="day-name">
                        {day}
                    </div>
                ))}
            </div>
            <div className="days">
                {Array.from({ length: startDay }).map((_, index) => (
                    <div key={index} className="empty-day"></div>
                ))}
                {daysInMonth.map((day) => {
                    
                    const isToday = day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth();

                    return (
                    <div
                        key={day.toISOString()} // Use ISO string as a unique key
                        className={`day ${
                            isToday
                                ? (qualifiedCount >= 10 || attendance )?'today-present'
                                : 'today' :''
                        } ${
                            selectedDate &&
                            day.toDateString() === selectedDate.toDateString()
                                ? 'selected'
                                : ''
                        }`}
                        onClick={() => handleDateClick(day)} // Pass the function reference correctly
                    >
                        {day.getDate()}
                    </div>
                )})}
            </div>
        </div>
    );
};

export default Calendar;