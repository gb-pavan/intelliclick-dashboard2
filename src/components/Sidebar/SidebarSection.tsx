import React from "react";
import SidebarItem from "./SidebarItem";
import styles from './Sidebar.module.css';

interface SidebarSectionProps {
  items: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    extraIcon?: React.ReactNode;
  }[];
  isHovered: boolean;
  isOpen: boolean;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ items, isHovered, isOpen }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index}>
        <SidebarItem 
          icon={item.icon} 
          label={item.label} 
          isHovered={isHovered} 
          isOpen={isOpen} 
          onClick={item.onClick} 
          extraIcon={item.extraIcon}
        />
      </li>
    ))}
  </ul>
);

export default SidebarSection;
