import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./Pagination.css";

function Pagination({ currentPage,totalPages, onPageChange, rowsPerPage, onRowsPerPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const rowsOptions = [10, 25, 50, 100]; // Available rows per page options

  const renderRowsPerPage = () => {
    return (
      <div className="leads-info">
        <label htmlFor="rows-per-page" style={{ color: "#0F172A",fontSize:"14px",fontWeight:100 }}>
          Leads:
          <select
            id="rows-per-page"
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          >
            {rowsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        {/* <p style={{ color: "#64748B",fontSize:"14px",fontWeight:100 }}>1-{Math.min(rowsPerPage, totalPages * rowsPerPage)} of {(totalPages * rowsPerPage) || 0}</p> */}
        <p style={{ color: "#64748B", fontSize: "14px", fontWeight: 100 }}>
          {totalPages > 0 ? `1-${Math.min(rowsPerPage, totalPages * rowsPerPage)}` : "0-0"} of {totalPages > 0 ? totalPages * rowsPerPage : 0} pages
        </p>

      </div>
    );
  };

  const renderSelectedPage = () => {
    return (
      <div className="pagination-controls">
        <label htmlFor="current-page">
          
          <select
            id="current-page"
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
          >
            {pages.map((page) => (
              <option key={page} value={page}>
                {page.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </label>
        {/* <p style={{color:#64748B;}}>of {totalPages} pages</p> */}
        <p style={{ color: "#64748B",fontSize:"14px",fontWeight:100,marginLeft:"10px" }}>of {totalPages || 0} pages</p>

        {renderPageNavButtons()}
      </div>
    );
  };

  const renderPageNavButtons = () => {
    return (
      <>
        <FaChevronLeft
          className={`page-controls icon-with-borders ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          size={10}
        />
        <FaChevronRight
          className={`page-controls ${currentPage === totalPages ? 'disabled' : ''}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          size={10}
        />
      </>
    );
  };

  return (
    <div className="table-bottom">
      {renderRowsPerPage()}
      {renderSelectedPage()}
    </div>
  );
}

export default Pagination;

