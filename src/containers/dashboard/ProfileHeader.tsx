import React from 'react';
import { IoClose } from "react-icons/io5";
import { FaToggleOff } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import logo from '../../public/images/logo.svg';
import Ellipse from '../../public/images/Ellipse.svg'
import Image from 'next/image';
import styles from './DashboardContainer.module.css';

export interface IProfileHeaderProps {
  isOpen: boolean;
  toggleSidebar: () => void;
setProfileOpen: (updater: (prev: boolean) => boolean) => void;
}


function ProfileHeader({ isOpen, toggleSidebar,setProfileOpen }:IProfileHeaderProps){

    return (
        <div className={styles['profile-header-container']}>
            <div className={styles['c-logo-container']}>
                <Image src={logo} alt="logo" />                
            </div>
            <div className={styles['profile-logo-container']}>
                <div className={styles['menu-icon-container']}>              
                    <IoMenu size={30} onClick={toggleSidebar} style={{ cursor: 'pointer' }} />                
                    <p>Incentive</p>
                    <FaToggleOff color='blue' size={25}/>
                </div>
                <div>
                    <Image src={Ellipse} alt="profile-image" className={styles['profile-img']} onClick={() => setProfileOpen((prev) => !prev)}  />
                </div>
            </div>
        </div>
    ) 
}

export default ProfileHeader;