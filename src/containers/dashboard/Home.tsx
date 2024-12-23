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
    console.log("filtered",filterState)
    // console.log("Statuses:", filterState?.statuses); // Logs the statuses array
    // console.log("Single Date:", filterState?.singleDate); // Logs the single date

    if (
      filterState?.statuses?.length === 0 &&
      filterState?.singleDate === undefined &&
      filterState?.dateRange?.startDate === undefined &&
      filterState?.dateRange?.endDate === undefined
    ) {
      if (pageParams.pageNum !== 1 || pageParams.pageSize !==10){
        fetchLeads();
      }
      return      
    }

    filterStateRef.current = {
      ...filterState,
    };

    // if(filterStateRef?.current?.statuses?.length === 0 && filterStateRef?.current?.singleDate && filterStateRef?.current?.dateRange?.startDate === undefined&& filterStateRef?.current?.dateRange?.endDate === undefined) {
    //   onFilter(undefined,filterStateRef?.current.singleDate,undefined)
    // }
    // else if(filterStateRef?.current?.statuses?.length === 0 && filterStateRef?.current?.singleDate===undefined && filterStateRef?.current?.dateRange?.startDate && filterStateRef?.current?.dateRange?.endDate) {
    //   onFilter(undefined,undefined,filterStateRef?.current?.dateRange)
    // }
    // else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.singleDate === undefined && filterStateRef?.current?.dateRange?.startDate === undefined&& filterStateRef?.current?.dateRange?.endDate === undefined) {
    //   onFilter(filterStateRef?.current?.statuses || [],undefined,undefined)
    // }
    // else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.singleDate && filterStateRef?.current?.dateRange === undefined){
    //   console.log("single date")
    //   onFilter(filterStateRef?.current?.statuses,filterStateRef?.current?.singleDate,undefined)
    // }
    // else if(filterStateRef?.current?.statuses && filterStateRef?.current?.statuses?.length > 0 && filterStateRef?.current?.dateRange && filterStateRef?.current?.singleDate === undefined){
    //   console.log("double date")
    //    onFilter(filterStateRef?.current?.statuses,undefined,filterStateRef?.current?.dateRange)
    // }

    const { statuses, singleDate, dateRange } = filterStateRef?.current || {};
    const { startDate, endDate } = dateRange || {};

    if (statuses?.length || singleDate || (startDate && endDate)) {
      
    onFilter(
      statuses?.length ? statuses : undefined,
      singleDate? singleDate: undefined,
      startDate && endDate ? { startDate, endDate } : undefined,
    );
  }

    // // Define the filter logic
    // if (!statuses?.length && singleDate) {
    //   // Filter by single date only
    //   onFilter(undefined, singleDate, undefined);
    // } else if (!statuses?.length && startDate && endDate) {
    //   // Filter by date range only
    //   onFilter(undefined, undefined, { startDate, endDate });
    // } else if (statuses?.length && !singleDate && !startDate && !endDate) {
    //   // Filter by statuses only
    //   onFilter(statuses, undefined, undefined);
    // } else if (statuses?.length && singleDate && !startDate && !endDate) {
    //   // Filter by statuses and single date
    //   onFilter(statuses, singleDate, undefined);
    // } else if (statuses?.length && startDate && endDate && !singleDate) {
    //   // Filter by statuses and date range
    //   onFilter(statuses, undefined, { startDate, endDate });
    // } else if (statuses?.length && singleDate && startDate && endDate) {
    //   // Handle all conditions if required
    //   console.log("Filtering with statuses, single date, and date range");
    //   onFilter(statuses, singleDate, { startDate, endDate });
    // } 
   
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

    const resetFilters = async () => {
      const initialFilterState = {
        statuses: [],
        singleDate: undefined,
        dateRange: { startDate: undefined, endDate: undefined },
      };

      return new Promise<void>((resolve) => {
        setFilterState(initialFilterState); // Update state
        filterStateRef.current = initialFilterState; // Sync ref with the new state
        resolve();
      });
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
        queryParams.append("status", (selectedStatuses || []).join(","));
      }

      if (dateRange?.startDate !== dateRange?.endDate){
        if (dateRange?.startDate) {
          console.log("start date", dateRange?.startDate);
          queryParams.append("fromDate", dateRange.startDate.toISOString());
        }
        if (dateRange?.endDate) {
          queryParams.append("toDate", dateRange.endDate.toISOString());
        }
      }

      if (dateRange?.startDate === dateRange?.endDate){
        if (dateRange?.startDate && dateRange?.endDate) {
          queryParams.append("fromDate", dateRange.startDate.toISOString());
          queryParams.append("toDate", dateRange.endDate.toISOString());
        }
      }

      
      if (singleDate){
        queryParams.append("fromDate", singleDate.toISOString());
        queryParams.append("toDate", singleDate.toISOString());
      }
      try {
      const data = await leadServiceInstance.getFilteredStatuses(queryParams);
      setLeads(data);
      setFilteredRows(data?.data);
      // setFilterState({
      //   statuses: [],
      //   singleDate: undefined,
      //   dateRange: { startDate: undefined, endDate: undefined },
      // })
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
            <TableFilters leads={leads?.data} setFilteredRows={setFilteredRows}  handleSearch={handleSearch} handleSearchChange={handleSearchChange} setRefetchLeads={setRefetchLeads} setFilterState={setFilterState} filterState={filterState}/>
            {search && <div className={styles["search-display"]}><input ref={inputRef} placeholder="Search here" onChange={handleSearchChange}  /></div>}
            <LeadsTable filteredRows={filteredRows} totalLeads={leads?.totalCount} setLeads={setLeads} setPageParams={setPageParams} />
        </div>
    )
}

export default Home;