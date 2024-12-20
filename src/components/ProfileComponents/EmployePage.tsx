import React from "react";
import dateFormat from "dateformat";
import ProfilePage from "./ProfilePage";
import DropdownButton from "./DropdownButton";
import { UserData } from "../../containers/dashboard/Profile";
import Image from 'next/image';
import Group from '@public/images/Group.png';
import Icon from '@public/images/Icon.png';
interface EmployePageProps {
  userData: UserData | null;
  frontRef: React.RefObject<HTMLDivElement >;
  backRef: React.RefObject<HTMLDivElement >;
  downloadHandler: (format: "png" | "svg" | "pdf") => Promise<void>;
}
const EmployePage: React.FC<EmployePageProps>= ({ userData, frontRef, downloadHandler }) => {
  const formatDate = (date:any) => {
    return date ? dateFormat(new Date(date), "mm/dd/yyyy") : "";
  };

  return (
    
    <div className="rounded-lg bg-[#FFFFFF] border border-[#FCFCFCCC] shadow-lg flex flex-col sm:flex-col lg:flex-row  m-2 sm:m-5 w-90">
      <div className="flex-1 flex-col items-center sm:items-start p-4 m-2 sm:m-4">
        {/* Profile Picture and User Info */}
        <div className="flex flex-col sm:flex-row items-center justify-start mb-5 w-full">
          {/* Profile Picture */}
          <div className="relative">
            <Image
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full"
              src={Group}
              alt="profile pic"
            />
            <div className="flex items-center justify-center rounded-full w-9 h-9 bg-[#FBE8FF] absolute top-14  sm:top-20 right-0 opacity-50"></div>
            <Image
              className="w-4 h-4 absolute top-[66px] right-[7px] sm:top-[89px] sm:right-2 z-50"
              src={Icon}
              alt="icon"
            />
          </div>

          {/* User Info */}
          <div className="text-center  sm:text-left sm:ml-6">
            <p className="text-lg sm:text-xl font-medium capitalize">
              {userData?.name || "Sumit Kumar"}
            </p>
            <span className="text-sm sm:text-base opacity-50 capitalize">
              {userData?.designation || "Manager"}
            </span>
          </div>
        </div>

        {/* User Information Fields */}
        <div className=" grid grid-cols-1 sm:grid-cols-2 mt-[82px] gap-[38px] ">
          {[
            { label: "Full Name", value: userData?.name || "Sumit Kumar" },
            {
              label: "Employee ID",
              value: userData?.idNumber || "IPL12345654127",
            },
            {
              label: "Official Mail",
              value: userData?.email || "sumitkumar@gmail.com",
            },
            { label: "Mobile Number", value: userData?.phone || "1234567890" },
            {
              label: "DOB",
              value: formatDate(userData?.dateOfBirth) || "11/11/2004",
            },
            {
              label: "DOJ",
              value: formatDate(userData?.dateOfJoining) || "11/11/2009",
            },
            {
              label: "Reporting Manager",
              value: userData?.reportingManager || "Santosh Kumar",
            },
           
           
           
            { label: "HRBP", value: userData?.HRBP || "Hardip Singh" },
            { label: "Location", value: userData?.location || "New Delhi" },
          ].map((field, index) => (
            <div key={index}>
              <p className="text-sm sm:text-base font-roboto text-[16px] font-[400px] text-[#000000] opacity-80">
                {field.label}
              </p>
              <div className="w-full mt-[16px] p-4 bg-gray-100 text-[16px] text-[ #000000] rounded-[8px] opacity-40 font-poppins">
                {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:items-start sm:justify-end sm:mx-auto sm:ml-auto p-2 sm:p-5">
        <ProfilePage userData={userData} pageRef={frontRef} />
        <DropdownButton onSelect={(format: "png" | "svg" | "pdf") => downloadHandler(format)} />
      </div>
    </div>
  );
};

export default EmployePage;
