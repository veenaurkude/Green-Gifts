import { useState } from "react";
import styles from "./AccountPage.module.css";
import { FaRegEdit } from "react-icons/fa";

const AccountPage = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>VU</div>
          <div className={styles.userInfo}>
            <h3>Veena Urkude</h3>
            <p>06:42:06 PM</p>
          </div>
        </div>

        <nav className={styles.navLinks}>
          <a>My Profile</a>
          <a>Delivery Address</a>
          <a>My Orders</a>
          <a>Recently Viewed</a>
          <a>Reward Credit ₹25</a>
          <a>How To Earn</a>
          <a>How To Spend</a>
          <a>Refer Friend</a>
          <a>Change Password</a>
          <a className={styles.logout}>Log Out</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h2>Good Evening! Veena</h2>
        <div className={styles.profileCard}>
          <div className={styles.editIcon} onClick={handleEditClick}>
            <FaRegEdit />
          </div>

          {/* Profile Form */}
          <div className={styles.formGroup}>
            <label>First Name</label>
            <input type="text" value="Veena" readOnly={!isEditable} />
          </div>

          <div className={styles.formGroup}>
            <label>Last Name</label>
            <input type="text" value="Urkude" readOnly={!isEditable} />
          </div>

          <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" value="veenaurkude10@gmail.com" readOnly />
          </div>

          <div className={styles.formGroup}>
            <label>Contact Number</label>
            <input type="text" placeholder="Enter your contact number" readOnly={!isEditable} />
          </div>

          <div className={styles.formGroup}>
            <label>Birthdate</label>
            <div className={styles.birthdate}>
              <input type="text" placeholder="DD" readOnly={!isEditable} />
              <input type="text" placeholder="MM" readOnly={!isEditable} />
              <input type="text" placeholder="YYYY" readOnly={!isEditable} />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Gender</label>
            <div className={styles.genderOptions}>
              <input type="radio" name="gender" checked={!isEditable} readOnly />
              <label>Male</label>

              <input type="radio" name="gender" checked={isEditable} readOnly />
              <label>Female</label>

              <input type="radio" name="gender" readOnly />
              <label>Other</label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
