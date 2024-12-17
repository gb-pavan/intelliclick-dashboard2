import React, { useState } from "react";
import "./StatusFilter.css";
import { FaChevronDown } from "react-icons/fa6";

interface Status {
  label: string;
  color: string;
}

interface StatusFilterProps {
  statuses: Status[];
  onSelectionChange?: (selectedStatuses: string[]) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  statuses,
  onSelectionChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const handleCheckboxChange = (status: Status) => {
    const isSelected = selectedStatuses.includes(status.label);
    const updatedStatuses = isSelected
      ? selectedStatuses.filter((s) => s !== status.label)
      : [...selectedStatuses, status.label];
    setSelectedStatuses(updatedStatuses);

    if (onSelectionChange) {
      onSelectionChange(updatedStatuses);
    }
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-btn"
        style={{ color: "#64748B", padding: "0px 10px" }}
      >
        {selectedStatuses.length > 0
          ? `Selected (${selectedStatuses.length})`
          : "Status"}
        <span className="ml-2">
          <FaChevronDown className="down-arrow" />
        </span>
      </button>

      {isOpen && (
        <div className="style-list">
          <ul className="status-filter-show">
            {statuses.map((status, index) => (
              <li key={index} className="each-status">
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
                <span className="ml-2 text-gray-700 font-medium">
                  {status.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;

