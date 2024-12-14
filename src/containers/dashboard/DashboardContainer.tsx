'use client';

import React, { useState, useEffect } from 'react';
import {leadServiceInstance} from '@services';
import {ILead,ILeadSummary} from '@interfaces'
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';
import ProfileHeader from './ProfileHeader';
import LeadSummary from './LeadSummary';
import LeadsTable from './LeadsTable';
import {Sidebar} from '@components/Sidebar';
import styles from './DashboardContainer.module.css';

export const DashboardContainer: React.FC = () => {

  const [leads, setLeads] = useState<ILead[]>([]);
  const [leadSummary, setLeadSummary] = useState<ILeadSummary>({
    totalLeads: 0,
    todayLeads: 0,
    yesterdayLeads: 0,
    data: []
  });
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen,setProfileOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchLeadSummary = async () => {
    setLoading(true);
    try {
      const data = await leadServiceInstance.getLeadStats();
      setLeadSummary(data);
    } catch (error) {
      handleError(error as AxiosError,true);
    }
    setLoading(false);
  }


  // const fetchLeads = async () => {
  //   setLoading(true);
  //   try {
  //     const data = await leadServiceInstance.getLeads(pageNum, pageSize);
  //     setLeads(data);
  //   } catch (error) {
  //     handleError(error as AxiosError,true);
  //   }
  //   setLoading(false);
  // };

  useEffect(()=>{
    fetchLeadSummary();
  },[]);

  // useEffect(() => {
  //   fetchLeads();
  // }, [pageNum, pageSize]);


  return (
    <div className="dashboard">
      {false ? (
        <p>Loading...</p>
        ) : (
          <div className={styles['dashboard-layout']}>
            <ProfileHeader isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setProfileOpen={setProfileOpen} />
            <div className={styles["dashboard-body"]}>
              
              <div className={styles["dashboard-sidebar"]}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setProfileOpen={setProfileOpen} />
              </div>
              
              <div className={styles["dashboard-main-content"]}>              
                {/* <div className={styles["user-welcome-info-container"]}>
                  <div className={styles["user-welcome-info"]}>
                    <h1>Welcome, Shubham Kumar</h1>
                    <p>
                      "Attendance Criteria, have to make 15 Leads to make present"
                    </p>
                  </div>
                </div> */}
                <div className={styles["user-welcome-info-container"]}>
                  <h1>Welcome, Shubham Kumar</h1>
                  <p>
                    "Attendance Criteria, have to make 15 Leads to make present"
                  </p>
                </div>
                <LeadSummary leadSummary={leadSummary} />
                <LeadsTable />
              </div>
            </div>
          </div>
        )}
    </div>
  );
};