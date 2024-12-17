// import { useState, useEffect } from "react";
// import { FaChevronDown } from "react-icons/fa6";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./DateFilter.css";

// const DateFilter = ({ options, onSelectionChange }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
//   const [startDate, endDate] = dateRange;

//   useEffect(() => {
//     // If Custom Date is selected and both dates are set, apply the filtering
//     if (selectedOption === "Custom Date" && startDate && endDate) {
//       onSelectionChange && onSelectionChange("Custom Date", startDate, endDate);
//     } else if (selectedOption && selectedOption !== "Custom Date") {
//       onSelectionChange && onSelectionChange(selectedOption);
//     }
//   }, [startDate, endDate, selectedOption, onSelectionChange]);

//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//     if (option === "Custom Date") {
//       // Keep the dropdown open and show DatePicker
//       setIsOpen(true);
//     } else {
//       // Close the dropdown for non-custom options
//       setIsOpen(false);
//     }
//   };

//   const handleDateChange = (update) => {
//     setDateRange(update);
//     // Trigger filtering as soon as the date range is updated
//     if (update[0] && update[1]) {
//       onSelectionChange && onSelectionChange("Custom Date", update[0], update[1]);
//     }
//   };

//   // const handleDropdownToggle = () => {
//   //   if (isOpen && selectedOption === "Custom Date") {
//   //     // If the dropdown is already open and "Custom Date" is selected,
//   //     // reset the selected option to show all options.
//   //     setSelectedOption(null);
//   //     setIsOpen(!isOpen); // Toggle the dropdown state

//   //   }
//   //   setIsOpen(!isOpen); // Toggle the dropdown state
//   // };

//   const handleDropdownToggle = () => {
//     if (selectedOption === 'Custom Date' && isOpen){
//       setSelectedOption(null);
//       return
//     }
//     setSelectedOption(null);
//     setIsOpen(!isOpen);
//   }


//   return (
//     <div className="dropdown-container">
//       {/* Dropdown Button */}
//       {/* <button
//         // onClick={() => setIsOpen(!isOpen)}
//         onClick={handleDropdownToggle}
//         className="dropdown-btn"
//         style={{ color: "#64748B", padding:"0px 10px" }}
//       >
//         {selectedOption
//           ? selectedOption === "Custom Date" && startDate && endDate
//             ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
//             : selectedOption
//           : "All"}
//         <span className="ml-2">
//           <FaChevronDown className="down-arrow" />
//         </span>
//       </button> */}
//       <button
//         // onClick={() => setIsOpen(!isOpen)}
//         onClick={handleDropdownToggle}
//         className="dropdown-btn"
//         style={{ color: "#64748B", padding:"0px 10px" }}
//       >
//         {selectedOption? selectedOption:'All'}
//         <span className="ml-2">
//           <FaChevronDown className="down-arrow" />
//         </span>
//       </button>

//       {/* Dropdown Content */}
//       {(
//         // <div className="style-list">
//         //   {selectedOption === "Custom Date" && isOpen ? (
//         //     // Show only the DatePicker for "Custom Date"
//         //     <div className="custom-date-picker">
//         //       <DatePicker
//         //         selectsRange
//         //         startDate={startDate}
//         //         endDate={endDate}
//         //         onChange={handleDateChange} // Trigger filtering on date change
//         //         placeholderText="Select Date Range"
//         //         className="custom-date-input"
//         //         inline
//         //       />
//         //     </div>
//         //   ) : 
//         //     // Show standard options
//         //     {isOpen && (<ul className="date-filter-show">
//         //       {options.map((option, index) => (
//         //         <li
//         //           key={index}
//         //           className="each-option"
//         //           onClick={() => handleOptionChange(option)}
//         //         >
//         //           {option}
//         //         </li>
//         //       ))}
//         //     </ul>)}
//         //   }
//         // </div>
//         <div className="style-list">
//   {selectedOption === "Custom Date" && isOpen ? (
//     // Show only the DatePicker for "Custom Date"
//     <div className="custom-date-picker">
//       <DatePicker
//         selectsRange
//         startDate={startDate}
//         endDate={endDate}
//         onChange={handleDateChange} // Trigger filtering on date change
//         placeholderText="Select Date Range"
//         className="custom-date-input"
//         inline
//       />
//     </div>
//   ) : (
//     // Show standard options
//     isOpen && (
//       <ul className="date-filter-show">
//         {options.map((option, index) => (
//           <li
//             key={index}
//             className="each-option"
//             onClick={() => handleOptionChange(option)}
//           >
//             {option}
//           </li>
//         ))}
//       </ul>
//     )
//   )}
// </div>

//       )}
      
//     </div>
//   );
// };

// export default DateFilter;


import { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa6";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { default as CustomCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./DateFilter.css";

const DateFilter = ({ options, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]); // [startDate, endDate]
  const [startDate, endDate] = dateRange;

  // Avoid triggering onSelectionChange repeatedly on every render
  useEffect(() => {
    // Only trigger onSelectionChange if there's a valid selection or date range
    if (selectedOption === "Custom Date" && startDate && endDate) {
      onSelectionChange?.("Custom Date", startDate, endDate);
    } else if (selectedOption && selectedOption !== "Custom Date") {
      onSelectionChange?.(selectedOption);
    }
  }, [startDate, endDate, selectedOption]); // Removed onSelectionChange from the dependencies

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    if (option === "Custom Date") {
      setIsOpen(true); // Keep the dropdown open for custom date
    } else {
      setIsOpen(false); // Close for other options
    }
  };

  const handleDateChange = (update) => {
    setDateRange(update);
    // Trigger filtering only when both dates are selected
    if (update[0] && update[1]) {
      onSelectionChange?.("Custom Date", update[0], update[1]);
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
      {/* Dropdown Button */}
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

      {/* Dropdown Content */}
      {isOpen && (
        <div className="style-list">
          {selectedOption === "Custom Date" ? (
            <div className="custom-date-picker">
              {/* <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={handleDateChange} // Trigger filtering on date change
                placeholderText="Select Date Range"
                className="custom-date-input"
                inline
              /> */}
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


