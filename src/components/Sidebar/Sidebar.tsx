import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarSection from "./SidebarSection";
import { RiSettings2Line } from "react-icons/ri";
import { TbBriefcase } from "react-icons/tb";
import { BsHeadset } from "react-icons/bs";
import { RxShuffle } from "react-icons/rx";
import { RxDashboard } from "react-icons/rx";
import { TbClipboardText } from "react-icons/tb";
import { BiPieChartAlt2 } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import styles from './Sidebar.module.css';

export interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setProfileOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}


export function Sidebar({ isOpen, toggleSidebar, setProfileOpen }:SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const mainNavigation = [
    { icon: <RxDashboard size={30} />, label: "Home" },
    { icon: <TbClipboardText size={30} />, label: "Leads Management" },
    { icon: <BiPieChartAlt2 size={30} />, label: "Attendance" },
    { icon: <TbBriefcase size={30} />, label: "Stores" },
    { icon: <BsHeadset size={30} />, label: "Providers" },
    { icon: <RiSettings2Line size={30} />, label: "Developers" },
    { 
      icon: <RxShuffle size={30} />, 
      label: "Workflows", 
      extraIcon: <FaChevronDown /> 
    }
  ];

  const profileActions = [
    { 
      icon: <AiOutlineUser size={30} />, 
      label: "Profile", 
      onClick: () => setProfileOpen((prev) => !prev) 
    },
    { icon: <FiLogOut size={30} />, label: "Sign Out" }
  ];

  return (
    <div 
      // className={styles[{`sidebar ${isHovered ? "expanded" : "compressed"} ${isOpen ? "open" : ""}`}]}
      className={`${styles.sidebar} ${isHovered ? styles.expanded : styles.compressed} ${isOpen ? styles.open : ""}`}
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <SidebarSection items={mainNavigation} isHovered={isHovered} isOpen={isOpen} />
      <SidebarSection items={profileActions} isHovered={isHovered} isOpen={isOpen} />
    </div>
  );
}