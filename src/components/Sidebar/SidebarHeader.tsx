import React from "react";
import { IoClose } from "react-icons/io5";
import styles from './Sidebar.module.css';

interface SidebarHeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isOpen, toggleSidebar }) => (
  <div className={styles["sidebar-header"]}>
    {isOpen && (
      <div className={styles["open-close-c-logo"]}>
        <img src="./logo.svg" alt="logo" />
        <IoClose size={30} onClick={toggleSidebar} className={styles["close-icon"]} />
      </div>
    )}
  </div>
);

export default SidebarHeader;
