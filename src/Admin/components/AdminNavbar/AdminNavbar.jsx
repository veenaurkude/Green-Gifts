import React, { useState } from 'react';
import styles from './AdminNavbar.module.css';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { IoMoonOutline } from 'react-icons/io5';

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        {/* <h2 className={styles.logo}>Admin Panel</h2> */}
      </div>

      <div className={styles.rightSection}>
        {/* <IoMoonOutline className={styles.icon} /> */}
        <div className={styles.notification}>
          <FaBell className={styles.icon} />
          {/* <span className={styles.badge}>4</span> */}
        </div>

        <div
          className={styles.profileSection}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUserCircle className={styles.profileIcon} />
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li>My Profile</li>
                <li>Edit Profile</li>
                <li>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
