import React from "react";
import styles from './Sidebar.module.css';

interface SidebarItemProps {
  icon: React.ReactNode;   // Icon component
  label: string;           // Text for the item
  isHovered: boolean;      // Whether the sidebar is hovered
  isOpen: boolean;         // Whether the sidebar is fully open
  onClick?: () => void;    // Optional click handler
  extraIcon?: React.ReactNode; // Optional additional icon (e.g., dropdown icon)
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  isHovered, 
  isOpen, 
  onClick, 
  extraIcon 
}) => (
  <div className={styles["list-item"]} onClick={onClick}>
    <div className={styles["icon-spacing"]}>{icon}</div>
    {(isHovered || isOpen) && <span>{label}</span>}
    {isHovered && extraIcon && <div className={styles["icon-left-spacing"]}>{extraIcon}</div>}
  </div>
);

export default SidebarItem;
