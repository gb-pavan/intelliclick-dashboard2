import React, { useState, useEffect, useRef } from "react";
import { FormData } from "./UploadForm"; // Import the FormData type

interface LocationDropdownProps {
  formData: FormData; // Expecting formData to be an object of type FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; // Function to update formData
  onClose: () => void; // Callback function to close the dropdown
}

export const LocationDropdown: React.FC<LocationDropdownProps> = ({
  formData,
  setFormData,
  onClose,
}) => {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<"state" | "city" | null>(
    null
  ); // Specify the type of selectedType
  const [stateOptions, setStateOptions] = useState<string[]>([]); // State options as an array of strings
  const [cityOptions, setCityOptions] = useState<string[]>([]); // City options as an array of strings
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Mock Data for States and Cities (fallback)
  const mockStates: string[] = [
    "California",
    "Texas",
    "New York",
    "Florida",
    "Ohio",
  ];
  const mockCities: string[] = [
    "Los Angeles",
    "Houston",
    "Dallas",
    "New York City",
    "Miami",
  ];

  // Fetch states from API
  const fetchStates = async () => {
    try {
      // const response = await fetch("/api/states"); // Replace with your API endpoint
      // if (!response.ok) throw new Error("Failed to fetch states");
      // const data: string[] = await response.json(); // Expecting an array of strings
      // setStateOptions(data);
      setStateOptions(mockStates);
    } catch (error) {
      console.error("Error fetching states:", error);
      setStateOptions(mockStates); // Fallback to mock data
    }
  };

  // Fetch cities from API
  const fetchCities = async () => {
    try {
      // const response = await fetch("/api/cities"); // Replace with your API endpoint
      // if (!response.ok) throw new Error("Failed to fetch cities");
      // const data: string[] = await response.json(); // Expecting an array of strings
      // setCityOptions(data);
      setCityOptions(mockCities);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setCityOptions(mockCities); // Fallback to mock data
    }
  };

  const handleLocationClick = () => {
    setShowButtons(true);
  };

  const handleStateSelect = (state: string) => {
    setFormData({ ...formData, location: { state } });
    setSelectedType("state");
    setShowButtons(false);
    onClose(); // Close the dropdown when a state is selected
  };

  const handleCitySelect = (city: string) => {
    setFormData({ ...formData, location: { city } });
    setSelectedType("city");
    setShowButtons(false);
    onClose(); // Close the dropdown when a city is selected
  };

  useEffect(() => {
    if (selectedType === "state") {
      fetchStates(); // Fetch states when 'State' button is clicked
    } else if (selectedType === "city") {
      fetchCities(); // Fetch cities when 'City' button is clicked
    }
  }, [selectedType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowButtons(false);
        onClose(); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative bg-white mb-2" ref={dropdownRef}>
      <div
        className="border rounded p-2 w-full cursor-pointer"
        onClick={handleLocationClick}
      >
        {formData.location && "state" in formData.location
          ? formData.location.state
          : formData.location && "city" in formData.location
          ? formData.location.city
          : "Select Location"}
      </div>

      {showButtons && (
        <div className="absolute left-0 top-full bg-white border rounded mt-2 w-full shadow-lg z-10 p-2">
          <div className="flex justify-between mb-2">
            <button
              className={`w-1/2 mr-1 p-2 rounded ${
                selectedType === "state"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedType("state")}
            >
              State
            </button>
            <button
              className={`w-1/2 ml-1 p-2 rounded ${
                selectedType === "city"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => setSelectedType("city")}
            >
              City
            </button>
          </div>

          {selectedType === "state" && (
            <ul>
              {stateOptions.map((state, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleStateSelect(state)}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}

          {selectedType === "city" && (
            <ul>
              {cityOptions.map((city, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
