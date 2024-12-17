// components/Calendar.tsx
import React, { useState,useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; // Import default styles
import Calendar from '@components/Calendar/Calendar';
import './Attendance.css';
import { leadServiceInstance } from '@/services';

const Attendance = () => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [qualified,setQualified] = useState('');
  const [attendance,setAttendance] = useState(false);
  const qualifiedCount = qualified?.data?.find(item => item._id === "Qualified")?.count || 0;

  useEffect(() => {
    const giveAttendance = async () => {
      const response = await leadServiceInstance.getAttendance('user5');
      setAttendance(response?.isPresent);
    };

    giveAttendance();
  }, []);

  useEffect(()=>{
    const getQualifiedCount = async () => {
        
        const response = await leadServiceInstance.getLeadsCount();
        const qualified = response?.data?.find(item => item._id === "Qualified")?.count || 0;
        setQualified(qualified);
    }   

    getQualifiedCount()
  },[])

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="attendance-container" style={{
    display: 'flex', 
    flexDirection:'column',       
    justifyContent: 'center', 
    alignItems: 'center',    
    height: '100vh',        
  }}>
      <h1 style={{color:'green'}}>
        React Calendar Example
      </h1>
      <Calendar qualifiedCount={qualifiedCount} attendance={attendance} />
      {qualified && (
        <p style={{color:'black'}}>
            Qualified Count:<span style={{
              color: qualifiedCount >= 10 ? 'green' : 'red',
            }}>{qualifiedCount >= 10?'Present':'Absent'}</span>
        </p>
      )}
    </div>
  );
};

export default Attendance;