import React, { useState} from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import Modal from '@components/Modal/Modal';
import Pagination from '@components/Pagination/Pagination';
import { IoEyeOutline } from "react-icons/io5";
import {ILead, IPageParams } from '@interfaces';
import styles from './DashboardContainer.module.css';
import { formatToLocalTime } from '@/utils/helpers';

const data = [
  { id: 1, name: 'Alice', phone: '9876543210', standard: '10th', testCount: 5 },
  { id: 2, name: 'Bob', phone: '8765432109', standard: '10th', testCount: 2 },
  { id: 3, name: 'Charlie', phone: '7654321098', standard: '10th', testCount: 1 },
  { id: 4, name: 'David', phone: '6543210987', standard: '9th', testCount: 4 },
  { id: 5, name: 'Eva', phone: '9432109876', standard: '8th', testCount: 3 },
  { id: 6, name: 'Frank', phone: '7321098765', standard: '7th', testCount: 0 },
  { id: 7, name: 'Grace', phone: '8210987654', standard: '6th', testCount: 2 },
  { id: 8, name: 'Hank', phone: '7109876543', standard: '5th', testCount: 1 },
];

interface LeadsTableProps{
  filteredRows:ILead[];
  totalLeads:number;
  setLeads: (leads: { data: ILead[]; totalCount: number }) => void;
}

const LeadsTable = ({filteredRows,totalLeads,setLeads}:LeadsTableProps) => {

  const [searchFilter, setSearchFilter] = useState('');
  const [standardFilter, setStandardFilter] = useState('');
  const [sortOrder, setSortOrder] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<ILead | null>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCreateLead,setCreateLead] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  const pageParams: IPageParams = { 
    pageNum: 1, 
    pageSize: 10 
  };
  
  const filteredData = data.filter((item) => {
    const searchLower = searchFilter.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(searchLower);
    const matchesPhone = item.phone.includes(searchFilter);
    const matchesStandard = standardFilter ? item.standard === standardFilter : true;
    return (matchesName || matchesPhone) && matchesStandard;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder ? a.testCount - b.testCount : b.testCount - a.testCount;
  });

  const handleRowsPerPageChange = (newRowsPerPage:number) => {
    setLeads({
      data: [],
    totalCount: 0,
    });
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const openModal = (lead:ILead) => {
    setSelectedLead(lead);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setSelectedLead(null); 
    setModalOpen(false);
    setCreateLead(false);
  };

  const handlePageChange = (page:number) => {
    setLeads({ data: [],
    totalCount: 0,});
    setCurrentPage(page);
  };

  const renderTableRows = () => {
    if (!loading) {
      return (
        <tr>
          <td colSpan={8} style={{ textAlign: 'center' }}>
            <ClipLoader color="#36d7b7" loading={true} size={30} />
          </td>
        </tr>
      );
    }

    if (filteredRows?.length === 0){
      return (
    <tr>
      <td colSpan={8} style={{ textAlign: 'center' }}>
        <div className={styles["no-leads-found-container"]}>
          <img src="/not-found2.png" />
          <p>No Leads Found</p>
          <button>Create Lead</button>
        </div>
      </td>
    </tr>
  );
    }

    
    return filteredRows?.map((lead:ILead, index:number) => (
      <tr key={index}>
        <td>{lead.studentName || ''}</td>
        <td>{lead?.class[0]?.name.split(" ")[1] || ''}</td>
        <td>{lead.mobile || ''}</td>
        <td className={`${styles.status} ${styles[lead.status.toLowerCase().replace(" ", "-")]}`}>
          <span>{lead.status || ''}</span>
        </td>
        <td>{lead.interactedWith || ''}</td>
        <td>{lead.createdBy || ''}</td>
        <td>{lead.creationStatus || ''}</td>
        <td>
          <div
            className="eye-button"
            role="button"
            tabIndex={0}
            onClick={() => openModal(lead)}
          >
            <IoEyeOutline size={25} />
          </div>          
          {isModalOpen && (
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              
                <>
                  <h1>Lead Details</h1>
                  <p>Student Name: {selectedLead?.studentName || ''}</p>
                  <p>Class: {selectedLead?.class[0]?.name.split(" ")[1] || ''}</p>
                  <p>Phone Number: {selectedLead?.mobile || ''}</p>
                  <p>Status: {selectedLead?.status || ''}</p>
                  <p>Interacted With: {selectedLead?.interactedWith || ''}</p>
                  <p>Created By: {selectedLead?.createdBy || ''}</p>
                  <p>Created At: {(selectedLead?.createdAt && formatToLocalTime(selectedLead.createdAt)) || ''}</p>
                </>
              
            </Modal>
          )}
        </td>
        <td className="last">
          {(lead.createdAt && formatToLocalTime(lead.createdAt)) || ''}
        </td>
      </tr>
    ));
  };

  return (
    <div className={styles['leads-table']}>
        <div className={styles['table-container']}>
          <table className={styles['responsive-table']}>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Interacted With</th>
                <th>Created By</th>
                <th>Created</th>
                <th>Details</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
        {filteredRows?.length !== 0 && loading && <Pagination 
          currentPage={currentPage}
          totalPages={totalLeads} 
          onPageChange={handlePageChange} 
          rowsPerPage={rowsPerPage} 
          onRowsPerPageChange={handleRowsPerPageChange} 
        />}
    </div>
  );
};

export default LeadsTable;
