// import React, { useState } from "react";
// import SidebarHeader from "./SidebarHeader";
// import SidebarSection from "./SidebarSection";
// import { RiSettings2Line } from "react-icons/ri";
// import { TbBriefcase } from "react-icons/tb";
// import { BsHeadset } from "react-icons/bs";
// import { RxShuffle } from "react-icons/rx";
// import { RxDashboard } from "react-icons/rx";
// import { TbClipboardText } from "react-icons/tb";
// import { BiPieChartAlt2 } from "react-icons/bi";
// import { FaChevronDown } from "react-icons/fa";
// import { IoClose } from "react-icons/io5";
// import { AiOutlineUser } from "react-icons/ai";
// import { FiLogOut } from "react-icons/fi";
// import styles from './Sidebar.module.css';

// export interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
//   setProfileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
// }


// export function Sidebar({ isOpen, toggleSidebar, setProfileOpen }:SidebarProps) {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => setIsHovered(true);
//   const handleMouseLeave = () => setIsHovered(false);

//   const mainNavigation = [
//     { icon: <RxDashboard size={30} />, label: "Home" },
//     { icon: <TbClipboardText size={30} />, label: "Leads Management" },
//     { icon: <BiPieChartAlt2 size={30} />, label: "Attendance" },
//     { icon: <TbBriefcase size={30} />, label: "Stores" },
//     { icon: <BsHeadset size={30} />, label: "Providers" },
//     { icon: <RiSettings2Line size={30} />, label: "Developers" },
//     { 
//       icon: <RxShuffle size={30} />, 
//       label: "Workflows", 
//       extraIcon: <FaChevronDown /> 
//     }
//   ];

//   const profileActions = [
//     { 
//       icon: <AiOutlineUser size={30} />, 
//       label: "Profile", 
//       onClick: () => setProfileOpen((prev) => !prev) 
//     },
//     { icon: <FiLogOut size={30} />, label: "Sign Out" }
//   ];

//   return (
//     <div 
//       // className={styles[{`sidebar ${isHovered ? "expanded" : "compressed"} ${isOpen ? "open" : ""}`}]}
//       className={`${styles.sidebar} ${isHovered ? styles.expanded : styles.compressed} ${isOpen ? styles.open : ""}`}
//       onMouseEnter={handleMouseEnter} 
//       onMouseLeave={handleMouseLeave}
//     >
//       <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
//       <SidebarSection items={mainNavigation} isHovered={isHovered} isOpen={isOpen} />
//       <SidebarSection items={profileActions} isHovered={isHovered} isOpen={isOpen} />
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "./Sidebar.module.css";
import { RiSettings2Line } from "react-icons/ri";
import { TbBriefcase } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { RxShuffle, RxDashboard } from "react-icons/rx";
import { TbClipboardText } from "react-icons/tb";
import { BiPieChartAlt2 } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
// import { useNavigate,Link } from "react-router-dom";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../public/images/logo.svg';

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setProfileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  setSelectedItem: (value: string) => void;
}

function Sidebar({ isOpen, toggleSidebar, setProfileOpen,setSelectedItem }:SidebarProps) {
  
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [clickedItem, setClickedItem] = useState('home');


  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const menuItems = [
    { icon: <RxDashboard size={30} color="black" />, path:"home", label: "Home" },
    { icon: <TbClipboardText size={30} color="#550000" />,path:"management", label: "Leads Management"},
    { icon: <BiPieChartAlt2 size={30} color="black" />,path:"attendance", label: "Attendance"},
    { icon: <TbBriefcase size={30} color="black" />,path:"stores", label: "Stores" },
    { icon: <BsHeadset size={30} color="black" />,path:"providers", label: "Providers" },
    { icon: <RiSettings2Line size={30} color="black" />,path:"developers", label: "Developers" },
    { icon: <RxShuffle size={30} color="black" />,path:"workflows", label: "Workflows" },
  ];

  const profileItems = [
    { icon: <AiOutlineUser size={30} color="black" />, label: "Profile", onClick: () => setProfileOpen((prev) => !prev) },
    { icon: <FiLogOut size={30} color="black" />, label: "Sign Out"},
  ];

  const handleItem = (item:string) =>{
    setClickedItem(item);
    setSelectedItem(item);
  }

  return (
    <div
      // className={`sidebar ${isHovered ? "expanded" : "compressed"} ${isOpen ? "open" : ""}`}
      className={`${styles.sidebar} ${isHovered ? styles.expanded : styles.compressed} ${isOpen ? styles.open : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isOpen && (
        <div className={styles["open-close-c-logo"]}>
          {/* <img src="./logo.svg" alt="logo" /> */}
          <Image src={logo} alt="logo" />
          <IoClose size={30} onClick={toggleSidebar} className={styles["close-icon"]} />
        </div>
      )}

      <ul>
        {menuItems.map((item, index) => (
            <li key={index} onClick={()=>handleItem(item.path)} className={clickedItem === item.path ? styles["selected"] : ""}>
              <div className={`${styles['list-item']} ${clickedItem === item.path ? styles["icon-selected"] : ""}`}>
                {/* {item.icon} */}
                {React.cloneElement(item.icon, {
                  color: clickedItem === item.path ? "#8E198F" : "black"  })}
                {(isHovered || isOpen) && <span>{item.label}</span>}
              </div>
            </li>
        ))}
      </ul>

      <ul>
        {profileItems.map((item, index) => (
          <li key={index}>
            <div className={styles["list-item"]} >
              {item.icon}
              {(isHovered || isOpen) && <span>{item.label}</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;