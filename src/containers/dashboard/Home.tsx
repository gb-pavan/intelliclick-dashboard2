import React, { useState, useEffect,useRef } from 'react';
import {leadServiceInstance} from '@services';
import {ILead,ILeadSummary} from '@interfaces'
import { handleError } from '@/utils/helpers';
import { AxiosError } from 'axios';
import LeadSummary from './LeadSummary';
import LeadsTable from './LeadsTable';
import { IPageParams } from '@interfaces';
import styles from './DashboardContainer.module.css';
import TableFilters from './TableFilters';

const Home = () => {

  type FilterState = {
  statuses?: string[]; // Array of strings
  singleDate?: Date; // Optional single date
  dateRange?: { startDate?: Date; endDate?: Date }; // Optional date range
};

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState("home");
  const [refetchLeads,setRefetchLeads] = useState<boolean>(false);
  // const [statusFiltered,setStatusFiltered] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<FilterState>({
    statuses: [],
    singleDate: undefined,
    dateRange: { startDate: undefined, endDate: undefined },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const filterStateRef = useRef<FilterState>({
    statuses: [],
    singleDate: undefined,
    dateRange: { startDate: undefined, endDate: undefined },
  }); 
   const [pageParams, setPageParams] = useState<IPageParams>({
    pageNum: 1,
    pageSize: 10
  });
  const [leads, setLeads] = useState<{ data: ILead[]; totalCount: number }>({
    data: [],
    totalCount: 0,
  });


  useEffect(()=>{
    // console.log("date change observed")
    // console.log("filtered",filterState)
    // console.log("Statuses:", filterState?.statuses); // Logs the statuses array
    // console.log("Single Date:", filterState?.singleDate); // Logs the single date

    if (
      filterState?.statuses?.length === 0 &&
      filterState?.singleDate === undefined &&
      filterState?.dateRange?.startDate === undefined &&
      filterState?.dateRange?.endDate === undefined
    ) {
      fetchLeads();
    }

    filterStateRef.current = {
      ...filterState,
    };


    const getPageLeads = async () => {        
        const data = await leadServiceInstance.getLeadsByParams(pageParams);  
        setLeads(data);
        setFilteredRows(data?.data);      
    }
    // if(filterState?.statuses?.length === 0){
    //   getPageLeads();
    // }
    // else if(filterState?.statuses && filterState?.statuses?.length > 0 && filterState?.singleDate === undefined && filterState?.dateRange === undefined) {
    //   onFilter(filterState?.statuses || [])
    // }
    // else if(filterState?.statuses && filterState?.statuses?.length > 0 && filterState?.singleDate && filterState?.dateRange === undefined){
    //   console.log("single date")
    //   onFilter(filterState?.statuses,filterState?.singleDate)
    // }
    // else if(filterState?.statuses && filterState?.statuses?.length > 0 && filterState?.dateRange && filterState?.singleDate === undefined){
    //   console.log("double date")
    //    onFilter(filterState?.statuses,undefined,filterState?.dateRange)
    // }
    if(filterStateRef?.current?.statuses?.length === 0){
      getPageLeads();
    }
    else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.singleDate === undefined && filterStateRef?.current?.dateRange === undefined) {
      onFilter(filterStateRef?.current?.statuses || [])
    }
    else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.singleDate && filterStateRef?.current?.dateRange === undefined){
      console.log("single date")
      onFilter(filterStateRef?.current?.statuses,filterStateRef?.current?.singleDate)
    }
    else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.dateRange && filterStateRef?.current?.singleDate === undefined){
      console.log("double date")
       onFilter(filterStateRef?.current?.statuses,undefined,filterStateRef?.current?.dateRange)
    }
   
  },[pageParams,filterState]);

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

   useEffect(() => {
    

    fetchLeads(); 
  }, []);

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
        setSearch((prevSearch) => !prevSearch);
        inputRef.current?.focus();
    };

    const onFilter = async  (selectedStatuses?:string[],singleDate?:Date,dateRange?: { startDate?: Date; endDate?: Date }) => {
      // setStatusFiltered(selectedStatuses);
      // setFilterState({statuses:selectedStatuses})
      const queryParams = new URLSearchParams({
        pageNum: (pageParams.pageNum).toString(),
        pageSize: (pageParams.pageSize).toString(),
      });

      // Add the status parameter only if there are selected statuses
      if ((filterState?.statuses || []).length > 0) {
        queryParams.append("status", (filterState.statuses || []).join(","));
      }

      if (dateRange?.startDate) {
        queryParams.append("fromDate", dateRange.startDate.toISOString());
      }
      if (dateRange?.endDate) {
        queryParams.append("toDate", dateRange.endDate.toISOString());
      }
      try {
      const data = await leadServiceInstance.getFilteredStatuses(queryParams);
      setLeads(data);
      setFilteredRows(data?.data);
      filterStateRef.current = {
      ...filterStateRef.current,
      statuses: [],
      singleDate: singleDate ?? undefined,
        dateRange: (dateRange?.startDate instanceof Date && dateRange?.endDate instanceof Date) ? dateRange : undefined,

    };
      // console.log("data status filters",data);
      // setLeadSummary(data);
      } catch (error) {
        handleError(error as AxiosError,true);
      }
    }

    return (
        <div>
            <div className={styles["user-welcome-info-container"]}>
                <h1>Welcome, Shubham Kumar</h1>
                <p>
                  "Attendance Criteria, have to make 15 Leads to make present"
                </p>
            </div>
            <LeadSummary leadSummary={leadSummary} />
            <TableFilters leads={leads?.data} setFilteredRows={setFilteredRows}  handleSearch={handleSearch} handleSearchChange={handleSearchChange} setRefetchLeads={setRefetchLeads} setFilterState={setFilterState}/>
            {search && <div className={styles["search-display"]}><input ref={inputRef} placeholder="Search here" onChange={handleSearchChange}  /></div>}
            <LeadsTable filteredRows={filteredRows} totalLeads={leads?.totalCount} setLeads={setLeads} setPageParams={setPageParams} />
        </div>
    )
}

export default Home;