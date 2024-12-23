import CreateLeadForm from '@/components/CreateLeadForm/CreateLeadForm';
import DateFilter from '@components/DateFilter/DateFilter';
import StatusFilter from '@components/StatusFilter/StatusFilter';
import React,{useEffect, useState} from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import Modal from '@/components/Modal/Modal';
import styles from './DashboardContainer.module.css';
import { FilterState, ILead } from '@/interfaces';

interface TableFiltersProps {
  leads: ILead[];
  setFilteredRows: (value: ILead[]) => void;
  handleSearch: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setRefetchLeads: (value: boolean) => void;
  // onStatusFilter: (selected: string[]) => void;
  // onFilter: (
  //   selectedStatuses?: string[],
  //   dateRange?: { startDate?: Date; endDate?: Date }
  // ) => Promise<void>;
  // setFilterState: (state: FilterState) => void; 
  filterState:FilterState
  setFilterState: (newState: FilterState | ((prevState: FilterState) => FilterState)) => void;
}


const TableFilters = ({leads,setFilteredRows,handleSearch,handleSearchChange,setRefetchLeads,filterState,setFilterState}:TableFiltersProps) => {

    const [isSearchCompressed,setIsSearchCompressed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCreateLead,setCreateLead] = useState(false);


    const statuses = [
        { label: "Prospects", color: "#F1F5F9" },
        { label: "Qualified", color: "#15803D" },
        { label: "Disqualified", color: "#B91C1C" },
        { label: "Follow Up", color: "#92400E" },
        { label: "Trial Booked", color: "#15803D" },
        { label: "Trial Completed", color: "#166534" },
        { label: "Payment Created", color: "#184574" },
        { label: "Enrolled", color: "#8E198F" },
        { label: "Trial Follow-up", color: "#92400E" },
        { label: "Not Enrolled", color: "#FEE2E2" },
        { label: "Interested", color:"green"}
    ];

    const timeRanges = [
        "All",
        "Today",
        "Yesterday",
        "This Week",
        "This Month",
        "Last Week",
        "Last Month",
        "Custom Date"
    ];

    useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 875) {
        setIsSearchCompressed(true); // Automatically enable search for smaller devices
      } else {
        setIsSearchCompressed(false); // Disable search for larger devices
      }
    };

    // Initialize on mount
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

     const handleLeadSubmit = () => {
        setRefetchLeads(true);
     }

     const handleCreateLead = () => {
        setModalOpen(prev => !prev);
        setCreateLead(prev => !prev);
    }    

      const handleStatusChange = (selected:string[]) => {

      // const filtered = leads?.filter((row) => selected.some((status) => status.toLowerCase() === row.status.toLowerCase()));

      // if (selected.length === 0){
      //   setFilteredRows(leads)
      // }

      // else if (filtered.length === 0){
      //   setFilteredRows([])
      // }
      // else{
      //   setFilteredRows(filtered);
      // }
      // onStatusFilter(selected);
      // onFilter(selected)
      setFilterState(prevState => ({
    ...prevState, // Preserve other state properties
    statuses: selected, // Update the statuses array
  }));
    
  };

  

     const handleTimeRangeChange = (selectedOption:string,customStartDate: Date | undefined=undefined,customEndDate: Date | undefined=undefined) => {
    const today = new Date();
    let filteredData:ILead[] = [];
    

    switch (selectedOption) {
      // case "Today":
      //   filteredData = leads.filter(
      //     (row) =>
      //       new Date(row.createdAt).toDateString() === today.toDateString()
      //   );
      //   // setFilterState(prevState => ({
      //   //     ...prevState,
      //   //     singleDate:today
            
      //   //   }))
       
      //     setFilterState(prevState => ({
      //       ...prevState,
      //       singleDate:today,
      //       dateRange: { startDate: undefined, endDate: undefined }
      //     }))
        
        
      // break;
      case "Today":
        const today_t = new Date();

        // Calculate the start of today
        const startOfDay_t = new Date(today_t);
        startOfDay_t.setHours(0, 0, 0, 0); // Set time to 00:00:00

        // Calculate the end of today
        const endOfDay_t = new Date(today_t);
        endOfDay_t.setHours(23, 59, 59, 999); // Set time to 23:59:59

        setFilterState((prevState) => ({
          ...prevState,
          singleDate: undefined,
          dateRange: { startDate: startOfDay_t, endDate: endOfDay_t },
        }));

        break;

        case "Yesterday":
          const yesterday = new Date();
          
          // Calculate the start of yesterday
          const startOfDay = new Date(yesterday.setDate(yesterday.getDate() - 1));
          startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00

          // Calculate the end of yesterday
          const endOfDay = new Date(yesterday);
          endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59

          setFilterState((prevState) => ({
            ...prevState,
            singleDate: undefined,
            dateRange: { startDate: startOfDay, endDate: endOfDay },
          }));

        break;


      case "This Week":
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        filteredData = leads.filter(
          (row) =>
            new Date(row.createdAt) >= startOfWeek && new Date(row.createdAt) <= today
        );
        setFilterState(prevState => ({
          ...prevState,
          singleDate:undefined,
          dateRange: {
            startDate: startOfWeek,
            endDate: today,
          },
        }))
        break;
      case "This Month":
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        filteredData = leads.filter(
          (row) =>
            new Date(row.createdAt) >= startOfMonth && new Date(row.createdAt) <= today
        );
        setFilterState(prevState => ({
          ...prevState,
          singleDate:undefined,
          dateRange: {
            startDate: startOfMonth,
            endDate: today,
          },
        }))
        break;
      case "Last Week":
        const endOfLastWeek = new Date(today);
        endOfLastWeek.setDate(today.getDate() - today.getDay() - 1);
        const startOfLastWeek = new Date(endOfLastWeek);
        startOfLastWeek.setDate(endOfLastWeek.getDate() - 6);
        filteredData = leads.filter(
          (row) =>
            new Date(row.createdAt) >= startOfLastWeek &&
            new Date(row.createdAt) <= endOfLastWeek
        );
        setFilterState(prevState => ({
          ...prevState,
          singleDate:undefined,
          dateRange: {
            startDate: startOfLastWeek,
            endDate: endOfLastWeek,
          },
        }))
        break;
      case "Last Month":
        const startOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const endOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        filteredData = leads.filter(
          (row) =>
            new Date(row.createdAt) >= startOfLastMonth &&
            new Date(row.createdAt) <= endOfLastMonth
        );
        setFilterState(prevState => ({
          ...prevState,
          singleDate:undefined,
          dateRange: {
            startDate: startOfLastMonth,
            endDate: endOfLastMonth,
          },
        }))
        break;
      case "Custom Date":
        if (customStartDate && !customEndDate) {
          const startDate = new Date(customStartDate);
          filteredData = leads.filter(
            (row) => new Date(row.createdAt) >= startDate
          );
        }
        if (customStartDate && customEndDate) {
          const startDate = new Date(customStartDate);
          const endDate = new Date(customEndDate);
          endDate.setHours(23, 59, 59, 999);
          filteredData = leads.filter(
            (row) =>
              new Date(row.createdAt) >= startDate &&
              new Date(row.createdAt) <= endDate
          );
          setFilterState(prevState => ({
          ...prevState,
          singleDate:undefined,
          dateRange: {
            startDate: startDate,
            endDate: endDate,
          },
        }))
        } else if (!customStartDate && !customEndDate) {
            return
        }
        break;

          
      default:
        filteredData = leads;
    }

    setFilteredRows(filteredData);
  };

      const closeModal = () => {
    setModalOpen(prev =>!prev);
    setCreateLead(prev => !prev);
  };

    const renderFilters = () => {
        
            return (
            <div className={styles["filters"]}>
                <div className={styles["input-box"]}>
                <IoIosSearch size={20} onClick={isSearchCompressed ? handleSearch : undefined} />
                <input type="text" placeholder="Search" onChange={handleSearchChange} />
                </div>
                <div>
                <DateFilter options={timeRanges} onSelectionChange={handleTimeRangeChange} />
                </div>        
                <div className={styles["status-dropdown-container"]}>
                <StatusFilter statuses={statuses} onSelectionChange={handleStatusChange}/>
                </div>
                <div className={styles["search-box"]} style={{cursor:'pointer'}} onClick={handleCreateLead}>
                <FaPlus size={14} />
                Create Lead
                {isModalOpen && isCreateLead && (
                    <Modal isOpen={isModalOpen && isCreateLead} closeModal={closeModal} >
                        <CreateLeadForm onSubmit={handleLeadSubmit} closeModal={closeModal} />
                    </Modal>
                )}                
                </div>
            </div>
            );
        };
    return (
        <div className={styles["table-header"]}>
        <div>
          <p className={styles["leads"]}>Leads<span>(All)</span></p>
        </div>
        {renderFilters()}        
      </div>
    )
}

export default TableFilters;