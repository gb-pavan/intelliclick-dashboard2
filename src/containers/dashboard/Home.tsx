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

const Home = () => {

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
  const [filteredRows, setFilteredRows] = useState<ILead[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search,setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedItem, setSelectedItem] = useState("home"); // Default to "home"
  const [refetchLeads,setRefetchLeads] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [leads, setLeads] = useState<{ data: ILead[]; totalCount: number }>({
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
  }, []); // Empty dependency array ensures this runs only on initial render

  useEffect(()=>{
    const reFetchLeads = async () => {
        if (refetchLeads){
        const data = await leadServiceInstance.getLeadsByParams(pageParams);  
        setLeads(data);
        setFilteredRows(data?.data);
      }
    }
    reFetchLeads();
  },[refetchLeads]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filteredData = leads?.data.filter((row) => {
        const studentName = row?.studentName?.toLowerCase() || "";
        const phoneNumber = row?.mobile?.toString() || "";
        const className = row?.class[0]?.name?.toLowerCase() || "";
        const interactedWith = row?.interactedWith?.toLowerCase() || "";
        const createdBy = row?.createdBy?.toLowerCase() || "";
        const created = row?.creationStatus?.toLocaleLowerCase() || "";

        return (
            studentName.includes(query) ||
            phoneNumber.includes(query) ||
            className.includes(query) ||
            interactedWith.includes(query) ||
            createdBy.includes(query) ||
            created.includes(query)
        );
        });

        setFilteredRows(filteredData || leads);}

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
        setSearch((prevSearch) => !prevSearch); // Toggle the search value
        inputRef.current?.focus();
    };

    return (
        <div>
            <div className={styles["user-welcome-info-container"]}>
                <h1>Welcome, Shubham Kumar</h1>
                <p>
                  "Attendance Criteria, have to make 15 Leads to make present"
                </p>
            </div>
            <LeadSummary leadSummary={leadSummary} />
            <TableFilters leads={leads?.data} setFilteredRows={setFilteredRows}  handleSearch={handleSearch} handleSearchChange={handleSearchChange} setRefetchLeads={setRefetchLeads} />
            {search && <div className={styles["search-display"]}><input ref={inputRef} placeholder="Search here" onChange={handleSearchChange}/></div>}
            <LeadsTable filteredRows={filteredRows} totalLeads={leads?.totalCount} setLeads={setLeads} />
        </div>
    )
}

export default Home;