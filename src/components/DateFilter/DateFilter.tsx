import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { default as CustomCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./DateFilter.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DateFilterProps {
  options: string[];
  onSelectionChange: (selectedOption: string, startDate?: Date, endDate?: Date) => void;
}


const DateFilter = ({ options, onSelectionChange }:DateFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); 
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (selectedOption === "Custom Date" && startDate && endDate) {
      onSelectionChange?.("Custom Date", startDate, endDate);
    } else if (selectedOption && selectedOption !== "Custom Date") {
      onSelectionChange?.(selectedOption);
    }
  }, [startDate, endDate, selectedOption]);

  const handleOptionChange = (option:string) => {
    setSelectedOption(option);
    if (option === "Custom Date") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleDateChange = (update: Value) => {
    if (Array.isArray(update) && update.length === 2) {
      setDateRange(update as [Date | null, Date | null]);
      if (update[0] && update[1]) {
        onSelectionChange("Custom Date", update[0], update[1]);
      }
    }
  };

  const handleDropdownToggle = () => {
    if (selectedOption === "Custom Date" && isOpen) {
      setSelectedOption(null);
      setDateRange([null,null]);
      return;
    }
    setSelectedOption(null);
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container">
      <button
        onClick={handleDropdownToggle}
        className="dropdown-btn"
        style={{ color: "#64748B", padding: "0px 10px" }}
      >
        {selectedOption
          ? selectedOption === "Custom Date" && startDate && endDate
            ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            : selectedOption
          : "All"}
        <span className="ml-2">
          <FaChevronDown className="down-arrow" />
        </span>
      </button>

      {isOpen && (
        <div className="style-list">
          {selectedOption === "Custom Date" ? (
            <div className="custom-date-picker">
              <CustomCalendar
                selectRange
                value={dateRange || [null, null]}
                onChange={handleDateChange}
                className="custom-date-input"
              />
            </div>
          ) : (
            <ul className="date-filter-show">
              {options.map((option, index) => (
                <li
                  key={index}
                  className="each-option"
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DateFilter;


