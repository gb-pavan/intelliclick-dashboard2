import React, { useState } from "react";
import { Download } from "lucide-react";
import { ChevronDown } from "lucide-react";

type Format = "png" | "svg" | "pdf";

interface DropdownButtonProps {
  onSelect?: (format: Format) => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (format: Format) => {
    setIsOpen(false);
    if (onSelect) onSelect(format);
  };

  return (
    <div className="relative w-full flex items-center justify-center mb-5">
      {isOpen && (
        <div className="absolute top-5 right-10 bg-white shadow-md border rounded-md mb-2 z-10 w-30">
          {["png", "svg", "pdf"].map((format) => (
            <button
              key={format}
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left text-sm text-gray-700 font-medium"
              onClick={() => handleSelect(format as Format)}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "linear-gradient(109.01deg, #E446EF 15.4%, #2D84D3 99.81%)",
        }}
        className="w-[218px] h-[44px] flex items-center justify-center mt-[24px] rounded-[8px]"
      >
        <Download className="mr-2 text-[#FFFFFF]" />
        <div className="text-[#FFFFFF] text-[18px] font-[roboto] font-bold">
          Download
        </div>
        <ChevronDown
          style={{
            color: "#FFFFFF",
            width: "24px",
            height: "24px",
            marginLeft: "10px",
            marginTop: "3px",
          }}
        />
      </button>
    </div>
  );
};

export default DropdownButton;
