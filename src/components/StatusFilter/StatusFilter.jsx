import { useState } from "react";
import "./StatusFilter.css";
import { FaChevronDown } from "react-icons/fa6";

const StatusFilter = ({ statuses, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  const handleCheckboxChange = (status) => {
    const isSelected = selectedStatuses.includes(status.label);
    const updatedStatuses = isSelected
      ? selectedStatuses.filter((s) => s !== status.label)
      : [...selectedStatuses, status.label];
    setSelectedStatuses(updatedStatuses);
    onSelectionChange && onSelectionChange(updatedStatuses);
  };

  return (
    <div>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn"
        style={{color: "#64748B",padding:"0px 10px"}}
      >
        {selectedStatuses.length > 0
          ? `Selected (${selectedStatuses.length})`
          : "Status"}
        <span className="ml-2"><FaChevronDown
          className="down-arrow"
        /></span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="style-list">
          <ul className="status-filter-show">
            {statuses.map((status, index) => (
              <li key={index} className="each-status" >
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status.label)}
                  onChange={() => handleCheckboxChange(status)}
                  className="form-checkbox text-indigo-600 rounded"
                />
                <div
                  className="status-color-box"
                  style={{ backgroundColor: status.color }}
                ></div>
                <span className="ml-2 text-gray-700 font-medium">{status.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
