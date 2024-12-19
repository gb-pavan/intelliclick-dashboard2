'use client';

import React, { useState, useEffect,useRef } from 'react';
import {leadServiceInstance} from '@services';
import {ILead,ILeadSummary} from '@interfaces'
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';
import ProfileHeader from './ProfileHeader';
import LeadSummary from './LeadSummary';
import LeadsTable from './LeadsTable';
import Sidebar from '@components/Sidebar/Sidebar';
import { ICreateLead, IPageParams } from '@interfaces';
import styles from './DashboardContainer.module.css';
import TableFilters from './TableFilters';
import Home from './Home';
import Attendance from '@/components/Attendance/Attendance';
import Profile from './Profile';

export const DashboardContainer: React.FC = () => {

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
  const [filteredRows, setFilteredRows] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [search,setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedItem, setSelectedItem] = useState("home"); 
  const inputRef = useRef<HTMLInputElement>(null);
  const [leads, setLeads] = useState({
    data: [],
    totalCount: 0,
  });

   const pageParams: IPageParams = { 
    pageNum: 1, 
    pageSize: 10 
  };

  

   useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await leadServiceInstance.getLeadsByParams(pageParams);  
        setLeads(data);
        setFilteredRows(data?.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching leads');
        setLoading(false);
      }
    };

    fetchLeads(); 
  }, []);

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


  useEffect(()=>{
    fetchLeadSummary();
  },[]);

  const handleSearch = () => {
    setSearch((prevSearch) => !prevSearch);
    inputRef.current?.focus();
  };

   const renderContent = () => {
    switch (selectedItem) {
      case "home":
        return (
          <Home />
        );
      case "attendance":
        return (
          <Attendance />
        );
      case "profile":
        return (
          <Profile />
        )
      default:
        return <div>Select an item from the sidebar</div>;
    }
  };


  return (
    <div className="dashboard">
      {false ? (
        <p>Loading...</p>
        ) : (
          <div className={styles['dashboard-layout']}>
            <ProfileHeader isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setProfileOpen={setProfileOpen} setSelectedItem={setSelectedItem}/>
            <div className={styles["dashboard-body"]}>
              
              <div className={styles["dashboard-sidebar"]}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setProfileOpen={setProfileOpen} setSelectedItem={setSelectedItem} />
              </div>
              
              <div className={styles["dashboard-main-content"]}> 
                {renderContent()}
              </div>
            </div>
          </div>
        )}
    </div>
  );
};