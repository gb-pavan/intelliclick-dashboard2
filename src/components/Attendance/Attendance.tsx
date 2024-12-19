import React, { useState,useEffect } from 'react';
import Calendar from '@components/Calendar/Calendar';
import './Attendance.css';
import { leadServiceInstance } from '@/services';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [qualified,setQualified] = useState<{ data?: { _id: string; count: number }[] } | null>(null);
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
        setQualified(response);
    }   

    getQualifiedCount()
  },[])

  return (
    <div className="attendance-container" style={{
      display: 'flex', 
      flexDirection:'column',       
      justifyContent: 'center', 
      alignItems: 'center',    
      height: '100vh',        
    }}>
        <Calendar qualifiedCount={qualifiedCount} attendance={attendance} />
        {/* {qualified && (
          <p style={{color:'black'}}>
              Qualified Count:<span style={{
                color: qualifiedCount >= 10 ? 'green' : 'red',
              }}>{qualifiedCount >= 10?'Present':'Absent'}</span>
          </p>
        )} */}
    </div>
  );
};

export default Attendance;
